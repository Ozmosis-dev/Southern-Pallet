import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import PublicSiteShell from "@/components/public-site-shell";
import SharedHeader from "@/components/shared-header";
import SharedFooter from "@/components/shared-footer";
import JsonLd from "@/components/seo/json-ld";
import { BUSINESS_ID, CONTACT, PRIMARY_FACILITY, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { createSocialMetadata } from "@/lib/social-metadata";

const description =
  "Buy new and used wood pallets or request recycling in Poplarville, MS. Contact Southern Pallet Recycling for pallet specifications, delivery, and load review.";

export const metadata: Metadata = {
  title: "Wood Pallet Supply & Recycling in Poplarville, MS",
  description,
  alternates: { canonical: "/locations/poplarville-ms" },
  ...createSocialMetadata({ title: "Wood Pallets in Poplarville, Mississippi", description, path: "/locations/poplarville-ms", card: "poplarville" }),
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/locations/poplarville-ms#service`,
      name: "Pallet supply and recycling in Poplarville, Mississippi",
      description,
      url: `${SITE_URL}/locations/poplarville-ms`,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Poplarville", containedInPlace: { "@type": "State", name: "Mississippi" } },
      serviceType: ["Wood pallet supply", "Pallet manufacturing", "Pallet repair", "Pallet recycling and buyback"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Poplarville facility", item: `${SITE_URL}/locations/poplarville-ms` },
      ],
    },
  ],
};

const services = [
  { title: "New and recycled pallet supply", copy: "Source standard 48x40 GMA pallets, recycled Grade A and Grade B pallets, or new and hybrid builds. Tell us your product, handling equipment, quantity, and receiving requirements so we can review a suitable specification.", href: "/pallet-supply", label: "Compare wood pallet supply options" },
  { title: "Custom and heat-treated pallets", copy: "When a standard footprint does not fit, send the required dimensions, deck coverage, and loaded weight. For international shipping, identify the destination and ask about treatment and marking requirements with your quote.", href: "/pallet-services", label: "Explore custom pallet and treatment services" },
  { title: "Used pallet recycling and buyback", copy: "Have surplus or damaged wood pallets? Share a count, dimensions, condition, and load location. Purchase eligibility, repair options, and collection arrangements are confirmed after review of the inventory.", href: "/recycle-pallets", label: "Request a used pallet evaluation" },
];

export default function PoplarvillePage() {
  return (
    <PublicSiteShell>
      <JsonLd data={schema} />
      <SharedHeader />
      <main className="pt-20">
        <section className="bg-[var(--sp-forest)] text-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.15fr_0.85fr]">
            <div className="px-6 py-20 lg:px-10 lg:py-28">
              <p className="sp-eyebrow" style={{ color: "var(--sp-green)" }}>Poplarville · Pearl River County · Mississippi</p>
              <h1 className="sp-display mt-6 text-4xl sm:text-5xl xl:text-6xl">Wood pallet supply &amp; recycling in Poplarville, MS.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">Buy new and recycled wood pallets, discuss a custom build, or arrange a review of surplus inventory with Southern Pallet Recycling. Our Poplarville facility is the primary location for manufacturing, repair, recycling, and dispatch.</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex min-h-12 items-center gap-3 bg-[var(--sp-green)] px-6 text-sm font-bold text-[var(--sp-forest-deep)] hover:bg-white">Request a pallet quote <ArrowRight className="size-4" /></Link>
                <a href={`tel:${CONTACT.phone}`} className="inline-flex min-h-12 items-center gap-3 border border-white/40 px-6 text-sm font-bold hover:bg-white hover:text-[var(--sp-forest)]"><Phone className="size-4" />{CONTACT.phoneDisplay}</a>
              </div>
            </div>
            <div className="relative min-h-[320px] border-t border-white/20 lg:border-l lg:border-t-0">
              <Image src="/stacked-wood-pallets.webp" alt="Stacks of wood pallets prepared for business supply" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

        <section id="facility" className="sp-grid bg-[var(--sp-cream)] py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:px-10">
            <div>
              <p className="sp-eyebrow text-[var(--sp-green-dark)]">Where the work happens</p>
              <h2 className="sp-display mt-5 text-4xl text-[var(--sp-forest)] sm:text-5xl">A Mississippi facility. One team for your pallet needs.</h2>
              <p className="mt-6 text-base leading-7 text-[var(--sp-ink)]/75">The Poplarville manufacturing and recycling operation brings pallet production, inspection, repair, and recovery together at one primary facility. Businesses in Pearl River County can speak directly with the team about new orders, ongoing supply requirements, and surplus pallet loads.</p>
              <p className="mt-5 text-base leading-7 text-[var(--sp-ink)]/75">Regional delivery is coordinated from this operation. Provide the destination ZIP code and order details so we can confirm whether the route, quantity, and timing work for your site. Freight and timing are confirmed for each order.</p>
              <p className="mt-5 text-base leading-7 text-[var(--sp-ink)]/75">Theodore, Alabama is a satellite corporate office supporting sales and coordination. For manufacturing, recycling, or an arranged load handoff, confirm the Poplarville instructions with our team.</p>
            </div>
            <div className="self-start border border-[var(--sp-rule)] bg-[var(--sp-paper)] p-7 sm:p-10">
              <MapPin className="size-7 text-[var(--sp-green-dark)]" />
              <h3 className="mt-6 text-2xl font-semibold text-[var(--sp-forest)]">{SITE_NAME}</h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[var(--sp-green-dark)]">Primary manufacturing &amp; recycling facility</p>
              <address className="mt-6 text-xl not-italic leading-8 text-[var(--sp-forest)]">{PRIMARY_FACILITY.streetAddress}<br />{PRIMARY_FACILITY.addressLocality}, {PRIMARY_FACILITY.addressRegion} {PRIMARY_FACILITY.postalCode}</address>
              <dl className="mt-7 space-y-5 border-t border-[var(--sp-rule)] pt-6 text-sm leading-6">
                <div><dt className="font-bold text-[var(--sp-forest)]">Business hours</dt><dd className="text-[var(--sp-ink)]/75">Monday–Friday · 7:00 AM–4:00 PM Central</dd></div>
                <div><dt className="font-bold text-[var(--sp-forest)]">Call or email</dt><dd><a className="underline underline-offset-4" href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a><br /><a className="break-all underline underline-offset-4" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
              </dl>
              <a href="https://www.google.com/maps/search/?api=1&query=119+Industrial+Park+Dr+Poplarville+MS+39470" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-3 font-bold text-[var(--sp-green-dark)] underline underline-offset-4">Directions to the Poplarville facility <ArrowRight className="size-4" /></a>
              <p className="mt-5 text-sm leading-6 text-[var(--sp-ink)]/70">Planning a visit? Call to arrange order collection or a pallet drop-off with the team.</p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--sp-paper)] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="sp-eyebrow text-[var(--sp-green-dark)]">Supply · Build · Recover</p>
            <h2 className="sp-display mt-5 max-w-3xl text-4xl text-[var(--sp-forest)] sm:text-5xl">Choose the right next step for your inventory.</h2>
            <div className="mt-12 grid border-l border-t border-[var(--sp-rule)] lg:grid-cols-3">
              {services.map(service => <article key={service.href} className="flex flex-col border-b border-r border-[var(--sp-rule)] p-7 sm:p-9"><h3 className="text-2xl font-semibold text-[var(--sp-forest)]">{service.title}</h3><p className="mb-6 mt-5 text-base leading-7 text-[var(--sp-ink)]/75">{service.copy}</p><Link className="mt-auto min-h-11 font-semibold leading-6 text-[var(--sp-green-dark)] underline underline-offset-4" href={service.href}>{service.label}</Link></article>)}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--sp-rule)] bg-[var(--sp-cream)] py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-10">
            <div><h2 className="sp-display text-4xl text-[var(--sp-forest)]">Before you request a quote.</h2><p className="mt-6 text-base leading-7 text-[var(--sp-ink)]/75">For a supply order, include the footprint, preferred grade, quantity, loaded weight, and handling equipment. For a recycling request, include the dimensions, count, condition, and load location. For either request, tell us your target date and loading or unloading arrangements.</p><p className="mt-5 text-base leading-7 text-[var(--sp-ink)]/75">Not sure which grade to buy? Our <Link href="/blog/grade-a-vs-grade-b-pallets" className="font-semibold text-[var(--sp-green-dark)] underline underline-offset-4">Grade A versus Grade B pallet comparison</Link> explains the questions to ask before ordering recycled stock.</p></div>
            <div className="border-l-4 border-[var(--sp-green)] bg-[var(--sp-forest)] p-8 text-white"><h3 className="text-2xl font-semibold">Talk through the load with our team.</h3><p className="mt-5 text-base leading-7 text-white/75">Use one request to share the specification and destination. We will review the details and confirm availability, pricing, and handoff arrangements before an order or recovery is scheduled.</p><Link href="/contact" className="mt-7 inline-flex min-h-12 items-center gap-3 bg-[var(--sp-green)] px-6 text-sm font-bold text-[var(--sp-forest-deep)] hover:bg-white">Contact the Poplarville pallet team <ArrowRight className="size-4" /></Link></div>
          </div>
        </section>
      </main>
      <SharedFooter />
    </PublicSiteShell>
  );
}
