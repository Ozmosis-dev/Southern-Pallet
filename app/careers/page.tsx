import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import SharedHeader from "@/components/shared-header";
import SharedFooter from "@/components/shared-footer";
import CareersApplicationForm from "@/components/careers-application-form";
import PublicSiteShell from "@/components/public-site-shell";
import { DEFAULT_OG_IMAGE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pallet Company Careers in Theodore, Alabama",
  description:
    "Apply for pallet manufacturing, recycling, logistics, and operations opportunities with Southern Pallet in Theodore, Alabama.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Pallet Company Careers in Theodore, Alabama",
    description:
      "Tell us about your experience and interest in joining Southern Pallet.",
    url: "/careers",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pallet Company Careers in Theodore, Alabama",
    description:
      "Apply for opportunities with Southern Pallet in Theodore, Alabama.",
    images: [DEFAULT_OG_IMAGE.url],
  },
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
                  Careers at Southern Pallet
                </p>
              </div>
              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-6xl">
                General
                <br />
                application.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                We’re always interested in dependable people who value safety,
                teamwork, and doing the job right. Share your experience and
                the kind of work you’re looking for.
              </p>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--sp-green)]" />
                  Theodore, AL
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
                src="/recyle_pallet_hero.jpg"
                alt="Stacks of wooden pallets at a Southern Pallet facility"
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
