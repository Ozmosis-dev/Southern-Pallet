# SEO Foundation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Establish one consistent canonical domain, complete crawl/index controls, accurate page metadata and structured data, and trustworthy on-page content for every public route.

**Architecture:** Keep the existing Next.js App Router site and information architecture. Centralize business and URL facts in one site configuration module, use Next.js metadata routes for `robots.txt` and `sitemap.xml`, and add small reusable SEO components for JSON-LD and blog article presentation. Public commercial pages remain indexable; conversion and private pages receive page-level `noindex` directives.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Next Metadata API, JSON-LD, Node-based repository checks.

## Audit baseline

### Critical

- The live/indexed site is `https://southernpallet.co`, but the root layout, hard-coded canonical link, sitemap, robots file, and organization schema use `https://www.southernpalletcompany.com`.
- The root layout emits a hard-coded homepage canonical on every route in addition to page metadata canonicals.
- `public/robots.txt` blocks `/_next/`, which can prevent crawlers from fetching resources needed to render the page.
- `public/sitemap.xml` includes the `noindex` thank-you route and uses stale or conflicting canonical URLs.
- `/private/business-plan` is blocked in robots but has no page-level `noindex`; a robots block can prevent crawlers from seeing a noindex instruction.

### High

- Page titles often include the brand while inheriting a branded title template, creating duplicate branding in rendered `<title>` values.
- Blog posts lack visible authorship/dates and `BlogPosting` structured data.
- Blog calls to action point to a nonexistent `/contact` route instead of the homepage contact section.
- Several blog claims are unsourced or describe capabilities not established elsewhere on the site (specific percentage savings, energy savings, carbon-neutral operations, renewable energy, software integration, and warranties).
- Organization and LocalBusiness schema duplicate the same entity, include unsupported or unverified facts, and use a non-working domain.

### Medium

- Homepage and recycling titles rely on “near me” phrasing instead of describing the actual Alabama, Mississippi, Gulf Coast, and Southeast relevance found in the page content.
- The homepage H1 is memorable but does not name the product or geographic offer.
- Social metadata repeats across pages and the declared Open Graph image dimensions do not match the source asset.
- Blog index cards use H3 headings without an H2 section level.

## Competitive benchmark

Current regional results consistently combine:

- A precise local or regional modifier (Alabama, Mobile, Gulf Coast, Southeast).
- Product and transaction vocabulary (new, recycled, custom, heat-treated, buy, sell, repair, deliver).
- Operational detail such as pallet sizes/grades, pickup/delivery, and facility coverage.
- A direct quote or pickup action.

Southern Pallet already has credible differentiators—an Alabama office, Mississippi manufacturing/recycling facility, new/recycled/custom product mix, recycling/buyback, and regional delivery. The implementation should surface those facts consistently without copying competitor language or inventing new claims.

## Task 1: Add a repeatable SEO foundation check

**Files:**

- Create: `scripts/check-seo-foundation.mjs`
- Modify: `package.json`

**Steps:**

1. Assert that no indexable source references the obsolete `.com` domain.
2. Assert that generated metadata routes exist and stale static files do not.
3. Assert that non-indexable routes have page-level robots metadata.
4. Assert that public routes are present in the sitemap and conversion/private routes are absent.
5. Assert that blog pages contain `BlogPosting`, publication/modification dates, semantic article markup, and working contact links.
6. Run the check before implementation and confirm it fails on the current state.

## Task 2: Centralize canonical site facts

**Files:**

- Create: `lib/site-config.ts`
- Modify: `app/layout.tsx`

**Steps:**

1. Define the canonical URL, contact details, offices, service states, default social image, and business entity ID once.
2. Rebuild root metadata around `https://southernpallet.co`.
3. Remove the manual canonical tag and keyword stuffing.
4. Replace duplicate entity schemas with a single factual `LocalBusiness`/`Organization` graph plus `WebSite`.
5. Keep GTM opt-in behavior unchanged.

## Task 3: Generate crawl controls from code

**Files:**

- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `app/private/layout.tsx`
- Delete: `public/robots.txt`
- Delete: `public/sitemap.xml`
- Modify: `app/thank-you/page.tsx`

**Steps:**

1. Allow public resources and disallow only API endpoints in robots.
2. Reference the canonical sitemap.
3. Include only the homepage, recycling page, blog index, and three public articles in the sitemap.
4. Add `noindex, nofollow` metadata to the private section and `noindex, follow` to the thank-you page.

## Task 4: Improve commercial page targeting and schema

**Files:**

- Modify: `app/page.tsx`
- Modify: `components/hero-section.tsx`
- Modify: `app/recycle-pallets/page.tsx`
- Modify: `components/recycle-hero-section.tsx`

**Steps:**

1. Write unique titles and descriptions that name the actual products, commercial action, and service region.
2. Align H1 copy with the titles while keeping the existing tone.
3. Correct recycling `Service` schema and connect it to the canonical business entity.
4. Add breadcrumbs for the recycling route.

## Task 5: Upgrade blog metadata, semantics, and content trust

**Files:**

- Create: `components/seo/json-ld.tsx`
- Create: `components/blog/article-header.tsx`
- Modify: `app/blog/page.tsx`
- Modify: all three `app/blog/*/page.tsx` article routes

**Steps:**

1. Add unique intent-aligned metadata and `article` Open Graph types.
2. Add visible byline and updated date, semantic `<article>` markup, `BlogPosting`, and breadcrumbs.
3. Replace unsupported quantitative and operational claims with practical, defensible guidance.
4. Improve headings, introductions, summaries, and internal links.
5. Point every quote CTA to `/#contact`.

## Task 6: Verify

**Commands:**

- `npm run test:seo`
- `npm run test:navigation`
- `npm run build`
- `npx eslint app components lib scripts`

**Expected:** All checks pass, the build completes, every public route renders, and generated `robots.txt`/`sitemap.xml` use one canonical domain.
