import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { createVerify, generateKeyPairSync } from "node:crypto";
import { readLeadConfig, normalisePrivateKey } from "../src/lib/leads/config";
import { cell, clearTokenCache, getAccessToken, leadToRow, SHEET_COLUMNS, signServiceAccountJwt } from "../src/lib/leads/google-sheets";
import { SlidingWindowLimiter, TtlCache } from "../src/lib/leads/guards";
import { istTimestamp, newLeadId } from "../src/lib/leads/ids";
import { leadEmail } from "../src/lib/leads/resend";
import { verifyTurnstile } from "../src/lib/leads/turnstile";
import { parseLead, validateLead } from "../src/lib/leads/validate";
import type { LeadRecord } from "../src/lib/leads/types";

const now = new Date("2026-11-15T16:47:05Z"); // 22:17:05 IST

const record = (over: Partial<LeadRecord> = {}): LeadRecord => ({
  leadId: "SV-20261115-ABC123", kind: "schedule-visit", submittedAt: "2026-11-15 22:17:05 IST",
  name: "Priya Kulkarni", phone: "9876543210", email: "", branch: "wakad", need: "", service: "dementia-care-in-pune",
  date: "2026-11-20", message: "Mother, 82", sourcePage: "/old-age-home-wakad-pune/",
  utm: { source: "google", medium: "cpc", campaign: "wakad", term: "", content: "" }, ...over,
});

beforeEach(() => clearTokenCache());

test("IST timestamp and lead id use Indian time", () => {
  assert.equal(istTimestamp(now), "2026-11-15 22:17:05 IST");
  assert.equal(istTimestamp(new Date("2026-11-14T19:00:00Z")), "2026-11-15 00:30:00 IST");
  assert.match(newLeadId(now), /^SV-20261115-[0-9A-HJKMNP-TV-Z]{6}$/);
});

test("lead ids don't collide in practice", () => {
  // 32^6 ≈ 1.07 billion IDs per day. 300 enquiries in one day (far above real volume) has about a
  // 1-in-24,000 chance of any repeat, so this stays reliable; 5,000 at once would fail ~1% of runs.
  const ids = new Set(Array.from({ length: 300 }, () => newLeadId(now)));
  assert.equal(ids.size, 300);
  assert.ok([...ids].every((id) => /^SV-\d{8}-[0-9A-HJKMNP-TV-Z]{6}$/.test(id)));
});

test("parseLead strips control characters, collapses spaces and caps lengths", () => {
  const p = parseLead({ name: " Priya\u0000  ​Kulkarni ", message: "line1\r\n\r\n\r\n\r\nline2", utm: { source: "x".repeat(300) }, phone: 98765, extra: 1 });
  assert.equal(p.name, "Priya Kulkarni");
  assert.equal(p.message, "line1\n\nline2");
  assert.equal(p.utm.source.length, 100);
  assert.equal(p.phone, "");
  assert.equal(parseLead({ message: "x".repeat(2000) }).message.length, 500);
  assert.equal(parseLead(null).name, "");
});

test("validation: phone required for visit/callback/enquiry; contact accepts phone or email", () => {
  const base = parseLead({ name: "Priya", phone: "", message: "Hello there" });
  assert.ok(validateLead("callback", base, now).phone);
  assert.ok(validateLead("contact", base, now).phone, "contact needs one way to reply");
  assert.deepEqual(validateLead("contact", parseLead({ name: "Priya", email: "p@example.com", message: "Hello there" }), now), {});
  assert.ok(validateLead("contact", parseLead({ name: "Priya", email: "bad@", message: "Hello there" }), now).email);
  assert.ok(validateLead("contact", parseLead({ name: "Priya", phone: "9876543210", message: "Hi" }), now).message);
});

test("validation: visit date not in the past, not beyond a year", () => {
  const v = (date: string) => validateLead("schedule-visit", parseLead({ name: "Priya", phone: "9876543210", date }), now);
  assert.deepEqual(v("2026-11-15"), {});
  assert.ok(v("2026-11-14").date);
  assert.ok(v("2028-01-01").date);
  assert.ok(v("15/11/2026").date);
});

test("validation: select values must be ones the site offers", () => {
  const e = validateLead("callback", parseLead({ name: "Priya", phone: "9876543210", branch: "mumbai", need: "x", service: "y", sourcePage: "http://evil" }), now);
  assert.ok(e.branch && e.need && e.service && e.sourcePage);
});

test("service-account JWT is RS256-signed with the right claims", () => {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048, privateKeyEncoding: { type: "pkcs8", format: "pem" }, publicKeyEncoding: { type: "spki", format: "pem" } });
  const jwt = signServiceAccountJwt("bot@proj.iam.gserviceaccount.com", privateKey, "https://oauth2.googleapis.com/token", now.getTime());
  const [h, c, s] = jwt.split(".");
  assert.deepEqual(JSON.parse(Buffer.from(h, "base64url").toString()), { alg: "RS256", typ: "JWT" });
  const claims = JSON.parse(Buffer.from(c, "base64url").toString());
  assert.equal(claims.scope, "https://www.googleapis.com/auth/spreadsheets");
  assert.equal(claims.exp - claims.iat, 3600);
  const v = createVerify("RSA-SHA256");
  v.update(`${h}.${c}`);
  assert.ok(v.verify(publicKey, Buffer.from(s, "base64url")));
});

test("access tokens are cached until close to expiry", async () => {
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048, privateKeyEncoding: { type: "pkcs8", format: "pem" }, publicKeyEncoding: { type: "spki", format: "pem" } });
  let calls = 0;
  const fetchImpl = (async () => { calls++; return Response.json({ access_token: `t${calls}`, expires_in: 3600 }); }) as typeof fetch;
  const opts = { clientEmail: "a@b", privateKey, tokenUrl: "https://t", fetchImpl };
  assert.equal(await getAccessToken({ ...opts, now: 0 }), "t1");
  assert.equal(await getAccessToken({ ...opts, now: 3_000_000 }), "t1");
  assert.equal(await getAccessToken({ ...opts, now: 3_550_000 }), "t2");
});

test("private keys pasted with literal \\n are repaired", () => {
  assert.equal(normalisePrivateKey("-----BEGIN-----\\nabc\\n-----END-----\\n"), "-----BEGIN-----\nabc\n-----END-----");
});

test("sheet row: column order, text cells and formula-injection defence", () => {
  const row = leadToRow(record({ name: "=HYPERLINK(\"http://x\")", message: "+1 call me" }));
  assert.equal(row.length, SHEET_COLUMNS.length);
  assert.equal(row[0], "'SV-20261115-ABC123");
  assert.equal(row[2], "'Visit booking");
  assert.equal(row[3], "'New");
  assert.equal(row[4], `''=HYPERLINK("http://x")`);
  assert.equal(row[7], "'Akshaya Nivas, Wakad");
  assert.equal(row[8], "'Dementia and Alzheimer's care");
  assert.equal(row[10], "''+1 call me");
  assert.equal(row[12], "'google");
  assert.equal(cell(""), "'");
});

test("email: escaped HTML, clear subject, warning when the sheet failed", () => {
  const ok = leadEmail(record({ name: "<script>x</script>" }), true);
  assert.match(ok.subject, /^New visit booking – Akshaya Nivas, Wakad – <script>x<\/script> \(SV-20261115-ABC123\)$/);
  assert.ok(!ok.html.includes("<script>"));
  assert.ok(ok.html.includes("&lt;script&gt;"));
  assert.match(ok.text, /WhatsApp: https:\/\/wa\.me\/919876543210/);
  const notSaved = leadEmail(record(), false);
  assert.match(notSaved.subject, /^\[NOT SAVED\]/);
  assert.match(notSaved.text, /could NOT be saved/);
});

test("Turnstile: success, failure, missing token, network error", async () => {
  const ok = (async (_u: string, init?: RequestInit) => {
    assert.match(String(init?.body), /secret=s&response=tok/);
    return Response.json({ success: true });
  }) as typeof fetch;
  assert.equal((await verifyTurnstile("tok", "1.2.3.4", { secret: "s", endpoint: "https://x", fetchImpl: ok })).success, true);
  const bad = (async () => Response.json({ success: false, "error-codes": ["invalid-input-response"] })) as typeof fetch;
  assert.deepEqual(await verifyTurnstile("tok", "", { secret: "s", endpoint: "https://x", fetchImpl: bad }), { success: false, codes: ["invalid-input-response"] });
  assert.equal((await verifyTurnstile("", "", { secret: "s", endpoint: "https://x", fetchImpl: ok })).success, false);
  const down = (async () => { throw new Error("down"); }) as typeof fetch;
  assert.equal((await verifyTurnstile("tok", "", { secret: "s", endpoint: "https://x", fetchImpl: down })).success, false);
});

test("rate limiter and TTL cache", () => {
  const l = new SlidingWindowLimiter(2, 1000);
  assert.equal(l.hit("a", 0), false);
  assert.equal(l.hit("a", 10), false);
  assert.equal(l.hit("a", 20), true);
  assert.equal(l.hit("a", 1500), false, "window slides");
  const c = new TtlCache<string>(100);
  c.set("k", "v", 0);
  assert.equal(c.get("k", 50), "v");
  assert.equal(c.get("k", 150), undefined);
});

test("config: secrets only from server env; test endpoints ignored in production", () => {
  const env = {
    NODE_ENV: "production", GOOGLE_SHEETS_SPREADSHEET_ID: "sid", GOOGLE_SERVICE_ACCOUNT_EMAIL: "a@b", GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: "k",
    RESEND_API_KEY: "re_x", LEAD_EMAIL_FROM: "Leads <l@x.com>", LEAD_EMAIL_TO: "a@x.com, b@x.com", TURNSTILE_SECRET_KEY: "ts",
    LEADS_TEST_ENDPOINT_BASE: "http://localhost:1",
  };
  const c = readLeadConfig(env);
  assert.equal(c.production, true);
  assert.deepEqual(c.resend?.to, ["a@x.com", "b@x.com"]);
  assert.equal(c.endpoints.sheets, "https://sheets.googleapis.com/v4/spreadsheets");
  assert.equal(readLeadConfig({ ...env, NODE_ENV: "development" }).endpoints.sheets, "http://localhost:1/sheets");
  assert.equal(readLeadConfig({}).sheets, undefined);
  assert.equal(readLeadConfig({ RESEND_API_KEY: "x", LEAD_EMAIL_FROM: "y" }).resend, undefined, "needs at least one recipient");
});

test("sheet setup: creates only missing tabs, writes headers, freezes row 1", async () => {
  const { setupLeadSheet } = await import("../src/lib/leads/sheet-setup");
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048, privateKeyEncoding: { type: "pkcs8", format: "pem" }, publicKeyEncoding: { type: "spki", format: "pem" } });
  const calls: { method: string; url: string; body?: unknown }[] = [];
  const fetchImpl = (async (u: string | URL | Request, init?: RequestInit) => {
    const url = String(u); const method = init?.method ?? "GET";
    const raw = init?.body ? String(init.body) : "";
    calls.push({ method, url, body: raw.startsWith("{") ? JSON.parse(raw) : raw || undefined });
    if (url.includes("/token")) return Response.json({ access_token: "t", expires_in: 3600 });
    if (method === "GET") return Response.json({ sheets: [{ properties: { sheetId: 0, title: "Leads" } }] });
    if (url.endsWith(":batchUpdate") && JSON.stringify(init?.body).includes("addSheet"))
      return Response.json({ replies: ["Callback Requests", "Visit Bookings", "Contact Messages"].map((title, i) => ({ addSheet: { properties: { sheetId: i + 1, title } } })) });
    return Response.json({});
  }) as typeof fetch;
  const r = await setupLeadSheet({ spreadsheetId: "s", clientEmail: "a@b", privateKey, tokenUrl: "https://x/token", sheetsBase: "https://x/sheets", fetchImpl });
  assert.deepEqual(r.created, ["Callback Requests", "Visit Bookings", "Contact Messages"]);
  assert.equal(r.headed.length, 4);
  const puts = calls.filter((c) => c.method === "PUT");
  assert.equal(puts.length, 4);
  assert.deepEqual((puts[0].body as { values: string[][] }).values[0], [...SHEET_COLUMNS]);
  assert.match(puts[0].url, /A1%3AQ1/);
  const freeze = calls.at(-1)!.body as { requests: { updateSheetProperties: { properties: { sheetId: number } } }[] };
  assert.deepEqual(freeze.requests.map((q) => q.updateSheetProperties.properties.sheetId), [0, 1, 2, 3]);
});
