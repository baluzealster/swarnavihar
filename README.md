# Swarnavihar Old Age Homes — website

Next.js (App Router) · TypeScript · Tailwind CSS 4. Hosted on Vercel.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run check:content   # lists every placeholder fact still in src/content
npm run build        # production build (blocked on Vercel production while placeholders remain)
npm test             # unit, integration and security tests
npm run leads:setup-sheet   # one-time: create the 4 tabs + headers in the leads Google Sheet
npm run seo:check-urls      # which old WordPress URLs still need a page (blocks production builds)
```

Lead forms, Google Sheets, email, Turnstile, WhatsApp and GA4: see **[docs/lead-management.md](docs/lead-management.md)**. SEO: **[docs/seo/](docs/seo/)**. Copy `.env.example` to `.env.local` to configure.

## Where things live

| Path | What |
|---|---|
| `src/content/` | All business facts (branches, services, stats, team, FAQ). Each fact is `verified`, `sourced` or `placeholder`. |
| `src/components/ui/` | Design-system components |
| `src/components/layout/` | Header, footer, mobile menu, mobile action bar |
| `src/components/home/` | Homepage sections |
| `src/app/globals.css` | Design tokens |
| `next.config.ts` | Redirects for old WordPress URLs, security headers |
| `src/app/api/leads/` + `src/lib/leads/` | Lead API (Sheets + email + Turnstile) |
| `docs/` | Audit, fact sheet, URL map, design system, photography brief |
| `PROJECT_STATUS.md` | Progress and the pre-launch fix list |

## Updating a fact

Edit the value in `src/content/…` and change `placeholder(...)` to `verified(...)`. The dashed outline disappears and the item drops off `npm run check:content`.
