# Site map, URL rules & migration (Phase 2)

## URL rules

1. **Never change a URL that already exists.** All 6 service pages, 8 core pages and 48 blog posts keep their exact paths, so there's no ranking loss. The full mapping is in [`url-redirect-map.csv`](url-redirect-map.csv): 66 live URLs, 63 kept, 3 redirected, plus a fix for one broken link and the `.org` domain.
2. New pages follow the existing patterns: services under `/service/<topic>-in-pune/`, area pages at `/old-age-home-<area>-pune/` (changed from `/locations/…` on 15 Nov, per the brief).
3. Lowercase, hyphenated, trailing slash (this matches WordPress, so links stay identical).
4. Blog posts stay at the root (`/<slug>/`). Next.js serves them through a root catch-all; fixed routes take priority over it.

## Site map

```
/                                   Home
/about/                             Our story, values, clinical team, how care is run
/service/                           All services (grouped: Living · Medical & nursing · Recovery & rehab)
  /service/old-age-home-in-pune/                 NEW
  /service/assisted-living-care/                 kept
  /service/nursing-care-in-pune/                 NEW
  /service/bedridden-patient-care-in-pune/       NEW
  /service/dementia-care-in-pune/                kept (+ Alzheimer's)
  /service/parkinsons-care-in-pune/              NEW
  /service/post-stroke-rehabilitation-in-pune/   NEW
  /service/paralysis-care-centre-in-pune/        kept
  /service/coma-patient-care-in-pune/            NEW
  /service/tracheostomy-care-in-pune/            NEW
  /service/feeding-tube-care-in-pune/            NEW
  /service/physiotherapy-rehabilitation-in-pune/ NEW
  /service/post-operative-care-in-pune/          kept (retitled "Post-hospitalisation & post-operative recovery")
  /service/24-7-elderly-care-in-pune/            NEW
  /service/geriatric-care-in-pune/               kept
  /service/hospice-palliative-care-in-pune/      kept
/branches/                          All 6 houses with map, photos and phone; area finder
/old-age-home-baner-pune/          NEW  (Baner, Balewadi, Pashan, Sus)
/old-age-home-wakad-pune/          NEW  (Wakad, Pimple Saudagar, Hinjewadi)
/old-age-home-sinhgad-road-pune/   NEW  (Vadgaon Bk, Dhayari, Kothrud)
/old-age-home-pimple-nilakh-pune/  NEW  (Pimple Nilakh, Aundh, Sangvi)
/facilities/                        Rooms, food, medical support, activities
/gallery/                           Photos (absorbs /events/)
/testimonials/                      Family reviews (consented) / Google reviews
/admission/                         NEW  How admission works, documents, what to bring, costs explained
/faq/                               NEW  FAQ (FAQPage schema)
/blog/                              Blog index (48 migrated posts)
/<post-slug>/                       Blog posts (unchanged URLs)
/contact/                           Forms, all branch contacts, map
/privacy-policy/                    NEW  Required for forms and analytics consent
/thank-you/                         NEW  Post-submit page (noindex), used as a conversion goal
```

## Navigation

- **Header (desktop):** Services ▾ · Branches ▾ · Facilities · Admission · About · Blog, plus a phone button and a "Book a visit" button.
- **Mobile:** a fixed bottom bar with **Call · WhatsApp · Book a visit** on every page (three thumb-sized targets of at least 48 px).
- **Footer:** all 6 branches with phone numbers, services list, quick links, privacy, and the same brand name everywhere.

## Blog clean-up (to do in Phase 8, not now)

There are near-duplicate posts competing for the same searches. After the content review, we'll merge them into the strongest version with a 301:

- 3 × "monthly cost of old age homes in Pune"
- 2 × "geriatric care tips…" (one is a `-2` duplicate)
- 2 × "how can senior citizens improve their health"
- 3 × "hospice vs palliative care: what's the difference"
- 2 × "navigating dementia care in Pune"

We'll also refresh "…empowering-aging-gracefully-in-**2023**".
