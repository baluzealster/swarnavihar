/**
 * Server-only configuration, read from environment variables at request time.
 * None of these names start with NEXT_PUBLIC_, so Next.js never sends them to the browser.
 */
import type { SmtpSecurity } from "./smtp";

export interface LeadConfig {
  production: boolean;
  sheets?: { spreadsheetId: string; clientEmail: string; privateKey: string };
  resend?: { apiKey: string; from: string; to: string[] };
  /** SMTP takes priority over Resend when both are set. */
  smtp?: { host: string; port: number; security: SmtpSecurity; user?: string; pass?: string; from: string; to: string[] };
  turnstile?: { secret: string };
  endpoints: { googleToken: string; sheets: string; resend: string; turnstile: string };
}

type Env = Record<string, string | undefined>;

const DEFAULT_ENDPOINTS = {
  googleToken: "https://oauth2.googleapis.com/token",
  sheets: "https://sheets.googleapis.com/v4/spreadsheets",
  resend: "https://api.resend.com/emails",
  turnstile: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
};

/** Private keys pasted into Vercel usually arrive with literal "\n" sequences. */
export const normalisePrivateKey = (k: string) => k.replace(/\\n/g, "\n").trim();

export function readLeadConfig(env: Env = process.env): LeadConfig {
  const production = env.NODE_ENV === "production" && env.VERCEL_ENV !== "preview" && env.VERCEL_ENV !== "development";

  const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  const clientEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ? normalisePrivateKey(env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) : "";
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.LEAD_EMAIL_FROM?.trim();
  const to = (env.LEAD_EMAIL_TO ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const secret = env.TURNSTILE_SECRET_KEY?.trim();

  const smtpHost = env.SMTP_HOST?.trim();
  const smtpPort = Number(env.SMTP_PORT?.trim() || 465);
  const sec = env.SMTP_SECURE?.trim().toLowerCase();
  const security: SmtpSecurity =
    sec === "starttls" || sec === "tls" || (sec === "none" && !production) ? sec : smtpPort === 465 ? "tls" : "starttls";
  const smtpUser = env.SMTP_USER?.trim() || undefined;
  // Gmail shows App Passwords in groups of four ("abcd efgh ijkl mnop"); spaces aren't part of it.
  const smtpPass = env.SMTP_PASS ? env.SMTP_PASS.replace(/\s+/g, "") : undefined;
  const smtpFrom = from || smtpUser;

  // Endpoint overrides exist only for automated tests, and are ignored in production.
  const endpoints = { ...DEFAULT_ENDPOINTS };
  if (!production && env.LEADS_TEST_ENDPOINT_BASE) {
    const base = env.LEADS_TEST_ENDPOINT_BASE.replace(/\/$/, "");
    Object.assign(endpoints, {
      googleToken: `${base}/google/token`,
      sheets: `${base}/sheets`,
      resend: `${base}/resend/emails`,
      turnstile: `${base}/turnstile/siteverify`,
    });
  }

  return {
    production,
    sheets: spreadsheetId && clientEmail && privateKey ? { spreadsheetId, clientEmail, privateKey } : undefined,
    resend: apiKey && from && to.length ? { apiKey, from, to } : undefined,
    smtp:
      smtpHost && smtpFrom && to.length && Number.isInteger(smtpPort) && smtpPort > 0
        ? { host: smtpHost, port: smtpPort, security, user: smtpUser, pass: smtpPass, from: smtpFrom, to }
        : undefined,
    turnstile: secret ? { secret } : undefined,
    endpoints,
  };
}
