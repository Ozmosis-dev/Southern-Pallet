# Commercial content batch implementation plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the reviewed keyword research into a locally previewable content batch for qualified pallet supply and recovery inquiries.

**Architecture:** Extend existing App Router pages and shared editorial styling. Add one factual Poplarville facility page and one grade-comparison article; retain the stateless forms and canonical business entity. Do not create unverified city pages or new delivery/pricing promises.

**Tech stack:** Next.js 15, React 19, TypeScript, Tailwind 4, JSON-LD.

1. Extend `app/pallet-supply/page.tsx` with a specification and repeat-order checklist; link the new grade guide and facility page.
2. Add a seller preparation section to `app/recycle-pallets/page.tsx`, covering load review, ownership, photos, and pickup access without inventing acceptance policies or payouts.
3. Create `app/locations/poplarville-ms/page.tsx` using canonical facility data, service links, quote action, and Service/breadcrumb schema referencing the existing business ID.
4. Create `app/blog/grade-a-vs-grade-b-pallets/page.tsx` with a comparison, buyer checklist, source links, article metadata, and the shared article shell. Correct the shell's fixed visible date.
5. Connect the pages through the blog index, public footer, commercial pages, unique social cards, and sitemap. Set factual per-route modification dates for changed pages.
6. Extend the existing SEO, headings, social, and blog check inventories. Run build, TypeScript/ESLint, source SEO/recycling checks, and rendered SEO/link/editorial checks against a local production server.
7. Inspect desktop and mobile browser rendering and open the local batch for user review. No deployment in this task.

Research basis: Search Console reviewed October 17, 2026 (July 15–October 14 and September 17–October 14 windows). Recycling has the strongest observed non-brand visibility; supply is commercially valuable but its new route had not been indexed. Search impressions are not keyword-market volume. Geographic expansion beyond Poplarville requires confirmed delivery/customer evidence.
