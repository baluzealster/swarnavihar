import { processLead, type PipelineDeps } from "./pipeline";
import type { LeadKind, LeadResult } from "./types";

const MAX_BODY_BYTES = 10_000;

const json = ({ status, body }: LeadResult) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Builds the POST handler for one lead form. Used by the four routes under /api/leads/. */
export function leadRoute(kind: LeadKind, deps?: PipelineDeps) {
  return async function POST(req: Request): Promise<Response> {
    if (!req.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return json({ status: 415, body: { ok: false, error: "unsupported_media_type" } });
    }
    const declared = Number(req.headers.get("content-length") ?? "0");
    if (declared > MAX_BODY_BYTES) return json({ status: 413, body: { ok: false, error: "payload_too_large" } });

    const text = await req.text();
    if (Buffer.byteLength(text) > MAX_BODY_BYTES) return json({ status: 413, body: { ok: false, error: "payload_too_large" } });

    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      return json({ status: 400, body: { ok: false, error: "bad_request" } });
    }
    return json(await processLead(kind, raw, clientIp(req), deps));
  };
}
