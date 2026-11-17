# Fact sheet: single source of truth (Phase 2)

Every fact carries a status:

- **SOURCED**: taken from the current live sites. Use for now, but the owner should confirm before launch.
- **PLACEHOLDER**: dummy value agreed on 15 Nov 2026. **Must be replaced before launch.**

In Phase 3 this sheet becomes `src/content/*.ts`. Each record gets `status: "sourced" | "placeholder" | "verified"`. A production build **fails** while any `placeholder` remains, and the dev site shows placeholders with a visible dashed outline.

---

## Brand

| Field | Value | Status |
|---|---|---|
| Brand name (one spelling everywhere) | Swarnavihar Old Age Homes | SOURCED |
| Legal/trading name | Swarnavihar Retirement Homes (footer) | SOURCED, confirm |
| Primary domain | swarnaviharoldagehomes.com (`.org` → 301) | VERIFIED (15 Nov) |
| Main phone | +91 00000 00000 | PLACEHOLDER |
| WhatsApp | +91 00000 00000 | PLACEHOLDER |
| Email | svoldagehomes@gmail.com | SOURCED |
| Lead notification email | same as above | PLACEHOLDER |

Dummy phones use the `+91 00000 …` range on purpose. It can't be dialled, so no stranger gets calls.

## Branches (6, all open, confirmed 15 Nov)

| Key | House name | Address | Phone | Status |
|---|---|---|---|---|
| sinhgad-road | Amulya Nivas | Sr No 53/2/15, Kudale Pravesh Baug, Narayan Baug Road, near Navle Bridge, Vadgaon Budruk, Sinhgad Road, Pune 411041 | +91 00000 00001 | Address SOURCED · phone PLACEHOLDER |
| baner | Ananda Nivas | Constellation Building, Sr No 52/4/1/10, behind 52 Green Woods Apartments, Pashan–Sus Road, Baner, Pune 411045 | +91 00000 00002 | Address SOURCED · phone PLACEHOLDER |
| sus | Achyutha Nivas | Near Hyundai Service Center, Ravi Nagar, Pashan–Sus Road, Sus, Pune 411021 | +91 00000 00003 | Address SOURCED (.org only) · phone PLACEHOLDER |
| wakad | Akshaya Nivas | Laxmi Sadan Building, Sr No 176/1/5, Chowdhary Park, behind Sentosa Elysium, Wakad, Pune 411057 | +91 00000 00004 | Address SOURCED · phone PLACEHOLDER |
| pimple-nilakh | Anugraha Nivas | Sample Road, Pimple Nilakh, Pune 411027 | +91 00000 00005 | **All PLACEHOLDER** (branch confirmed to exist) |
| bengaluru | Swarnavihar Bengaluru | 118/2, Flat 102, Doctors Layout, Kembathalli Main Road, Bannerghatta Road, Gottigere, Bengaluru 560083 | +91 00000 00006 | Address SOURCED · phone PLACEHOLDER |

Also needed per branch before launch: Google Maps pin and place ID, bed count, room types, branch photos, which services are offered there, and visiting hours. **All PLACEHOLDER.**

## Location landing pages → branches

| Landing page | Areas targeted | Branch(es) shown |
|---|---|---|
| Baner | Baner, Balewadi, Pashan, Sus | Ananda Nivas + Achyutha Nivas |
| Wakad | Wakad, Pimple Saudagar, Hinjewadi | Akshaya Nivas |
| Sinhgad Road | Vadgaon Budruk, Dhayari, Kothrud | Amulya Nivas |
| Pimple Nilakh | Pimple Nilakh, Aundh, Sangvi | Anugraha Nivas |
| Bengaluru (no landing page in the brief) | Listed on /branches/ only | Swarnavihar Bengaluru |

## Headline numbers

| Stat | Value | Status |
|---|---|---|
| Years of care | 10+ | PLACEHOLDER (claimed on .org) |
| Families served | 1,800+ | PLACEHOLDER (.org says 1800+, .com says 800+) |
| Branches | 6 | Derived from the branch list above |
| Doctors on panel | 8 | PLACEHOLDER (.org says 8+) |
| Year founded | 2014 | PLACEHOLDER |
| Registrations / licences | none shown | PLACEHOLDER: the trust section stays hidden until real ones exist |

## Services (all 14 from the brief + 2 existing ranking pages)

You didn't answer Q5 yet, so **every service is PLACEHOLDER** for "do we provide it?" and "is it 24/7?". The evidence column shows what the live site already claims.

| Service | URL slug | Live-site evidence |
|---|---|---|
| Residential Old Age Home | /service/old-age-home-in-pune/ | implied |
| Assisted Living | /service/assisted-living-care/ (existing) | service page |
| Nursing Care | /service/nursing-care-in-pune/ | "24×7 nursing" |
| Bedridden Patient Care | /service/bedridden-patient-care-in-pune/ | testimonials |
| Dementia & Alzheimer's Care | /service/dementia-care-in-pune/ (existing) | service page |
| Parkinson's Care | /service/parkinsons-care-in-pune/ | physio mention only |
| Post-Stroke Rehabilitation | /service/post-stroke-rehabilitation-in-pune/ | physio mention |
| Paralysis Care | /service/paralysis-care-centre-in-pune/ (existing) | service page |
| Coma Patient Care | /service/coma-patient-care-in-pune/ | none |
| Tracheostomy Care | /service/tracheostomy-care-in-pune/ | .org only |
| Feeding Tube Care | /service/feeding-tube-care-in-pune/ | RT + PEG on Facilities |
| Physiotherapy & Rehabilitation | /service/physiotherapy-rehabilitation-in-pune/ | Facilities |
| Post-Hospitalisation Recovery | /service/post-operative-care-in-pune/ (existing, retitled) | service page |
| 24/7 Elderly Care | /service/24-7-elderly-care-in-pune/ | nursing only |
| Geriatric Care (existing) | /service/geriatric-care-in-pune/ | service page |
| Palliative & Hospice Care (existing) | /service/hospice-palliative-care-in-pune/ | service page |

## Clinical team

The live site names real doctors. We won't publish real names or photos without their consent, so the build uses role cards:

- Consulting Physician (MD Medicine): PLACEHOLDER name "Dr. A. Placeholder"
- Consulting Psychiatrist (MD Psychiatry): PLACEHOLDER
- Physiotherapist (BPT/MPT): PLACEHOLDER
- Nursing Lead (GNM/BSc Nursing): PLACEHOLDER

## Testimonials

The brief bans fake testimonials, so we won't write invented quotes. The live site has 7 named family reviews (SOURCED, but consent is unknown). Plan:

1. Dev build: the slots show the text "Family review — awaiting consent" (PLACEHOLDER).
2. Launch: reuse the existing reviews only with written consent, **or** embed live Google reviews per branch.

## Pricing

Not published anywhere today. PLACEHOLDER: a "What's included / what affects cost" section with no numbers until you provide ranges.

---

## Pre-launch fix list (revisit after the build)

Every item below must be cleared before Phase 11. The build guard enforces this.

1. Real phone + WhatsApp: main line and all 6 branches
2. Pimple Nilakh: house name, address, map pin
3. Services provided (Q5), per branch, and which are truly 24/7
4. Headline numbers: years, families served, doctors, founding year
5. Registrations / licences
6. Doctor names/photos with consent, or keep role cards
7. Testimonials consent, or Google reviews embed
8. Branch photos, bed counts, room types, visiting hours
9. Price ranges (optional)
10. Lead email recipient + any CRM
