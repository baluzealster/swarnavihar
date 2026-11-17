/**
 * Integration tests: the real route handlers (as used by /api/leads/*) talking to fake
 * Google, Resend and Turnstile services. No network access, no real credentials.
 */
import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { readLeadConfig } from "../src/lib/leads/config";
import { clearTokenCache } from "../src/lib/leads/google-sheets";
import { createGuardStores, type GuardStores } from "../src/lib/leads/guards";
import { leadRoute } from "../src/lib/leads/http";
import type { LeadKind } from "../src/lib/leads/types";

const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048, privateKeyEncoding: { type: "pkcs8", format: "pem" }, publicKeyEncoding: { type: "spki", format: "pem" } });

interface Fake { sheets: number; resend: number; turnstile: number; turnstileOk: boolean; rows: { tab: string; values: string[] }[]; emails: Record<string, unknown>[] }
let fake: Fake;
let guards: GuardStores;
const logs: string[] = [];
const log = { error: (m: string) => logs.push(`E ${m}`), warn: (m: string) => logs.push(`W ${m}`), info: () => {} };

function fakeFetch(): typeof fetch {
  return (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    if (url.endsWith("/google/token")) return Response.json({ access_token: "tok", expires_in: 3600 });
    if (url.includes("/sheets/")) {
      if (fake.sheets >= 500) return new Response("err", { status: fake.sheets });
      const tab = decodeURIComponent(url.split("/values/")[1].split(":append")[0]).replace(/^'|'!A1$/g, "");
      fake.rows.push({ tab, values: JSON.parse(String(init?.body)).values[0] });
      return Response.json({ updates: { updatedRows: 1 } });
    }
    if (url.endsWith("/resend/emails")) {
      if (fake.resend >= 500) return new Response("err", { status: fake.resend });
      fake.emails.push({ ...JSON.parse(String(init?.body)), idem: (init?.headers as Record<string, string>)["Idempotency-Key"] });
      return Response.json({ id: "email_1" });
    }
    if (url.endsWith("/turnstile/siteverify")) { fake.turnstile++; return Response.json({ success: fake.turnstileOk }); }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;
}

const ENV = {
  NODE_ENV: "development",
  LEADS_TEST_ENDPOINT_BASE: "http://fake",
  GOOGLE_SHEETS_SPREADSHEET_ID: "sheet123",
  GOOGLE_SERVICE_ACCOUNT_EMAIL: "bot@proj.iam.gserviceaccount.com",
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: privateKey.replace(/\n/g, "\\n"),
  RESEND_API_KEY: "re_test",
  LEAD_EMAIL_FROM: "Swarnavihar Website <leads@example.com>",
  LEAD_EMAIL_TO: "admissions@example.com",
  TURNSTILE_SECRET_KEY: "secret",
};

function post(kind: LeadKind, body: unknown, env: Record<string, string> = ENV, opts: { ip?: string; raw?: string; type?: string } = {}) {
  const handler = leadRoute(kind, { config: readLeadConfig(env), fetchImpl: fakeFetch(), guards, log, now: () => new Date("2026-11-15T16:47:05Z") });
  return handler(new Request(`http://site/api/leads/${kind}`, {
    method: "POST",
    headers: { "content-type": opts.type ?? "application/json", "x-forwarded-for": `${opts.ip ?? "1.1.1.1"}, 10.0.0.1` },
    body: opts.raw ?? JSON.stringify(body),
  }));
}

const visit = { name: "Priya Kulkarni", phone: "+91 98765 43210", branch: "wakad", date: "2026-11-20", message: "Mother, 82", sourcePage: "/old-age-home-wakad-pune/", utm: { source: "google", medium: "cpc", campaign: "wakad" }, submissionId: "sub-1", turnstileToken: "tok" };

beforeEach(() => {
  fake = { sheets: 200, resend: 200, turnstile: 0, turnstileOk: true, rows: [], emails: [] };
  guards = createGuardStores();
  logs.length = 0;
  clearTokenCache();
});

test("each form writes to its own tab and sends one email", async () => {
  const cases: [LeadKind, string, Record<string, unknown>][] = [
    ["schedule-visit", "Visit Bookings", visit],
    ["callback", "Callback Requests", { ...visit, date: "", submissionId: "s2", phone: "9876543211" }],
    ["enquiry", "Leads", { ...visit, date: "", service: "dementia-care-in-pune", need: "medical", submissionId: "s3", phone: "9876543212" }],
    ["contact", "Contact Messages", { name: "Ravi", email: "ravi@example.com", message: "Do you have a home in Aundh?", submissionId: "s4", turnstileToken: "tok" }],
  ];
  for (const [kind, tab, body] of cases) {
    const res = await post(kind, body);
    const json = await res.json();
    assert.equal(res.status, 200, `${kind}: ${JSON.stringify(json)}`);
    assert.match(json.leadId, /^SV-20261115-/);
    assert.equal(json.saved, true);
    assert.equal(json.notified, true);
    assert.equal(fake.rows.at(-1)!.tab, tab);
    assert.equal(fake.rows.at(-1)!.values[0], `'${json.leadId}`);
    assert.equal(res.headers.get("cache-control"), "no-store");
  }
  assert.equal(fake.emails.length, 4);
  assert.equal(fake.turnstile, 4);
  const v = fake.rows[0].values;
  assert.equal(v[1], "'2026-11-15 22:17:05 IST");
  assert.equal(v[5], "'9876543210");
  assert.equal(v[9], "'2026-11-20");
  assert.equal(v[11], "'/old-age-home-wakad-pune/");
  assert.equal(v[12], "'google");
  assert.equal((fake.emails[3] as { reply_to?: string }).reply_to, "ravi@example.com");
  assert.equal((fake.emails[0] as { idem: string }).idem, (await Promise.resolve(fake.rows[0].values[0])).slice(1));
});

test("Sheets down, email works → success, and the email says the lead wasn't saved", async () => {
  fake.sheets = 503;
  const res = await post("schedule-visit", visit);
  const json = await res.json();
  assert.equal(res.status, 200);
  assert.deepEqual([json.saved, json.notified], [false, true]);
  assert.match(String(fake.emails[0].subject), /^\[NOT SAVED\]/);
  assert.ok(logs.some((l) => l.includes("Google Sheets failed")));
});

test("email down, Sheets works → success, failure logged", async () => {
  fake.resend = 500;
  const json = await (await post("schedule-visit", visit)).json();
  assert.deepEqual([json.ok, json.saved, json.notified], [true, true, false]);
  assert.ok(logs.some((l) => l.includes("Resend failed") && l.includes("saved in Sheets")));
});

test("both down → 502, never reported as success", async () => {
  fake.sheets = 500;
  fake.resend = 500;
  const res = await post("schedule-visit", visit);
  assert.equal(res.status, 502);
  assert.equal((await res.json()).ok, false);
  assert.ok(logs.some((l) => l.includes("NOT DELIVERED")));
  // ...and a retry with the same submission id is allowed to try again.
  fake.sheets = 200;
  assert.equal((await post("schedule-visit", visit)).status, 200);
});

test("nothing configured → 503 not_configured", async () => {
  const res = await post("callback", { ...visit, date: "" }, { NODE_ENV: "development" });
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error, "not_configured");
});

test("only email configured is enough", async () => {
  const { GOOGLE_SHEETS_SPREADSHEET_ID: _s, ...emailOnly } = ENV;
  const json = await (await post("callback", { ...visit, date: "" }, emailOnly)).json();
  assert.deepEqual([json.ok, json.saved, json.notified], [true, false, true]);
});

test("Turnstile failure → 403 and nothing stored", async () => {
  fake.turnstileOk = false;
  const res = await post("schedule-visit", visit);
  assert.equal(res.status, 403);
  assert.equal(fake.rows.length + fake.emails.length, 0);
});

test("production without a Turnstile secret refuses submissions", async () => {
  const { TURNSTILE_SECRET_KEY: _t, ...env } = ENV;
  const res = await post("schedule-visit", visit, { ...env, NODE_ENV: "production" });
  assert.equal(res.status, 503);
  assert.equal(fake.rows.length, 0);
});

test("invalid input → 422 with field messages; nothing stored", async () => {
  const res = await post("schedule-visit", { ...visit, phone: "12", date: "2020-01-01", branch: "nowhere" });
  const json = await res.json();
  assert.equal(res.status, 422);
  assert.ok(json.fields.phone && json.fields.date && json.fields.branch);
  assert.equal(fake.rows.length, 0);
});

test("same submission id twice → same lead id, one row, one email", async () => {
  const a = await (await post("schedule-visit", visit)).json();
  const b = await (await post("schedule-visit", visit)).json();
  assert.equal(a.leadId, b.leadId);
  assert.equal(fake.rows.length, 1);
  assert.equal(fake.emails.length, 1);
});

test("double click with a new submission id → treated as duplicate, not stored twice", async () => {
  const a = await (await post("schedule-visit", visit)).json();
  const b = await (await post("schedule-visit", { ...visit, submissionId: "sub-2" })).json();
  assert.equal(b.duplicate, true);
  assert.equal(b.leadId, a.leadId);
  assert.equal(fake.rows.length, 1);
});

test("rate limit: 9th request from one IP in 10 minutes → 429", async () => {
  for (let i = 0; i < 8; i++) {
    const r = await post("callback", { ...visit, date: "", phone: `98765432${10 + i}`, submissionId: `r${i}` });
    assert.equal(r.status, 200);
  }
  assert.equal((await post("callback", { ...visit, date: "", phone: "9876543299", submissionId: "r9" })).status, 429);
  assert.equal((await post("callback", { ...visit, date: "", phone: "9876543298", submissionId: "r10" }, ENV, { ip: "2.2.2.2" })).status, 200);
});

test("honeypot → 200 but nothing stored or sent", async () => {
  const res = await post("callback", { ...visit, company: "Spam Inc" });
  assert.equal(res.status, 200);
  assert.equal(fake.rows.length + fake.emails.length + fake.turnstile, 0);
});

test("transport errors: wrong content type, bad JSON, oversized body", async () => {
  assert.equal((await post("callback", visit, ENV, { type: "text/plain" })).status, 415);
  assert.equal((await post("callback", null, ENV, { raw: "{not json" })).status, 400);
  assert.equal((await post("callback", null, ENV, { raw: JSON.stringify({ ...visit, message: "x".repeat(20000) }) })).status, 413);
});

test("two identical requests at the same instant → one row, one email, same lead id", async () => {
  const [a, b] = await Promise.all([post("schedule-visit", visit), post("schedule-visit", visit)]);
  const [ja, jb] = [await a.json(), await b.json()];
  assert.equal(a.status, 200);
  assert.equal(b.status, 200);
  assert.equal(ja.leadId, jb.leadId);
  assert.equal(fake.rows.length, 1);
  assert.equal(fake.emails.length, 1);
  assert.equal(fake.turnstile, 1, "the token is verified once");
});
