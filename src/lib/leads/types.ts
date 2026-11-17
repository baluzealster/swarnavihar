/** Lead types shared by the API routes, the Sheets writer and the email notifier. */

export const LEAD_KINDS = ["enquiry", "callback", "schedule-visit", "contact"] as const;
export type LeadKind = (typeof LEAD_KINDS)[number];

export const isLeadKind = (v: unknown): v is LeadKind => typeof v === "string" && (LEAD_KINDS as readonly string[]).includes(v);

/** One spreadsheet, four tabs. Tab names must match the sheet exactly (see docs/lead-management.md). */
export const SHEET_TABS: Record<LeadKind, string> = {
  enquiry: "Leads",
  callback: "Callback Requests",
  "schedule-visit": "Visit Bookings",
  contact: "Contact Messages",
};

export const KIND_LABEL: Record<LeadKind, string> = {
  enquiry: "Enquiry",
  callback: "Call-back request",
  "schedule-visit": "Visit booking",
  contact: "Contact message",
};

export interface Utm {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

/** What the browser sends. Everything is untrusted until parseLead() has cleaned it. */
export interface LeadInput {
  name: string;
  phone: string;
  email: string;
  /** Branch id from content/branches.ts, or "". */
  branch: string;
  /** Care-need group from content/services.ts (living | medical | recovery), or "". */
  need: string;
  /** Service slug from content/services.ts, or "". */
  service: string;
  /** Preferred visit date YYYY-MM-DD (schedule-visit only). */
  date: string;
  message: string;
  /** Path of the page the form was on, e.g. /old-age-home-wakad-pune/ */
  sourcePage: string;
  utm: Utm;
  /** Random id generated per form fill, so retries never create a second lead. */
  submissionId: string;
  turnstileToken: string;
  /** Honeypot. */
  company: string;
}

/** A validated lead, ready to persist. */
export interface LeadRecord extends Omit<LeadInput, "turnstileToken" | "company" | "submissionId"> {
  leadId: string;
  kind: LeadKind;
  /** "2026-11-15 22:17:05 IST" */
  submittedAt: string;
  /** Normalised 10-digit mobile, or "". */
  phone: string;
}

export interface LeadResponseBody {
  ok: boolean;
  leadId?: string;
  error?: "invalid" | "verification_failed" | "too_many_requests" | "not_configured" | "delivery_failed" | "bad_request" | "unsupported_media_type" | "payload_too_large";
  message?: string;
  fields?: Record<string, string>;
  duplicate?: boolean;
  saved?: boolean;
  notified?: boolean;
}

export interface LeadResult {
  status: number;
  body: LeadResponseBody;
}
