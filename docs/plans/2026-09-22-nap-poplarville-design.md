# Southern Pallet Recycling NAP and Location Design

## Source of truth

The public business name is **Southern Pallet Recycling**. The canonical local-business NAP is:

- Southern Pallet Recycling
- 119 Industrial Park Dr, Poplarville, MS 39470
- (601) 746-5012

Poplarville is the primary manufacturing, recycling, employment, and local-search location. The Theodore, Alabama address is a satellite corporate office and must never be presented as the headquarters, primary LocalBusiness address, or careers location.

Southern Pallet Recycling is not affiliated with Summerford Pallet. Summerford is a former partner that previously shared the Poplarville location. The website should not introduce Summerford into customer-facing marketing copy, but project guidance and citation-remediation documentation must preserve the separation fact so future editors do not recreate the conflict.

## Implementation approach

Use `lib/site-config.ts` as the canonical identity and location layer. Rename the location exports so their roles are explicit: a primary Poplarville facility and a Theodore satellite office. Generate LocalBusiness structured data from the primary facility and include the satellite only as a secondary `location`. Update sitewide brand strings, page metadata, social-card text, careers content/form values, footer labels, lead-email labels, and automated SEO expectations to use the full business name.

The contact page will list Poplarville first and describe it as the primary manufacturing and recycling facility. Theodore will remain visible as a satellite corporate office. Careers metadata, H1, visible location, image alt text, and application value will target Poplarville.

## Citation strategy

The website will publish one unambiguous primary NAP. External listings that still attach Summerford Pallet to 119 Industrial Park Dr must be handled as prior-occupant data, not merged into Southern Pallet Recycling. Corrections should be submitted from owner-controlled accounts with proof of occupancy and separation, while new Southern Pallet Recycling profiles use the canonical NAP exactly.

## Verification

Automated source and rendered checks will assert the exact business name, primary address/geo, secondary-office role, Poplarville careers focus, and unique social metadata. The production build and existing SEO, design, navigation, forms, images, headings, and internal-link checks must remain green.
