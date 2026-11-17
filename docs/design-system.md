# Swarnavihar design system

Tokens live in `src/app/globals.css` (`@theme`). Components live in `src/components/ui/`. Nothing on the site should use a colour, font size or radius that isn't defined here.

## Principles

1. **Written for two readers.** Sons and daughters (35–55) reading on a phone, and parents (70+) reading over their shoulder. That means 18–19 px body text, high contrast, 44 px+ tap targets, and pinch-zoom always allowed.
2. **A home, not a hospital.** The palette is warm and residential; clinical detail is present but never cold.
3. **One signature element.** The brass **house nameplate** is reserved for branch names, so it always means "a real place you can visit". Everything around it stays quiet.
4. **Honest by construction.** Every fact has a status. Placeholders show a dashed brass outline in development (hide it with `NEXT_PUBLIC_HIDE_PLACEHOLDERS=1`) and block production builds.
6. **Illustrate objects, photograph people.** Until real photography exists, illustrations show the objects of a cared-for day: chairs, chai, a thali, a folded quilt. We never draw or generate stand-in residents.
5. **No template tells.** No uppercase eyebrow labels, no numbered markers unless the content is a real sequence (only Admission uses them). Shadows only from the two depth tokens; the one gradient is the hero's photo wash.
7. **Show the quality, never the price (17 Nov 2026).** The site should feel cared-for and high-quality through real photography, depth and craft, never through words. No prices and no price-tier words ("premium", "luxury", "exclusive"…) in our copy; a test enforces it (`tests/content.test.ts`).

## Colour

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `cream` | #F7F2E7 | Page background | — |
| `paper` | #FFFFFF | Cards, forms, header | — |
| `ink` | #1E2B24 | Body text | 13.2:1 on cream |
| `muted` | #4F5D55 | Secondary text | 6.2:1 on cream, 5.7:1 on mist |
| `sage` | #33503F | Headings, primary buttons, medical band | 8.0:1 on cream |
| `sage-dark` | #26402F | Primary hover | — |
| `mist` | #E3EADF | Tinted bands, photo frames | — |
| `on-sage` | #EEF2EC | Text on sage | 7.9:1 |
| `brass` | #B38B45 | **Decoration only** (nameplate edge, quote mark) | 2.8:1: never for text |
| `brass-deep` | #8A6A2F | Large numerals, chevrons, check icons, placeholder outline | 4.5:1 on cream |
| `brass-light` | #D9C08F | Icons on sage | 5.0:1 |
| `line` / `line-strong` | #E6DFCF / #D3CAB5 | Hairlines, form borders | — |

All text pairs pass WCAG 2.2 AA (checked 15 Nov 2026).

## Type

- **Headings:** Literata 500, a book serif made for long-form reading.
- **Body and UI:** Atkinson Hyperlegible Next, designed by the Braille Institute for low-vision readers.
- Loaded with `next/font`, so they're self-hosted with no layout shift.

| Utility | Size | Use |
|---|---|---|
| `text-display` | 40 → 68 px fluid | The single H1 |
| `text-h2` | 31 → 46 px fluid | Section titles |
| `text-h3` | 23 px | Card and group titles |
| `text-lead` | 19 → 22 px | The one sentence under a heading |
| `text-body` | 18 → 19 px | Default |
| `text-small` | 16 px | Captions, addresses, help text (the smallest size on the site) |

Text is left-aligned throughout and limited to `max-w-read` (~68 characters).

## Depth (17 Nov 2026)

| Token | Use |
|---|---|
| `shadow-soft` | Resting cards, photos on a band (`PhotoFrame elevated`) |
| `shadow-lift` | Raised elements: the hero's area-picker card, enquiry form, hovered cards |
| `card-lift` (utility) | Hover: lifts a card 3 px and deepens its shadow; no movement under reduced motion |
| `brass-rule` (utility) | A short brass line above a section title on photo-led sections |

## Photography (17 Nov 2026)

Real photos live in `public/photos/` and are listed in `src/content/photos.ts`. `PhotoFrame` shows each scene's default photo automatically (`scenePhotos`) and falls back to the illustration only when a scene has none (meal, and the per-home photo sets). Photos with recognisable people are `placeholder` until written consent is confirmed, so the production build blocks until then. Building, garden and room photos are `sourced`.

## Shape and spacing

- Radii: `rounded-control` 8 px (buttons, inputs), `rounded-card` 12 px, `rounded-photo` 4 px, `rounded-plate` 2 px.
- Sections: `py-12 / sm:py-16 / lg:py-20` (48 / 64 / 80 px, tightened 17 Nov 2026), all via `<Section>`. Section headings sit `mb-8 / lg:mb-10` above their content. Two neighbouring bands of the same colour share one padding, with a hairline between them (`globals.css`).
- Container: 1200 px max, 20 px gutters on phones and 32 px from `sm`.
- Breakpoints: mobile-first. `md` 768 (tablet), `lg` 1024 (full navigation), 1360 (header phone number).

## Logo (18 Nov 2026)

- **Horizontal logo** (`public/brand/swarnavihar-logo-horizontal.png`, 1228 × 403): emblem + "Swarnavihar" wordmark + tagline. Used in the header (56–64 px tall, no text beside it, since the logo carries the name) and in the footer on a white card (80–88 px), because the artwork is drawn for a light background.
- **Round logo** (`public/brand/swarnavihar-logo.png`, 640 px, transparent outside the circle): used only for small icons (favicon, app and home-screen icons), where the wide logo would be unreadable.
- Never stretch or recolour either version, or place them on a busy photo.

## Components

| Component | File | Notes |
|---|---|---|
| `Section`, `SectionHeading`, `Container` | `ui/Layout.tsx` | Tones: cream, paper, mist, sage. Heading layouts: left or split. |
| `Ph` | `ui/Layout.tsx` | Wraps any fact; adds the placeholder outline. |
| `ButtonLink`, `buttonClass` | `ui/Button.tsx` | Variants: primary, outline, quiet, light. Sizes: sm (44 px), md (48 px), lg (56 px). `className` is for layout only. |
| `Nameplate` | `ui/Nameplate.tsx` | Branch names only. Sizes sm, md, lg. |
| `PhotoFrame` | `ui/PhotoFrame.tsx` | Uses `next/image` when given `src`; until then it shows the matching illustration. Passing `src` is the only change needed to switch to a photo. |
| `Illustration` | `ui/Illustration.tsx` | 9 still-life scenes (verandah, tea, medical, recovery, room, meal, daily, festival, gate). Line art in sage and brass, no people. Composed in a 400×400 box with a safe centre, so any crop works. |
| `Icon` | `ui/Icon.tsx` | In-house line icons (24 px, 1.6 stroke), no icon library. 18 Nov added service and facility icons: hand, clock, bed, brain, cane, pulse, stroke, wheelchair, bandage, meal, laundry, puzzle, music, lotus, shield, pause, play. |
| `MobileActionBar` | `layout/` | Call, WhatsApp, Book a visit. Below 768 px only. |
| Menus (`NavMenu`, `MobileMenu`) | `layout/` | "Care services" is one plain list (no categories) with each service's icon (`Service.icon`) in a cream circle. "Our homes" is likewise one plain list of the 6 homes (house icon, name, area). |
| Facilities grid | `home/Facilities.tsx` | 8 icon tiles (`homeFacilities` in `content/care.ts`): one icon, title and one line each. Detail stays on /facilities/. |

## Motion

Three motion patterns, all turned off by `prefers-reduced-motion`:
1. A 280 ms fade-up (`reveal`) when a family **chooses** something (area picker, home tabs, mobile menu).
2. **Scroll reveal** (`ScrollReveal.tsx`, 17 Nov 2026): page bands (`Section`, on by default) fade up 12 px over 500 ms as soon as they enter the screen, once. Content already on the first screen is never hidden, and nothing is hidden without JavaScript.
3. **Count-up** (`CountUp.tsx`): headline numbers count up once when scrolled to. The real number is always in the HTML and announced to screen readers.
4. **"Glimpses of Swarnavihar" slideshow** (`home/GlimpsesSlideshow.tsx`, 18 Nov 2026): the **first section of the homepage**, a full-width slideshow (16–38 rem tall) of 8 photos (`heroSlides` in `content/photos.ts`), shown clearly with no dark wash. One photo at a time, crossfading (700 ms) every 2 s. A dark bar (caption, dots, Pause/Play, "See all photos") sits on the photo from tablet up and below it on phones. Autoplay stops with Pause, off screen, in a hidden tab, while the controls have keyboard focus, and never under reduced motion (WCAG 2.2.2). Only photos already shown plus the next are loaded. The headline section ("Care for your parents…", `home/Hero.tsx`) follows on a light cream band with the standard primary and outline buttons.
Plus slow photo zoom (1.04×) and card lift on hover.

## Writing

- Plain, warm and specific. Buttons say what happens: "Book a visit", "Request a callback", "Call +91…".
- Speak to the family ("your parent"), never "patients" or "inmates".
- Never state a number, capability or promise without a fact status. Unverified claims stay placeholders.

## Palette history (17 Nov 2026)
A darker olive-and-green palette was tried on 17 Nov and reverted the same day at the owner's request: the table above is the approved palette. The unused tokens `olive`, `meadow`, `sage-mid` and `on-sage-muted` remain defined for possible later use. Inside the dark `sage` band, secondary text and brass icons switch to their light versions automatically, and white cards on it keep normal dark text (see the end of `globals.css`).
