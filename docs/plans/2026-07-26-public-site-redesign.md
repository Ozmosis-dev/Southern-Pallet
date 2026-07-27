# Public Site Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply the Careers page's industrial editorial design system to every public Southern Pallet page while preserving behavior and leaving the private business-plan page unchanged.

**Architecture:** Public routes opt into a reusable `PublicSiteShell` and shared design tokens. Existing page components are refactored in place so anchors, forms, and SEO remain stable. Blog articles share an editorial article shell rather than duplicating page chrome.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, next/font, Node test runner, agent-browser.

---

### Task 1: Public design foundation

**Files:**
- Create: `components/public-site-shell.tsx`
- Create: `scripts/check-public-design.mjs`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `package.json`
- Modify: every public `app/**/page.tsx`

**Steps:**

1. Write a failing route test asserting every public page renders
   `data-public-site="true"` and `/private/business-plan` does not.
2. Run it against the feature server and confirm the expected failure.
3. Add Manrope and Barlow Condensed font variables, public-only design tokens,
   motion/focus rules, and `PublicSiteShell`.
4. Wrap all public pages, keeping the private page outside the shell.
5. Run the public-design, form, navigation, and TypeScript checks.
6. Commit as `Establish public site design system`.

### Task 2: Shared header and footer

**Files:**
- Modify: `components/shared-header.tsx`
- Modify: `components/shared-footer.tsx`

**Steps:**

1. Capture desktop/tablet/mobile baseline screenshots.
2. Add active navigation states, editorial typography, improved focus/pressed
   states, and consistent mobile drawer styling.
3. Refactor the footer into the new editorial grid while preserving contact and
   legal modal behavior.
4. Verify navigation and legal controls in the browser.
5. Commit as `Redesign public navigation and footer`.

### Task 3: Homepage sections

**Files:**
- Modify: `components/hero-section.tsx`
- Modify: `components/about-section.tsx`
- Modify: `components/products-section.tsx`
- Modify: `components/services-section.tsx`
- Modify: `components/environmental-section.tsx`
- Modify: `components/delivery-section.tsx`
- Modify: `components/faq-section.tsx`
- Modify: `components/contact-section.tsx`
- Modify: `app/page.tsx`

**Steps:**

1. Capture the current homepage at desktop and mobile widths.
2. Refactor the hero and each section into the approved alternating editorial
   system, preserving all anchor IDs and copy.
3. Restyle the quote form without changing its request payload or feedback.
4. Verify anchors, quote submission failure feedback, and responsive layout.
5. Commit as `Redesign homepage experience`.

### Task 4: Recycling page

**Files:**
- Modify: `app/recycle-pallets/page.tsx`
- Modify: `components/recycle-hero-section.tsx`
- Modify: `components/recycle-buy-section.tsx`
- Modify: `components/recycle-quote-section.tsx`
- Modify: `components/recycle-process-section.tsx`
- Modify: `components/recycle-cta-section.tsx`

**Steps:**

1. Capture desktop/mobile baselines.
2. Apply the shared hero, typography, spacing, surfaces, and form styles.
3. Preserve the existing recycling form payload, tracking, and feedback.
4. Verify the route, anchors, and form error state.
5. Commit as `Redesign recycling page`.

### Task 5: Blog index and articles

**Files:**
- Create: `components/blog-article-shell.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/where-to-buy-used-pallets/page.tsx`
- Modify: `app/blog/pallet-recycling-environmental-benefits/page.tsx`
- Modify: `app/blog/cost-effective-pallet-management-strategies/page.tsx`

**Steps:**

1. Capture the blog index and one article baseline.
2. Build the featured/supporting editorial index layout.
3. Extract shared article chrome and refactor all three article pages without
   changing their copy or metadata.
4. Verify article routes, back links, and mobile reading width.
5. Commit as `Redesign blog and article pages`.

### Task 6: Careers, thank-you, and completion

**Files:**
- Modify: `app/careers/page.tsx`
- Modify: `components/careers-application-form.tsx`
- Modify: `app/thank-you/page.tsx`
- Modify: `README.md`
- Modify: `env.example.txt`

**Steps:**

1. Replace Careers' hardcoded styling values with the public design tokens.
2. Redesign the thank-you page in the shared system.
3. Finish careers configuration documentation and expand the Vercel WAF rule
   to include `/api/careers`.
4. Run all form, navigation, public-design, TypeScript, and production-build
   checks.
5. Browser-check every public route at 1440 px, 900 px, and 390 px.
6. Request code review, address findings, and run fresh verification.
7. Commit as `Complete public site redesign`.
