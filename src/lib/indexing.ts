/**
 * Only the live production site may be indexed. Vercel preview and development deployments
 * (and local builds) send "noindex" everywhere, so test copies never compete with the real site.
 */
export function isIndexable(env: Record<string, string | undefined> = process.env) {
  if (env.VERCEL_ENV) return env.VERCEL_ENV === "production";
  return env.NODE_ENV === "production" && env.SEO_ALLOW_INDEXING !== "0";
}
