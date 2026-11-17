# Content review: what the owner needs to confirm

The new pages are written so that **nothing is invented**. Every statement about Swarnavihar is marked in the code as one of:

- **Sourced:** taken from the old website. Please read and confirm it's still true.
- **Placeholder:** we don't know it yet. In development it shows with a dashed outline, and production builds are blocked until it's replaced.
- **Editorial:** general guidance for families (how dementia progresses, what to ask a home). It makes no claim about Swarnavihar, so there's nothing to confirm, but please read it for tone.

Run `npm run check:content` for the full, current list of placeholders (163 as of 16 Nov).

## Needed from you, page by page

| Page | What to provide or confirm |
|---|---|
| About (`/about/`) | Our story: when and why Swarnavihar started, and who founded it. Five of the eight care-philosophy lines (marked) reflect how the homes really work. Care team names, only with each person's written consent (otherwise the role cards stay). Registrations and licences. |
| Facilities (`/facilities/`) | Room types per home, attached bathrooms, hospital beds and air mattresses, what residents can bring. Menu, timings, diets (vegetarian? Jain?). Lifts, wheelchair access, call bells, CCTV, fire safety, secure entrances. Visiting hours. |
| Medical care (`/medical-care/`) | Nurses' qualifications and night staffing. How often the physician visits; reaching a doctor at night. Whether residents' own doctors can visit. Physiotherapy sessions per week and whether they're included. Whether medicines are included. The emergency process, nearby hospitals, how families are told. Exact limits (tracheostomy? dialysis?). The specialist panel is from the old site: confirm it's current. |
| Admission (`/admission/`) | The four admission steps. What the monthly fee includes. Price ranges per care level, if you want them shown (optional; the page works without). Deposit, notice and short-stay policies. Documents needed. |
| Family FAQs (`/faq/`) | 13 answers marked placeholder: food, belongings, dementia safety, updates to families, families abroad, outings, emergencies, visiting. |
| Guides (7 articles) | Read each one. **The three health guides (dementia, bedridden care, post-hospitalization) need a medical review** by one of your doctors. Send the reviewer's name, qualification and the review date, and the article will show "Medically reviewed by…". Until then, production builds are blocked. |

| Service pages: paralysis, palliative and hospice, geriatric | Speech therapy, beds and wheelchairs per home, end-of-life care and family overnight stays, how the homes work with residents' own doctors. |
| Privacy policy (`/privacy-policy/`) | Legal entity and address, the person who handles privacy requests, how long enquiries are kept. **Have a lawyer review it before launch.** |
| Family reviews (`/testimonials/`) | Reviews from families with written consent, or links to Google reviews; whether families are happy to talk to new families. |
| Old blog posts (48) | Review the flagged claims in `docs/blog-migration-review.md`, and decide on the duplicate posts (`docs/seo/keyword-map.md`). |

## Photographs

No real photographs exist in the project yet, so pages use illustrations, each with a description of the photo that should replace it. See `docs/photography-brief.md`. The old site's own photos are listed in `docs/photo-inventory.md`. Real, consented photos of each home, its rooms, its food and its people (with permission) will do more for families' confidence than anything else on the site.

## Not used, on purpose

- **Doctors' names** from the old About page: published only with each doctor's consent.
- **The old site's testimonial:** consent unknown.
- **Old phone numbers:** dummy numbers stay until you confirm the real ones.
- **"Years of experience", "families served", resident and bed numbers:** not confirmed, so not shown.
- **The old mission statement** ("the leader in home health and hospice services"): it describes a different kind of service and can't be supported.
