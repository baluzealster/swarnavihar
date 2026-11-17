# Keyword-to-page map

Each search has **one** page that answers it best (its primary page), so our own pages never compete with each other. Other pages support it with internal links. `tests/seo.test.ts` reads the table below and checks that every primary page is live and that its title, H1 or meta description actually covers the search.

Search volumes aren't listed: we have no keyword-tool data, and guessing would be fabricating. Check them in Google Search Console (Performance → Queries) about 4–8 weeks after launch, and in Google Ads Keyword Planner if you advertise.

## Brief's target searches

| Search | Primary page | Supporting pages | How the primary page answers it |
|---|---|---|---|
| best old age home in Pune | `/` | `/how-to-choose-the-right-old-age-home-in-pune/`, `/branches/`, the four area pages | Title "Old Age Homes in Pune with Nursing Care". The FAQ "How do we choose the right old age home in Pune?" and the visit checklist help families judge any home. **We don't call ourselves "best":** it can't be proven, Google treats it as a claim, and families distrust it. Ranking for "best" comes from relevance, genuine Google reviews and proximity. |
| old age home in Baner | `/old-age-home-baner-pune/` | `/`, `/branches/` | H1 "Old age homes in Baner, Pune". Both homes on the Pashan–Sus Road, nearby areas (Balewadi, Pashan, Sus), directions, LocalBusiness schema for each home. |
| senior citizen care in Wakad | `/old-age-home-wakad-pune/` | `/`, `/branches/`, `/service/assisted-living-care/` | Title "Senior Citizen Care & Old Age Home in Wakad", H1 "Old age home and senior citizen care in Wakad, Pune". Hinjewadi and Pimple Saudagar covered. |
| nursing care for elderly in Pune | `/service/nursing-care-in-pune/` | `/service/bedridden-patient-care-in-pune/`, `/service/post-operative-care-in-pune/` | Title "Nursing Care for Elderly in Pune", H1 "Nursing care for the elderly in Pune". What nurses do, who needs it, what to ask. |
| dementia care in Pune | `/service/dementia-care-in-pune/` | area pages (care list), `/service/nursing-care-in-pune/` | H1 "Dementia and Alzheimer's care in Pune". Signs families notice, the daily routine, what to ask. |
| bedridden patient care in Pune | `/service/bedridden-patient-care-in-pune/` | `/service/nursing-care-in-pune/`, `/service/post-stroke-rehabilitation-in-pune/` | H1 "Bedridden patient care in Pune". Turning, skin care, feeding, and what families should check. |
| old age home charges in Pune | `/understanding-old-age-home-charges-in-pune/` | `/admission/` (links both ways) | A full guide: what's usually included, what's extra, why fees vary, and a worksheet to compare homes on a realistic monthly total. **No invented prices.** `/admission/` handles the next step ("ask for a written estimate") and targets the admission process instead, so the two pages don't compete. |
| assisted living in Pune | `/service/assisted-living-care/` | `/`, `/service/`, `/old-age-home-wakad-pune/` | Title "Assisted Living for Seniors in Pune". Keeps the old site's URL, so its existing ranking carries over. |

## Related searches we also cover

| Search | Primary page | Supporting pages | Notes |
|---|---|---|---|
| old age home in Wakad | `/old-age-home-wakad-pune/` | `/branches/` | Same page as "senior citizen care in Wakad": one page per area, never one page per keyword (doorway pages). |
| old age home on Sinhgad Road | `/old-age-home-sinhgad-road-pune/` | `/branches/` | Also Vadgaon Budruk, Dhayari, Kothrud. |
| old age home in Pimple Nilakh | `/old-age-home-pimple-nilakh-pune/` | `/branches/` | Also Aundh, Sangvi. The address is still a placeholder: needed before launch. |
| elderly care services in Pune | `/service/` | `/` | Hub linking every service page. |
| post-stroke rehabilitation in Pune | `/service/post-stroke-rehabilitation-in-pune/` | `/service/physiotherapy-rehabilitation-in-pune/` | |
| physiotherapy for elderly in Pune | `/service/physiotherapy-rehabilitation-in-pune/` | `/service/post-stroke-rehabilitation-in-pune/` | |
| post-operative care in Pune | `/service/post-operative-care-in-pune/` | `/service/nursing-care-in-pune/` | Kept URL from the old site. |
| old age homes in Pune and Bengaluru | `/branches/` | `/` | All six homes, with LocalBusiness schema for each. |
| paralysis care centre in Pune | `/service/paralysis-care-centre-in-pune/` | `/service/post-stroke-rehabilitation-in-pune/` | Kept URL from the old site. |
| palliative and hospice care in Pune | `/service/hospice-palliative-care-in-pune/` | `/service/nursing-care-in-pune/` | Kept URL from the old site. |
| geriatric care in Pune | `/service/geriatric-care-in-pune/` | `/medical-care/` | Kept URL from the old site. |

## Information pages and guides (content phase, 16 Nov)

| Search | Primary page | Supporting pages | Notes |
|---|---|---|---|
| old age home admission process | `/admission/` | `/what-to-check-before-admitting-a-parent-to-an-old-age-home/` | Steps, care levels, documents. |
| how to choose old age home in Pune | `/how-to-choose-the-right-old-age-home-in-pune/` | `/`, `/faq/` | The guide; the home page links to it from its FAQ. |
| what to check before admitting parent to old age home | `/what-to-check-before-admitting-a-parent-to-an-old-age-home/` | `/admission/` | A printable checklist. |
| elderly care and assisted living | `/understanding-elderly-care-and-assisted-living/` | `/service/assisted-living-care/` | Informational. The service page stays the target for "assisted living in Pune". |
| dementia care for families | `/dementia-care-what-families-should-know/` | `/service/dementia-care-in-pune/` | Signs, diagnosis, stages, daily tips. The service page stays the target for "dementia care in Pune". |
| bedridden patient care at home | `/bedridden-patient-care-at-home-vs-residential-care/` | `/service/bedridden-patient-care-in-pune/` | Home vs residential comparison. |
| post hospitalization care for senior citizens | `/post-hospitalization-care-for-senior-citizens/` | `/service/post-operative-care-in-pune/`, `/medical-care/` | Discharge checklist, warning signs, when short-term care helps. |
| medical care for elders in Pune | `/medical-care/` | `/facilities/`, service pages | What's available and its limits. |
| old age home facilities | `/facilities/` | `/medical-care/` | Rooms, food, daily living, activities, safety. |
| about Swarnavihar | `/about/` | `/` | Who we are, care philosophy, care team by role. |
| old age home questions | `/faq/` | `/admission/` | Grouped family FAQs. |

Each guide answers a *how* or *what* question for families researching. Each service or area page answers *where can I get this care in Pune*. They link to each other, but their titles and H1s target different searches.

## Not targeted, on purpose

- **"Old age home near me"**: Google answers this from Google Business Profiles and location, not page text. Each home needs its own verified Business Profile, with the same name, address and phone as the website (see `technical-seo.md`).
- **Area pages for places without a home** (for example "old age home in Kharadi"): these would be doorway pages with nothing real behind them. Add an area page only when a home opens there.
- **"Cheap" or "free" old age homes**: not what Swarnavihar offers. Targeting them would bring the wrong enquiries.
- **Exact-match keyword repetition**: each page uses the search phrase where it reads naturally (title, H1, opening paragraph), and otherwise writes for the family reading it.

## Before the old blog is migrated: decisions for you

Some of the 48 old posts cover the same ground as the new guides. If both are kept, they'll compete for the same searches. My recommendation, for your approval in the blog migration phase:

| New guide | Old posts on the same topic | Recommendation |
|---|---|---|
| Understanding old age home charges in Pune | `/monthly-cost-of-old-age-homes-in-pune-what-you-should-know-before-choosing/`, `/understanding-the-monthly-cost-of-old-age-homes-in-pune/`, `/understanding-the-monthly-cost-of-old-age-homes-in-pune-a-guide-by-swarnavihar-old-age-homes/` | 301 all three to the new guide |
| How to choose the right old age home in Pune | `/how-to-choose-old-age-homes-in-pune-for-your-loved-ones/`, `/choosing-the-right-senior-citizen-home-in-pune-a-complete-guide/`, `/swarnavihar-old-age-homes-a-comprehensive-guide-to-choosing-the-best-nursing-home-in-pune-for-your-loved-ones/` | 301 to the new guide |
| Dementia care: what families should know | `/best-tips-to-take-care-of-dementia-patients/`, `/home-care-guide-for-dementia-patients-by-swarnavihar/`, `/significant-role-of-communication-in-dementia-care/` | Keep (different angle), link to the new guide |
| Post-hospitalization care for senior citizens | `/the-importance-of-post-operative-care-with-swarnavihar-old-age-homes/`, `/comprehensive-post-surgery-care-in-pune-your-guide-by-swarnavihar-old-age-homes/` | 301 to the new guide |
| Understanding elderly care and assisted living | `/nursing-homes-vs-assisted-living-key-differences/`, `/how-to-choose-the-right-assisted-care-center-a-comprehensive-guide/` | Keep the comparison post, 301 the other |

Search Console data (which old posts actually bring visitors) should confirm this before any redirect goes live.
