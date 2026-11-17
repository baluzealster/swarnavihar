import { randomBytes } from "node:crypto";

const IST = "Asia/Kolkata";

function istParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return { y: get("year"), m: get("month"), d: get("day"), h: get("hour") === "24" ? "00" : get("hour"), min: get("minute"), s: get("second") };
}

/** "2026-11-15 22:17:05 IST" */
export function istTimestamp(now = new Date()) {
  const p = istParts(now);
  return `${p.y}-${p.m}-${p.d} ${p.h}:${p.min}:${p.s} IST`;
}

// Crockford base32: no I, L, O, U, so IDs are easy to read out over the phone.
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/** "SV-20261115-7K3F9Q": date in IST + 6 random characters (about a billion per day). */
export function newLeadId(now = new Date()) {
  const p = istParts(now);
  const bytes = randomBytes(6);
  let suffix = "";
  for (const b of bytes) suffix += ALPHABET[b % 32];
  return `SV-${p.y}${p.m}${p.d}-${suffix}`;
}
