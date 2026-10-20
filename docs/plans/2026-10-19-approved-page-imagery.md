# Approved Page Imagery Implementation Plan

**Goal:** Integrate five approved illustrative images and retain a natural photographic style for future work.

**Architecture:** Retain next/image and existing page layouts. Export optimized WebP page masters and JPEG social sources; use photo-first social cards only for the five approved pages and bump the cache version. Keep logos and location/careers evidence intact.

**Tech Stack:** Next.js 15, React 19, Tailwind 4, sharp.

1. Save the natural-image preference in AGENTS.md. Export approved masters to public with descriptive names and optimize transfers; retain review masters outside the deployed assets.
2. Update homepage/recycle hero components, supply/heat-treated pages, grade article and blog thumbnail. Describe visible content without location, treatment or grading claims. Keep the comparison contained so both pallets remain visible.
3. Update lib/social-cards.ts, lib/site-config.ts and social-card-image.tsx with five photo-first previews. Update article schema through its image prop; add page representative-image schema separately from business location evidence.
4. Run npm run build, image source/rendered checks, social and SEO rendered checks, and links. Review desktop/mobile screenshots and responsive image transfers; fix any crop problems.
5. Review diff and record deployment readiness; do not deploy until requested.
