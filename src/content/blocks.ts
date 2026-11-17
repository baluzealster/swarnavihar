import type { FactStatus } from "./types";

/**
 * Long-form content (articles, information pages) as plain data, so it can be tested
 * like the rest of the content. Inline links are written [text](/path/); they render as
 * links only when the page exists (src/lib/routes.ts), otherwise as plain text.
 */
export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string; status?: FactStatus }
  | { type: "ul"; items: string[]; status?: FactStatus }
  | { type: "ol"; items: string[] }
  | { type: "checklist"; items: string[] }
  | { type: "note"; title: string; text: string; tone?: "info" | "warning"; status?: FactStatus }
  | { type: "compare"; columns: [string, string]; rows: { label: string; a: string; b: string }[] }
  | { type: "table"; head: string[]; rows: string[][] };

export const h2 = (text: string): Block => ({ type: "h2", text });
export const h3 = (text: string): Block => ({ type: "h3", text });
export const p = (text: string, status?: FactStatus): Block => ({ type: "p", text, status });
export const ul = (...items: string[]): Block => ({ type: "ul", items });
export const ol = (...items: string[]): Block => ({ type: "ol", items });
export const checklist = (...items: string[]): Block => ({ type: "checklist", items });
export const note = (title: string, text: string, tone: "info" | "warning" = "info", status?: FactStatus): Block =>
  ({ type: "note", title, text, tone, status });

/** All visible text of a block list, for word counts and tests. */
export const blockText = (blocks: Block[]) =>
  blocks
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(". ") : b.type === "compare" ? b.rows.map((r) => `${r.label} ${r.a} ${r.b}`).join(" ") : b.type === "table" ? [b.head, ...b.rows].map((r) => r.join(" ")).join(". ") : ""))
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "");

/** Internal links written inside the text. */
export const blockLinks = (blocks: Block[]) => [...JSON.stringify(blocks).matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]);
