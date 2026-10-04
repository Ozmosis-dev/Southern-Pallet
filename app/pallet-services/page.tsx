import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Factory,
  Flame,
  Layers,
  type LucideIcon,
  Phone,
  Recycle,
  Ruler,
  Truck,
  Wrench,
} from "lucide-react";
import JsonLd from "@/components/seo/json-ld";
import PublicSiteShell from "@/components/public-site-shell";
import SharedFooter from "@/components/shared-footer";
import SharedHeader from "@/components/shared-header";
import {
  BUSINESS_ID,
  CONTACT,
  SERVICE_STATES,
  SITE_URL,
} from "@/lib/site-config";
import {
  PALLET_SERVICES_H1,
  palletIndustries,
  palletServices,
  palletServicesFaqs,
} from "@/lib/pallet-services-content";
import { createSocialMetadata } from "@/lib/social-metadata";

const description =
  "Pallet manufacturing, custom builds, heat treating, repair, recycling, and delivery from Southern Pallet Recycling in Poplarville, MS, serving the Southeast.";

export const metadata: Metadata = {
  title: "Pallet Services for Businesses",
  description,
  alternates: {
    canonical: "/pallet-services",
  },
  ...createSocialMetadata({
    title: "Pallet Services for Businesses Across the Southeast",
    description,
    path: "/pallet-services",
    card: "services",
  }),
};

const pageUrl = `${SITE_URL}/pallet-services`;

const palletServicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#services`,
      name: "Pallet services",
      itemListElement: palletServices.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          "@id": `${pageUrl}#${service.id}`,
          name: service.name,
          description: service.copy,
          url: `${pageUrl}#${service.id}`,
          provider: { "@id": BUSINESS_ID },
          areaServed: SERVICE_STATES.map((name) => ({
            "@type": "State",
            name,
          })),
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pallet Services",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: palletServicesFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.paragraphs.join(" "),
        },
      })),
    },
  ],
};

const startSteps = [
  "Tell us what you need: pallet type and size, quantity, how often you reorder, and any repair, recycling, or heat-treating work.",
  "We confirm specifications, availability, and delivery timing for your location.",
  "You receive a quote before anything is built, repaired, or shipped.",
];

const serviceIcons: Record<string, LucideIcon> = {
  manufacturing: Factory,
  custom: Ruler,
  "heat-treated": Flame,
  "recycled-supply": Layers,
  repair: Wrench,
  recycling: Recycle,
  delivery: Truck,
};

const heroStats = [
  ["60K", "Sq ft facility"],
  ["500K+", "Pallets recycled yearly"],
  ["8", "States served"],
];

const buttonBase =
  "inline-flex min-h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap px-6 text-sm font-bold uppercase tracking-[0.1em] transition-colors";

export default function PalletServicesPage() {
  return (
    <PublicSiteShell>
      <JsonLd data={palletServicesSchema} />
      <SharedHeader />

      <main className="pt-20">
        <section className="relative overflow-hidden bg-[var(--sp-forest)] text-white">
          <div className="sp-diagonal absolute inset-0 opacity-10" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl lg:grid-cols-[1fr_1.05fr]">
            <div className="flex flex-col justify-center px-6 py-20 lg:px-10 lg:py-28">
              <p className="sp-eyebrow text-[var(--sp-green)]">Pallet services</p>
              <h1 className="sp-display mt-6 max-w-3xl text-4xl sm:text-5xl xl:text-6xl">
                {PALLET_SERVICES_H1}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
                Southern Pallet Recycling manufactures, repairs, recycles, and
                delivers wood pallets from a 60,000 sq ft facility in
                Poplarville, Mississippi. One supplier covers new, custom,
                heat-treated, and recycled pallets for businesses across the
                Southeast.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-2">
                <Link
                  href="/contact"
                  className={`${buttonBase} bg-[var(--sp-green)] text-[var(--sp-forest-deep)] hover:bg-white`}
                >
                  Request a quote <ArrowRight className="size-4" />
                </Link>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className={`${buttonBase} border border-white/45 text-white hover:bg-white hover:text-[var(--sp-forest-deep)]`}
                >
                  <Phone className="size-4" /> {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="relative flex flex-col border-t border-white/15 bg-[radial-gradient(circle_at_60%_40%,rgba(34,197,94,0.16),transparent_62%)] lg:border-l lg:border-t-0">
              <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-10">
                <Image
                  src="/illustrations/gma-pallet-blueprint.svg"
                  alt="Blueprint illustration of a 48 x 40 inch GMA wood pallet stack with dimension lines and an ISPM-15 heat-treated stamp"
                  width={746}
                  height={626}
                  priority
                  unoptimized
                  className="sp-float h-auto w-full max-w-[560px]"
                />
              </div>
              <dl className="grid grid-cols-3 border-t border-white/20 bg-[var(--sp-forest-deep)]/80">
                {heroStats.map(([value, label], index) => (
                  <div
                    key={label}
                    className={`flex flex-col p-4 sm:p-6 ${index ? "border-l border-white/20" : ""}`}
                  >
                    <dt className="text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-white/60 sm:text-xs">
                      {label}
                    </dt>
                    <dd className="order-first text-xl font-semibold text-[var(--sp-green)] sm:text-2xl">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="bg-[var(--sp-paper)] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-6 border-b border-[var(--sp-rule)] pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="sp-eyebrow">What we do</p>
                <h2 className="sp-display mt-5 text-4xl text-[var(--sp-forest)] sm:text-5xl">
                  Everything your pallet program needs, from one supplier.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-[var(--sp-ink)]/68 lg:justify-self-end">
                Working with one pallet company for supply, repair, recycling,
                and delivery means fewer vendors to manage and one team that
                knows your specifications. The same crew that builds your new
                pallets can repair the ones coming back from the dock, buy the
                surplus you no longer need, and deliver replacements on our own
                trucks, so your pallet program runs on one schedule and one
                point of contact.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {palletServices.map((service, index) => {
                const Icon = serviceIcons[service.id] ?? Layers;
                return (
                  <article
                    key={service.id}
                    id={service.id}
                    className={`sp-card group relative flex scroll-mt-28 flex-col overflow-hidden border border-[var(--sp-rule)] bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-[var(--sp-green-dark)] hover:shadow-[0_22px_45px_-24px_rgba(16,44,27,0.45)] sm:p-8 ${
                      index === palletServices.length - 1
                        ? "md:col-span-2 lg:col-span-3"
                        : ""
                    }`}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--sp-green)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute -right-2 -top-4 select-none text-[6.5rem] font-semibold leading-none text-[var(--sp-forest)]/[0.05] transition-colors duration-300 group-hover:text-[var(--sp-green)]/[0.12]"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative flex size-12 items-center justify-center bg-[var(--sp-cream)] text-[var(--sp-forest)] transition-[background-color,color,transform] duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[var(--sp-forest)] group-hover:text-[var(--sp-green)]">
                      <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3 className="relative mt-6 text-2xl font-semibold leading-tight text-[var(--sp-forest)]">
                      {service.name}
                    </h3>
                    <p className="relative mt-4 max-w-2xl flex-1 text-sm leading-7 text-[var(--sp-ink)]/68">
                      {service.copy}
                    </p>
                    {service.link ? (
                      <Link
                        href={service.link.href}
                        className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--sp-green-dark)] hover:text-[var(--sp-forest)]"
                      >
                        {service.link.label}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="sp-grid py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
            <div>
              <p className="sp-eyebrow">Industries</p>
              <h2 className="sp-display mt-5 text-4xl text-[var(--sp-forest)] sm:text-5xl">
                Who we work with.
              </h2>
              <p className="mt-6 text-base leading-7 text-[var(--sp-ink)]/68">
                Any operation that ships, stores, or receives palletized goods
                needs a dependable pallet partner, including:
              </p>
              <ul className="mt-8 grid gap-3 border-t border-[var(--sp-rule)] pt-6 text-base font-semibold text-[var(--sp-ink)]/78 sm:grid-cols-2">
                {palletIndustries.map((industry) => (
                  <li key={industry} className="flex items-center gap-3">
                    <span className="size-1.5 shrink-0 bg-[var(--sp-green-dark)]" />
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="border border-[var(--sp-rule)] bg-[var(--sp-paper)] p-6 sm:p-10">
              <Image
                src="/illustrations/warehouse-palletized-loads.svg"
                alt="Illustration of wood pallets carrying cartons and stretch-wrapped loads on a warehouse floor"
                width={784}
                height={606}
                unoptimized
                className="h-auto w-full"
              />
            </figure>
          </div>
        </section>

        <section className="bg-[var(--sp-paper)] py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_1fr] lg:px-10">
            <figure className="order-last border border-[var(--sp-rule)] bg-[var(--sp-cream)] p-6 sm:p-10 lg:order-first">
              <Image
                src="/map.svg"
                alt="Map of the Southeastern United States showing the Southern Pallet Recycling pallet delivery region"
                width={628}
                height={463}
                unoptimized
                className="h-auto w-full"
              />
            </figure>
            <div>
              <p className="sp-eyebrow">Coverage</p>
              <h2 className="sp-display mt-5 text-4xl text-[var(--sp-forest)] sm:text-5xl">
                Where we serve.
              </h2>
              <p className="mt-6 text-base leading-7 text-[var(--sp-ink)]/68">
                Manufacturing, repair, and recycling happen at our primary
                facility at 119 Industrial Park Dr in Poplarville, Mississippi.
                Our satellite corporate office in Theodore, Alabama supports
                sales, account service, and scheduling.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {SERVICE_STATES.map((state) => (
                  <li
                    key={state}
                    className="border border-[var(--sp-rule)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--sp-forest)]"
                  >
                    {state}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[var(--sp-cream)] py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <div>
              <p className="sp-eyebrow">Getting started</p>
              <h2 className="sp-display mt-5 text-4xl text-[var(--sp-forest)] sm:text-5xl">
                How to start.
              </h2>
              <p className="mt-6 text-base leading-7 text-[var(--sp-ink)]/68">
                The minimum order for standard pallets is 25 units, and we work
                with businesses of every size.
              </p>
              <Image
                src="/illustrations/pallet-delivery-truck.svg"
                alt="Illustration of a flatbed truck delivering stacks of wood pallets across the Southeast"
                width={666}
                height={489}
                unoptimized
                className="mt-10 h-auto w-full max-w-md"
              />
            </div>
            <ol className="grid content-start gap-4">
              {startSteps.map((step, index) => (
                <li
                  key={step}
                  className="sp-card group flex gap-6 border border-[var(--sp-rule)] bg-white p-7 transition-[transform,border-color] duration-300 hover:translate-x-1 hover:border-[var(--sp-green-dark)]"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center bg-[var(--sp-forest)] text-sm font-bold text-[var(--sp-green)] transition-colors duration-300 group-hover:bg-[var(--sp-green)] group-hover:text-[var(--sp-forest-deep)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-7 text-[var(--sp-ink)]/78">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="sp-grid py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="border-b border-[var(--sp-rule)] pb-10">
              <p className="sp-eyebrow">Frequently asked questions</p>
              <h2 className="sp-display mt-5 max-w-3xl text-4xl text-[var(--sp-forest)] sm:text-5xl">
                Pallet services FAQ.
              </h2>
            </div>
            <div className="grid border-l border-[var(--sp-rule)] lg:grid-cols-2">
              {palletServicesFaqs.map((faq) => (
                <article
                  key={faq.question}
                  className="border-b border-r border-[var(--sp-rule)] bg-[var(--sp-paper)] p-7 sm:p-10"
                >
                  <h3 className="text-2xl font-semibold leading-tight text-[var(--sp-forest)]">
                    {faq.question}
                  </h3>
                  <div className="mt-5 space-y-4">
                    {faq.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-[var(--sp-ink)]/68 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--sp-forest)] py-20 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <h2 className="sp-display text-4xl sm:text-5xl">
                Get a quote for your pallet program.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                Tell us which services you need and where you are, and our team
                will follow up with options and pricing.
              </p>
            </div>
            <Link
              href="/contact"
              className={`${buttonBase} bg-[var(--sp-green)] text-[var(--sp-forest-deep)] hover:bg-white`}
            >
              Request a quote <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>

      <SharedFooter />
    </PublicSiteShell>
  );
}
