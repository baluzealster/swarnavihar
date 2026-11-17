import { getAccessToken, SHEET_COLUMNS } from "./google-sheets";
import { SHEET_TABS } from "./types";

/**
 * One-off sheet preparation: creates any missing tabs, writes the header row and freezes it.
 * Safe to run more than once. Used by `npm run leads:setup-sheet`.
 */
export async function setupLeadSheet(opts: {
  spreadsheetId: string; clientEmail: string; privateKey: string; tokenUrl: string; sheetsBase: string; fetchImpl: typeof fetch;
}): Promise<{ created: string[]; headed: string[] }> {
  const token = await getAccessToken(opts);
  const base = `${opts.sheetsBase}/${encodeURIComponent(opts.spreadsheetId)}`;
  const auth = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const meta = await opts.fetchImpl(`${base}?fields=sheets.properties(sheetId,title)`, { headers: auth });
  if (!meta.ok) throw new Error(`Could not open the spreadsheet (${meta.status}). Is it shared with ${opts.clientEmail}?`);
  const existing = ((await meta.json()) as { sheets?: { properties: { sheetId: number; title: string } }[] }).sheets ?? [];
  const ids = new Map(existing.map((s) => [s.properties.title, s.properties.sheetId]));

  const wanted = Object.values(SHEET_TABS);
  const missing = wanted.filter((t) => !ids.has(t));
  if (missing.length) {
    const res = await opts.fetchImpl(`${base}:batchUpdate`, {
      method: "POST", headers: auth,
      body: JSON.stringify({ requests: missing.map((title) => ({ addSheet: { properties: { title } } })) }),
    });
    if (!res.ok) throw new Error(`Could not create tabs (${res.status}).`);
    const replies = ((await res.json()) as { replies?: { addSheet?: { properties: { sheetId: number; title: string } } }[] }).replies ?? [];
    for (const r of replies) if (r.addSheet) ids.set(r.addSheet.properties.title, r.addSheet.properties.sheetId);
  }

  const lastCol = String.fromCharCode(64 + SHEET_COLUMNS.length);
  const headed: string[] = [];
  for (const tab of wanted) {
    const range = encodeURIComponent(`'${tab}'!A1:${lastCol}1`);
    const res = await opts.fetchImpl(`${base}/values/${range}?valueInputOption=RAW`, {
      method: "PUT", headers: auth, body: JSON.stringify({ values: [SHEET_COLUMNS] }),
    });
    if (!res.ok) throw new Error(`Could not write headers on "${tab}" (${res.status}).`);
    headed.push(tab);
  }

  const freeze = await opts.fetchImpl(`${base}:batchUpdate`, {
    method: "POST", headers: auth,
    body: JSON.stringify({
      requests: wanted.map((t) => ({
        updateSheetProperties: { properties: { sheetId: ids.get(t), gridProperties: { frozenRowCount: 1 } }, fields: "gridProperties.frozenRowCount" },
      })),
    }),
  });
  if (!freeze.ok) throw new Error(`Could not freeze header rows (${freeze.status}).`);
  return { created: missing, headed };
}
