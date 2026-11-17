import { test } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import tls from "node:tls";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { addressOf, buildMessage, dotStuff, encodeHeader, sendSmtpMail, sendLeadEmailSmtp } from "../src/lib/leads/smtp";
import { readLeadConfig } from "../src/lib/leads/config";
import { createGuardStores } from "../src/lib/leads/guards";
import { leadRoute } from "../src/lib/leads/http";
import type { LeadRecord } from "../src/lib/leads/types";

/** A self-signed certificate for "localhost", made with openssl (skips TLS tests if unavailable). */
function makeCert(): { key: string; cert: string } | null {
  try {
    const dir = mkdtempSync(join(tmpdir(), "sv-smtp-"));
    execFileSync("openssl", ["req", "-x509", "-newkey", "rsa:2048", "-nodes", "-days", "1", "-subj", "/CN=localhost",
      "-addext", "subjectAltName=DNS:localhost", "-keyout", join(dir, "k.pem"), "-out", join(dir, "c.pem")], { stdio: "ignore" });
    return { key: readFileSync(join(dir, "k.pem"), "utf8"), cert: readFileSync(join(dir, "c.pem"), "utf8") };
  } catch { return null; }
}
const CERT = makeCert();

interface Captured { auth?: string; from?: string; rcpt: string[]; data?: string; tlsUsed: boolean; commands: string[] }

/** Minimal SMTP server: modes "none", "tls" (implicit) and "starttls". Optional failures. */
function fakeSmtp(mode: "none" | "tls" | "starttls", opt: { rejectAuth?: boolean; noStarttls?: boolean } = {}) {
  const captured: Captured = { rcpt: [], tlsUsed: mode === "tls", commands: [] };
  const handle = (sock: net.Socket) => {
    let buf = ""; let inData = false; let data = "";
    const say = (s: string) => sock.write(s + "\r\n");
    say("220 fake.smtp ready");
    const onData = (d: Buffer) => {
      buf += d.toString("utf8");
      let i;
      while ((i = buf.indexOf("\r\n")) >= 0) {
        const line = buf.slice(0, i); buf = buf.slice(i + 2);
        if (inData) {
          if (line === ".") { inData = false; captured.data = data; say("250 2.0.0 queued"); } else data += line + "\r\n";
          continue;
        }
        captured.commands.push(line.split(" ")[0]);
        if (/^EHLO/.test(line)) {
          const ext = mode === "starttls" && !captured.tlsUsed && !opt.noStarttls ? ["250-STARTTLS"] : [];
          [...["250-fake.smtp hello"], ...ext, "250 AUTH PLAIN LOGIN"].forEach(say);
        } else if (line === "STARTTLS") {
          say("220 go ahead");
          sock.removeListener("data", onData);
          const secure = new tls.TLSSocket(sock, { isServer: true, key: CERT!.key, cert: CERT!.cert });
          captured.tlsUsed = true;
          secure.on("data", onData);
          sock = secure;
        } else if (/^AUTH PLAIN /.test(line)) {
          captured.auth = Buffer.from(line.slice(11), "base64").toString("utf8");
          say(opt.rejectAuth ? "535 5.7.8 Username and Password not accepted" : "235 2.7.0 Accepted");
        } else if (/^MAIL FROM:/.test(line)) { captured.from = line.slice(10); say("250 OK"); }
        else if (/^RCPT TO:/.test(line)) { captured.rcpt.push(line.slice(8)); say("250 OK"); }
        else if (line === "DATA") { inData = true; data = ""; say("354 go"); }
        else if (line === "QUIT") { say("221 bye"); sock.end(); }
        else say("500 unknown");
      }
    };
    sock.on("data", onData);
    sock.on("error", () => {});
  };
  const server = mode === "tls" ? tls.createServer({ key: CERT!.key, cert: CERT!.cert }, handle) : net.createServer(handle);
  return new Promise<{ port: number; captured: Captured; close: () => void }>((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve({ port: (server.address() as net.AddressInfo).port, captured, close: () => server.close() })));
}

const mail = { subject: "New visit booking – Priya (SV-1)", text: "Hello\n.leading dot", html: "<p>Hi</p>", messageId: "SV-1@example.com" };
const base = (port: number, security: "none" | "tls" | "starttls") => ({
  host: "localhost", port, security, user: "sender@example.com", pass: "abcdefghijklmnop",
  from: "Swarnavihar Website <sender@example.com>", to: ["a@example.com", "b@example.com"], ca: CERT?.cert, timeoutMs: 5000,
});

test("smtp: helpers", () => {
  assert.equal(addressOf("Swarnavihar <x@y.com>"), "x@y.com");
  assert.equal(addressOf("x@y.com"), "x@y.com");
  assert.equal(encodeHeader("plain ascii"), "plain ascii");
  assert.match(encodeHeader("New – Priya"), /^=\?UTF-8\?B\?.+\?=$/);
  assert.equal(dotStuff("a\r\n.b\r\n..c"), "a\r\n..b\r\n...c");
  const msg = buildMessage({ ...mail, from: "Site <s@x.com>", to: ["t@x.com"], replyTo: "v@x.com\r\nBcc: evil@x.com" });
  assert.ok(!/\r\nBcc:/i.test(msg), "header injection blocked");
  assert.match(msg, /\r\nMIME-Version: 1\.0\r\n/);
  assert.match(msg, /Content-Type: multipart\/alternative/);
});

test("smtp: plain mode sends the full message (tests only)", async () => {
  const s = await fakeSmtp("none");
  try {
    await sendSmtpMail(base(s.port, "none"), { ...mail, replyTo: "family@example.com" });
    assert.equal(s.captured.auth, "\0sender@example.com\0abcdefghijklmnop");
    assert.equal(s.captured.from, "<sender@example.com>");
    assert.deepEqual(s.captured.rcpt, ["<a@example.com>", "<b@example.com>"]);
    assert.match(s.captured.data!, /Reply-To: <family@example\.com>/);
    assert.match(s.captured.data!, /Message-ID: <SV-1@example\.com>/);
    assert.deepEqual(s.captured.commands, ["EHLO", "AUTH", "MAIL", "RCPT", "RCPT", "DATA", "QUIT"]);
  } finally { s.close(); }
});

test("smtp: refuses unencrypted SMTP in production", async () => {
  await assert.rejects(sendSmtpMail({ ...base(1, "none"), production: true }, mail), /not allowed in production/);
});

test("smtp: implicit TLS (port 465 style)", { skip: !CERT && "openssl not available" }, async () => {
  const s = await fakeSmtp("tls");
  try {
    await sendSmtpMail(base(s.port, "tls"), mail);
    assert.ok(s.captured.tlsUsed);
    assert.ok(s.captured.data);
  } finally { s.close(); }
});

test("smtp: STARTTLS upgrade before login (port 587 style)", { skip: !CERT && "openssl not available" }, async () => {
  const s = await fakeSmtp("starttls");
  try {
    await sendSmtpMail(base(s.port, "starttls"), mail);
    assert.ok(s.captured.tlsUsed);
    assert.deepEqual(s.captured.commands, ["EHLO", "STARTTLS", "EHLO", "AUTH", "MAIL", "RCPT", "RCPT", "DATA", "QUIT"]);
  } finally { s.close(); }
});

test("smtp: won't send the password if the server doesn't offer STARTTLS", async () => {
  const s = await fakeSmtp("starttls", { noStarttls: true });
  try {
    await assert.rejects(sendSmtpMail(base(s.port, "starttls"), mail), /does not offer STARTTLS/);
    assert.equal(s.captured.auth, undefined);
  } finally { s.close(); }
});

test("smtp: wrong password is reported clearly", async () => {
  const s = await fakeSmtp("none", { rejectAuth: true });
  try {
    await assert.rejects(sendSmtpMail(base(s.port, "none"), mail), /AUTH rejected: 535/);
  } finally { s.close(); }
});

test("smtp: unreachable server fails instead of hanging", async () => {
  await assert.rejects(sendSmtpMail({ ...base(1, "none"), timeoutMs: 2000 }, mail));
});

test("smtp: lead email content and reply-to", async () => {
  const s = await fakeSmtp("none");
  const r: LeadRecord = {
    leadId: "SV-20261116-ABC123", kind: "contact", submittedAt: "2026-11-16 00:20:00 IST", name: "Priya", phone: "9876543210",
    email: "priya@example.com", branch: "wakad", need: "", service: "", date: "", message: "Hello", sourcePage: "/contact/",
    utm: { source: "", medium: "", campaign: "", term: "", content: "" },
  };
  try {
    await sendLeadEmailSmtp(r, false, base(s.port, "none"));
    const body = s.captured.data!;
    assert.match(body, /Reply-To: <priya@example\.com>/);
    assert.match(body, /Message-ID: <SV-20261116-ABC123@example\.com>/);
    const subject = body.match(/Subject: =\?UTF-8\?B\?([^?]+)\?=/)![1];
    assert.match(Buffer.from(subject, "base64").toString("utf8"), /^\[NOT SAVED\] New contact message/);
  } finally { s.close(); }
});

test("config: SMTP settings, defaults and App Password spaces", () => {
  const c = readLeadConfig({ SMTP_HOST: "smtp.gmail.com", SMTP_USER: "me@gmail.com", SMTP_PASS: "abcd efgh ijkl mnop", LEAD_EMAIL_TO: "a@x.com, b@x.com" });
  assert.deepEqual(c.smtp, { host: "smtp.gmail.com", port: 465, security: "tls", user: "me@gmail.com", pass: "abcdefghijklmnop", from: "me@gmail.com", to: ["a@x.com", "b@x.com"] });
  assert.equal(readLeadConfig({ SMTP_HOST: "h", SMTP_PORT: "587", SMTP_USER: "u@x.com", LEAD_EMAIL_TO: "a@x.com" }).smtp?.security, "starttls");
  assert.equal(readLeadConfig({ SMTP_HOST: "h", SMTP_USER: "u@x.com" }).smtp, undefined, "needs a recipient");
  const prod = readLeadConfig({ NODE_ENV: "production", SMTP_HOST: "h", SMTP_SECURE: "none", SMTP_USER: "u@x.com", LEAD_EMAIL_TO: "a@x.com" });
  assert.equal(prod.smtp?.security, "tls", "production never runs unencrypted");
});

test("route: lead is saved by email over SMTP when Sheets isn't configured", async () => {
  const s = await fakeSmtp("none");
  const errors: string[] = [];
  const log = { error: (m: string) => errors.push(m), warn: () => {}, info: () => {} };
  try {
    const config = readLeadConfig({ SMTP_HOST: "127.0.0.1", SMTP_PORT: String(s.port), SMTP_SECURE: "none", SMTP_USER: "u@x.com", SMTP_PASS: "p", LEAD_EMAIL_TO: "team@x.com" });
    const handler = leadRoute("callback", { config, guards: createGuardStores(), log });
    const res = await handler(new Request("http://site/api/leads/callback", {
      method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.9" },
      body: JSON.stringify({ name: "Priya", phone: "9876543210", branch: "wakad", sourcePage: "/" }),
    }));
    const body = await res.json();
    assert.equal(res.status, 200, JSON.stringify(body) + errors.join());
    assert.equal(body.notified, true);
    assert.equal(body.saved, false);
    assert.match(Buffer.from(s.captured.data!.match(/Subject: =\?UTF-8\?B\?([^?]+)/)![1], "base64").toString(), /call-back/i);
  } finally { s.close(); }
});

test("route: SMTP failure with no Sheets is a 502, never a false success", async () => {
  const s = await fakeSmtp("none", { rejectAuth: true });
  const errors: string[] = [];
  const log = { error: (m: string) => errors.push(m), warn: () => {}, info: () => {} };
  try {
    const config = readLeadConfig({ SMTP_HOST: "127.0.0.1", SMTP_PORT: String(s.port), SMTP_SECURE: "none", SMTP_USER: "u@x.com", SMTP_PASS: "bad", LEAD_EMAIL_TO: "team@x.com" });
    const handler = leadRoute("callback", { config, guards: createGuardStores(), log });
    const res = await handler(new Request("http://site/api/leads/callback", {
      method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.10" },
      body: JSON.stringify({ name: "Priya", phone: "9876543210", branch: "wakad", sourcePage: "/" }),
    }));
    assert.equal(res.status, 502);
    assert.ok(errors.some((e) => /SMTP email failed: AUTH rejected: 535/.test(e)));
    assert.ok(!errors.join().includes("bad"), "password never logged");
  } finally { s.close(); }
});
