import type { MetadataRoute } from "next";
import { isIndexable } from "@/lib/indexing";
import { absoluteUrl } from "@/lib/schema";

/** /robots.txt: open on the production site (except the form API); closed on previews. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
