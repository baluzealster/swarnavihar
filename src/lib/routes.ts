/**
 * The single list of pages that exist. Navigation, footer, cross-links and sitemap.xml read
 * from here, so the site never links to a page that isn't built yet (a broken internal link
 * wastes crawl budget and frustrates families).
 *
 * Kept as plain strings (only a small list of old-post slugs is imported) so client components can
 * use it without pulling page copy into the browser bundle. tests/seo.test.ts checks it against the content files.
 *
 * To launch a new page: build it, add its path here. It then appears in menus, the footer,
 * related links and sitemap.xml automatically.
 */
import legacySlugs from "@/content/blog/legacy-slugs.json";

const STATIC_PAGES = [
  "/",
  "/service/",
  "/service/assisted-living-care/",
  "/service/nursing-care-in-pune/",
  "/service/bedridden-patient-care-in-pune/",
  "/service/dementia-care-in-pune/",
  "/service/post-stroke-rehabilitation-in-pune/",
  "/service/physiotherapy-rehabilitation-in-pune/",
  "/service/post-operative-care-in-pune/",
  "/service/paralysis-care-centre-in-pune/",
  "/service/hospice-palliative-care-in-pune/",
  "/service/geriatric-care-in-pune/",
  "/branches/",
  "/old-age-home-baner-pune/",
  "/old-age-home-wakad-pune/",
  "/old-age-home-sinhgad-road-pune/",
  "/old-age-home-pimple-nilakh-pune/",
  "/admission/",
  "/medical-care/",
  "/facilities/",
  "/about/",
  "/faq/",
  "/contact/",
  "/gallery/",
  "/testimonials/",
  "/privacy-policy/",
  "/blog/",
  // Articles (root URLs, like the old WordPress posts).
  "/how-to-choose-the-right-old-age-home-in-pune/",
  "/understanding-old-age-home-charges-in-pune/",
  "/what-to-check-before-admitting-a-parent-to-an-old-age-home/",
  "/understanding-elderly-care-and-assisted-living/",
  "/dementia-care-what-families-should-know/",
  "/bedridden-patient-care-at-home-vs-residential-care/",
  "/post-hospitalization-care-for-senior-citizens/",
] as const;

/** Every built page: the fixed pages above plus the 48 articles moved from the old site (same URLs). */
export const LIVE_PAGES: readonly string[] = [...STATIC_PAGES, ...(legacySlugs as string[]).map((s) => `/${s}/`)];

/** In the approved site map but not built yet. Links to these stay hidden until they move to LIVE_PAGES. */
export const PLANNED_PAGES: readonly string[] = [];

const live = new Set<string>(LIVE_PAGES);

/** "/x" → "/x/", strips #hash and ?query: the form our links and trailingSlash use. */
export function normalisePath(href: string) {
  const path = href.split(/[?#]/)[0] || "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/** True for internal paths that have a built page. External links and anchors aren't checked. */
export const isLive = (href: string) => live.has(normalisePath(href));
