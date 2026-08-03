# Southern Pallet — website

Marketing site for Southern Pallet (`southernpallet.co`). Next.js (App Router), React 19, Tailwind CSS 4. No database, no server-side data storage — it's a static/marketing site with two lead-capture forms.

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
| `LEAD_WEBHOOK_URL` | Where the two lead forms POST their submissions | No — forms work without it, they just log instead of delivering |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | No — GTM script doesn't load at all if unset |
| `NEXT_PUBLIC_BUSINESS_PLAN_PASSWORD` | Gate value for `/private/business-plan` | No — defaults to `changeme` |

Nothing is required for the site to build and run; these just turn features on.

## Forms & lead capture

There are two forms, both under `app/api/*/route.ts`:

- **Contact / quote request** (`app/api/contact/route.ts`) — the main form at the bottom of the homepage.
- **Recycle / sell pallets** (`app/api/recycle/route.ts`) — the form on the recycle page.

Both routes do the same thing: validate the incoming JSON, log it server-side, and — if `LEAD_WEBHOOK_URL` is set — POST the form data as JSON to that URL. This is a blank slot, not a live connection: there is no existing webhook wired up, and nothing here depends on any particular provider. Point it at whatever you want to receive leads with — a Zapier "Catch Hook" trigger, a Make.com scenario, a custom endpoint you write — it's your choice entirely. There is no email-sending code and no database — the webhook is the only delivery path. If `LEAD_WEBHOOK_URL` is unset, submissions are logged to the server console only and go nowhere else, so set it before you rely on the forms for real leads.

## Analytics / tag manager

Google Tag Manager is wired up but disabled by default (`NEXT_PUBLIC_GTM_ID` unset). Set it to your own GTM container ID (`GTM-XXXXXXX`) to enable it — see `app/layout.tsx`. There is no other analytics snippet in the codebase.

## The `/private/business-plan` page

This page shows an investor presentation behind a password prompt. Worth knowing before you rely on it: **the password check runs client-side** (see the comment in `app/private/business-plan/page.tsx`), so it ships to every visitor's browser and can be read out of the compiled JS — it hides the page from casual browsing, it is not real access control. If this content needs to stay actually confidential, replace it with server-side auth (middleware + a real session, or take the page down).

## SEO notes

- `https://southernpallet.co` is the canonical site origin. Metadata, structured data, `robots.txt`, and `sitemap.xml` are generated from the shared settings in `lib/site-config.ts`.
