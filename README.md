# Southern Pallet — website

Marketing site for Southern Pallet ([southernpallet.co](https://southernpallet.co)). Next.js (App Router), React 19, Tailwind CSS 4. No database, no server-side data storage — it's a static/marketing site with three submission forms.

## Stack

- **Framework:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS 4, shadcn-style UI primitives (`components/ui`)
- **Hosting:** designed for Vercel (zero-config `next build`)
- **Data storage:** none. Form submissions are stateless — see "Forms & lead capture" below.

## Deploying

The simplest path, no CLI required:

1. Push this repo to your own GitHub account/org (or upload it as-is — it doesn't depend on any GitHub-specific config).
2. In Vercel: **New Project → Import** the repo. Vercel auto-detects Next.js; no build settings need to change.
3. Set the environment variables below in the Vercel project (Settings → Environment Variables) before your first production deploy that needs them.
4. Point your domain's DNS at the new Vercel project once you're ready to cut over.

Local dev:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

See `env.example.txt` for the full list with comments. Summary:

| Variable | Purpose | Required? |
|---|---|---|
| `RESEND_API_KEY` | Server-side API key for email delivery | Required for Resend |
| `LEAD_NOTIFICATION_EMAIL` | Inbox that receives quote and recycling leads | Required for those Resend forms |
| `CAREERS_NOTIFICATION_EMAIL` | Comma-separated inboxes that receive career applications | Required for career delivery |
| `LEAD_FROM_EMAIL` | Verified sender identity used by Resend | Required for Resend |
| `LEAD_WEBHOOK_URL` | Optional secondary destination for lead JSON | No |
| `LEAD_DELIVERY_TIMEOUT_MS` | Outbound delivery timeout; defaults to 8000 ms | No |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | No — GTM script doesn't load at all if unset |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Google Analytics 4 measurement ID | No — GA script doesn't load at all if unset |
| `NEXT_PUBLIC_BUSINESS_PLAN_PASSWORD` | Gate value for `/private/business-plan` | No — defaults to `changeme` |

Nothing is required for the site to build and run, but at least one complete
lead-delivery channel must be configured before the forms can report success.

## Forms & lead capture

There are three forms under `app/api/*/route.ts`:

- **Contact / quote request** (`app/api/contact/route.ts`) — the main form at the bottom of the homepage.
- **Recycle / sell pallets** (`app/api/recycle/route.ts`) — the form on the recycle page.
- **General employment application** (`app/api/careers/route.ts`) — the
  application on `/careers`, including an optional PDF, DOC, or DOCX resume up
  to 5 MB.

All routes validate their required fields and pass the submission to a shared
server-only delivery module:

- When `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, and `LEAD_FROM_EMAIL` are
  set, the complete lead is emailed through Resend. The submitter's email is
  used as Reply-To.
- When `LEAD_WEBHOOK_URL` is set, the same lead is also posted there as JSON.
  Zapier, Make, or a custom endpoint can use this optional secondary channel.
  Career applications are email-only and are never sent to the webhook.
- Career applications use the comma-separated recipients in
  `CAREERS_NOTIFICATION_EMAIL`, so employment submissions can reach multiple
  hiring contacts while remaining separate from sales and recycling leads.
- If neither channel is configured, the API returns `503` instead of showing a
  false success. If every configured channel fails, it returns `502`.
- Resend requests use an idempotency key to prevent duplicate notification
  emails on a retry, and every delivery attempt has a bounded timeout.
- All three forms include a server-checked honeypot. The linked Vercel project
  also rate-limits POST requests to `/api/contact`, `/api/recycle`, and
  `/api/careers` to five per IP every ten minutes.
- Thank-you redirects keep conversion and UTM attribution in the URL without
  exposing names, email addresses, phone numbers, or messages.

There is still no database or server-side lead history. Resend and the optional
webhook are the delivery paths.

### Activating Resend on Vercel

1. Add Resend from the Vercel Marketplace or create a Resend account directly.
2. Verify the sending domain in Resend by adding its SPF and DKIM DNS records.
3. Add `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`,
   `CAREERS_NOTIFICATION_EMAIL`, and `LEAD_FROM_EMAIL` to the Vercel project's
   Production, Preview, and Development environments as needed.
4. Redeploy after the variables are set.

For production recipients, Resend requires `LEAD_FROM_EMAIL` to use a verified
domain. Keep all three values out of source control.

## Analytics / tag manager

Google Analytics 4 and Google Tag Manager are wired up independently and disabled by default. Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` to a GA4 measurement ID (`G-XXXXXXXXXX`) and/or `NEXT_PUBLIC_GTM_ID` to a GTM container ID (`GTM-XXXXXXX`) to enable them — see `app/layout.tsx`.

For the Southern Pallet GA4 property, set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` to `G-XGFY05LYNP` in the deployment environment and redeploy.

## The `/private/business-plan` page

This page shows an investor presentation behind a password prompt. Worth knowing before you rely on it: **the password check runs client-side** (see the comment in `app/private/business-plan/page.tsx`), so it ships to every visitor's browser and can be read out of the compiled JS — it hides the page from casual browsing, it is not real access control. If this content needs to stay actually confidential, replace it with server-side auth (middleware + a real session, or take the page down).

## SEO notes

- `https://southernpallet.co` is the canonical production origin. Keep redirects from any alternate domains at the hosting or DNS layer.
- Global organization metadata and structured data are defined in `app/layout.tsx` and `lib/site-config.ts`.
- Page-level titles, descriptions, canonicals, social tags, and article data live with each App Router page.
- `app/robots.ts` and `app/sitemap.ts` generate the crawl files. Do not add competing static files under `public/`.
- Run `npm run test:seo` for source-level checks and `npm run test:seo:rendered` against a running production build for rendered metadata checks.
