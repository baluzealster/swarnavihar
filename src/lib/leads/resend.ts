import { site } from "@/content/site";
import { branchLabel, needLabel, serviceLabel } from "./validate";
import { KIND_LABEL, type LeadRecord } from "./types";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function leadEmail(r: LeadRecord, sheetSaved: boolean) {
  const home = branchLabel(r.branch);
  const care = [needLabel(r.need), serviceLabel(r.service)].filter(Boolean).join(" / ");
  const subject = `New ${KIND_LABEL[r.kind].toLowerCase()}${home ? ` – ${home}` : ""} – ${r.name} (${r.leadId})`;
  const rows: [string, string][] = [
    ["Lead ID", r.leadId],
    ["Submitted", r.submittedAt],
    ["Form", KIND_LABEL[r.kind]],
    ["Name", r.name],
    ["Phone", r.phone],
    ["Email", r.email],
    ["Home", home],
    ["Care need / service", care],
    ["Preferred visit date", r.date],
    ["Message", r.message],
    ["Source page", r.sourcePage],
    ["Campaign", [r.utm.source, r.utm.medium, r.utm.campaign].filter(Boolean).join(" / ")],
  ].filter(([, v]) => v) as [string, string][];

  const warning = sheetSaved
    ? ""
    : "IMPORTANT: this lead could NOT be saved to the Google Sheet. Please add it manually.\n\n";
  const text = warning + rows.map(([k, v]) => `${k}: ${v}`).join("\n") + (r.phone ? `\n\nCall: tel:+91${r.phone}\nWhatsApp: https://wa.me/91${r.phone}` : "");
  const html =
    (sheetSaved ? "" : `<p style="background:#fde8e8;padding:12px;border-left:4px solid #9b2c2c"><strong>This lead could not be saved to the Google Sheet.</strong> Please add it manually.</p>`) +
    `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px">` +
    rows.map(([k, v]) => `<tr><td style="color:#4f5d55;vertical-align:top"><strong>${esc(k)}</strong></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`).join("") +
    `</table>` +
    (r.phone ? `<p><a href="tel:+91${r.phone}">Call ${esc(r.name)}</a> · <a href="https://wa.me/91${r.phone}">WhatsApp</a></p>` : "") +
    `<p style="color:#4f5d55;font-size:13px">Sent by the ${esc(site.name)} website.</p>`;
  return { subject: (sheetSaved ? "" : "[NOT SAVED] ") + subject, text, html };
}

export async function sendLeadEmail(
  r: LeadRecord,
  sheetSaved: boolean,
  opts: { apiKey: string; from: string; to: string[]; endpoint: string; fetchImpl: typeof fetch },
): Promise<void> {
  const { subject, text, html } = leadEmail(r, sheetSaved);
  const res = await opts.fetchImpl(opts.endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
      // Resend ignores repeats with the same key for 24 hours, so a retry never double-emails.
      "Idempotency-Key": r.leadId,
    },
    body: JSON.stringify({
      from: opts.from,
      to: opts.to,
      subject,
      text,
      html,
      ...(r.email ? { reply_to: r.email } : {}),
      tags: [{ name: "form", value: r.kind.replace(/[^a-z0-9_-]/gi, "_") }],
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status}`);
}
