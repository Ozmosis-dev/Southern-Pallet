# Southern Pallet Public Site Redesign

## Objective

Unify every public page around the industrial editorial design introduced on
the Careers page. Preserve the site's content, SEO metadata, forms, anchors,
and routing. Leave `/private/business-plan` visually and functionally
unchanged.

## Design system

Public pages will opt into a dedicated `public-site` shell rather than changing
the global body styles. This keeps the private presentation isolated.

- **Display type:** Barlow Condensed for oversized, tightly tracked headings.
- **Body type:** Manrope for navigation, body copy, labels, and controls.
- **Core palette:** forest `#173b24`, deep ink `#102c1b`, cream `#f3f0e7`,
  paper `#fffef9`, sage `#6e7c72`, rule `#bdc8bd`, and safety green
  `#22c55e`.
- **Shapes:** square or minimally rounded surfaces, fine dividers, inset image
  frames, and tinted shadows.
- **Hierarchy:** eyebrow labels, large display headlines, short readable
  paragraphs, numbered section markers, and strong left alignment.
- **Texture:** a subtle pallet-grid pattern on cream sections and restrained
  diagonal linework on dark heroes.
- **Motion:** 200–300 ms color/transform transitions, clear pressed states,
  smooth anchors, and reduced-motion support.

## Shared chrome

The header keeps the existing destinations and quote action, uses the new fonts
and active-page treatment, and switches to its mobile drawer below the `xl`
breakpoint. The footer becomes a clearer editorial grid with a careers link,
facility details, contact routes, and legal controls.

## Homepage

The homepage keeps its current section order and anchor IDs. The hero adopts a
split image/content composition. About, products, services, environmental,
delivery, FAQ, and contact sections are reshaped into alternating cream, paper,
and forest panels with asymmetrical grids and consistent typography. Existing
form routing and tracking remain intact.

## Recycling page

The recycling page uses the same hero grammar, section labels, typography,
buttons, and surfaces as the homepage and Careers page. Its buyback form keeps
the same behavior but adopts the shared form hierarchy and inline feedback.

## Blog and articles

The blog index becomes an editorial grid with one featured article and two
supporting articles. Article pages use a consistent dark title band, metadata
row, readable cream article canvas, styled headings/lists/callouts, and a clear
return path. Article copy and metadata remain unchanged.

## Careers and thank-you

Careers keeps its current structure while adopting the shared font variables
and tokens. The thank-you page becomes a concise confirmation experience with
the same visual language and clear next actions.

## Verification

Automated checks will assert that every public route renders within the
`public-site` shell while the private business-plan page does not. Existing
form and navigation tests remain required. Browser verification covers all
public routes at desktop, tablet, and mobile widths with screenshots and
framework-error checks.
