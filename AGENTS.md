# Agent notes — Southern Pallet Recycling website

Context for AI coding agents working in this repo.

## What this is

A Next.js 15 / React 19 / Tailwind 4 marketing site for Southern Pallet Recycling, a pallet manufacturing/recycling company. No backend service, no database — it's a static-ish marketing site with two lead-capture forms that forward to an external webhook.

## Business identity and locations

- The exact public business name is **Southern Pallet Recycling**. “Southern Pallet” is only an abbreviated domain reference; do not use it as the business name in metadata, schema, citations, page copy, or form communications.
- The canonical primary NAP is **Southern Pallet Recycling, 119 Industrial Park Dr, Poplarville, MS 39470, (601) 746-5012**.
- Poplarville is the primary manufacturing, recycling, employment, and local-search location. Careers content must focus on Poplarville, Mississippi.
- **5695 Rabbit Creek Dr Ste 101, Theodore, AL 36582** is a satellite corporate office. Do not call it the headquarters or make it the primary LocalBusiness address.
- Summerford Pallet is a former partner that previously shared the Poplarville location and is no longer affiliated with Southern Pallet Recycling. Never imply a current connection or merge the two entities in structured data or citations.

## Key facts

- **No database.** Don't add one unless the site owner asks for lead history/reporting — the current design is intentionally stateless (see README.md "Forms & lead capture").
- **Forms live in `app/api/contact/route.ts` and `app/api/recycle/route.ts`.** Both forward to `process.env.LEAD_WEBHOOK_URL` if set, otherwise just log. Keep that pattern if you touch these files — don't hardcode a webhook URL or any other credential directly in source.
- **Analytics/GTM is opt-in via env var** (`NEXT_PUBLIC_GTM_ID` in `app/layout.tsx`). Don't hardcode a container ID.
- **`app/private/business-plan/page.tsx`** has a client-side-only password gate (documented in-file and in README.md). It is not real security — don't treat it as an access-control boundary, and don't add real secrets to a page it "protects."
- **Shared layout components** (`components/shared-header.tsx`, `components/shared-footer.tsx`) are used across most pages — check both usages before changing their props/behavior.
- **`app/blog/*`** pages are static content pages, not a CMS-backed blog — new posts are new files, not database rows.

## Conventions

- App Router (`app/`), not Pages Router.
- Tailwind utility classes directly in JSX; shared UI primitives in `components/ui/` (button, input, select, textarea) follow a shadcn-ish pattern.
- No test suite currently exists in this repo.

## Before you commit a secret

Don't. If a feature needs an API key or webhook URL, read it from `process.env` and document the variable in `env.example.txt` and README.md, the way `LEAD_WEBHOOK_URL` and `NEXT_PUBLIC_GTM_ID` already do.
