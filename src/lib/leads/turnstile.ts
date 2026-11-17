/** Cloudflare Turnstile server-side verification. Tokens are single-use and expire after 5 minutes. */
export async function verifyTurnstile(
  token: string,
  ip: string,
  opts: { secret: string; endpoint: string; fetchImpl: typeof fetch; idempotencyKey?: string },
): Promise<{ success: boolean; codes: string[] }> {
  if (!token) return { success: false, codes: ["missing-input-response"] };
  const body = new URLSearchParams({ secret: opts.secret, response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);
  if (opts.idempotencyKey) body.set("idempotency_key", opts.idempotencyKey);
  try {
    const res = await opts.fetchImpl(opts.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { success: false, codes: [`http-${res.status}`] };
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    return { success: data.success === true, codes: data["error-codes"] ?? [] };
  } catch {
    return { success: false, codes: ["network-error"] };
  }
}
