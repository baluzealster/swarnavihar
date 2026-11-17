import { test } from "node:test";
import assert from "node:assert/strict";
import { enquiryMessage, normalisePhone, parseEnquiry, todayInIndia, validateEnquiry } from "../src/lib/enquiry";

const now = new Date("2026-11-15T10:00:00+05:30");

test("normalisePhone accepts common Indian formats", () => {
  assert.equal(normalisePhone("98765 43210"), "9876543210");
  assert.equal(normalisePhone("+91 98765-43210"), "9876543210");
  assert.equal(normalisePhone("09876543210"), "9876543210");
});

test("validateEnquiry requires a name and a valid mobile", () => {
  const e = validateEnquiry({ intent: "callback", name: " ", phone: "12345", date: "" }, now);
  assert.ok(e.name);
  assert.ok(e.phone);
  assert.deepEqual(validateEnquiry({ intent: "callback", name: "Priya", phone: "+91 98765 43210", date: "" }, now), {});
});

test("landlines and numbers starting 0-5 are rejected", () => {
  assert.ok(validateEnquiry({ intent: "callback", name: "Priya", phone: "5876543210", date: "" }, now).phone);
});

test("visit date: optional, must not be in the past", () => {
  const base = { intent: "visit" as const, name: "Priya", phone: "9876543210" };
  assert.deepEqual(validateEnquiry({ ...base, date: "" }, now), {});
  assert.deepEqual(validateEnquiry({ ...base, date: "2026-11-15" }, now), {});
  assert.ok(validateEnquiry({ ...base, date: "2026-11-14" }, now).date);
  assert.ok(validateEnquiry({ ...base, date: "not-a-date" }, now).date);
});

test("todayInIndia uses IST, not UTC", () => {
  assert.equal(todayInIndia(new Date("2026-11-14T20:00:00Z")), "2026-11-15");
});

test("parseEnquiry trims, caps lengths and ignores unknown types", () => {
  const p = parseEnquiry({ intent: "visit", name: "  A".padEnd(500, "x"), phone: 98765, date: "2026-12-01", extra: "x" });
  assert.equal(p.name.length, 80);
  assert.equal(p.phone, "");
  assert.equal(p.date, "2026-12-01");
  assert.equal(parseEnquiry({ intent: "callback", date: "2026-12-01" }).date, "");
  assert.equal(parseEnquiry(null).intent, "callback");
});

test("enquiryMessage writes a readable WhatsApp message", () => {
  const msg = enquiryMessage(
    { intent: "visit", name: "Priya", phone: "+91 98765 43210", branch: "baner", need: "", date: "2026-12-01", message: "Mother, 82", company: "" },
    "Ananda Nivas, Baner",
  );
  assert.match(msg, /schedule a visit/);
  assert.match(msg, /Phone: 9876543210/);
  assert.match(msg, /Home: Ananda Nivas, Baner/);
  assert.match(msg, /Preferred date: 2026-12-01/);
});
