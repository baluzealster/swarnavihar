import { normalisePhone } from "@/lib/enquiry";
import { readLeadConfig, type LeadConfig } from "./config";
import { appendLeadToSheet } from "./google-sheets";
import { defaultGuards, type GuardStores } from "./guards";
import { istTimestamp, newLeadId } from "./ids";
import { sendLeadEmail } from "./resend";
import { sendLeadEmailSmtp } from "./smtp";
import { verifyTurnstile } from "./turnstile";
import type { LeadKind, LeadRecord, LeadResult } from "./types";
import { parseLead, validateLead } from "./validate";

export interface PipelineDeps {
  config?: LeadConfig;
  fetchImpl?: typeof fetch;
  now?: () => Date;
  guards?: GuardStores;
  log?: Pick<Console, "error" | "warn" | "info">;
  /** Tests only: e.g. a trusted certificate for a local fake SMTP server. */
  smtpOverrides?: { ca?: string; timeoutMs?: number };
}

const fail = (status: number, body: LeadResult["body"]): LeadResult => ({ status, body });

/**
 * The submission workflow, in order:
 *  1. receive  2. validate + sanitise  3. verify Turnstile  4. rate limit + duplicate protection
 *  5. Lead ID  6. Google Sheets  7. email (SMTP or Resend)  8. failures handled independently  9. clear response.
 * A lead is only reported as successful if it reached at least one of Sheets or email.
 */
export async function processLead(kind: LeadKind, raw: unknown, ip: string, deps: PipelineDeps = {}): Promise<LeadResult> {
  const guards = deps.guards ?? defaultGuards;
  // Two identical requests at the same moment (a double click): the second waits for the first
  // and returns the same lead, instead of racing it into a second row.
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const key = typeof r.submissionId === "string" && r.submissionId ? `${kind}:${r.submissionId}` : "";
  if (key) {
    const running = guards.inFlight.get(key);
    if (running) {
      const first = (await running) as LeadResult;
      return first.status === 200 ? { status: 200, body: { ...first.body, duplicate: true } } : first;
    }
    const p = runLead(kind, raw, ip, deps);
    guards.inFlight.set(key, p);
    try {
      return await p;
    } finally {
      guards.inFlight.delete(key);
    }
  }
  return runLead(kind, raw, ip, deps);
}

async function runLead(kind: LeadKind, raw: unknown, ip: string, deps: PipelineDeps): Promise<LeadResult> {
  const config = deps.config ?? readLeadConfig();
  const fetchImpl = deps.fetchImpl ?? fetch;
  const now = deps.now?.() ?? new Date();
  const t = now.getTime();
  const guards = deps.guards ?? defaultGuards;
  const log = deps.log ?? console;

  // 2. Validate and sanitise.
  const input = parseLead(raw);

  // Honeypot: answer like a success so bots move on, but store and send nothing.
  if (input.company) return { status: 200, body: { ok: true } };

  // A retry of the same form fill gets the first answer back, without a second lead.
  if (input.submissionId) {
    const previous = guards.bySubmission.get(`${kind}:${input.submissionId}`, t);
    if (previous) return previous as LeadResult;
  }

  const errors = validateLead(kind, input, now);
  if (Object.keys(errors).length) {
    return fail(422, { ok: false, error: "invalid", message: "Please check the highlighted fields.", fields: errors as Record<string, string> });
  }

  // 4a. Rate limit before calling any paid or external service.
  if (guards.perIp.hit(ip, t)) {
    return fail(429, { ok: false, error: "too_many_requests", message: "Too many requests from your connection. Please call or WhatsApp us instead." });
  }

  // 3. Turnstile. Required in production; skipped with a warning in development if no secret is set.
  if (config.turnstile) {
    const v = await verifyTurnstile(input.turnstileToken, ip, {
      secret: config.turnstile.secret, endpoint: config.endpoints.turnstile, fetchImpl, idempotencyKey: input.submissionId || undefined,
    });
    if (!v.success) {
      return fail(403, { ok: false, error: "verification_failed", message: "We couldn't confirm you're not a robot. Please try again, or call or WhatsApp us." });
    }
  } else if (config.production) {
    log.error("[leads] TURNSTILE_SECRET_KEY is not set in production. Refusing submissions.");
    return fail(503, { ok: false, error: "not_configured", message: "Online requests are temporarily unavailable. Please call or WhatsApp us." });
  } else {
    log.warn("[leads] Turnstile not configured: skipping bot check (development only).");
  }

  if (!config.sheets && !config.resend && !config.smtp) {
    log.error("[leads] Neither Google Sheets nor email (SMTP or Resend) is configured.");
    return fail(503, { ok: false, error: "not_configured", message: "Online requests aren't connected yet. Please call or WhatsApp us." });
  }

  // 4b. Same person, same form, a few seconds apart: a double click, not a new lead.
  const phone = normalisePhone(input.phone);
  const contactKey = `${kind}:${phone || input.email}`;
  const earlier = guards.byContact.get(contactKey, t);
  if (earlier) return { status: 200, body: { ok: true, leadId: earlier, duplicate: true } };

  // 5. Lead ID and record.
  const record: LeadRecord = {
    leadId: newLeadId(now),
    kind,
    submittedAt: istTimestamp(now),
    name: input.name,
    phone: phone && /^[6-9]\d{9}$/.test(phone) ? phone : "",
    email: input.email,
    branch: input.branch,
    need: input.need,
    service: input.service,
    date: kind === "schedule-visit" ? input.date : "",
    message: input.message,
    sourcePage: input.sourcePage,
    utm: input.utm,
  };

  // 6. Sheets. 7. Email. 8. Each failure is handled on its own.
  let saved = false;
  if (config.sheets) {
    try {
      await appendLeadToSheet(record, {
        ...config.sheets, tokenUrl: config.endpoints.googleToken, sheetsBase: config.endpoints.sheets, fetchImpl,
      });
      saved = true;
    } catch (err) {
      log.error(`[leads] ${record.leadId}: Google Sheets failed: ${(err as Error).message}`);
    }
  }

  let notified = false;
  if (config.smtp || config.resend) {
    const via = config.smtp ? "SMTP" : "Resend";
    try {
      if (config.smtp) await sendLeadEmailSmtp(record, saved, { ...config.smtp, production: config.production, ...deps.smtpOverrides });
      else await sendLeadEmail(record, saved, { ...config.resend!, endpoint: config.endpoints.resend, fetchImpl });
      notified = true;
    } catch (err) {
      log.error(`[leads] ${record.leadId}: ${via} email failed: ${(err as Error).message}${saved ? " (lead is saved in Sheets)" : ""}`);
    }
  }

  // 9. Never report success unless the lead reached at least one destination.
  if (!saved && !notified) {
    log.error(`[leads] ${record.leadId}: NOT DELIVERED to Sheets or email.`);
    return fail(502, { ok: false, error: "delivery_failed", message: "Your request didn't go through. Please call or WhatsApp us, and we'll help straight away." });
  }

  const result: LeadResult = { status: 200, body: { ok: true, leadId: record.leadId, saved, notified } };
  guards.byContact.set(contactKey, record.leadId, t);
  if (input.submissionId) guards.bySubmission.set(`${kind}:${input.submissionId}`, result, t);
  return result;
}
