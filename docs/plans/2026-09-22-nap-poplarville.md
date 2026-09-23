# Southern Pallet Recycling NAP Correction Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Southern Pallet Recycling and its Poplarville, Mississippi facility the consistent primary business identity and NAP across the website, structured data, careers experience, and citation guidance.

**Architecture:** Centralize the canonical business name and the roles of both locations in `lib/site-config.ts`; consume those values in schema and page content. Enforce the identity with source and rendered regression scripts, and document third-party listing conflicts separately because directory changes require owner access and evidence.

**Tech Stack:** Next.js 15 Metadata API, React 19, JSON-LD, Node-based audit scripts.

### Task 1: Lock the canonical identity in tests

**Files:**
- Modify: `scripts/check-seo-foundation.mjs`
- Modify: `scripts/check-rendered-seo.mjs`
- Modify: `scripts/check-public-design.mjs`
- Modify: `scripts/check-rendered-social-metadata.mjs`

1. Add assertions for `Southern Pallet Recycling`, the Poplarville primary address and geo, Theodore's satellite role, and Poplarville careers content.
2. Add a repository check preventing Summerford from appearing in public application code.
3. Run the affected tests and confirm they fail against the current Theodore-first, abbreviated-name implementation.

### Task 2: Correct the shared NAP and structured data

**Files:**
- Modify: `lib/site-config.ts`
- Modify: `lib/site-schema.ts`
- Modify: `app/layout.tsx`

1. Set the canonical business and legal name to Southern Pallet Recycling.
2. Make Poplarville the primary facility/address/geo and Theodore the satellite corporate office.
3. Make the LocalBusiness root address and geo Poplarville; list Poplarville first and Theodore second.
4. Run source SEO tests and confirm the shared-data assertions pass.

### Task 3: Correct careers and visible location hierarchy

**Files:**
- Modify: `app/careers/page.tsx`
- Modify: `components/careers-application-form.tsx`
- Modify: `app/api/careers/route.test.ts`
- Modify: `app/contact/page.tsx`
- Modify: `components/contact-section.tsx`
- Modify: `components/shared-footer.tsx`

1. Change careers metadata, H1, location copy, alt text, and application value to Poplarville, Mississippi.
2. Present Poplarville first as the primary manufacturing and recycling facility.
3. Relabel Theodore as the satellite corporate office and remove headquarters language.
4. Run careers/form and design checks.

### Task 4: Normalize the full business name sitewide

**Files:**
- Modify: public pages and shared components containing the abbreviated brand
- Modify: lead-delivery labels and route subjects
- Modify: social-card definitions and artwork
- Modify: test expectations

1. Replace customer-facing uses of Southern Pallet with Southern Pallet Recycling where the text names the business.
2. Preserve the abbreviated domain `southernpallet.co` and URLs.
3. Keep generic descriptive phrases such as “pallet team” unchanged.
4. Run source SEO and form tests.

### Task 5: Document citation conflicts and remediation

**Files:**
- Create: `docs/nap-citation-remediation.md`
- Modify: `AGENTS.md`
- Modify: `README.md`

1. Record the canonical NAP and location roles for future editors.
2. List verified Summerford conflicts and gaps on major citation platforms.
3. Provide a claim/suppress/create sequence and evidence checklist for the client.

### Task 6: Verify the full site

1. Run the production build.
2. Start the production preview.
3. Run rendered SEO, social, headings, links, image, navigation, design, and blog checks.
4. Run form tests, TypeScript, and `git diff --check`.
5. Perform a browser check of the homepage, contact page, and careers page.
