# Technical and local SEO

How the site is set up for search, what's automated, and what needs doing outside the code. The keyword plan is in [`keyword-map.md`](keyword-map.md).

Nothing here can guarantee rankings. Google decides those. What we control is making each page clearly about one thing, fast, crawlable and trustworthy, and the Business Profiles that drive "near me" results.

## What's in the code

| Area | How it works | Where |
|---|---|---|
| **sitemap.xml** | Generated from the list of built pages, so it can't list a page that doesn't exist or miss one that does. Absolute `https://swarnaviharoldagehomes.com/...` URLs with trailing slashes. No `lastmod` dates we can't stand behind. | `src/app/sitemap.ts`, `src/lib/routes.ts` |
| **robots.txt** | Production: everything open except `/api/`, with the sitemap URL. Vercel previews and local builds: everything closed. | `src/app/robots.ts`, `src/lib/indexing.ts` |
| **Preview protection** | Previews also send an `X-Robots-Tag: noindex` header and a `noindex` meta tag, so a shared preview link can never get indexed. | `next.config.ts`, `src/app/layout.tsx` |
| **Canonical URLs** | Every page declares its own canonical (relative, resolved against the `.com` domain). `.org` and `www` are redirected to `https://swarnaviharoldagehomes.com` at the Vercel domain level. | `src/lib/metadata.ts` |
| **Titles and descriptions** | One record per page, unique, titles ≤ 60 characters, descriptions 70–160. No "best", "No. 1" or "guaranteed". | `src/lib/page-meta.ts` plus the content files |
| **Open Graph and Twitter cards** | Every page shares with its own title and description and a branded 1200×630 image, so a WhatsApp or Facebook link shows a proper preview card. | `public/og-default.jpg` |
| **Image alt text** | Every picture and illustration has descriptive alt text; decorative icons are hidden from screen readers. Photo alt text names the home ("Ananda Nivas: …"). | `PhotoFrame`, `Illustration` |
| **Breadcrumbs** | Visible on every inner page, plus matching `BreadcrumbList` structured data. | `Breadcrumbs`, `src/lib/schema.ts` |
| **Structured data** | `Organization` and `WebSite` (home); `LocalBusiness` for each home, with one stable `@id` on its area page; `Service` on service pages; `FAQPage` from **confirmed** answers only; `BreadcrumbList`. Placeholder facts (dummy phones, the unconfirmed Pimple Nilakh address) are left out automatically. No ratings, reviews, prices, hours or coordinates until real ones exist. | `src/lib/schema.ts` |
| **Internal linking** | Home → services and areas. Area pages → their care services, the other areas, admission and fees. Service pages → areas, related services, admission and fees. Links to pages not yet built (About, Blog and so on) stay hidden until those pages exist. | `src/lib/routes.ts`, `MaybeLink` |
| **Redirects** | Old WordPress URLs keep their exact paths. The four that change get permanent 301s, with no chains. | `next.config.ts`, `docs/phase-2/url-redirect-map.csv` |
| **Launch URL check** | `npm run seo:check-urls` lists every old-site URL that would 404. It runs before every build and **blocks production builds** while any remain (today: 60, mostly the 48 blog posts and the planned pages). | `scripts/check-urls.ts` |
| **404 page** | Returns a real 404 status, is never indexed, and offers the area pages, services, admission, call and WhatsApp, plus the visit form. | `src/app/not-found.tsx` |
| **Core Web Vitals** | Server-rendered pages; fonts self-hosted by Next.js with `display: swap`; a measured, size-matched fallback for the body font so text doesn't jump; illustrations are inline SVG; analytics and Turnstile load after the page; images use AVIF/WebP via `next/image` with the hero marked `priority`. | `layout.tsx`, `globals.css`, `next.config.ts` |
| **Mobile usability** | Pinch-zoom allowed, no sideways scrolling at 360 px, body text ≥ 15 px, tap targets ≥ 44 px, fixed Call / WhatsApp / Visit bar on phones. | Checked by `seo_e2e` (see below) |

### Adding a page later

1. Build it.
2. Add its path to `LIVE_PAGES` in `src/lib/routes.ts`.
3. Give it a title, description and H1 (in its content file, or in `src/lib/page-meta.ts`).
4. Run `npm test`. The tests fail if the page isn't in the sitemap, its title duplicates another, or anything links to a page that doesn't exist.

## Measured results (15–16 Nov, test build)

These were measured with automated browser tests against the real page code. Final numbers should come from PageSpeed Insights and Search Console once the site is live.

- **SEO and accessibility checks on all 17 page templates:** 362/362 passed. The checks cover:
  - one H1, matching the page's SEO record, with no skipped heading levels;
  - valid JSON-LD, breadcrumb schema matching the visible trail, and no ratings or placeholder values in the schema;
  - every internal link pointing to a built page, and alt text on every image;
  - no sideways scroll at 360 px, and tap targets of at least 44 px.
- **Core Web Vitals on a simulated mid-range phone** (390 px wide, CPU slowed 4×, slow 4G, fonts arriving late). Google's "good" limits are LCP ≤ 2.5 s, CLS ≤ 0.1 and INP ≤ 200 ms (TBT stands in for INP here).

| Page | LCP | CLS | TBT |
|---|---|---|---|
| Home | 0.94 s | 0.000 | 74 ms |
| Wakad area page | 0.82 s | 0.000 | 18 ms |
| Dementia care | 0.82 s | 0.000 | 67 ms |
| Admission and fees | 0.80 s | 0.000 | 24 ms |
| Contact | 0.82 s | 0.000 | 21 ms |

The test build bundles every page's script together, unlike Next.js, which splits them. So real script cost should be lower. When **real photos** replace the illustrations, LCP will rise. Keep photos under about 300 KB each before upload; `next/image` resizes and converts them.

## Outside the code: needed for local search

These matter as much as the website for "old age home near me" and map results. Only the business owner can do them.

1. **A Google Business Profile for each home** (six, or five in Pune plus Bengaluru):
   - Use the **exact** name, address and phone shown on the website.
   - Category: the most accurate of "Retirement home", "Assisted living facility", "Elder care service" or "Nursing home", only if the home is registered as one.
   - Website link: the home's area page (for example `https://swarnaviharoldagehomes.com/old-age-home-wakad-pune/`), not the homepage.
   - Real photos, opening and visiting hours, and services that match the website.
2. **Reviews:** ask families who are happy to leave a Google review. Never pay for reviews, write them, or offer anything in return. That breaks Google's rules and Indian consumer law. Reply to every review, without sharing health details.
3. **Consistent name, address and phone everywhere:** JustDial, Sulekha, Practo, IndiaMART, Facebook and older listings. Fix the old site's three conflicting phone numbers wherever they still appear.
4. **Google Search Console:** verify the domain, submit `https://swarnaviharoldagehomes.com/sitemap.xml`, and check *Pages* and *Core Web Vitals* a few weeks after launch. Add Bing Webmaster Tools too (it can import from Search Console).
5. **Pimple Nilakh:** the address and house name are still placeholders, so that home is listed in structured data without an address. It needs real details before its Business Profile and launch.

## Before launch (SEO checklist)

- [ ] `npm run check:content` shows no placeholders. Production builds are blocked until then.
- [ ] `npm run seo:check-urls` shows every old URL served. Production builds are blocked until then. The blog migration, About, Facilities, Gallery, Testimonials and Privacy pages are still to come.
- [ ] Vercel: `.com` is the primary domain; `www` and `swarnavihar.org` (all paths) redirect to it with a 301.
- [ ] Search Console verified, sitemap submitted, then *URL Inspection* run on the homepage and the four area pages.
- [ ] Test any page in Google's Rich Results Test (FAQ and breadcrumbs should be detected, with no errors).
- [ ] Each home's Google Business Profile links to its area page.
