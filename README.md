# Southern Pallet — website

Marketing site for Southern Pallet (southernpallet.co / southernpalletcompany.com). Next.js (App Router), React 19, Tailwind CSS 4. No database, no server-side data storage — it's a static/marketing site with two lead-capture forms.

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
| `LEAD_NOTIFICATION_EMAIL` | Inbox that receives both lead types | Required for Resend |
| `LEAD_FROM_EMAIL` | Verified sender identity used by Resend | Required for Resend |
| `LEAD_WEBHOOK_URL` | Optional secondary destination for lead JSON | No |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | No — GTM script doesn't load at all if unset |
| `NEXT_PUBLIC_BUSINESS_PLAN_PASSWORD` | Gate value for `/private/business-plan` | No — defaults to `changeme` |

Nothing is required for the site to build and run, but at least one complete
lead-delivery channel must be configured before the forms can report success.

## Forms & lead capture

There are two forms, both under `app/api/*/route.ts`:

- **Contact / quote request** (`app/api/contact/route.ts`) — the main form at the bottom of the homepage.
- **Recycle / sell pallets** (`app/api/recycle/route.ts`) — the form on the recycle page.

Both routes validate their required contact fields and pass the lead to a shared
server-only delivery module:

- When `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, and `LEAD_FROM_EMAIL` are
  set, the complete lead is emailed through Resend. The submitter's email is
  used as Reply-To.
- When `LEAD_WEBHOOK_URL` is set, the same lead is also posted there as JSON.
  Zapier, Make, or a custom endpoint can use this optional secondary channel.
- If neither channel is configured, the API returns `503` instead of showing a
  false success. If every configured channel fails, it returns `502`.

There is still no database or server-side lead history. Resend and the optional
webhook are the delivery paths.

### Activating Resend on Vercel

1. Add Resend from the Vercel Marketplace or create a Resend account directly.
2. Verify the sending domain in Resend by adding its SPF and DKIM DNS records.
3. Add `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, and `LEAD_FROM_EMAIL` to the
   Vercel project's Production, Preview, and Development environments as needed.
4. Redeploy after the variables are set.

For production recipients, Resend requires `LEAD_FROM_EMAIL` to use a verified
domain. Keep all three values out of source control.

## Analytics / tag manager

Google Tag Manager is wired up but disabled by default (`NEXT_PUBLIC_GTM_ID` unset). Set it to your own GTM container ID (`GTM-XXXXXXX`) to enable it — see `app/layout.tsx`. There is no other analytics snippet in the codebase.

## The `/private/business-plan` page

This page shows an investor presentation behind a password prompt. Worth knowing before you rely on it: **the password check runs client-side** (see the comment in `app/private/business-plan/page.tsx`), so it ships to every visitor's browser and can be read out of the compiled JS — it hides the page from casual browsing, it is not real access control. If this content needs to stay actually confidential, replace it with server-side auth (middleware + a real session, or take the page down).

## SEO notes

- `robots.txt` currently points its sitemap at `southernpalletcompany.com`, a different domain from `southernpallet.co`. Worth confirming which domain is canonical and aligning `robots.txt` / `sitemap.xml` / the `metadataBase` in `app/layout.tsx` to match.
