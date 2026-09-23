import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin } from "lucide-react";
import SharedHeader from "@/components/shared-header";
import SharedFooter from "@/components/shared-footer";
import CareersApplicationForm from "@/components/careers-application-form";
import PublicSiteShell from "@/components/public-site-shell";
import { createSocialMetadata } from "@/lib/social-metadata";

export const metadata: Metadata = {
  title: "Pallet Careers in Poplarville, MS",
  description:
    "Explore pallet manufacturing, recycling, logistics, and operations careers with Southern Pallet Recycling in Poplarville, Mississippi, and apply today.",
  alternates: {
    canonical: "/careers",
  },
  ...createSocialMetadata({
    title: "Pallet Careers in Poplarville, Mississippi",
    description:
      "Tell us about your experience and interest in joining Southern Pallet Recycling in Poplarville, Mississippi.",
    path: "/careers",
    card: "careers",
  }),
  robots: {
    index: true,
    follow: true,
  },
};

export default function CareersPage() {
  return (
    <PublicSiteShell className="bg-[var(--sp-cream)]">
      <SharedHeader />

      <main>
        <section className="relative overflow-hidden bg-[var(--sp-forest)] pt-18 text-white">
          <div className="sp-diagonal pointer-events-none absolute inset-0 opacity-10" />
          <div className="relative mx-auto grid min-h-[520px] max-w-7xl lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-12 bg-[var(--sp-green)]" />
                <p className="sp-eyebrow text-[var(--sp-green)]">
                  Careers at Southern Pallet Recycling
                </p>
              </div>
              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-6xl">
                Pallet company careers
                <br />
                in Poplarville, Mississippi.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                We’re always interested in dependable people who value safety,
                teamwork, and doing the job right. Share your experience and
                the kind of work you’re looking for.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
                Learn more about our{" "}
                <Link
                  href="/#about"
                  className="font-semibold text-white underline decoration-[var(--sp-green)] underline-offset-4 hover:text-[var(--sp-green)]"
                >
                  family-owned pallet company
                </Link>
                , explore the{" "}
                <Link
                  href="/#products"
                  className="font-semibold text-white underline decoration-[var(--sp-green)] underline-offset-4 hover:text-[var(--sp-green)]"
                >
                  wood pallet products our team supports
                </Link>
                , or{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-white underline decoration-[var(--sp-green)] underline-offset-4 hover:text-[var(--sp-green)]"
                >
                  contact our operations team
                </Link>
                .
              </p>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--sp-green)]" />
                  Poplarville, MS
                </span>
              </div>
              <a
                href="#application"
                className="mt-10 inline-flex w-fit items-center gap-3 border-b border-[var(--sp-green)] pb-2 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:text-[var(--sp-green)]"
              >
                Start application
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>

            <div className="relative min-h-80 lg:min-h-full">
              <Image
                src="/used-wood-pallets-recycling.jpg"
                alt="Stacks of wood pallets at the Southern Pallet Recycling facility in Poplarville, Mississippi"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--sp-forest)]/55 via-transparent to-transparent lg:from-[var(--sp-forest)]/35" />
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-[var(--sp-forest-deep)]/80 px-6 py-5 backdrop-blur-sm sm:px-10">
                <p className="sp-eyebrow text-[var(--sp-green)]">
                  Built on reliability
                </p>
                <p className="mt-2 max-w-lg text-sm leading-6 text-white/75">
                  Applications are kept on file and reviewed as opportunities
                  become available.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CareersApplicationForm />
      </main>

      <SharedFooter />
    </PublicSiteShell>
  );
}
