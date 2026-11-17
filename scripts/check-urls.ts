/**
 * Launch check for the WordPress → Next.js move: every URL that exists on the old site must
 * either be a built page or redirect (301) to one, so no ranking page turns into a 404.
 *
 *   npm run seo:check-urls   → report
 *   npm run build            → runs automatically; blocks Vercel production builds while any fail
 */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { legacyRedirects } from "../next.config";
import { isLive, normalisePath } from "../src/lib/routes";

export interface UrlCheck { old: string; target: string; ok: boolean; how: "page" | "301" }

export function checkOldUrls(csv = readFileSync(new URL("../docs/phase-2/url-redirect-map.csv", import.meta.url), "utf8")): UrlCheck[] {
  const redirects = new Map(legacyRedirects.map((r) => [normalisePath(r.source), normalisePath(r.destination)]));
  return csv
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => line.split(",")[0])
    // Domain-level redirects (swarnavihar.org/* → .com) are set up in Vercel, not as pages.
    .filter((old) => old.startsWith("/"))
    .map((old) => normalisePath(old))
    .map((old) => {
      const target = redirects.get(old) ?? old;
      return { old, target, ok: isLive(target), how: redirects.has(old) ? "301" : "page" } as UrlCheck;
    });
}

function main() {
  const results = checkOldUrls();
  const missing = results.filter((r) => !r.ok);
  const strict = process.env.VERCEL_ENV === "production" || process.env.STRICT_CONTENT === "1";
  console.log(`Old site URLs: ${results.length}. Served: ${results.length - missing.length}. Not yet served: ${missing.length}.`);
  console.log("Domain redirect swarnavihar.org → swarnaviharoldagehomes.com: set up in Vercel → Domains (see docs/seo/technical-seo.md).");
  if (missing.length) {
    const log = strict ? console.error : console.warn;
    for (const m of missing) log(`   ${m.old}${m.how === "301" ? `  → 301 → ${m.target}` : ""}  (page not built yet)`);
    if (strict) {
      log("\nProduction build blocked: these old URLs would return 404. Build the pages or add redirects in next.config.ts.");
      process.exit(1);
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
