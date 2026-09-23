# Canonical hostname audit

Audit date: 2026-09-23

## Decision

The locked canonical hostname is `https://southernpallet.co` (non-`www`).

This matches the site's canonical metadata, `robots.txt` Host directive, sitemap URLs, structured-data URLs, and verified Google Search Console domain property.

## Live redirect battery

| Requested URL | Status | Location |
| --- | ---: | --- |
| `https://www.southernpallet.co/` | 301 | `https://southernpallet.co/` |
| `https://southernpallet.co/` | 200 | — |
| `https://www.southernpallet.co/recycle-pallets` | 301 | `https://southernpallet.co/recycle-pallets` |
| `https://southernpallet.co/recycle-pallets` | 200 | — |

Each `www` request reaches the corresponding non-`www` URL in one redirect. No trailing-slash redirect is added.

## Canonical and crawler signals

- The rendered non-`www` homepage contains `<link rel="canonical" href="https://southernpallet.co"/>`.
- `https://www.southernpallet.co/robots.txt` returns one 301 and finishes at `https://southernpallet.co/robots.txt` with status 200.
- The live robots file declares `Host: https://southernpallet.co`.
- The live robots file declares `Sitemap: https://southernpallet.co/sitemap.xml`.
- Google Search Console contains the verified property `sc-domain:southernpallet.co`; no separate Southern Pallet Recycling URL-prefix property appeared in the signed-in selector.

## Repository enforcement

- `next.config.ts` explicitly sets `trailingSlash: false`.
- `next.config.ts` applies a host-matched 301 from `www.southernpallet.co/:path*` to `https://southernpallet.co/:path*`.
- `lib/site-config.ts` defines `SITE_URL` as `https://southernpallet.co`.
- `app/robots.ts` derives its Host and sitemap values from `SITE_URL`.
- The SEO regression check covers the hostname redirect and explicit trailing-slash policy.

## Verification

- `npm run test:seo`: passed
- `npm run build`: passed with all 19 static pages generated

Recheck the four live URLs and Search Console property signals after 14 days. Do not create or update citations, the Google Business Profile website field, or directory listings to use a different hostname.
