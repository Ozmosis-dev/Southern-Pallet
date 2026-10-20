import type { Metadata } from "next";
import Link from "next/link";
import BlogArticleShell from "@/components/blog-article-shell";
import { createSocialMetadata } from "@/lib/social-metadata";

const description =
  "Compare Grade A and Grade B recycled pallets: repairs, appearance, handling needs, and quote details. Choose a pallet specification that fits your business.";
const datePublished = "2026-10-19T09:00:00-04:00";
const dateModified = datePublished;

export const metadata: Metadata = {
  title: "Grade A vs Grade B Pallets: A Buying Guide",
  description,
  alternates: { canonical: "/blog/grade-a-vs-grade-b-pallets" },
  ...createSocialMetadata({ title: "Grade A vs Grade B: Choose the Right Recycled Pallet", description, path: "/blog/grade-a-vs-grade-b-pallets", card: "pallet-grades", article: { publishedTime: datePublished, modifiedTime: dateModified } }),
};

const comparison = [
  ["Condition", "Typically more uniform in appearance, with fewer visible repairs.", "Typically shows more repair work and variation in appearance."],
  ["Stringer repairs", "Ask which repairs, if any, are allowed in the quoted Grade A specification.", "May include companion stringers or other structural repairs; confirm what is allowed."],
  ["Common buying reason", "A customer receiving standard or a need for more uniform presentation.", "A cost-sensitive domestic shipment or internal move where repaired stock is acceptable."],
  ["Load performance", "Confirm the pallet design for the actual load and handling method.", "Confirm the pallet design and repairs for the actual load and handling method."],
  ["Export treatment", "Grade alone does not establish treatment or marking compliance.", "Grade alone does not establish treatment or marking compliance."],
];

export default function PalletGradesGuide() {
  return (
    <BlogArticleShell title="Grade A vs Grade B pallets: what should you buy?" description={description} image="/recycled-pallet-grade-comparison.webp" imageFit="contain" imageAlt="Two wood pallets showing different board wear and replacement wood" readTime="5 min read" path="/blog/grade-a-vs-grade-b-pallets" datePublished={datePublished} dateModified={dateModified}>
      <p className="text-xl leading-8">Two quotes can both say “48x40 used pallets” and still describe different inventory. Before you compare the unit price, compare the condition, repairs, handling requirements, and delivery terms.</p>
      <p>Grade A and Grade B are common descriptions for recycled wood pallets. Grade A generally means more uniform stock with fewer visible repairs; Grade B generally includes more repaired components. The labels are a starting point for a buying conversation, not a complete specification.</p>
      <p>Southern Pallet Recycling supplies <Link href="/pallet-supply">new and recycled wood pallets</Link> from its Poplarville, Mississippi operation. This guide helps you describe what you need before requesting a quote.</p>

      <h2>The practical difference between Grade A and Grade B</h2>
      <p>For a standard recycled 48x40 stringer pallet, look at the condition of the deck boards and the lengthwise supports called stringers. Ask the supplier to explain the repairs permitted in the grade being offered. A sample or current inventory photo is more useful than a grade name by itself.</p>
      <div role="region" aria-label="Grade A and Grade B pallet comparison" tabIndex={0} className="my-8 overflow-x-auto border border-[var(--sp-rule)] focus-visible:outline-2 focus-visible:outline-[var(--sp-green-dark)]">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm leading-6">
          <caption className="bg-[var(--sp-forest)] px-5 py-4 text-left font-semibold text-white">Recycled pallet grades at a glance</caption>
          <thead className="bg-[var(--sp-cream)]"><tr>{["Compare", "Grade A / #1", "Grade B / #2"].map(heading => <th scope="col" key={heading} className="border-b border-[var(--sp-rule)] p-4 font-bold">{heading}</th>)}</tr></thead>
          <tbody>{comparison.map(([label, a, b]) => <tr key={label}><th scope="row" className="border-b border-[var(--sp-rule)] p-4 align-top font-semibold">{label}</th><td className="border-b border-[var(--sp-rule)] p-4 align-top">{a}</td><td className="border-b border-[var(--sp-rule)] p-4 align-top">{b}</td></tr>)}</tbody>
        </table>
      </div>
      <p>Grade definitions vary among suppliers. USDA Forest Service research on repaired pallets found variation in the repairs included within named grades. Ask for the written condition criteria rather than assuming one supplier’s Grade A matches another’s. <a href="https://www.srs.fs.usda.gov/pubs/ja/ja_clarke002.pdf" target="_blank" rel="noopener noreferrer">Read the Forest Service research on repaired pallet performance.</a></p>

      <h2>When to consider Grade A</h2>
      <p>Start with Grade A when your receiving customer asks for it or when consistency of appearance matters to the shipment. Get the customer’s pallet specification before ordering: the required footprint, deck layout, permitted repairs, and cleanliness expectations may be more specific than “Grade A.”</p>
      <p>For example, if a distribution customer specifies no companion stringers, put that condition in the request. Do not rely on a grade label to communicate a requirement that can affect acceptance at the receiving dock.</p>

      <h2>When to consider Grade B</h2>
      <p>Consider Grade B for domestic shipments or internal handling where repaired pallets meet the written requirements. It can be worth comparing a repaired option when appearance is less important than a consistent, suitable specification.</p>
      <p>Explain the work the pallet must do. A pallet carrying a supported load on the floor faces different conditions from one placed in a rack or moved through automated equipment. Ask for a design and condition review before changing the pallet grade used in an existing operation.</p>

      <h2>What a grade does not tell you</h2>
      <h3>It is not a universal load rating</h3>
      <p>The grade does not tell us the product weight, how that weight is distributed, or how the pallet is supported. Include those details and the handling method in your quote request. Do not treat two pallets as interchangeable solely because they share a footprint and grade.</p>
      <h3>It does not establish export compliance</h3>
      <p>For a shipment that requires ISPM 15-compliant wood packaging, treatment and marking are separate from recycled grade. Confirm the destination requirements and the condition of the pallets being supplied. An old treatment mark on repaired stock should not be taken as proof of current compliance. <a href="https://www.aphis.usda.gov/plant-exports/wood-packaging-material/export" target="_blank" rel="noopener noreferrer">USDA APHIS explains treatment, marking, and reuse of wood packaging.</a></p>
      <h3>It does not define every customer’s receiving rules</h3>
      <p>Tell us about cleanliness, moisture, dimensions, and repair restrictions in your customer’s specification. If the customer requires new pallets or a particular construction, a higher recycled grade may still be the wrong choice.</p>

      <h2>Compare the delivered cost of the same specification</h2>
      <p>Ask each supplier to quote the same grade criteria, dimensions, quantity, and delivery destination. Confirm whether freight, treatment, sorting, or other requested work is included. A lower unit price for a different condition or service is not a like-for-like comparison.</p>
      <p>For repeat orders, include your expected order frequency and any seasonal variation. Confirm how substitutions or unavailable stock would be handled before relying on a particular grade for a scheduled shipment.</p>

      <h2>Your recycled pallet quote checklist</h2>
      <ul>
        <li>Footprint, deck coverage, and entry requirements.</li>
        <li>Product weight, weight distribution, and floor, rack, or conveyor use.</li>
        <li>Grade A or Grade B, with any specific restrictions on repairs.</li>
        <li>Customer receiving requirements and any export treatment needs.</li>
        <li>Quantity, repeat-order frequency, and required date.</li>
        <li>Delivery location, receiving hours, and unloading arrangements.</li>
      </ul>
      <p>If you are unsure which option fits, send the application details rather than guessing a grade. Our team can review <Link href="/pallet-supply">48x40 recycled, new, and custom pallet options</Link> with you. For surplus inventory instead of a purchase, use the <Link href="/recycle-pallets">used pallet recycling and buyback request</Link>.</p>
      <div className="bg-green-50">
        <h2>Get a quote for the pallet you actually need.</h2>
        <p>Share your size, load, quantity, preferred grade, and delivery location with Southern Pallet Recycling.</p>
        <Link href="/contact" className="inline-flex min-h-12 items-center bg-[var(--sp-forest)] px-5 font-semibold text-white">Request a recycled pallet quote</Link>
      </div>
    </BlogArticleShell>
  );
}
