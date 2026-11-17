"use client";

/**
 * GA4 events. Safe to call when GA isn't configured (no measurement id, ad blocker,
 * or before the script loads): calls are queued on dataLayer or dropped.
 * Never send personal data (names, phone numbers, emails, messages) to GA.
 */
type Gtag = (command: "event" | "config" | "js" | "set", ...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export type LeadEventKind = "enquiry" | "callback" | "schedule-visit" | "contact";

/** GA4 event names: generate_lead is GA4's recommended conversion; the kind-specific ones make reports readable. */
export const LEAD_EVENT: Record<LeadEventKind, string> = {
  enquiry: "enquiry_submit",
  callback: "callback_request",
  "schedule-visit": "schedule_visit",
  contact: "contact_submit",
};

export function track(event: string, params: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""));
  if (typeof window.gtag === "function") window.gtag("event", event, clean);
}

/** Fires both the specific event and GA4's generate_lead, so either can be marked as a key event. */
export function trackLead(kind: LeadEventKind, params: { branch?: string; need?: string; service?: string }) {
  const common = { form_type: kind, page_path: window.location.pathname, ...params };
  track(LEAD_EVENT[kind], common);
  track("generate_lead", common);
}
