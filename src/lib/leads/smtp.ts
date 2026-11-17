import net from "node:net";
import tls from "node:tls";
import { leadEmail } from "./resend";
import type { LeadRecord } from "./types";

/**
 * A small SMTP client for lead notifications, built on Node's own `net` and `tls`
 * so the site needs no extra npm package. Works with Gmail / Google Workspace
 * (smtp.gmail.com, an App Password) and any standard SMTP provider.
 *
 *  - port 465: TLS from the first byte ("tls")
 *  - port 587: plain connection upgraded with STARTTLS ("starttls"); refuses to log in if the
 *    server doesn't offer STARTTLS
 *  - "none": unencrypted, for automated tests only; refused in production
 */
export type SmtpSecurity = "tls" | "starttls" | "none";

export interface SmtpOptions {
  host: string;
  port: number;
  security: SmtpSecurity;
  user?: string;
  pass?: string;
  from: string;
  to: string[];
  production?: boolean;
  timeoutMs?: number;
  /** Extra trusted certificate, for tests only (never read from the environment). */
  ca?: string;
}

const CRLF = "\r\n";

/** "Name <a@b.com>" → "a@b.com". */
export const addressOf = (s: string) => (s.match(/<([^<>\s]+)>/)?.[1] ?? s).trim();

/** Keep header values on one line, whatever a visitor typed. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

/** RFC 2047 encoded-word, so names and the subject can hold any language safely. */
export const encodeHeader = (s: string) =>
  /^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${Buffer.from(s, "utf8").toString("base64")}?=`;

const encodeAddress = (s: string) => {
  const m = oneLine(s).match(/^(.*?)\s*<([^<>\s]+)>$/);
  if (!m || !m[1]) return `<${addressOf(s)}>`;
  const name = m[1].replace(/^"|"$/g, "");
  return `${/^[\x20-\x7e]*$/.test(name) ? `"${name.replace(/["\\]/g, "")}"` : encodeHeader(name)} <${m[2]}>`;
};

const b64Lines = (s: string) => (Buffer.from(s, "utf8").toString("base64").match(/.{1,76}/g) ?? [""]).join(CRLF);

/** Build the full RFC 5322 message (multipart text + HTML). */
export function buildMessage(
  p: { from: string; to: string[]; replyTo?: string; subject: string; text: string; html: string; messageId: string },
  now = new Date(),
) {
  const boundary = `sv-${p.messageId.replace(/[^a-z0-9]/gi, "")}-${now.getTime().toString(36)}`;
  const headers = [
    `From: ${encodeAddress(p.from)}`,
    `To: ${p.to.map((t) => `<${addressOf(t)}>`).join(", ")}`,
    ...(p.replyTo ? [`Reply-To: <${addressOf(oneLine(p.replyTo))}>`] : []),
    `Subject: ${encodeHeader(oneLine(p.subject))}`,
    `Date: ${now.toUTCString().replace("GMT", "+0000")}`,
    `Message-ID: <${p.messageId}>`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  const part = (type: string, body: string) =>
    [`--${boundary}`, `Content-Type: ${type}; charset=UTF-8`, "Content-Transfer-Encoding: base64", "", b64Lines(body)].join(CRLF);
  return [...headers, "", part("text/plain", p.text), part("text/html", p.html), `--${boundary}--`, ""].join(CRLF);
}

/** Lines starting with "." must be doubled inside DATA (RFC 5321 §4.5.2). */
export const dotStuff = (msg: string) => msg.replace(/(^|\r\n)\./g, "$1..");

class SmtpError extends Error {}

/** Reads complete SMTP replies (single or multi-line) from a socket. */
function replyReader(getSocket: () => net.Socket) {
  let buf = "";
  let waiter: ((r: { code: number; text: string }) => void) | null = null;
  let failer: ((e: Error) => void) | null = null;
  const queue: { code: number; text: string }[] = [];
  let failure: Error | null = null;

  const pump = () => {
    for (;;) {
      const lines = buf.split(CRLF);
      if (lines.length < 2) return;
      const endIdx = lines.findIndex((l, i) => i < lines.length - 1 && /^\d{3}( |$)/.test(l));
      if (endIdx < 0) return;
      const reply = lines.slice(0, endIdx + 1);
      buf = lines.slice(endIdx + 1).join(CRLF);
      const r = { code: Number(reply[endIdx].slice(0, 3)), text: reply.map((l) => l.slice(4)).join("\n") };
      if (waiter) { const w = waiter; waiter = failer = null; w(r); } else queue.push(r);
    }
  };
  const attach = (s: net.Socket) => {
    s.setEncoding("utf8");
    s.on("data", (d: string) => { buf += d; pump(); });
    const onErr = (e: Error) => { failure = e; if (failer) { const f = failer; waiter = failer = null; f(e); } };
    s.on("error", onErr);
    s.on("close", () => onErr(new SmtpError("connection closed by server")));
  };
  attach(getSocket());
  return {
    attach,
    reset: () => { buf = ""; queue.length = 0; },
    next: () =>
      new Promise<{ code: number; text: string }>((resolve, reject) => {
        if (queue.length) return resolve(queue.shift()!);
        if (failure) return reject(failure);
        waiter = resolve; failer = reject;
      }),
  };
}

export async function sendSmtpMail(
  opts: SmtpOptions,
  mail: { subject: string; text: string; html: string; replyTo?: string; messageId: string },
): Promise<void> {
  if (opts.security === "none" && opts.production) throw new SmtpError("unencrypted SMTP is not allowed in production");
  const timeoutMs = opts.timeoutMs ?? 15000;
  const tlsOpts = (extra: tls.ConnectionOptions) => ({ servername: opts.host, minVersion: "TLSv1.2" as const, ...(opts.ca ? { ca: opts.ca } : {}), ...extra });

  let socket: net.Socket =
    opts.security === "tls" ? tls.connect(tlsOpts({ host: opts.host, port: opts.port })) : net.connect({ host: opts.host, port: opts.port });
  const timer = setTimeout(() => socket.destroy(new SmtpError(`timed out after ${timeoutMs} ms`)), timeoutMs);
  const reader = replyReader(() => socket);

  const expect = async (codes: number[], step: string) => {
    const r = await reader.next();
    if (!codes.includes(r.code)) throw new SmtpError(`${step} rejected: ${r.code} ${r.text.split("\n")[0].slice(0, 200)}`);
    return r;
  };
  const cmd = async (line: string, codes: number[], step = line.split(" ")[0]) => {
    socket.write(line + CRLF);
    return expect(codes, step);
  };

  try {
    await expect([220], "greeting");
    const helo = "swarnavihar.website";
    let ehlo = await cmd(`EHLO ${helo}`, [250]);

    if (opts.security === "starttls") {
      if (!/^STARTTLS$/im.test(ehlo.text)) throw new SmtpError("server does not offer STARTTLS; refusing to send the password unencrypted");
      await cmd("STARTTLS", [220]);
      const plain = socket;
      plain.removeAllListeners("data"); plain.removeAllListeners("error"); plain.removeAllListeners("close");
      socket = await new Promise<tls.TLSSocket>((resolve, reject) => {
        const s = tls.connect(tlsOpts({ socket: plain }), () => resolve(s));
        s.once("error", reject);
      });
      reader.reset();
      reader.attach(socket);
      ehlo = await cmd(`EHLO ${helo}`, [250]);
    }

    if (opts.user) {
      const token = Buffer.from(`\0${opts.user}\0${opts.pass ?? ""}`, "utf8").toString("base64");
      await cmd(`AUTH PLAIN ${token}`, [235], "AUTH");
    }

    await cmd(`MAIL FROM:<${addressOf(opts.from)}>`, [250], "MAIL FROM");
    for (const to of opts.to) await cmd(`RCPT TO:<${addressOf(to)}>`, [250, 251], "RCPT TO");
    await cmd("DATA", [354]);
    const msg = buildMessage({ from: opts.from, to: opts.to, ...mail });
    socket.write(dotStuff(msg) + "." + CRLF);
    await expect([250], "message");
    // The message is accepted at this point; a slow or missing QUIT reply doesn't undo that.
    socket.write("QUIT" + CRLF);
    await Promise.race([reader.next().catch(() => undefined), new Promise((r) => setTimeout(r, 2000))]);
  } finally {
    clearTimeout(timer);
    socket.end();
  }
}

/** Lead notification over SMTP: same content as the Resend email. */
export async function sendLeadEmailSmtp(r: LeadRecord, sheetSaved: boolean, opts: SmtpOptions) {
  const { subject, text, html } = leadEmail(r, sheetSaved);
  const domain = addressOf(opts.from).split("@")[1] || "swarnaviharoldagehomes.com";
  await sendSmtpMail(opts, { subject, text, html, replyTo: r.email || undefined, messageId: `${r.leadId}@${domain}` });
}
