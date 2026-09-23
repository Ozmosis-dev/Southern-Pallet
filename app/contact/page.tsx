import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import ContactSection from "@/components/contact-section";
import JsonLd from "@/components/seo/json-ld";
import PublicSiteShell from "@/components/public-site-shell";
import SharedFooter from "@/components/shared-footer";
import SharedHeader from "@/components/shared-header";
import { localBusinessSchema } from "@/lib/site-schema";
import { createSocialMetadata } from "@/lib/social-metadata";

const description =
  "Request a wood pallet quote from Southern Pallet Recycling for new, recycled, heat-treated, or custom pallets, pickup, repair, recycling, and delivery.";

export const metadata: Metadata = {
  title: "Contact Our Pallet Team",
  description,
  alternates: {
    canonical: "/contact",
  },
  ...createSocialMetadata({
    title: "Contact Southern Pallet Recycling for a Wood Pallet Quote",
    description,
    path: "/contact",
    card: "contact",
  }),
};

const facilities = [
  {
    index: "01",
    label: "Primary manufacturing & recycling facility",
    city: "Poplarville, Mississippi",
    address: ["119 Industrial Park Dr", "Poplarville, MS 39470"],
    description:
      "Primary operations for pallet manufacturing, repair, recycling, inventory, dispatch, and employment.",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Southern+Pallet+Recycling+119+Industrial+Park+Dr+Poplarville+MS+39470",
  },
  {
    index: "02",
    label: "Satellite corporate office",
    city: "Theodore, Alabama",
    address: ["5695 Rabbit Creek Dr Ste 101", "Theodore, AL 36582"],
    description:
      "A secondary office supporting sales, account service, scheduling, and regional coordination.",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Southern+Pallet+Recycling+5695+Rabbit+Creek+Dr+Ste+101+Theodore+AL+36582",
  },
];

export default function ContactPage() {
  return (
    <PublicSiteShell>
      <JsonLd data={localBusinessSchema} />
      <SharedHeader />

      <main data-contact-page="true" className="pt-20">
        <section className="overflow-hidden border-b border-[var(--sp-rule)] bg-[var(--sp-cream)]">
          <div className="mx-auto grid min-h-[610px] max-w-[1600px] lg:grid-cols-[1.02fr_0.98fr]">
            <div className="sp-grid flex items-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="h-px w-12 bg-[var(--sp-green-dark)]" />
                  <p className="sp-eyebrow">Direct access to our pallet team</p>
                </div>

                <h1 className="sp-display mt-8 text-6xl text-[var(--sp-forest)] sm:text-7xl xl:text-[5.6rem] xl:leading-[0.96]">
                  Request a wood
                  <br />
                  pallet quote.
                </h1>

                <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--sp-ink)]/68">
                  Tell us the size, volume, condition, and delivery window. Our
                  team will turn the details into a practical pallet plan and a
                  clear quote. You can also compare our{" "}
                  <Link
                    href="/#products"
                    className="font-semibold text-[var(--sp-forest)] underline decoration-[var(--sp-green-dark)] underline-offset-4 hover:text-[var(--sp-green-dark)]"
                  >
                    wood pallet product options
                  </Link>{" "}
                  or learn more about{" "}
                  <Link
                    href="/#about"
                    className="font-semibold text-[var(--sp-forest)] underline decoration-[var(--sp-green-dark)] underline-offset-4 hover:text-[var(--sp-green-dark)]"
                  >
                    our family-owned pallet company
                  </Link>{" "}
                  before sending your request.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex min-h-13 items-center justify-between gap-8 bg-[var(--sp-forest)] px-6 text-sm font-bold text-white hover:bg-[var(--sp-forest-deep)]"
                  >
                    Start your request
                    <ArrowDown className="size-4 text-[var(--sp-green)]" />
                  </a>
                  <a
                    href="tel:+16017465012"
                    className="inline-flex min-h-13 items-center justify-between gap-8 border border-[var(--sp-forest)] px-6 text-sm font-bold text-[var(--sp-forest)] hover:bg-[var(--sp-forest)] hover:text-white"
                  >
                    Call (601) 746-5012
                    <Phone className="size-4" />
                  </a>
                </div>

                <div className="mt-14 grid border-l border-t border-[var(--sp-rule)] sm:grid-cols-3">
                  {[
                    ["01", "Quotes", "Most returned within one business hour"],
                    ["02", "Delivery", "Regional fleet serving the Southeast"],
                    ["03", "Support", "One team from quote through delivery"],
                  ].map(([index, label, copy]) => (
                    <div
                      key={index}
                      className="border-b border-r border-[var(--sp-rule)] p-5"
                    >
                      <span className="text-xs font-bold text-[var(--sp-green-dark)]">
                        {index}
                      </span>
                      <p className="mt-4 text-sm font-bold text-[var(--sp-forest)]">
                        {label}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-[var(--sp-sage)]">
                        {copy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[430px] lg:min-h-full">
              <Image
                src="/used-wood-pallets-recycling.jpg"
                alt="Stacks of used wood pallets ready for Southern Pallet Recycling pickup and recycling"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--sp-forest-deep)]/85 via-[var(--sp-forest)]/10 to-transparent" />
              <div className="sp-diagonal absolute inset-0 opacity-20" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10 lg:p-12">
                <p className="sp-eyebrow !text-[var(--sp-green)]">
                  Pallet supply · recycling · delivery
                </p>
                <p className="mt-4 max-w-lg text-xl font-semibold leading-8 sm:text-2xl">
                  Straight answers from people who understand production,
                  freight, and recovery programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />

        <section
          aria-labelledby="facility-heading"
          className="sp-grid border-t border-[var(--sp-rule)] bg-[var(--sp-cream)] py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-8 border-b border-[var(--sp-rule)] pb-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <p className="sp-eyebrow">Where the work happens</p>
                <h2
                  id="facility-heading"
                  className="sp-display mt-5 max-w-3xl text-5xl text-[var(--sp-forest)] sm:text-6xl"
                >
                  Two facilities. One responsive team.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-[var(--sp-ink)]/68 lg:justify-self-end">
                Poplarville is our primary manufacturing, recycling, and
                employment location. Our Theodore satellite office supports
                sales, account service, and regional coordination.
              </p>
            </div>

            <div className="grid border-l border-[var(--sp-rule)] lg:grid-cols-2">
              {facilities.map((facility) => (
                <article
                  key={facility.label}
                  className="group border-b border-r border-[var(--sp-rule)] bg-[var(--sp-paper)] p-7 sm:p-9 lg:p-11"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-bold text-[var(--sp-green-dark)]">
                      {facility.index}
                    </span>
                    <MapPin className="size-6 text-[var(--sp-green-dark)]" />
                  </div>
                  <p className="sp-eyebrow mt-10">{facility.label}</p>
                  <h3 className="sp-display mt-3 text-3xl text-[var(--sp-forest)] sm:text-4xl">
                    {facility.city}
                  </h3>
                  <address className="mt-6 not-italic text-base font-semibold leading-7 text-[var(--sp-ink)]/80">
                    {facility.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <p className="mt-5 max-w-lg text-sm leading-6 text-[var(--sp-sage)]">
                    {facility.description}
                  </p>
                  <a
                    href={facility.directions}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-3 border-b border-[var(--sp-green-dark)] pb-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--sp-forest)] hover:text-[var(--sp-green-dark)]"
                  >
                    Get directions
                    <ArrowUpRight className="size-4" />
                  </a>
                </article>
              ))}
            </div>

            <div className="grid border-x border-b border-[var(--sp-rule)] bg-[var(--sp-forest)] text-white md:grid-cols-3">
              <div className="flex gap-4 border-b border-white/15 p-6 md:border-b-0 md:border-r lg:p-8">
                <Clock3 className="mt-1 size-5 shrink-0 text-[var(--sp-green)]" />
                <div>
                  <p className="text-sm font-bold">Business hours</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Monday–Friday · 7:00 AM–4:00 PM CST
                  </p>
                </div>
              </div>
              <a
                href="tel:+16017465012"
                className="flex gap-4 border-b border-white/15 p-6 hover:bg-white/5 md:border-b-0 md:border-r lg:p-8"
              >
                <Phone className="mt-1 size-5 shrink-0 text-[var(--sp-green)]" />
                <div>
                  <p className="text-sm font-bold">Call direct</p>
                  <p className="mt-2 text-sm text-white/65">(601) 746-5012</p>
                </div>
              </a>
              <a
                href="mailto:info@southernpallet.co"
                className="flex gap-4 p-6 hover:bg-white/5 lg:p-8"
              >
                <Mail className="mt-1 size-5 shrink-0 text-[var(--sp-green)]" />
                <div>
                  <p className="text-sm font-bold">Email our team</p>
                  <p className="mt-2 text-sm text-white/65">
                    info@southernpallet.co
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </PublicSiteShell>
  );
}
