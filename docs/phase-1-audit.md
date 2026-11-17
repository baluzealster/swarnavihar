# Phase 1 — Research & Existing Website Audit

_Swarnavihar Old Age Homes · prepared 15 Nov 2026_

---

## 1. Local project folder

`/Users/apple/swarnavihar` is **empty** (no files, no hidden files, no git repo).
There is no local codebase to preserve. This means no existing code can be overwritten.

## 2. Live site audit — swarnaviharoldagehomes.com (primary)

**Stack:** WordPress + Elementor 3.25.11, Google Tag Manager `GTM-N625B8C`, Search Console verified. Indexed, not blocked.

**Information architecture:** Home, About, Services (6), Branches, Facilities, Gallery, Blog, Contact.

**Existing URLs that rank and must be preserved or 301-redirected:**

| Type | URL |
|---|---|
| Service | /service/assisted-living-care/ |
| Service | /service/dementia-care-in-pune/ |
| Service | /service/geriatric-care-in-pune/ |
| Service | /service/hospice-palliative-care-in-pune/ |
| Service | /service/paralysis-care-centre-in-pune/ |
| Service | /service/post-operative-care-in-pune/ |
| Page | /about/ /branches/ /facilities/ /gallery/ /blog/ /contact/ |
| Blog | /monthly-cost-of-old-age-homes-in-pune-what-you-should-know-before-choosing/ |
| Blog | /choosing-the-right-senior-citizen-home-in-pune-a-complete-guide/ |
| Blog | /why-private-homes-are-ideal-for-personalized-elderly-care/ |
| Blog | /best-paralysis-rehabilitation-centre-in-pune-your-guide/ |
| Blog | /trusted-vruddhashram-in-pune-swarnavihar-old-age-homes/ |
| Blog | /nursing-homes-vs-assisted-living-key-differences/ |

_(Full blog archive still to be crawled in Phase 2.)_

**Defects found:**

1. Stats counters render **"0 +"** on Home and About (Expert Staff, Happy Clients, Years of Experience).
2. "Lorem ipsum" placeholder text on About.
3. Malformed links: `swarnaviharoldagehomes.comservice/dementia-care/`, `…comcontact`.
4. Footer links "Find Your Nearest Branch" and "Provide Feedback" go to `#`.
5. "See Our Services" CTA links to /contact/.
6. **No WhatsApp** anywhere.
7. No form privacy or consent text; no confirmation messaging visible.
8. Title tag ≠ Open Graph title; generic title "Home - Swarnavihar Old Age Homes".
9. Copyright 2024; two different Facebook URLs; brand varies ("Retirement Homes" vs "Old Age Homes").
10. "800+ Happy Patients" unverified; no registrations or licences shown.
11. No location landing pages; branch page has no maps, photos, or per-branch services.
12. Grammar issues in hero copy.

**Existing assets worth keeping:** real testimonials with named families, a doctor panel (Dr Rahul Doshi, Dr Rohan Jahagirdar, Dr Abdul Salam + others on About), a YouTube video, 6+ local-intent blog posts, and a detailed Facilities page (BiPAP, oxygen, suction, RT and PEG feeding, physiotherapy, ambulance, mobile X-ray). **All of these need owner confirmation before reuse.**

## 3. Live site audit — swarnavihar.org (secondary)

**Stack:** Static one-page site (design-to-code tool, `static.codia.ai` assets), GTM `GTM-MBQJ7V33`, built by digitalmarketingdoctor.com. Has WhatsApp click-to-chat, brochure gate, exit popup, and FAQ (10).

**Defects found:**

- `user-scalable=no` disables pinch-zoom, which fails accessibility for elderly users.
- **Leftover template copy from another business**: "Save up to 50% OFF", "Grap Special Offers & Deals", "trip/journeys", and "The Second Inning Home".
- The Paralytic Care panel is mislabelled "Palliative / Hospice Care".
- Claims "6+ branches" but lists 4. Also "10+ years, 1800+ served, 8+ doctors". These conflict with the .com site's "800+".
- Three brand spellings: Swarnavihar / Swarna Vihar / SuvarnaVihar.
- Duplicate-content risk with the .com site: no canonical relationship confirmed.

## 4. Branch data conflict ⚠️ (blocking for location pages)

| Area | .com /branches/ | .org | Notes |
|---|---|---|---|
| Sinhgad Road | Sr 53/2/15, Kudale Pravesh Baug, Narayan Baug Rd, Vadgaon Bk, 411041 | "Amulya Nivas", same area · +91 7447778065 | Consistent |
| Baner | Constellation Bldg, Sr 52/4/1/10, Pashan-Sus Rd, 411045 | "Ananda Nivas" · +91 7447770865 | Consistent |
| Sus | — | "Achyutha Nivas", near Hyundai Service Center, Ravi Nagar, Pashan-Sus Rd, Sus 411021 · +91 7447478065 | Only on .org |
| Wakad | Laxmi Sadan, Sr 176/1/5, Chowdhary Park, Wakad 411057 | "Akshaya Nivas" · +91 7447478065 (same as Sus) | Phone duplicate? |
| Bengaluru | Gottigere, Bannerghatta Rd, 560083 | — | Out of Pune scope? |
| **Pimple Nilakh** | **not listed** | **not listed** | **Required by brief, but unverified** |

Head office is shown as Baner on .com and as Vadgaon Bk on .org.

## 5. Services: brief vs. what the sites currently claim

| Brief service | Current evidence | Status |
|---|---|---|
| Residential Old Age Home | Implied everywhere | Likely ✓, confirm |
| Assisted Living | Service page | ✓ claimed |
| Nursing Care | "24×7 nursing care" | ✓ claimed, confirm staffing |
| Bedridden Patient Care | Testimonials, homepage copy | Likely, confirm |
| Dementia & Alzheimer's | Service page; psychiatrist on panel | ✓ claimed |
| Parkinson's Care | Mentioned under physiotherapy only | ❓ |
| Post-Stroke Rehabilitation | Physiotherapy (stroke) | ❓ partial |
| Paralysis Care | Service page | ✓ claimed |
| Coma Patient Care | Not claimed | ❓ |
| Tracheostomy Care | On .org only; .com Facilities does not claim it | ❓ conflict |
| Feeding Tube Care | RT and PEG feeding on Facilities | ✓ claimed |
| Physiotherapy & Rehab | Facilities | ✓ claimed |
| Post-Hospitalisation Recovery | "Post-operative care" | ✓ claimed (rename?) |
| 24/7 Elderly Care | Only nursing is stated as 24×7 | ❓ confirm what is 24/7 |
| _Not in brief:_ Palliative/Hospice, Geriatric Care | Existing ranking pages | Keep (SEO equity) |

## 6. Competitor analysis

### oldagehomecare.in (Swarnanagari, Balewadi)
- **Platform:** Boost 360 builder (NowFloats). Numeric-ID URLs, limited SEO control.
- **Strengths:** frequent fresh "Latest Updates" posts (Oct–Nov 2026), video and gallery, live chat, Android app, donation page, and clear category URLs plus a sitemap.
- **Weaknesses:** "[Your Old Age Home Name]" placeholder live on the site; services priced "INR 0"; three different phone numbers; phone number stuffed into the title and H1; malformed URLs (spaces); one location and no area pages; three testimonials and no ratings; no WhatsApp.
- **Note:** a very similar brand name ("Swarnanagari") in the overlapping Baner–Balewadi area. This makes **consistent brand naming and a GBP name** important for Swarnavihar.

### samarpanoldagehome.com (Samarpan, Sus)
- **Platform:** same family of hosted builder (numeric-ID URLs, built-in booking module).
- **Strengths:** long, detailed service pages (coma, palliative, assisted living); floating WhatsApp; prominent "Book Appointment"; FAQ page; local-intent blog posts ("…in Pune").
- **Weaknesses:** truncated meta description; awkward H1; booking widget still shows "Lawyer/Engineer" and an Aug 2023 calendar; conflicting prices (Rs 400 vs INR 200) and conflicting contact details; dead `#` CTAs; a single location; thin trust signals.

### Where Swarnavihar can win
1. **Multi-branch local SEO.** Neither competitor has area landing pages. Swarnavihar has 3–5 real Pune branches, which is the biggest structural advantage.
2. **Clinical depth that is verified and specific** (doctor panel, BiPAP, PEG, physio). Competitors make vague claims.
3. **Honest transparency:** published price _ranges_ or a "what's included" breakdown. Competitors show "INR 0" or conflicting prices.
4. **Accessibility for older readers:** large type, zoom allowed, and high contrast. All three current sites fail somewhere here.
5. **Clean technical SEO:** semantic URLs, schema (LocalBusiness per branch, MedicalBusiness-adjacent, FAQPage, BreadcrumbList), fast static rendering.
6. **Frictionless conversion:** WhatsApp + call + short callback form on every page, a branch selector, and visit booking.

## 7. Recommended technical approach

- **Next.js (App Router) + TypeScript + Tailwind CSS**, statically generated pages with server actions or route handlers for forms.
- **Content as typed data** (branches, services, doctors, FAQs) in one source-of-truth module, with a `verified: boolean` flag. Unverified claims cannot render in production.
- **Blog:** MDX in the repo (simple, fast, no CMS cost). We can revisit a headless CMS if staff need to publish without a developer.
- **Leads:** form → server-side validation (zod) → honeypot + rate limit → email notification (Resend or SMTP) + storage (PostgreSQL, e.g. Neon/Supabase) → WhatsApp/GA4 conversion events.
- **Domains:** `swarnaviharoldagehomes.com` canonical; `swarnavihar.org` 301-redirects to it (or a decision from you, see questions).
- **Migration safety:** full 301 map from every current WordPress URL. The WordPress site stays live until the new site passes QA.

> This replaces the current WordPress stack. Your brief says that needs your approval. See Decision D1.
