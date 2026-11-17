# Page wireframes (Phase 2)

Content blocks per template, top to bottom. "▣" marks the main conversion point on each page.
Every page has the mobile bottom bar (Call · WhatsApp · Book a visit) and the standard footer.

## Home

```
┌──────────────────────────────────────────────────────────────┐
│ Header: logo · nav · phone · [Book a visit]                  │
├──────────────────────────────┬───────────────────────────────┤
│ H1: Care for your parents,   │  Real photo: resident with     │
│ close to where you live.     │  family at a branch            │
│ 1-line promise               │                                │
│ ▣ "Which part of Pune are    │                                │
│   you in?" [Baner][Wakad]    │                                │
│   [Sinhgad Rd][Pimple Nilakh]│                                │
│   → shows nearest house +    │                                │
│     call/WhatsApp/visit      │                                │
├──────────────────────────────┴───────────────────────────────┤
│ Proof strip: years · families · branches · doctors (verified │
│ numbers only; hidden while placeholders)                     │
├──────────────────────────────────────────────────────────────┤
│ "What does your parent need?" care finder: 3 groups          │
│  Everyday living │ Medical & nursing │ Recovery & rehab      │
│  each lists its services as plain links                      │
├──────────────────────────────────────────────────────────────┤
│ A day at Swarnavihar: timeline 7am → 9pm (real sequence)     │
├──────────────────────────────────────────────────────────────┤
│ Medical support: what is on site vs on call (honest table)   │
├──────────────────────────────────────────────────────────────┤
│ Our six houses: map + list (name · area · phone)             │
├──────────────────────────────────────────────────────────────┤
│ How admission works: 1 Call 2 Visit 3 Assessment 4 Move in   │
├──────────────────────────────────────────────────────────────┤
│ Families on Swarnavihar (consented reviews / Google)         │
├──────────────────────────────────────────────────────────────┤
│ FAQ (6 most-asked) · link to /faq/                           │
├──────────────────────────────────────────────────────────────┤
│ ▣ Callback form: name · phone · area · who needs care        │
└──────────────────────────────────────────────────────────────┘
```

## Service page (one template, 16 pages)
1. Breadcrumb → H1 "Dementia care in Pune" + who it's for (2 lines) + ▣ call/WhatsApp
2. Signs your parent may need this (checklist families recognise)
3. What care looks like day to day (specific: staffing, routines, safety)
4. Medical & nursing support for this condition (verified items only)
5. Which branches offer it (from branch data)
6. Questions families ask (FAQPage schema)
7. Related services · related blog posts
8. ▣ Callback form, with the service pre-selected

## Location landing page (4)
1. H1 "Old age home in Baner, Pune" + area list it serves (Baner, Balewadi, Pashan, Sus)
2. ▣ The house(s): name, photo, address, phone, WhatsApp, directions, visiting hours
3. Embedded map + "how to reach" from each nearby area (unique, local content)
4. Services available at this house
5. Nearby hospitals for emergencies (owner-verified)
6. Local FAQ ("Is there parking?", "Can we visit on weekends?")
7. Reviews for this branch
8. ▣ Book a visit to this house (form pre-selects the branch)

Schema: one `LocalBusiness` (subtype `NursingHome` / `AssistedLiving` where accurate) per house.

## Branches index
Area finder → map with 6 pins → cards for each house → callback form.

## About
Story → values (dignity, honesty, family involvement) → how care is run (staff roles, training, shift pattern) → clinical team role cards → registrations (hidden until real).

## Facilities
Rooms (types, photos) → food (sample week menu, diets) → medical equipment (verified list) → activities → housekeeping/laundry.

## Admission (new)
Steps → documents needed → what to bring → what affects monthly cost → trial stay / visit policy → ▣ form.

## Contact
▣ Form (enquiry/visit/callback tabs) · branch list with phones · head-office map.

## Form fields (all forms share one API)
Required: name, phone (10 digits, +91). Optional: area/branch, who needs care, service, preferred visit date, message. Consent line + privacy link. Honeypot + rate limit. Success → /thank-you/ with WhatsApp follow-up button.
