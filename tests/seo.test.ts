import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { branches } from "../src/content/branches";
import { faqs as homeFaqs } from "../src/content/care";
import { admissionFaqs } from "../src/content/admission";
import { locationPages } from "../src/content/locations";
import { servicePages } from "../src/content/service-pages";
import { postPath, posts } from "../src/content/blog";
import { isIndexable } from "../src/lib/indexing";
import { pageMetadata } from "../src/lib/metadata";
import { allPageMeta, type PageMeta } from "../src/lib/page-meta";
import { isLive, LIVE_PAGES, normalisePath, PLANNED_PAGES } from "../src/lib/routes";
import {
  breadcrumbSchema, branchPath, faqSchema, graph, localBusinessSchema, organizationSchema, serviceSchema, websiteSchema,
} from "../src/lib/schema";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";
import { legacyRedirects } from "../next.config";
import { checkOldUrls } from "../scripts/check-urls";

const ROOT = new URL("..", import.meta.url).pathname;
const DOMAIN = "https://swarnaviharoldagehomes.com";

/** Every static page.tsx under src/app, as a URL path (dynamic routes excluded). */
function builtStaticRoutes() {
  const out: string[] = [];
  const walk = (dir: string, url: string) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) { if (!f.startsWith("[") && f !== "api") walk(p, `${url}${f}/`); }
      else if (f === "page.tsx") out.push(url);
    }
  };
  walk(join(ROOT, "src/app"), "/");
  return out.sort();
}

function withEnv<T>(env: Record<string, string | undefined>, fn: () => T): T {
  const saved = { ...process.env };
  for (const [k, v] of Object.entries(env)) { if (v === undefined) delete process.env[k]; else process.env[k] = v; }
  try { return fn(); } finally { process.env = saved; }
}

// ── Routes ───────────────────────────────────────────────────────────────────

test("routes: LIVE_PAGES matches the pages that are actually built", () => {
  const services = servicePages.map((s) => `/service/${s.slug}/`);
  const articles = posts.map(postPath);
  const expected = [...builtStaticRoutes(), ...services, ...articles].sort();
  assert.deepEqual([...LIVE_PAGES].sort(), expected);
  for (const p of PLANNED_PAGES) assert.ok(!isLive(p), `${p} is planned, not live`);
});

test("routes: normalisePath and isLive", () => {
  assert.equal(normalisePath("/contact"), "/contact/");
  assert.equal(normalisePath("/contact/#form"), "/contact/");
  assert.equal(normalisePath("/?utm_source=x"), "/");
  assert.ok(isLive("/admission"));
  assert.ok(!isLive("/service/coma-patient-care-in-pune/"));
});

test("routes: no hard-coded internal link in the source points at a page that doesn't exist", () => {
  const bad: string[] = [];
  const walk = (dir: string) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.tsx?$/.test(f)) {
        const src = readFileSync(p, "utf8");
        for (const m of src.matchAll(/href=["{`]+(\/[a-z0-9\-/]*)["`}]/gi)) {
          const href = m[1];
          // Links to planned pages are allowed only when guarded with isLive(...) on the same element.
          const line = src.slice(Math.max(0, m.index! - 160), m.index!);
          if (!isLive(href) && !/isLive\(/.test(line)) bad.push(`${p.replace(ROOT, "")}: ${href}`);
        }
      }
    }
  };
  walk(join(ROOT, "src"));
  assert.deepEqual(bad, []);
});

// ── Titles, descriptions, H1 ─────────────────────────────────────────────────

test("metadata: every live page has a title, description and H1, all unique", () => {
  const meta = allPageMeta();
  assert.deepEqual(meta.map((m) => m.path).sort(), [...LIVE_PAGES].sort());
  // Every page has all three, and no new page shares any of them with another page. The only
  // exceptions are old posts that duplicate each other (listed for the owner in docs/blog-migration-review.md).
  for (const m of meta) assert.ok(m.title && m.description && m.h1, m.path);
  for (const key of ["title", "description", "h1"] as const) {
    const seen = new Map<string, PageMeta>();
    for (const m of meta) {
      const v = m[key].toLowerCase();
      const prev = seen.get(v);
      assert.ok(!prev || (prev.legacy && m.legacy), `duplicate ${key}: ${prev?.path} and ${m.path}`);
      seen.set(v, m);
    }
  }
});

test("metadata: lengths fit search results (title ≤ 60, description 70–160)", () => {
  for (const m of allPageMeta()) {
    // Old posts keep their original titles (changing them could cost rankings); descriptions are fitted.
    if (!m.legacy) assert.ok(m.title.length <= 60, `${m.path} title ${m.title.length}: ${m.title}`);
    assert.ok(m.description.length >= 70 && m.description.length <= 160, `${m.path} description ${m.description.length}`);
  }
});

test("metadata: no unprovable superlatives or ranking promises", () => {
  const banned = /\b(best|no\.? ?1|number one|top[- ]rated|#1|guarantee[sd]?|cheapest|lowest price)\b/i;
  // Old posts keep their wording: their claims are listed for the owner in docs/blog-migration-review.md.
  for (const m of allPageMeta().filter((x) => !x.legacy)) {
    for (const v of [m.title, m.description, m.h1]) assert.ok(!banned.test(v), `${m.path}: "${v}"`);
  }
  const review = readFileSync(join(ROOT, "docs/blog-migration-review.md"), "utf8");
  for (const m of allPageMeta().filter((x) => x.legacy && banned.test(x.title))) assert.ok(review.includes(m.path), `${m.path} listed for review`);
});

test("metadata: canonical, Open Graph image and Twitter card on every page", () => {
  for (const m of allPageMeta()) {
    const md = pageMetadata(m);
    assert.equal((md.alternates as { canonical: string }).canonical, m.path);
    const og = md.openGraph as { url: string; images: { url: string; width: number; height: number; alt: string }[]; locale: string };
    assert.equal(og.url, m.path);
    assert.equal(og.locale, "en_IN");
    assert.equal(og.images[0].width, 1200);
    assert.ok(og.images[0].alt.length > 20);
    assert.equal((md.twitter as { card: string }).card, "summary_large_image");
    assert.equal(md.robots, undefined, `${m.path} must be indexable`);
  }
  assert.ok(existsSync(join(ROOT, "public/og-default.jpg")), "share image exists");
});

// ── Keyword map ──────────────────────────────────────────────────────────────

test("keyword map: every primary page is live and covers its search", () => {
  const doc = readFileSync(join(ROOT, "docs/seo/keyword-map.md"), "utf8");
  const rows = [...doc.matchAll(/^\| ([a-z][^|]+?) \| `(\/[^`]*)` \|/gm)].map((m) => ({ q: m[1].trim(), path: m[2] }));
  assert.ok(rows.length >= 8, `found ${rows.length} rows`);
  const meta = new Map(allPageMeta().map((m) => [m.path, m]));
  const stop = new Set(["in", "on", "for", "the", "and", "best", "of"]);
  const stem = (w: string) => w.replace(/(ies|es|s|ly)$/, "");
  const owners = new Map<string, string>();
  for (const r of rows) {
    assert.ok(isLive(r.path), `${r.q} → ${r.path} is not live`);
    const m = meta.get(r.path)!;
    const text = `${m.title} ${m.h1} ${m.description}`.toLowerCase();
    const words = r.q.toLowerCase().split(/\s+/).filter((w) => !stop.has(w));
    const missing = words.filter((w) => !text.includes(stem(w)));
    assert.deepEqual(missing, [], `"${r.q}" not covered by ${r.path}`);
    // One page per search: a search must not map to two different primary pages.
    assert.ok(!owners.has(r.q) || owners.get(r.q) === r.path, `"${r.q}" mapped twice`);
    owners.set(r.q, r.path);
  }
  for (const q of ["best old age home in Pune", "old age home in Baner", "senior citizen care in Wakad", "nursing care for elderly in Pune",
    "dementia care in Pune", "bedridden patient care in Pune", "old age home charges in Pune", "assisted living in Pune"]) {
    assert.ok(owners.has(q), `brief keyword missing from map: ${q}`);
  }
});

// ── sitemap.xml and robots.txt ───────────────────────────────────────────────

test("sitemap.xml lists exactly the live pages, as absolute https URLs with trailing slashes", () => {
  const urls = sitemap().map((e) => e.url);
  assert.deepEqual(urls, LIVE_PAGES.map((p) => DOMAIN + p));
  for (const u of urls) {
    assert.match(u, /^https:\/\/swarnaviharoldagehomes\.com\/([a-z0-9-]+\/)*$/);
    assert.ok(!u.includes("/api/"));
  }
  assert.equal(new Set(urls).size, urls.length);
});

test("robots.txt: open on production, closed on previews and local dev", () => {
  const prod = withEnv({ VERCEL_ENV: "production" }, robots);
  assert.deepEqual(prod.rules, [{ userAgent: "*", allow: "/", disallow: "/api/" }]);
  assert.equal(prod.sitemap, `${DOMAIN}/sitemap.xml`);
  const preview = withEnv({ VERCEL_ENV: "preview" }, robots);
  assert.deepEqual(preview.rules, [{ userAgent: "*", disallow: "/" }]);
  assert.equal(preview.sitemap, undefined);
  assert.equal(isIndexable({ NODE_ENV: "development" }), false);
  assert.equal(isIndexable({ NODE_ENV: "production" }), true);
  assert.equal(isIndexable({ NODE_ENV: "production", VERCEL_ENV: "preview" }), false);
});

// ── Structured data ──────────────────────────────────────────────────────────

/** Every JSON-LD document the site can output. */
function allSchema() {
  const docs: object[] = [
    graph(organizationSchema(), websiteSchema(), faqSchema(homeFaqs)),
    graph(organizationSchema(), ...branches.map(localBusinessSchema)),
    graph(organizationSchema(), faqSchema(admissionFaqs)),
    ...locationPages.map((l) => graph(organizationSchema(), ...branches.filter((b) => b.area === l.area).map(localBusinessSchema), faqSchema(l.faqs))),
    ...servicePages.map((s) => graph(organizationSchema(), serviceSchema({ name: s.h1, description: s.metaDescription, path: `/service/${s.slug}/`, serviceType: s.name }), faqSchema(s.faqs))),
  ];
  return docs.map((d) => JSON.stringify(d));
}

test("schema: no ratings, reviews, prices, hours or coordinates we don't have", () => {
  for (const json of allSchema()) {
    assert.ok(!/aggregateRating|"review|ratingValue|priceRange|openingHours|"geo"|latitude/i.test(json), json.slice(0, 200));
  }
});

test("schema: placeholder facts never reach structured data", () => {
  const dummy = /\+910000000|00000 0000|Sample Road|to be confirmed|owner to confirm/i;
  for (const json of allSchema()) assert.ok(!dummy.test(json), json.match(dummy)?.[0]);
  // Pimple Nilakh's house name and address are placeholders: named by locality, no address.
  const pn = localBusinessSchema(branches.find((b) => b.id === "pimple-nilakh")!) as Record<string, unknown>;
  assert.equal(pn.name, "Swarnavihar Old Age Homes, Pimple Nilakh");
  const clean = JSON.parse(JSON.stringify(graph(pn)))["@graph"][0];
  assert.equal(clean.address, undefined);
  assert.equal(clean.telephone, undefined);
});

test("schema: each home has one stable @id, on its area page", () => {
  for (const b of branches) {
    const node = localBusinessSchema(b);
    assert.equal(node["@id"], `${DOMAIN}${branchPath(b)}#${b.id}`);
    assert.ok(isLive(branchPath(b)), `${b.id}'s page is live`);
  }
  assert.equal(branchPath(branches.find((b) => b.city === "Bengaluru")!), "/branches/");
});

test("schema: FAQPage only from confirmed answers, omitted when there are none", () => {
  const allPlaceholder = [{ q: "Q?", a: { value: "x", status: "placeholder" as const } }];
  assert.equal(faqSchema(allPlaceholder), null);
  const doc = graph(organizationSchema(), faqSchema(allPlaceholder));
  assert.equal(doc["@graph"].length, 1);
  const home = faqSchema(homeFaqs)!;
  assert.ok(home.mainEntity.every((q) => !/to be confirmed/i.test(q.acceptedAnswer.text)));
});

test("schema: WebSite and Organization link to each other; breadcrumbs are absolute", () => {
  assert.equal(websiteSchema().publisher["@id"], organizationSchema()["@id"]);
  const bc = breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Admission and fees", href: "/admission/" }]);
  assert.deepEqual(bc.itemListElement.map((i) => i.item), [`${DOMAIN}/`, `${DOMAIN}/admission/`]);
});

// ── Redirects and old URLs ───────────────────────────────────────────────────

test("redirects: permanent, trailing-slashed, and pointing only at live or planned pages", () => {
  for (const r of legacyRedirects) {
    assert.match(r.source, /^\/.*\/$/);
    assert.ok(isLive(r.destination) || (PLANNED_PAGES as readonly string[]).includes(r.destination), r.destination);
    assert.ok(!legacyRedirects.some((x) => x.source === r.destination), `redirect chain at ${r.destination}`);
  }
});

test("old URLs: every kept service URL, the services hub and contact are served now", () => {
  const results = checkOldUrls();
  const served = new Set(results.filter((r) => r.ok).map((r) => r.old));
  for (const u of ["/", "/service/", "/contact/", "/branches/", "/service/assisted-living-care/", "/service/dementia-care-in-pune/",
    "/service/dementia-care/", "/service/post-operative-care-in-pune/"]) {
    assert.ok(served.has(u), `${u} should be served`);
  }
  // The rest (blog posts and planned pages) are reported by `npm run seo:check-urls` and block production builds.
  assert.ok(results.length >= 60);
  assert.deepEqual(results.filter((r) => !r.ok).map((r) => r.old), [], "every old URL is served");
});

// ── Doorway-page guard ───────────────────────────────────────────────────────

test("area pages are genuinely local: each names a real home and its own nearby areas", () => {
  for (const l of locationPages) {
    const homes = branches.filter((b) => b.area === l.area);
    assert.ok(homes.length >= 1, `${l.area} has a home`);
    const own = l.areasServed.map((a) => a.name);
    const others = locationPages.filter((o) => o.area !== l.area).flatMap((o) => o.areasServed.map((a) => a.name));
    assert.deepEqual(own.filter((a) => others.includes(a)), [], `${l.area} shares nearby areas with another page`);
    assert.ok(l.intro.join(" ").length > 300, `${l.area} intro is substantial`);
  }
});
