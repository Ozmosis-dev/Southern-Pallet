import { pageImageSchema } from "@/lib/site-schema";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import PublicSiteShell from "@/components/public-site-shell";
import SharedHeader from "@/components/shared-header";
import SharedFooter from "@/components/shared-footer";
import JsonLd from "@/components/seo/json-ld";
import { BUSINESS_ID, CONTACT, SITE_URL } from "@/lib/site-config";
import { createSocialMetadata } from "@/lib/social-metadata";

const path = "/pallet-supply/heat-treated-pallets";
const description = "Order heat-treated wood pallets for export shipments from Southern Pallet Recycling in Poplarville, MS. Confirm size, marking, quantity, and delivery.";
export const metadata: Metadata = {
  title: "Heat Treated Pallets for Export",
  description,
  alternates: { canonical: path },
  ...createSocialMetadata({ title: "Heat-Treated Pallets for Export Shipments", description, path, card: "heat-treated" }),
};

const requirements = [
  { title: "Destination and customer requirements", copy: "Share the destination country and the receiver’s written pallet specification. Include your freight forwarder’s requirements so the order can be reviewed before the shipment is packed." },
  { title: "Size and handling", copy: "Specify the footprint, load weight, entry direction, and how the load will be stored or supported. A standard 48x40 footprint may fit your domestic operation; confirm the export receiver accepts it." },
  { title: "Quantity and schedule", copy: "Tell us the first order quantity, repeat-order needs, delivery ZIP code, and the date the pallets must be ready. Availability and delivery timing are confirmed with your quote." },
  { title: "Marking and receiving checks", copy: "Include any treatment-mark or documentation requirements in the purchase request. At receiving, check the supplied pallets against the agreed specification before loading your goods." },
];
const faqs = [
  { question: "Can I order heat-treated 48x40 pallets?", answer: "Southern Pallet Recycling supplies heat-treated wood pallets, including standard 48x40 options. Send the quantity, destination requirements, and delivery address so our team can confirm the build, availability, and price." },
  { question: "Is heat treatment the same as a pallet grade?", answer: "No. Grade A and Grade B describe a supplier’s recycled pallet condition. Heat treatment addresses wood packaging treatment requirements. Specify both the construction or condition you need and any export treatment requirement." },
  { question: "Does a new pallet automatically meet export requirements?", answer: "No. New construction alone does not establish ISPM 15 compliance. For destinations that require compliant wood packaging, confirm the required treatment and official mark before shipment." },
  { question: "How much do heat-treated pallets cost?", answer: "Request a quote for the size, build, treatment requirements, and quantity you need. Include delivery and repeat-order details. General pallet starting prices are not a quote for a heat-treated export order." },
];

export default function HeatTreatedPalletsPage() {
  return <PublicSiteShell>
      <JsonLd data={pageImageSchema("/pallet-supply/heat-treated-pallets", "/export-pallet-load.webp", "Wood pallet stacks beside wrapped and strapped cargo")} />
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Service", "@id": `${SITE_URL}${path}#service`, name: "Heat-treated wood pallet supply", description, url: `${SITE_URL}${path}`, provider: { "@id": BUSINESS_ID }, serviceType: "Heat-treated wood pallets for export shipments" },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Pallet Supply", item: `${SITE_URL}/pallet-supply` },
        { "@type": "ListItem", position: 3, name: "Heat-Treated Pallets", item: `${SITE_URL}${path}` },
      ] },
    ] }} />
    <SharedHeader />
    <main className="pt-20">
      <section className="bg-[var(--sp-forest)] text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.15fr_0.85fr]">
          <div className="px-6 py-16 lg:px-10 lg:py-24">
            <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap gap-x-3 gap-y-2 text-sm text-white/80">
              <Link href="/" className="underline underline-offset-4">Home</Link><span aria-hidden="true">/</span><Link href="/pallet-supply" className="underline underline-offset-4">Pallet supply</Link>
            </nav>
            <p className="sp-eyebrow text-[var(--sp-green)]">Export pallet supply</p>
            <h1 className="sp-display mt-6 text-4xl sm:text-5xl xl:text-6xl">Heat-treated pallets for your next export shipment.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">Southern Pallet Recycling supplies heat-treated wood pallets from Poplarville, Mississippi. Bring us your shipping specification, quantity, and required date so we can confirm the right pallet order.</p>
            <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--sp-green)] px-6 text-sm font-bold uppercase tracking-[0.08em] text-[var(--sp-forest-deep)] hover:bg-white">Request an export pallet quote <ArrowRight className="size-4 shrink-0" /></Link>
          </div>
          <div className="relative min-h-72 lg:min-h-full"><Image src="/export-pallet-load.webp" alt="Wood pallet stacks beside wrapped and strapped cargo" fill priority sizes="(min-width: 1024px) 1080px, (min-width: 432px) 100vw, 432px" className="object-cover" /></div>
        </div>
      </section>

      <section className="bg-[var(--sp-paper)] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div><p className="sp-eyebrow">Plan before packing</p><h2 className="sp-display mt-5 text-3xl text-[var(--sp-forest)] sm:text-4xl">Match the pallet to the destination.</h2></div>
          <div className="space-y-5 text-base leading-8 text-[var(--sp-ink)]/80">
            <p>Export orders need two decisions: a pallet that supports your product and equipment, and wood packaging that meets the destination’s requirements. Keep both in the same purchase specification.</p>
            <p>USDA APHIS advises exporters to check the destination’s wood packaging rules. Where ISPM 15 applies, obtain properly treated and officially marked packaging. Kiln-dried lumber or an unmarked new pallet alone does not establish compliance.</p>
            <p>Review the <a href="https://www.aphis.usda.gov/plant-exports/wood-packaging-material/export" className="font-semibold text-[var(--sp-green-dark)] underline underline-offset-4">USDA APHIS export guidance</a> with your freight forwarder before placing the order. Tell our team which requirements apply to your shipment.</p>
          </div>
        </div>
      </section>

      <section className="sp-grid py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="sp-eyebrow">Your quote checklist</p><h2 className="sp-display mt-5 max-w-3xl text-3xl text-[var(--sp-forest)] sm:text-4xl">Four details that make the order clear.</h2>
          <div className="mt-10 grid border-l border-t border-[var(--sp-rule)] md:grid-cols-2">{requirements.map((item,i)=><article key={item.title} className="border-b border-r border-[var(--sp-rule)] bg-[var(--sp-paper)] p-7 sm:p-10"><p className="text-sm font-bold text-[var(--sp-green-dark)]">0{i+1}</p><h3 className="mt-4 text-2xl font-semibold leading-tight text-[var(--sp-forest)]">{item.title}</h3><p className="mt-4 text-base leading-8 text-[var(--sp-ink)]/80">{item.copy}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-[var(--sp-paper)] py-16 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="sp-eyebrow">Before you order</p><h2 className="sp-display mt-5 text-3xl text-[var(--sp-forest)] sm:text-4xl">Heat-treated pallet questions.</h2>
        <div className="mt-10 grid gap-x-12 md:grid-cols-2">{faqs.map(faq=><article key={faq.question} className="border-t border-[var(--sp-rule)] py-8"><h3 className="text-2xl font-semibold leading-tight text-[var(--sp-forest)]">{faq.question}</h3><p className="mt-4 text-base leading-8 text-[var(--sp-ink)]/80">{faq.answer}</p></article>)}</div>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--sp-ink)]/80">Comparing domestic pallet options? Browse <Link href="/pallet-supply" className="font-semibold text-[var(--sp-green-dark)] underline">new, recycled, and custom wood pallets</Link> or read our <Link href="/blog/grade-a-vs-grade-b-pallets" className="font-semibold text-[var(--sp-green-dark)] underline">Grade A vs Grade B buying guide</Link>. Our <Link href="/locations/poplarville-ms" className="font-semibold text-[var(--sp-green-dark)] underline">Poplarville facility page</Link> has the manufacturing location and contact details.</p>
      </div></section>

      <section className="bg-[var(--sp-forest)] py-16 text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10"><div><h2 className="sp-display text-3xl sm:text-4xl">Send us your export pallet specification.</h2><p className="mt-4 max-w-2xl text-base leading-8 text-white/80">Include the destination, size, load, quantity, delivery address, and target date. Our team will confirm availability and pricing.</p></div><div className="flex shrink-0 flex-col gap-4"><Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--sp-green)] px-6 text-sm font-bold text-[var(--sp-forest-deep)] hover:bg-white">Request a quote <ArrowRight className="size-4" /></Link><a href={`tel:${CONTACT.phone}`} className="inline-flex min-h-12 items-center justify-center gap-3 text-base font-semibold underline underline-offset-4"><Phone className="size-4" />{CONTACT.phoneDisplay}</a></div></div></section>
    </main>
    <SharedFooter />
  </PublicSiteShell>;
}
