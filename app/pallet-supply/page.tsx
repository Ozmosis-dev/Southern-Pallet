import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
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
  PALLET_SUPPLY_H1,
  palletGrades,
  palletSupplyFaqs,
  palletSupplyOptions,
} from "@/lib/pallet-supply-content";
import { createSocialMetadata } from "@/lib/social-metadata";

const description =
  "Buy new, used, recycled, heat-treated, and custom wood pallets, including standard 48x40 GMA pallets, with delivery across the Southeast from Poplarville, MS.";

export const metadata: Metadata = {
  title: "New & Used Pallets for Sale",
  description,
  alternates: {
    canonical: "/pallet-supply",
  },
  ...createSocialMetadata({
    title: "Wood Pallets for Sale: New, Used, and Custom Sizes",
    description,
    path: "/pallet-supply",
    card: "supply",
  }),
};

const palletSupplySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/pallet-supply#service`,
      name: "Wood Pallet Supply",
      description:
        "New, recycled, heat-treated, and custom wood pallets, including standard 48x40 GMA pallets, with regional delivery.",
      url: `${SITE_URL}/pallet-supply`,
      provider: { "@id": BUSINESS_ID },
      serviceType: "Wood pallet supply and delivery",
      areaServed: SERVICE_STATES.map((name) => ({ "@type": "State", name })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Wood pallets",
        itemListElement: palletSupplyOptions.map((option) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: option.name,
            description: option.copy,
          },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pallet Supply",
          item: `${SITE_URL}/pallet-supply`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/pallet-supply#faq`,
      mainEntity: palletSupplyFaqs.map((faq) => ({
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

const orderSteps = [
  "Share the pallet size, grade or new build, quantity, and how often you need them.",
  "Add the delivery address, dock or forklift access, and your target date.",
  "Our team confirms availability and sends a quote before anything ships.",
];

export default function PalletSupplyPage() {
  return (
    <PublicSiteShell>
      <JsonLd data={palletSupplySchema} />
      <SharedHeader />

      <main className="pt-20">
        <section className="relative overflow-hidden bg-[var(--sp-forest)] text-white">
          <div className="sp-diagonal absolute inset-0 opacity-10" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center px-6 py-20 lg:px-10 lg:py-28">
              <p className="sp-eyebrow text-[var(--sp-green)]">Pallet supply</p>
              <h1 className="sp-display mt-6 max-w-3xl text-4xl sm:text-5xl xl:text-6xl">
                {PALLET_SUPPLY_H1}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
                Southern Pallet Recycling supplies new, used, recycled,
                heat-treated, and custom wood pallets to businesses across the
                Southeast, built and graded at our Poplarville, Mississippi
                facility and delivered on your schedule.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-2">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap bg-[var(--sp-green)] px-6 text-sm font-bold uppercase tracking-[0.1em] text-[var(--sp-forest-deep)] hover:bg-white"
                >
                  Request a pallet quote <ArrowRight className="size-4" />
                </Link>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap border border-white/45 px-6 text-sm font-bold uppercase tracking-[0.1em] text-white hover:bg-white hover:text-[var(--sp-forest-deep)]"
                >
                  <Phone className="size-4" /> {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="relative min-h-[360px] border-t border-white/15 lg:min-h-full lg:border-l lg:border-t-0">
              <Image
                src="/stacked-wood-pallets.webp"
                alt="Stacked 48x40 wood pallets ready for delivery from Southern Pallet Recycling"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </section>

        <section className="bg-[var(--sp-paper)] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-6 border-b border-[var(--sp-rule)] pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="sp-eyebrow">Inventory and availability</p>
                <h2 className="sp-display mt-5 text-4xl text-[var(--sp-forest)] sm:text-5xl">
                  Pallets in stock and built to order.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-[var(--sp-ink)]/68 lg:justify-self-end">
                Our 60,000 sq ft manufacturing and recycling facility keeps
                recycled 48x40 pallets moving through inspection and repair
                while new and custom pallets are built to order. Availability
                changes with demand, so tell us the size, grade, and quantity
                you need and we will confirm what can ship and when.
              </p>
            </div>
            <div className="grid border-l border-[var(--sp-rule)] sm:grid-cols-2 lg:grid-cols-4">
              {palletSupplyOptions.map((option) => (
                <article
                  key={option.name}
                  className="border-b border-r border-[var(--sp-rule)] p-7 sm:p-8"
                >
                  <h3 className="text-2xl font-semibold leading-tight text-[var(--sp-forest)]">
                    {option.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--sp-ink)]/68">
                    {option.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sp-grid py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="sp-eyebrow">Pallet grades</p>
              <h2 className="sp-display mt-5 text-4xl text-[var(--sp-forest)] sm:text-5xl">
                Recycled pallet grades, explained.
              </h2>
              <p className="mt-6 text-base leading-7 text-[var(--sp-ink)]/68">
                Grade names vary between suppliers, so ask what a grade means
                before you compare quotes. These are the grades we use when we
                sell used pallets.
              </p>
            </div>
            <div className="mt-12 grid border-l border-t border-[var(--sp-rule)] lg:grid-cols-3">
              {palletGrades.map((grade) => (
                <article
                  key={grade.name}
                  className="border-b border-r border-[var(--sp-rule)] bg-[var(--sp-paper)] p-7 sm:p-8"
                >
                  <h3 className="text-2xl font-semibold text-[var(--sp-forest)]">
                    {grade.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--sp-ink)]/68">
                    {grade.copy}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-12 max-w-3xl">
              <h3 className="text-2xl font-semibold text-[var(--sp-forest)]">
                What affects the cost of a 48x40 pallet?
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--sp-ink)]/68">
                A 48x40 pallet is priced by whether it is new, hybrid, or a
                recycled grade, along with lumber costs, heat treatment, order
                quantity, how often you reorder, and the delivery distance.
                Recycled 48x40 pallets start at $4.00 and new or hybrid pallets
                start at $9.50 per pallet. Your quote lists the pallet
                specification and delivery terms so you can compare suppliers
                on the same basis.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--sp-paper)] py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
            <div>
              <p className="sp-eyebrow">Ordering and delivery</p>
              <h2 className="sp-display mt-5 text-4xl text-[var(--sp-forest)] sm:text-5xl">
                How to order pallets.
              </h2>
              <p className="mt-6 text-base leading-7 text-[var(--sp-ink)]/68">
                We deliver with our own fleet throughout{" "}
                {SERVICE_STATES.slice(0, -1).join(", ")}, and{" "}
                {SERVICE_STATES.at(-1)}. Have surplus pallets instead? We also{" "}
                <Link
                  href="/recycle-pallets"
                  className="font-semibold text-[var(--sp-green-dark)] underline"
                >
                  buy and recycle used pallets
                </Link>{" "}
                and offer{" "}
                <Link
                  href="/pallet-services"
                  className="font-semibold text-[var(--sp-green-dark)] underline"
                >
                  pallet repair and other services
                </Link>
                .
              </p>
            </div>
            <ol className="grid border-l border-t border-[var(--sp-rule)]">
              {orderSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-6 border-b border-r border-[var(--sp-rule)] p-7"
                >
                  <span className="text-xs font-bold tracking-[0.12em] text-[var(--sp-green-dark)]">
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
                Pallet supply questions, answered.
              </h2>
            </div>
            <div className="grid border-l border-[var(--sp-rule)] lg:grid-cols-2">
              {palletSupplyFaqs.map((faq) => (
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
                Get a quote on your next pallet order.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                Tell us the size, grade, quantity, and delivery location, and
                our team will follow up with availability and pricing.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-[var(--sp-green)] px-6 text-sm font-bold uppercase tracking-[0.1em] text-[var(--sp-forest-deep)] hover:bg-white"
            >
              Request a pallet quote <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>

      <SharedFooter />
    </PublicSiteShell>
  );
}
