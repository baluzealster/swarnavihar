# PROJECT_STATUS: Swarnavihar Website Rebuild

_Single source of truth for progress. Last updated: 15 Nov 2026._

## Current phase
**Blog migration + remaining pages ✅ built and tested, awaiting approval.** Content approved 16 Nov. SEO approved 16 Nov. Lead management approved 16 Nov (Google Sheet live, SMTP email working on your Mac). Service and location pages delivered 15 Nov. Your Mac build ran successfully on 15 Nov (Next.js 16.4.6).
Phase 2 was approved on 15 Nov 2026 (by the request to implement the design).

### First run on your Mac (not possible in the build sandbox, where package installs are blocked)
```bash
cd ~/swarnavihar && npm install && npm run typecheck && npm run dev
```
`npm run build` and `next/font` (Literata, Atkinson Hyperlegible Next) have not been run yet. Report any error and it gets fixed first.

## Phase roadmap

| # | Phase | Key deliverables | Verification | Status |
|---|---|---|---|---|
| 1 | Research & audit | [`docs/phase-1-audit.md`](docs/phase-1-audit.md) | Manual review | ✅ Approved 15 Nov |
| 2 | Facts, IA & design direction | [`fact-sheet.md`](docs/phase-2/fact-sheet.md), [`sitemap-and-urls.md`](docs/phase-2/sitemap-and-urls.md), [`url-redirect-map.csv`](docs/phase-2/url-redirect-map.csv), [`wireframes.md`](docs/phase-2/wireframes.md), [`design-direction.html`](docs/phase-2/design-direction.html) | URL coverage check, contrast check, desktop + mobile render | ✅ Approved 15 Nov |
| 3 | Project foundation | Next.js + TS + Tailwind scaffold, lint/format, design tokens, base components (Header, Footer, Button, Nameplate, mobile Call/WhatsApp/Visit bar), typed content model with `status` flags + **production placeholder guard**, Vitest + Playwright | Typecheck, render + browser tests (see below) | ✅ Built, awaiting approval |
| 4 | Core pages | **Home ✅** · About, Facilities, Gallery, Contact, Branches, Admission, FAQ, Privacy, Thank-you | Playwright smoke, responsive checks | ⏳ Next |
| 5 | Service pages (10 of 16 done: assisted living, dementia, bedridden, nursing, post-stroke, physiotherapy, post-hospital, paralysis, palliative, geriatric; 6 new ones wait for Q5) | 16 pages from one template; 6 existing URLs preserved | Content review, link checks | ☐ |
| 6 | Location landing pages | ✅ /old-age-home-{baner,wakad,sinhgad-road,pimple-nilakh}-pune/ with LocalBusiness, Breadcrumb and FAQ schema | Schema + uniqueness tests | ✅ Built, awaiting approval |
| 7 | Lead capture & integrations | ✅ 4 API routes → Google Sheets + Resend, Turnstile, rate limit + duplicate guards, WhatsApp (no database, per your decision) | 64 unit/integration tests, 26 browser checks | ✅ Built, awaiting approval |
| 8 | Technical SEO & blog migration | ✅ Metadata, sitemap.xml, robots, JSON-LD, OG, 404, redirects, URL launch check, keyword map. ✅ 48 posts migrated at the same URLs. ☐ duplicate-post consolidation (your decision) | 18 SEO unit tests, 362 browser checks, CWV measured | ◐ SEO done, blog to do |
| 9 | Analytics & conversion tracking | ✅ GA4 (direct gtag, no GTM): page views, 5 lead events + whatsapp_click. ☐ GBP strategy, consent banner decision | Browser checks | ◐ GA4 done |
| 10 | Performance, a11y, security QA | Lighthouse ≥ 90, WCAG 2.2 AA, security headers/CSP | Audit report | ☐ |
| 11 | Deployment & launch | Vercel, DNS for .com + .org redirect, Search Console, monitoring, rollback | Launch checklist (needs fix list cleared) | ☐ |

## Decisions (resolved 15 Nov 2026)
- **D1:** Replace WordPress with a new Next.js build. ✅ Approved. WordPress stays live until launch.
- **D2:** `swarnaviharoldagehomes.com` is the primary domain; `swarnavihar.org` gets a 301 to it. ✅
- **D3:** Hosting on Vercel. ✅
- **Branches:** 6, all open: Sinhgad Rd, Baner, Sus, Wakad, Pimple Nilakh, Bengaluru. ✅
- **Data:** use dummy values for now and fix them after the build. ✅ Enforced by the placeholder guard (Phase 3).

## Phase 3 + homepage: what was built
- **Design system:** tokens in `src/app/globals.css`, documented in [`docs/design-system.md`](docs/design-system.md). Components: Section, SectionHeading, Container, ButtonLink (4 variants, 3 sizes), Nameplate, PhotoFrame, Icon (17 in-house), Ph placeholder marker.
- **Layout:** sticky header with full nav from 1024 px and a mobile menu below that (focus-managed, Escape closes); footer listing all 6 homes; mobile Call / WhatsApp / Book a visit bar.
- **Homepage, 11 sections plus header and footer:** hero with area picker · numbers · care showcase (16 services in 3 needs) · medical care · facilities · homes selector (accessible tabs, 6 homes) · family reviews (consent slots) · trust (visit checklist, care team, registrations) · admission steps · FAQ · callback form.
- **Content model:** `src/content/*` with `verified` / `sourced` / `placeholder` on every fact; `scripts/check-placeholders.ts` lists all 50 placeholders and blocks production builds.
- **Redirects + security headers** in `next.config.ts`. [`docs/photography-brief.md`](docs/photography-brief.md) has the 14-shot list.

### Verification (15 Nov 2026)
- TypeScript strict: 0 errors (against stand-in React/Next types; the full check runs on first `npm install`).
- Rendered with React 19 + Tailwind 4 and hydrated in Chrome at 390, 768, 1024, 1280 and 1440 px: no horizontal scroll, no JS errors, body text 18–19 px, all controls ≥ 44 px.
- 22/22 interaction and accessibility checks: area picker, branch pre-select into the form, tab arrow/Home/End keys, form validation and focus, honest "not switched on yet" state, FAQ, skip link, heading order, labelled photos and fields, mobile menu focus and Escape, action bar breakpoints, reduced motion.
- Colour contrast: all 17 text and icon pairs pass WCAG AA.
- Fixed during testing: serif font fallback, card radii, header wrapping at 1280 px, the hero nameplate covering the caption, the uneven facilities grid, button class conflicts (the header button showed on phones), and cramped tablet care columns.
- Content clean-up: removed 6 unverifiable claims from the copy (e.g. "move-in within a week", "family-run", "a real person replies").

## Phase 2 decisions (approved)
- Keep all existing URLs, including blog posts at the root. Only 3 redirects are needed.
- New URL patterns: `/service/<topic>-in-pune/` and `/locations/old-age-home-in-<area>/`.
- New pages: Admission, FAQ, Privacy, Thank-you.
- Design: rice cream, deep sage and brass palette; Literata + Atkinson Hyperlegible Next; "house nameplate" branch identity; "Which part of Pune are you in?" area picker as the hero.

## Pre-launch fix list (revisit after the build; blocks Phase 11)
Full detail in [`fact-sheet.md`](docs/phase-2/fact-sheet.md#pre-launch-fix-list-revisit-after-the-build).
1. Real phone + WhatsApp numbers (main + 6 branches)
2. Pimple Nilakh house name, address, map pin
3. **Q5, still unanswered:** which of the 14 services are provided, at which branch, and which are truly 24/7
4. Headline numbers (years, families, doctors, founding year)
5. Registrations / licences
6. Doctor names/photos with consent
7. Testimonial consent or Google reviews embed
8. Branch photos, bed counts, room types, visiting hours
9. Price ranges (optional)
10. Lead email recipient / CRM
11. Real branch photography for the hero and house pages
12. **Photo consent (17 Nov):** 14 photos from the old site show residents or staff (`people: true` in `src/content/photos.ts`); they block production until written consent is confirmed. Also confirm ownership of the 10 people-free photos.
13. **Old blog posts with prices (17 Nov):** 3 migrated posts publish ₹ ranges and "premium" (see `docs/audit/2026-11-17-audit.md`). Your decision: edit, redirect or keep.

## Risks
- Placeholder data reaching production. Mitigation: the build fails on any `status: "placeholder"`.
- SEO loss on migration. Mitigation: 63 of 66 URLs unchanged, 301s for the rest, Search Console monitoring.
- Name confusion with competitor "Swarnanagari" (Balewadi). Mitigation: one brand spelling + consistent GBP names.
- Two GTM containers / agencies. Mitigation: consolidate to one in Phase 9.

## Homepage, 15 sections (15 Nov)
1 Navigation · 2 Hero headline · 3 **Schedule a visit** (primary CTA, everywhere) · 4 **WhatsApp** (secondary) · 5 Introduction with numbers · 6 Our care services · 7 Why families choose us (+ questions to ask any home) · 8 Facilities and accommodation · 9 Medical and nursing support (+ care team) · 10 Our locations in Pune · 11 Family testimonials · 12 Photo gallery (mosaic + full-screen viewer) · 13 FAQ · 14 Final enquiry · 15 Footer.

**Enquiry is functional:** `POST /api/enquiry` validates, filters bots (honeypot), rate-limits (5 per 10 min) and forwards to `ENQUIRY_WEBHOOK_URL` when set (Google Apps Script, Zapier or Make, to email or a sheet). Until that's set it answers 503, and the form offers **Send on WhatsApp** with the details pre-written. Database and email notifications come in Phase 7.

**Tests**
- `npm test`: 19 unit tests (validation, IST dates, API: honeypot, 422, 503, forwarding, 502, rate limit; content integrity; placeholder guard). All pass.
- Browser e2e (sandbox harness, same components): 48/48. Covers section order, one h1, no skipped headings, landmarks, labelled sections, unique ids, accessible names, all in-page/tel/WhatsApp/external links, both hero CTAs, home pre-select, tabs, form validation, visit/call-back switch, WhatsApp fallback content, gallery viewer keyboard and focus, FAQ, skip link, phone bar and menu, reduced motion, no JS errors.
- Layout: no horizontal scroll at any width from 320 to 1440 px; header checked every 16 px from 1024 to 1440.
- Real `tsc --noEmit` on your Mac against Next 16.4.6: 0 errors.

**Fixed during testing:** duplicate "Schedule a visit" link names (now "Schedule a visit to Ananda Nivas", etc.); header overflow at 1024 px; gallery orphan tile and muddy captions; an unverified intro claim ("its own kitchen…").

**Known and expected:** links to pages not built yet (/about/, /service/…, /locations/…, /gallery/, /privacy-policy/ and others; 28 routes) return 404 until Phases 4–6. Old WordPress stays live until launch, so visitors aren't affected.

**Unused files to remove (needs your OK, since deleting on your Mac requires permission):** `src/components/home/ProofStrip.tsx`, `src/components/home/Trust.tsx`. `Admission.tsx` is kept for the /admission/ page.

## Service + location pages (15 Nov)
**Built:** `/old-age-home-baner-pune/`, `/old-age-home-wakad-pune/`, `/old-age-home-sinhgad-road-pune/`, `/old-age-home-pimple-nilakh-pune/`; `/service/` hub, `/branches/` hub; `/service/dementia-care-in-pune/`, `/service/bedridden-patient-care-in-pune/`, `/service/nursing-care-in-pune/`, `/service/post-stroke-rehabilitation-in-pune/`, `/service/physiotherapy-rehabilitation-in-pune/`, `/service/post-operative-care-in-pune/` (two keep existing WordPress URLs).

**Templates:** `LocationTemplate` and `ServiceTemplate` (`src/components/templates/`). All text lives in `src/content/locations.ts` and `src/content/service-pages.ts`. Shared: `PageHero`, `Breadcrumbs`, `JsonLd` + `lib/schema.ts`, `lib/metadata.ts`.

**Location page:** location intro · areas served · each home's card (nameplate, address, landmarks, phone, Schedule a visit, WhatsApp, directions, 3-picture set + viewer) · care available · facilities · medical support · local FAQs · call-back form (home pre-selected) · links to other locations. Schema: Organization, LocalBusiness per home (address parsed, no ratings), BreadcrumbList, FAQPage.

**Service page:** What is it? · Who needs it? · What care we provide · Facilities available · Where it's available · What families should consider · How to arrange admission + what to bring · not-medical-advice note · FAQs · call-back form (care need pre-selected) · related care. Schema: Organization, Service, BreadcrumbList, FAQPage.

**Honesty notes:** addresses are *sourced* from the old site, not verified; branch "photos" are illustrations until real ones are added; anything about what a specific home provides is a placeholder (Q5). Copy was reviewed and edited to remove 9 unsupported claims (e.g. "daily physiotherapy", "less likely to return to hospital", insulin capability, "families often tell us", calling the homes "houses").

**Tests:** `npm test` 34/34 (incl. no shared sentences between locations or between services, keyword-stuffing limit, meta lengths, banned outcome words, schema shape, related links only to built pages). Browser: 266/266 checks across the 12 new pages + 48/48 homepage. Real `tsc` on your Mac: 0 errors.

**Still to build:** 10 more service pages, About, Facilities, Admission, FAQ, Contact, Gallery, Testimonials, Privacy, Blog (17 linked routes currently 404).

## Lead management (15 Nov), per your architecture decision
**No database, no backend server, no dashboard, no new npm packages.** Next.js API routes → Google Sheets (service-account JWT signed with Node `crypto`) + Resend (HTTPS) + Turnstile (HTTPS) + GA4. Full guide: [`docs/lead-management.md`](docs/lead-management.md). Env template: [`.env.example`](.env.example).

- **Endpoints:** `/api/leads/enquiry` → *Leads*, `/callback` → *Callback Requests*, `/schedule-visit` → *Visit Bookings*, `/contact` → *Contact Messages*. Each row has a Lead ID (`SV-YYYYMMDD-XXXXXX`), IST timestamp, form, status `New`, contact, home, care need/service, date, message, source page, 5 UTM fields.
- **Workflow:** validate + sanitise → rate limit (8/IP/10 min) → Turnstile → duplicate protection (submission id, phone/email within 3 min, simultaneous requests) → Lead ID → Sheets → Resend → success only if at least one worked, otherwise 502 and the form offers WhatsApp with the details pre-written.
- **Frontend:** the visit / call-back / question form posts to the matching endpoint and shows a lead reference; new **/contact/** page and form; Turnstile widget (interaction-only); UTM first-touch capture; floating WhatsApp button (tablet and desktop) with a page-specific message; WhatsApp click tracking site-wide; GA4 events only after the server confirms.
- **Security:** secrets server-only (tested); formula-injection-safe cells; JSON-only, 10 KB cap; honeypot; no IPs or page views stored; 500-character message cap and a "no medical records" hint.
- **Ops:** `npm run leads:setup-sheet` creates the tabs and headers. `[NOT SAVED]` email subject when Sheets fails. Log lines carry Lead IDs, not personal data.
- **Tests:** `npm test` 64/64 (unit, integration with fake Google/Resend/Turnstile, security, WhatsApp). Browser 26/26 against the real route handlers (all 4 tabs, UTM, GA events, failure fallback, retry, double click, floating button), plus pages 266/266 and homepage 47/47. Real `tsc` on your Mac: 0 errors.
- **Fixed during testing:** a simultaneous double-click race (now an in-flight lock on both client and server); the date picker allowed dates the server rejects (now max 1 year); `.env.example` was missing a variable; Unicode escapes corrupted in one file.
- **Removed (with your permission):** `src/lib/enquiry-server.ts`, `tests/enquiry-api.test.ts`, `ProofStrip.tsx`, `Trust.tsx`.
- **Caveats:** rate-limit and duplicate memory is per server instance (documented). Vercel Hobby is non-commercial, so use Pro. A real end-to-end test against live Google, Resend and Cloudflare needs your accounts and keys (smoke test in the guide, section 9).

## SEO (16 Nov), your "Phase 7" brief
Docs: [`docs/seo/keyword-map.md`](docs/seo/keyword-map.md) (which page answers which search) and [`docs/seo/technical-seo.md`](docs/seo/technical-seo.md) (setup, measured results, Business Profile tasks, launch checklist).

- **Technical:** sitemap.xml and robots.txt generated from one list of built pages; previews never indexed (robots, meta and header); canonical, Open Graph and Twitter card on every page with a branded share image; helpful 404 with a real 404 status; `/services/` → `/service/` redirect.
- **Broken links fixed:** the menu, footer, homepage and service lists linked to 16 pages that don't exist yet (10 unbuilt services, About, Facilities, Gallery, Testimonials, Blog, Privacy). They now appear only once the page is built (`src/lib/routes.ts`).
- **Structured data:** Organization + WebSite on the home page; one stable LocalBusiness per home (also on /branches/); FAQPage only from confirmed answers; placeholders (dummy phones, Pimple Nilakh address) automatically left out. No ratings or reviews.
- **New pages:** `/admission/` (Admission and fees: what affects the monthly charge, what's included, documents, FAQ; no prices until you give ranges) and `/service/assisted-living-care/` (kept URL from the old site).
- **Local SEO:** Wakad page now targets "senior citizen care in Wakad"; nursing page targets "nursing care for elderly in Pune"; every area and service page links to Admission and fees; Contact and 404 pages got the visit / call-back form so "Schedule a visit" works on every page.
- **Launch gate:** `npm run seo:check-urls`, which runs before every build. 60 old-site URLs (mostly the 48 blog posts) aren't served yet, so it blocks production builds until they are.
- **Core Web Vitals:** measured on a simulated mid-range phone on slow 4G: LCP 0.80–0.94 s, CLS 0.000, TBT ≤ 74 ms. Added a measured fallback for the body font (Next.js couldn't make one).
- **Tests:** `npm test` 94/94 (18 new SEO tests). Browser: SEO 362/362, pages 287/287, homepage 47/47, lead forms 26/26. Real `tsc` on your Mac: 0 errors.

## Content (16 Nov)
What you need to confirm, page by page: [`docs/content-review.md`](docs/content-review.md).

- **New pages:** `/about/` (who we are, our story, care philosophy, care team by role, visiting panel by specialty), `/facilities/`, `/medical-care/` (what's available, emergencies, and the limits of a care home), `/faq/` (6 topic groups, 25 questions) and `/blog/` (guides index).
- **Admission:** now "Admission, care levels and fees", with four care levels (residential, assisted living, nursing, specialised). No package names or prices are invented; price ranges are placeholders.
- **7 guides** at root URLs, 822–1,007 words each. Each has an "In short" box, a contents list, an FAQ and "Read next" links. Structured data is BlogPosting with Swarnavihar as author, not an invented person. The three health guides have a medical-review slot that blocks production until a named doctor reviews them.
- **Facts used:** only the old site's (sourced) and owner-confirmed ones. Doctors appear by specialty only, with no names, no testimonials, no numbers and no prices.
- **Navigation:** Facilities, About and Guides now appear in the menu; Medical care and Family FAQs in the footer.
- **Keyword map:** the charges guide is now the main page for "old age home charges in Pune", and `/admission/` targets the admission process. 11 rows added for the new pages. There's also a recommendation on which old blog posts to merge into the new guides, for your decision before migration.
- **Old URLs:** 13 of 68 are now served (was 8). The rest are the old blog posts, Gallery, Testimonials and 3 service pages.
- **Tests:** `npm test` 104/104, including 10 new content tests. They check for:
  - invented doctors, credentials, counts, prices, superlatives or testimonials;
  - average sentence length of 22 words or fewer, for plain language;
  - no copied sentences between articles, and every internal link going to a built page.

  Browser checks: 622/622 across 29 pages; pages 287/287, homepage 47/47, lead forms 26/26. Page speed stays within Google's "good" limits.

## Blog migration and remaining pages (16 Nov)
- **All 48 old blog posts** moved across word for word at their exact URLs, with original publish and update dates. The source is a JSON export of the old site's public WordPress API (`swarnavihar-wordpress-export.json` in the project root, converted by `scripts/import-wordpress.py`).
  - A test proves no words were lost (within 1% of the original for every post).
  - Fixed during conversion: broken old internal links (`…comservice/x/`, old slugs), headings that skipped a level, and meta descriptions trimmed to 160 characters.
  - **Not copied:** the posts' images (stock photos with unknown licences).
  - **Your decision needed:** the import flagged claims in 40 of the posts (superlatives, "guarantees", an unsourced price range, statistics). They were already public, so they're not blocked. See [`docs/blog-migration-review.md`](docs/blog-migration-review.md).
- **3 old service pages rebuilt** at their kept URLs: paralysis care, palliative and hospice care, and geriatric care. They're written fresh, because the old text had medical inaccuracies, and use only facts the old site stated (marked sourced) plus placeholders. Service pages: 10 of 16.
- **Privacy policy** (`/privacy-policy/`): describes exactly what the forms, spam protection, analytics and WhatsApp links do, and your rights under India's DPDP Act. The legal entity, grievance officer, retention period and **a lawyer's review** are placeholders, so production stays blocked until they're filled in. The privacy link now appears in the footer and under every form.
- **Gallery** (`/gallery/`) and **Family reviews** (`/testimonials/`): live, with consent-safe placeholders. There are no invented reviews and no review structured data. The 52 gallery photos and 25 other real-looking photos from the old site are listed in [`docs/photo-inventory.md`](docs/photo-inventory.md) for you to choose from, with consent.
- **Old URLs:** all 67 page URLs are now served. Only the `swarnavihar.org` → `.com` domain redirect remains, and that's set in Vercel. The launch URL check now passes.
- **Tests:** `npm test` 110/110, including 6 migration tests. Browser: 1,759/1,759 checks across 83 pages; pages 287/287, homepage 47/47, lead forms 26/26.

## Change log
- **2026-11-18 Slideshow first:** the homepage now opens with the full-width "Glimpses of Swarnavihar" slideshow (photos shown clearly, one every 2 s), and the "Care for your parents, close to where you live" section follows below it on a light band. 0 axe violations across 82 pages; Lighthouse home: performance 92–95, accessibility/best practices/SEO 100.
- **2026-11-18 Our homes menu:** one plain list of the 6 homes (house icon, home name, area) with no Pune / Bengaluru headings, on desktop and phone; each links to its area page (Bengaluru to /branches/). 115 tests pass.
- **2026-11-18 Horizontal logo:** the header and footer now use the owner's horizontal logo (emblem + Swarnavihar wordmark), replacing the round logo + text. The round logo stays for the favicon and app icons. Header checked at 7 widths, no overflow; 0 axe violations.
- **2026-11-18 Logo:** the owner's round Swarnavihar logo is now in the header (beside the name, kept as text for legibility), in the footer (larger), and as the browser-tab, phone home-screen and app icons (`public/brand/swarnavihar-logo.png`, `src/app/icon.png`, `apple-icon.png`, `favicon.ico`, `public/icon-192/512.png`). Header checked at 7 widths (320–1440 px) with no overflow; the header phone number now shows from 1024 px (tablets use the menu's Call button).
- **2026-11-18 Hero slideshow, menu, facilities:** (1) the homepage hero is now "Glimpses of Swarnavihar": one photo at a time, changing every 2 s (8 photos), with a pause button and dots; the lower carousel section was removed. (2) The Care services menu is one list with an icon before each service (desktop and phone); no categories. (3) Homepage facilities are 8 icon tiles with one line each. 114 tests pass; 12/12 browser checks; 0 axe violations across 82 pages; Lighthouse home: accessibility 100, performance 90–95.
- **2026-11-17 Glimpses carousel:** the homepage photo mosaic is now "Glimpses of Swarnavihar", an endless photo strip that moves one photo every 2 seconds (15 real photos, pause/play, previous/next, swipe, full-screen viewer). Accessible carousel pattern; no autoplay for reduced-motion users. 17/17 browser checks; accessibility 100. The logo's accessible name now matches its visible text.
- **2026-11-17 Spacing:** tightened the white space between sections (from ~250–280 px to ~160–215 px on desktop): section padding 112 → 80 px, smaller heading margins, same-colour neighbouring bands share one padding, care cards no longer stretch an empty gap inside, and scroll fade-in starts as soon as content enters the screen. 0 axe violations and no horizontal scroll across all 82 pages; 111 tests pass.
- **2026-11-17 Standards audit + visual upgrade:** audited all 82 pages with Lighthouse, axe and Playwright ([report](docs/audit/2026-11-17-audit.md)). Accessibility and best practices are now 100 on every page tested (were 96–97), with 0 axe violations site-wide. Added favicon/manifest, HSTS and CSP. Real photos from the old site, a photo hero, depth tokens, scroll reveal and count-up numbers. Pages about medical conditions show places only. New pricing-tone test (111 tests).
- **2026-11-17 Navigation and colours:** added hover/keyboard drop-down menus for "Care services" and "Our homes" (NavMenu.tsx), with expandable sections in the phone menu; fixed the phone menu panel that showed as a thin strip (header backdrop-blur removed). A darker olive palette was tried and then reverted at the owner's request, restoring the original light palette.
- **2026-11-16 Blog migration:** 48 posts migrated word for word; paralysis, palliative and geriatric service pages; privacy policy; gallery and testimonials pages; all old URLs served.
- **2026-11-16 Content:** About, Facilities, Medical care, Family FAQs, Guides index, 7 articles, care levels on Admission; content review list; 10 content tests, 622 browser checks.
- **2026-11-16 SEO:** sitemap, robots, 404, OG image, structured data fixes, route registry (no broken internal links), /admission/ and assisted living pages, keyword map, URL launch check, font fallback; 18 unit tests + 362 browser checks.
- **2026-11-16 SMTP email:** lead emails can now go through Gmail or any SMTP server (built-in TLS, no new packages); takes priority over Resend. 12 new tests (76 total). Google Sheets project, service account and sheet set up on adusumalli.balakrishna@gmail.com.
- **2026-11-15 Lead management:** Sheets + Resend + Turnstile + WhatsApp + GA4; /contact/ page; 30 new tests; setup guide.
- **2026-11-15 Service + location pages:** 4 location landing pages, 6 service pages, 2 hubs, schema, breadcrumbs, metadata; 15 new unit tests; 266 browser checks.
- **2026-11-15 Homepage to spec:** added Introduction, Why families choose us and Gallery; Schedule a visit + WhatsApp CTAs; functional enquiry API with WhatsApp fallback; image optimisation (AVIF/WebP); Open Graph metadata; 19 unit tests; 48 e2e checks.
- **2026-11-15 Illustration set:** replaced the empty photo boxes with 9 custom line illustrations (still lifes, no people) that can ship until photography arrives; added a clean-preview mode that hides placeholder outlines. Re-verified at 5 widths: 22/22 checks pass, no horizontal scroll; page HTML is 16 KB gzipped with no image downloads.
- **2026-11-15 Phase 3 + homepage:** Next.js project, design system, content model with placeholder guard, full homepage, redirects, docs. Verified as above.
- **2026-11-15 Phase 2:** crawled live sitemaps (48 posts, 15 pages, 2 categories); wrote fact sheet with sourced/placeholder status; site map, URL rules and 66-row redirect map; wireframes for 8 templates; design direction page. Verified: every live URL is mapped; all text colour pairs pass WCAG AA (gold limited to decoration); mockup checked at 1366 px and 390 px. Fixed the mobile hero order and removed unverifiable copy claims.
- **2026-11-15 Phase 1:** project folder confirmed empty; audited both live sites and two competitors; created roadmap.
