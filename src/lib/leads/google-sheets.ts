import { createSign } from "node:crypto";
import { branchLabel, needLabel, serviceLabel } from "./validate";
import { KIND_LABEL, SHEET_TABS, type LeadRecord } from "./types";

/**
 * Google Sheets via a service account, without the googleapis SDK:
 * 1. sign a short-lived JWT with the service account's private key (RS256),
 * 2. exchange it for an OAuth access token,
 * 3. append one row with the Sheets REST API.
 * The scope is limited to spreadsheets, and the sheet is shared only with the service account.
 */

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const b64url = (input: Buffer | string) => Buffer.from(input).toString("base64url");

export function signServiceAccountJwt(clientEmail: string, privateKey: string, tokenUrl: string, now = Date.now()) {
  const iat = Math.floor(now / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(JSON.stringify({ iss: clientEmail, scope: SCOPE, aud: tokenUrl, iat, exp: iat + 3600 }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  return `${header}.${claims}.${signer.sign(privateKey).toString("base64url")}`;
}

let cachedToken: { token: string; expiresAt: number; key: string } | null = null;
export const clearTokenCache = () => {
  cachedToken = null;
};

export async function getAccessToken(opts: {
  clientEmail: string; privateKey: string; tokenUrl: string; fetchImpl: typeof fetch; now?: number;
}): Promise<string> {
  const now = opts.now ?? Date.now();
  if (cachedToken && cachedToken.key === opts.clientEmail && cachedToken.expiresAt - 60_000 > now) return cachedToken.token;

  const assertion = signServiceAccountJwt(opts.clientEmail, opts.privateKey, opts.tokenUrl, now);
  const res = await opts.fetchImpl(opts.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }).toString(),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Google token request failed: ${res.status}`);
  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Google token response had no access_token");
  cachedToken = { token: data.access_token, expiresAt: now + (data.expires_in ?? 3600) * 1000, key: opts.clientEmail };
  return data.access_token;
}

/** Column order for every tab. Keep in sync with docs/lead-management.md. */
export const SHEET_COLUMNS = [
  "Lead ID", "Submitted (IST)", "Form", "Status", "Name", "Phone", "Email", "Home", "Care need / service",
  "Preferred visit date", "Message", "Source page", "UTM source", "UTM medium", "UTM campaign", "UTM term", "UTM content",
] as const;

/**
 * Every cell is written as text: a leading apostrophe stops Sheets from treating input as a
 * formula or number. Visitor-entered values that look like formulas get a visible extra
 * apostrophe, so they stay inert even after a CSV export.
 */
export function cell(value: string) {
  const v = value ?? "";
  return /^[=+\-@\t\r]/.test(v) ? `''${v}` : `'${v}`;
}

export function leadToRow(r: LeadRecord): string[] {
  const care = [needLabel(r.need), serviceLabel(r.service)].filter(Boolean).join(" / ");
  return [
    r.leadId, r.submittedAt, KIND_LABEL[r.kind], "New", r.name, r.phone, r.email, branchLabel(r.branch), care,
    r.date, r.message, r.sourcePage, r.utm.source, r.utm.medium, r.utm.campaign, r.utm.term, r.utm.content,
  ].map(cell);
}

export async function appendLeadToSheet(
  record: LeadRecord,
  opts: { spreadsheetId: string; clientEmail: string; privateKey: string; tokenUrl: string; sheetsBase: string; fetchImpl: typeof fetch },
): Promise<void> {
  const token = await getAccessToken(opts);
  const range = encodeURIComponent(`'${SHEET_TABS[record.kind]}'!A1`);
  const url = `${opts.sheetsBase}/${encodeURIComponent(opts.spreadsheetId)}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await opts.fetchImpl(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ majorDimension: "ROWS", values: [leadToRow(record)] }),
    signal: AbortSignal.timeout(8000),
  });
  if (res.status === 401) clearTokenCache();
  if (!res.ok) throw new Error(`Sheets append failed: ${res.status}`);
}
