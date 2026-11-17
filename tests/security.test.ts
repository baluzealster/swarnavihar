import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? files(join(dir, f)) : [join(dir, f)]));

const SECRETS = /process\.env\.(GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY|GOOGLE_SERVICE_ACCOUNT_EMAIL|GOOGLE_SHEETS_SPREADSHEET_ID|RESEND_API_KEY|TURNSTILE_SECRET_KEY|LEAD_EMAIL_TO|LEAD_EMAIL_FROM)/;

test("no client component or browser module reads a server secret", () => {
  const clientFiles = files("src").filter((f) => /\.(tsx?|ts)$/.test(f) && /^["']use client["']/.test(readFileSync(f, "utf8").trimStart()));
  assert.ok(clientFiles.length > 5);
  for (const f of clientFiles) {
    const src = readFileSync(f, "utf8");
    assert.ok(!SECRETS.test(src), `${f} reads a server secret`);
    assert.ok(!/from ["']@\/lib\/leads\/(pipeline|config|google-sheets|resend|turnstile|http)["']/.test(src), `${f} imports server-only lead code`);
  }
});

test("secrets are never exposed with a NEXT_PUBLIC_ prefix", () => {
  for (const f of files("src")) {
    const src = readFileSync(f, "utf8");
    assert.ok(!/NEXT_PUBLIC_[A-Z_]*(SECRET|PRIVATE|API_KEY|RESEND|SERVICE_ACCOUNT)/.test(src), f);
  }
});

test(".env.example has every variable the code reads, and no real values", () => {
  const example = readFileSync(".env.example", "utf8");
  const used = new Set(files("src").flatMap((f) => [...readFileSync(f, "utf8").matchAll(/process\.env\.([A-Z0-9_]+)/g)].map((m) => m[1])));
  const readByConfig = ["GOOGLE_SHEETS_SPREADSHEET_ID", "GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY", "RESEND_API_KEY", "LEAD_EMAIL_FROM", "LEAD_EMAIL_TO", "TURNSTILE_SECRET_KEY"];
  for (const v of [...used, ...readByConfig]) {
    if (["NODE_ENV", "VERCEL_ENV", "LEADS_TEST_ENDPOINT_BASE", "STRICT_CONTENT"].includes(v)) continue;
    assert.match(example, new RegExp(`^${v}=`, "m"), `${v} missing from .env.example`);
  }
  assert.ok(!/BEGIN PRIVATE KEY-----\\n[A-Za-z0-9+/]{40}/.test(example), "looks like a real key");
  assert.ok(!/re_[A-Za-z0-9]{20}/.test(example), "looks like a real Resend key");
});

test(".gitignore keeps real env files out of git", () => {
  assert.match(readFileSync(".gitignore", "utf8"), /^\.env\*\.local$/m);
});
