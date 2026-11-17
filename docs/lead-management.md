# Lead management: setup, deployment and operations

Swarnavihar's enquiries are handled by four Next.js API routes. Leads are saved to a Google Sheet and emailed to the team (over SMTP, for example Gmail, or through Resend). There is no database, no separate backend server and no admin dashboard: the team works from the Google Sheet. **No extra npm packages** are used: Google, Resend and Cloudflare are called over HTTPS with Node's built-in `fetch` and `crypto`, and SMTP uses Node's built-in `tls`.

```
Visitor's browser                               Vercel (Next.js API route)                        Services
─────────────────                               ─────────────────────────                         ────────
Form + Turnstile widget  ──POST JSON──▶  1 receive (JSON only, ≤10 KB)
                                         2 validate + sanitise
                                         4a rate limit (8 per IP / 10 min)
                                         3 verify Turnstile token  ───────────────────────────▶  Cloudflare
                                         4b duplicate protection (submission id, phone/email)
                                         5 Lead ID  SV-20261115-7K3F9Q
                                         6 append row  ───────────────────────────────────────▶  Google Sheets
                                         7 email  ─────────────────────────────────▶  SMTP (Gmail) or Resend → team inbox
                                         8 each failure handled on its own
                     ◀── 200 {leadId} ── 9 success only if Sheets OR email worked
                     ◀── 502 / 503 ───── otherwise: the form offers WhatsApp with the details pre-written
GA4 event (no personal data) ───────────────────────────────────────────────────────────────────────▶  Google Analytics
```

The rate limit (4a) runs **before** the Turnstile check (3), so a flood of requests is stopped without calling Cloudflare.

## 1. Endpoints

| Endpoint | Form | Sheet tab |
|---|---|---|
| `POST /api/leads/enquiry` | "Ask a question" on service pages | **Leads** |
| `POST /api/leads/callback` | "Get a call back" | **Callback Requests** |
| `POST /api/leads/schedule-visit` | "Schedule a visit" | **Visit Bookings** |
| `POST /api/leads/contact` | Contact page form | **Contact Messages** |

`/api/enquiry` is kept as a deprecated alias of `/api/leads/enquiry`.

**Request** (`Content-Type: application/json`, max 10 KB):

```json
{
  "name": "Priya Kulkarni", "phone": "98765 43210", "email": "",
  "branch": "wakad", "need": "medical", "service": "dementia-care-in-pune",
  "date": "2026-11-20", "message": "Mother, 82",
  "sourcePage": "/old-age-home-wakad-pune/",
  "utm": { "source": "google", "medium": "cpc", "campaign": "wakad", "term": "", "content": "" },
  "submissionId": "uuid-per-form-fill", "turnstileToken": "…", "company": ""
}
```

Rules: a name is always required. Visits, call-backs and enquiries need a 10-digit Indian mobile. Contact needs a phone **or** an email, plus a message. A visit date can't be in the past or more than a year ahead. `branch`, `need` and `service` must be values the site itself offers. Messages are capped at 500 characters. `company` is a hidden honeypot field.

**Responses**

| Status | Body | Meaning |
|---|---|---|
| 200 | `{ ok: true, leadId, saved, notified }` | Delivered to Sheets and/or email. `saved` / `notified` show which. |
| 200 | `{ ok: true, leadId, duplicate: true }` | Same submission or double click; the first lead's id is returned. |
| 422 | `{ ok: false, error: "invalid", fields }` | Field messages, shown next to the fields. |
| 403 | `verification_failed` | Turnstile failed. The form gets a fresh token. |
| 429 | `too_many_requests` | Over 8 submissions from one IP in 10 minutes. |
| 502 | `delivery_failed` | **Neither** Sheets nor email worked. Never reported as success. |
| 503 | `not_configured` | No destination configured (or no Turnstile secret in production). |
| 400 / 413 / 415 | `bad_request` / `payload_too_large` / `unsupported_media_type` | Malformed requests. |

## 2. What is stored

One spreadsheet with four tabs, all with the same columns:

| A | B | C | D | E | F | G | H | I | J | K | L | M–Q |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Lead ID | Submitted (IST) | Form | Status | Name | Phone | Email | Home | Care need / service | Preferred visit date | Message | Source page | UTM source, medium, campaign, term, content |

- **Status** starts as `New`. The team updates it (for example `Called`, `Visit booked`, `Admitted`, `Closed`). The website never reads it back.
- Every cell is written as text, so phone numbers keep their digits. Visitor text that starts with `=`, `+`, `-` or `@` is prefixed so it can never run as a formula.
- **Not stored:** IP addresses, browser details, or ordinary page views. Visitor activity goes only to GA4, without personal data.
- **Minimise medical data:** the forms ask for a care category, not a diagnosis. The message box is capped at 500 characters and tells families not to share medical records.

## 3. Environment variables

Copy `.env.example` to `.env.local` for development. In production, set them in **Vercel → Project → Settings → Environment Variables**.

| Variable | Exposed to browser? | Purpose |
|---|---|---|
| `GOOGLE_SHEETS_SPREADSHEET_ID` | No | Sheet id from its URL |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | No | `client_email` from the service account key |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | No | `private_key` from the key, one line with `\n` |
| `SMTP_HOST` | No | e.g. `smtp.gmail.com`. When set, email goes by SMTP |
| `SMTP_PORT` | No | `465` (default) or `587` |
| `SMTP_SECURE` | No | `tls` (465) or `starttls` (587); empty = chosen from the port |
| `SMTP_USER` | No | Mailbox that sends, e.g. the Gmail address |
| `SMTP_PASS` | No | Gmail **App Password** (16 letters; spaces are ignored) |
| `RESEND_API_KEY` | No | Resend API key; only used if `SMTP_HOST` is empty |
| `LEAD_EMAIL_FROM` | No | e.g. `Swarnavihar Website <you@gmail.com>`. Defaults to `SMTP_USER`. With Gmail it must be that address or a Gmail alias |
| `LEAD_EMAIL_TO` | No | Comma-separated recipients |
| `TURNSTILE_SECRET_KEY` | No | Turnstile secret |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes (by design) | Turnstile site key |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes (by design) | `G-XXXXXXXXXX` |

Only `NEXT_PUBLIC_*` values reach the browser. An automated test (`tests/security.test.ts`) fails if any browser code reads a server secret or imports the server lead code.

**Minimum to go live:** Turnstile (both keys) plus **at least one** of Google Sheets or email (SMTP or Resend). Both are strongly recommended, so a failure in one is caught by the other.

## 4. Google Cloud: service account (one time, about 10 minutes)

1. Go to <https://console.cloud.google.com/> → create a project, e.g. `swarnavihar-website`.
2. **APIs & Services → Library →** search **Google Sheets API → Enable**.
3. **IAM & Admin → Service Accounts → Create service account.**
   - Name: `swarnavihar-leads`. **Grant no project roles**: it only needs access to the one sheet you share with it.
4. Open the new service account → **Keys → Add key → Create new key → JSON**. A file downloads.
5. From that JSON, copy:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`. Paste the whole value including `-----BEGIN…` and `…END PRIVATE KEY-----\n`, keeping the `\n` sequences. In Vercel, paste it without surrounding quotes.
6. Store the JSON file in a password manager, then **delete it from Downloads**. Never commit it or email it.
7. If your organisation blocks key creation (`iam.disableServiceAccountKeyCreation`), an admin must allow it for this project.

**Rotating the key:** create a new key, update the Vercel variable, redeploy, then delete the old key in Google Cloud.

## 5. Google Sheet (one time)

1. Create a new Google Sheet, for example **"Swarnavihar Leads"**, in the business Google account (not a personal one).
2. **Share** it with the service account email as **Editor**. Untick "Notify people".
3. Share it with the team members who handle leads, and nobody else. Keep **General access: Restricted**.
4. Copy the id from the URL into `GOOGLE_SHEETS_SPREADSHEET_ID`: `docs.google.com/spreadsheets/d/`**`<this part>`**`/edit`.
5. Create the tabs and headers automatically, from the project folder with `.env.local` filled in:
   ```bash
   npm run leads:setup-sheet
   ```
   This creates **Leads**, **Callback Requests**, **Visit Bookings** and **Contact Messages** (if missing), writes the header row and freezes it. It's safe to run again.
6. Optional but useful:
   - Add a dropdown on column D (Status): **Data → Data validation**.
   - **Data → Protect sheets and ranges** → protect row 1, so headers can't be edited by accident.
   - Add a filter view per team member.

> **Don't rename the tabs.** The website writes to them by name. To rename, change `SHEET_TABS` in `src/lib/leads/types.ts` and redeploy.

## 6a. SMTP email (Gmail): the current setup

1. The Google account must have **2-Step Verification** on.
2. Go to <https://myaccount.google.com/apppasswords>, name it `Swarnavihar website`, **Create**. Copy the 16-letter password. It's shown once.
3. In `.env.local` (and later in Vercel):
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=you@gmail.com
   SMTP_PASS=abcdefghijklmnop
   LEAD_EMAIL_FROM="Swarnavihar Website <you@gmail.com>"
   LEAD_EMAIL_TO=you@gmail.com,admissions@example.com
   ```
4. Restart `npm run dev`, then submit a form. The email arrives from your Gmail address, and **Reply** goes to the family's email when they gave one.

The connection is always encrypted (TLS on 465, or STARTTLS on 587; the site refuses to send the password otherwise). Gmail allows about 500 emails a day, far more than this site needs. To stop the site sending, delete the App Password in your Google Account. If you later move to a domain mailbox (for example `leads@swarnaviharoldagehomes.com` on Google Workspace or Zoho), change only these variables.

## 6b. Resend: alternative to SMTP

1. Sign up at <https://resend.com>. Under **Domains**, add `swarnaviharoldagehomes.com` and add the DNS records it shows (SPF and DKIM) at your domain registrar. Wait until it shows **Verified**.
2. **API Keys → Create** with **Sending access** only, restricted to that domain → `RESEND_API_KEY`.
3. `LEAD_EMAIL_FROM` must use the verified domain, e.g. `Swarnavihar Website <leads@swarnaviharoldagehomes.com>`.
4. `LEAD_EMAIL_TO`: the admissions inbox or inboxes, comma-separated.

Each email has a subject like `New visit booking – Akshaya Nivas, Wakad – Priya Kulkarni (SV-20261115-7K3F9Q)`. It lists all the details with one-tap **Call** and **WhatsApp** links. For contact messages it sets **Reply-To** to the visitor's email. If the Sheet write failed, the subject starts with **[NOT SAVED]**, so the team adds the lead by hand. Emails use the Lead ID as an idempotency key, so a retry never sends twice.

## 7. Cloudflare Turnstile: bot protection

1. <https://dash.cloudflare.com> → **Turnstile → Add widget**. A free account is enough; the domain doesn't have to be on Cloudflare.
2. **Hostnames:** `swarnaviharoldagehomes.com`, `www.swarnaviharoldagehomes.com`, plus your Vercel preview domain if you test there.
3. **Widget mode: Managed.** The site renders it in interaction-only mode, so most people never see a challenge.
4. Copy the **site key** to `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the **secret key** to `TURNSTILE_SECRET_KEY`.
5. For local development and previews you can use Cloudflare's test keys, which always pass: site `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`.

In **production, a missing secret blocks all submissions (503)** rather than silently accepting bots. In development, a missing secret skips the check with a warning.

## 8. Google Analytics 4

1. <https://analytics.google.com> → **Admin → Create property** "Swarnavihar website" (time zone India, currency INR) → **Web stream** for `swarnaviharoldagehomes.com`.
2. Copy the **Measurement ID** (`G-…`) to `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
3. In the web stream, leave **Enhanced measurement** on. It records page views, including page changes inside the site.
4. Events the site sends. Mark the conversions under **Admin → Events → Mark as key event**:

| Event | When | Mark as key event? |
|---|---|---|
| `generate_lead` | Any successful form (GA4's recommended lead event) | ✅ |
| `schedule_visit` | Visit request saved | ✅ |
| `callback_request` | Call-back saved | ✅ |
| `enquiry_submit` | Service-page question saved | ✅ |
| `contact_submit` | Contact message saved | ✅ |
| `whatsapp_click` | Any WhatsApp link or button | ✅ |

   Parameters: `form_type`, `branch`, `need`, `service`, `page_path`, `link_location` (`hero`, `floating_button`, `mobile_bar`, `home_card`, `footer`, `form_fallback`…). Register `form_type`, `branch` and `link_location` as **custom dimensions** to report on them.
5. Events fire **only after the server confirms** the lead. A failed submission is never counted as a conversion. **No names, phone numbers, emails or messages are ever sent to GA.**
6. IP anonymisation is set in the config. If you advertise to EU visitors or your legal adviser requires it under India's DPDP Act, add a consent banner before enabling GA.

## 9. Deploying on Vercel

1. Push the project to a private GitHub repository and **Import** it in Vercel (framework: Next.js; build command `npm run build`).
2. Add the variables from section 3 under **Settings → Environment Variables**:
   - **Production:** real keys.
   - **Preview:** use the Turnstile test keys and a separate test sheet and recipient, so test leads don't reach the team.
3. **Note:** the production build runs `scripts/check-placeholders.ts` and **fails while placeholder content remains** (dummy phones, unconfirmed services and so on). That's deliberate. Clear the fix list in `PROJECT_STATUS.md` first, or deploy as a Preview while testing.
4. Add the domain under **Settings → Domains** (`swarnaviharoldagehomes.com` primary; `swarnavihar.org` redirect to it).
5. **Plan:** Vercel's free Hobby plan is for non-commercial use only, so a business site should use the **Pro** plan. Google Sheets API, the Resend free tier, Turnstile and GA4 have no cost at this site's expected volume.

**Go-live smoke test (5 minutes):**
1. Submit each form once: visit (homepage), call-back (a location page), question (a service page), contact (/contact/).
2. Check that a row appears in the right tab, with an IST time and a `New` status.
3. Check that each email arrives and that the Call and WhatsApp links work.
4. Check **GA4 → Reports → Realtime** shows `generate_lead` and the specific event.
5. Click a WhatsApp button and confirm the chat opens with the pre-written message.

## 10. When something fails

| Situation | What the visitor sees | What the team gets | What to do |
|---|---|---|---|
| Sheets down, email OK | Success with reference | Email marked **[NOT SAVED]** | Add the row by hand. Check the service-account share. |
| Email down, Sheets OK | Success with reference | Row in the Sheet, no email | Check the logs: `SMTP email failed: AUTH rejected: 535` = wrong or revoked App Password. Leads are safe in the Sheet. |
| Both down | "Didn't go through" + **Send on WhatsApp** with details pre-written, + Call | Nothing automatic | Check the Vercel logs for `[leads] … NOT DELIVERED`. |
| Turnstile fails | "Couldn't confirm you're not a robot", new token, WhatsApp/Call | — | Usually a blocked script or an old browser. |

**Logs:** Vercel → Project → **Logs**, filter `[leads]`. Log lines include the Lead ID but no personal details.

**Rate limits and duplicates** are kept in each server instance's memory (no database). They stop double clicks, retries and casual abuse. Turnstile is the main bot barrier. If abuse ever gets past both, add a hosted key-value store (for example Upstash Redis) to `src/lib/leads/guards.ts`.

## 11. Testing

```bash
npm test                 # unit + integration + security tests (no network, no real keys)
npm run typecheck
```

- `tests/leads.test.ts`: validation, sanitising, Lead IDs, IST time, JWT signing (verified with a real RSA key), token caching, row layout, formula-injection defence, email content, Turnstile, guards, config, sheet setup.
- `tests/leads-integration.test.ts`: the real route handlers with fake Google, Resend and Turnstile services. Covers all four tabs, partial and total failures, not configured, production without Turnstile, 422, 403, 429, honeypot, 400/413/415, retries, double clicks and simultaneous duplicates.
- `tests/security.test.ts`: no secrets in browser code, `.env.example` complete, env files git-ignored.
- `tests/smtp.test.ts`: the SMTP client against a fake mail server: plain, TLS and STARTTLS, refuses to log in without encryption, wrong password, unreachable server, header-injection defence, and the route returning 502 (never a false success) when email fails.
- `tests/whatsapp.test.ts`: page-specific WhatsApp messages and click-to-chat links.

## 12. Files

```
src/app/api/leads/{enquiry,callback,schedule-visit,contact}/route.ts   4 endpoints (one line each)
src/lib/leads/http.ts          request checks → pipeline → JSON response
src/lib/leads/pipeline.ts      the 9-step workflow
src/lib/leads/validate.ts      parsing, sanitising, rules
src/lib/leads/google-sheets.ts service-account JWT, token cache, row append
src/lib/leads/resend.ts        notification email content + Resend
src/lib/leads/smtp.ts          SMTP client (TLS / STARTTLS, no packages)
src/lib/leads/turnstile.ts     token verification
src/lib/leads/guards.ts        rate limit, duplicate and in-flight protection
src/lib/leads/config.ts        environment variables
src/lib/leads/sheet-setup.ts   + scripts/setup-sheet.ts (npm run leads:setup-sheet)
src/lib/lead-client.ts         browser: submit, UTM capture, submission id
src/lib/analytics.ts           browser: GA4 events
src/components/forms/          Turnstile widget, contact form
src/components/home/CallbackForm.tsx       visit / call-back / question form
src/components/layout/FloatingWhatsApp.tsx floating button (tablet and desktop)
src/components/analytics/SiteTracking.tsx  GA4 loader, UTM capture, WhatsApp click tracking
```
