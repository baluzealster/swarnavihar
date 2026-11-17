import type { MetadataRoute } from "next";
import { LIVE_PAGES } from "@/lib/routes";
import { absoluteUrl } from "@/lib/schema";

/**
 * /sitemap.xml: every built, indexable page, generated from src/lib/routes.ts so it can't
 * drift from the site. No lastmod: a date we can't stand behind is worse than none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return LIVE_PAGES.map((path) => ({ url: absoluteUrl(path) }));
}
