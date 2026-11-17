import { branches } from "@/content/branches";
import { serviceGroups, services } from "@/content/services";
import { normalisePhone, todayInIndia } from "@/lib/enquiry";
import type { LeadInput, LeadKind } from "./types";

/** Hard caps. The message cap is deliberately small: we don't want detailed medical histories in a spreadsheet. */
export const FIELD_LIMITS = {
  name: 80, phone: 20, email: 120, branch: 40, need: 40, service: 80, date: 10,
  message: 500, sourcePage: 200, utm: 100, submissionId: 64, turnstileToken: 2048, company: 100,
} as const;

// Control characters (except tab/newline in messages) never belong in a lead.
// eslint-disable-next-line no-control-regex
const CONTROL = new RegExp("[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F\\u200B-\\u200F\\u2028\\u2029\\uFEFF]", "g");

function clean(v: unknown, max: number, multiline = false): string {
  if (typeof v !== "string") return "";
  let s = v.replace(CONTROL, "");
  s = multiline ? s.replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n") : s.replace(/\s+/g, " ");
  return s.trim().slice(0, max);
}

/** Reads untrusted JSON into a LeadInput with every field trimmed, stripped and capped. */
export function parseLead(raw: unknown): LeadInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const u = (r.utm && typeof r.utm === "object" ? r.utm : {}) as Record<string, unknown>;
  const L = FIELD_LIMITS;
  return {
    name: clean(r.name, L.name),
    phone: clean(r.phone, L.phone),
    email: clean(r.email, L.email).toLowerCase(),
    branch: clean(r.branch, L.branch),
    need: clean(r.need, L.need),
    service: clean(r.service, L.service),
    date: clean(r.date, L.date),
    message: clean(r.message, L.message, true),
    sourcePage: clean(r.sourcePage, L.sourcePage),
    utm: {
      source: clean(u.source, L.utm),
      medium: clean(u.medium, L.utm),
      campaign: clean(u.campaign, L.utm),
      term: clean(u.term, L.utm),
      content: clean(u.content, L.utm),
    },
    submissionId: clean(r.submissionId, L.submissionId),
    turnstileToken: clean(r.turnstileToken, L.turnstileToken),
    company: clean(r.company, L.company),
  };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const branchIds = new Set(branches.map((b) => b.id));
const needKeys = new Set<string>(serviceGroups.map((g) => g.key));
const serviceSlugs = new Set(services.map((s) => s.slug));

export type LeadErrors = Partial<Record<"name" | "phone" | "email" | "date" | "message" | "branch" | "need" | "service" | "sourcePage", string>>;

/** Validation rules per form. Messages are written for the visitor and shown next to the field. */
export function validateLead(kind: LeadKind, input: LeadInput, now = new Date()): LeadErrors {
  const e: LeadErrors = {};
  if (input.name.length < 2) e.name = "Enter your name so we know who to ask for.";

  const phoneOk = /^[6-9]\d{9}$/.test(normalisePhone(input.phone));
  const emailOk = EMAIL.test(input.email);

  if (kind === "contact") {
    if (!input.phone && !input.email) e.phone = "Give us a mobile number or an email address so we can reply.";
    else {
      if (input.phone && !phoneOk) e.phone = "Enter a 10-digit Indian mobile number, for example 98765 43210.";
      if (input.email && !emailOk) e.email = "Enter a valid email address.";
    }
    if (input.message.length < 5) e.message = "Write a short message so we know how to help.";
  } else {
    if (!phoneOk) e.phone = "Enter a 10-digit Indian mobile number, for example 98765 43210.";
    if (input.email && !emailOk) e.email = "Enter a valid email address.";
  }

  if (kind === "schedule-visit" && input.date) {
    const today = todayInIndia(now);
    const max = todayInIndia(new Date(now.getTime() + 366 * 24 * 3600 * 1000));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date) || Number.isNaN(Date.parse(input.date))) e.date = "Choose a date from the calendar.";
    else if (input.date < today) e.date = "Choose today or a later date.";
    else if (input.date > max) e.date = "Choose a date within the next year.";
  }

  // Values that come from our own select lists must be ones we know.
  if (input.branch && !branchIds.has(input.branch)) e.branch = "Choose a home from the list.";
  if (input.need && !needKeys.has(input.need)) e.need = "Choose an option from the list.";
  if (input.service && !serviceSlugs.has(input.service)) e.service = "Unknown service.";
  if (input.sourcePage && !input.sourcePage.startsWith("/")) e.sourcePage = "Invalid page.";
  return e;
}

export const branchLabel = (id: string) => {
  const b = branches.find((x) => x.id === id);
  return b ? `${b.house.value}, ${b.locality}` : "";
};
export const needLabel = (key: string) => serviceGroups.find((g) => g.key === key)?.title ?? "";
export const serviceLabel = (slug: string) => services.find((s) => s.slug === slug)?.title ?? "";
