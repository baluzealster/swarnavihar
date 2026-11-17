"use client";

import type { LeadKind, LeadResponseBody } from "@/lib/leads/types";

/** Browser-side helpers for the lead forms. Imports only types from the server code. */

const UTM_KEY = "sv_utm";
const UTM_FIELDS = ["source", "medium", "campaign", "term", "content"] as const;
export type UtmParams = Record<(typeof UTM_FIELDS)[number], string>;

/** First-touch UTM parameters for this browser session (set by SiteTracking on landing). */
export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (!UTM_FIELDS.some((f) => params.get(`utm_${f}`))) return;
    if (sessionStorage.getItem(UTM_KEY)) return;
    const utm = Object.fromEntries(UTM_FIELDS.map((f) => [f, (params.get(`utm_${f}`) ?? "").slice(0, 100)]));
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {
    /* storage unavailable: UTM is optional */
  }
}

export function readUtm(): UtmParams {
  const empty = { source: "", medium: "", campaign: "", term: "", content: "" };
  try {
    return { ...empty, ...JSON.parse(sessionStorage.getItem(UTM_KEY) ?? "{}") };
  } catch {
    return empty;
  }
}

export const newSubmissionId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const LEAD_ENDPOINT: Record<LeadKind, string> = {
  enquiry: "/api/leads/enquiry",
  callback: "/api/leads/callback",
  "schedule-visit": "/api/leads/schedule-visit",
  contact: "/api/leads/contact",
};

export type SubmitOutcome =
  | { state: "sent"; leadId?: string }
  | { state: "invalid"; fields: Record<string, string> }
  | { state: "verification" }
  | { state: "not-connected" }
  | { state: "failed"; message?: string };

export async function submitLead(kind: LeadKind, payload: Record<string, unknown>): Promise<SubmitOutcome> {
  try {
    const res = await fetch(LEAD_ENDPOINT[kind], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, sourcePage: window.location.pathname, utm: readUtm() }),
    });
    const body = (await res.json().catch(() => ({}))) as LeadResponseBody;
    if (res.ok && body.ok) return { state: "sent", leadId: body.leadId };
    if (res.status === 422 && body.fields) return { state: "invalid", fields: body.fields };
    if (res.status === 403) return { state: "verification" };
    if (res.status === 503 || res.status === 404) return { state: "not-connected" };
    return { state: "failed", message: body.message };
  } catch {
    return { state: "failed" };
  }
}
