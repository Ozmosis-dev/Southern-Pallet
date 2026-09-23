import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import PublicSiteShell from "@/components/public-site-shell";
import SharedFooter from "@/components/shared-footer";
import SharedHeader from "@/components/shared-header";
import { createSocialMetadata } from "@/lib/social-metadata";

const description =
  "We've received your request and will be in touch soon. Southern Pallet Recycling appreciates your interest in our pallet services.";

export const metadata: Metadata = {
  title: "Pallet Request Received",
  description,
  alternates: {
    canonical: "/thank-you",
  },
  ...createSocialMetadata({
    title: "Pallet Request Received",
    description,
    path: "/thank-you",
    card: "request-received",
  }),
  robots: { index: false, follow: true },
};

const nextSteps = [
  "Our team reviews the details you submitted.",
  "We prepare the right pricing or pickup recommendation.",
  "You receive a response by email or phone, usually within one business hour.",
];

export default function ThankYouPage() {
  return (
    <PublicSiteShell>
      <SharedHeader />
      <main
        data-submission-confirmation="true"
        className="sp-grid min-h-[calc(100vh-5rem)] bg-[var(--sp-cream)] pt-20"
      >
        <section className="mx-auto grid max-w-7xl lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-center border-x border-[var(--sp-rule)] px-6 py-16 sm:px-10 lg:min-h-[680px] lg:px-14">
            <CheckCircle2 className="size-12 text-[var(--sp-green-dark)]" strokeWidth={1.6} />
            <p className="sp-eyebrow mt-8 text-[var(--sp-green-dark)]">Request received</p>
            <h1 className="sp-display mt-5 max-w-xl text-5xl text-[var(--sp-forest)] sm:text-6xl">
              Your wood pallet request is with our team.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-[var(--sp-ink)]/68">
              We have the information you submitted and will follow up with the
              right next step for your pallet request.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--sp-green)] px-6 text-sm font-bold uppercase tracking-[0.08em] text-[var(--sp-forest-deep)] hover:bg-[var(--sp-forest)] hover:text-white"
              >
                Return home <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/#products"
                className="inline-flex min-h-12 items-center justify-center border border-[var(--sp-rule)] px-6 text-sm font-semibold text-[var(--sp-forest)] hover:border-[var(--sp-forest)]"
              >
                View products
              </Link>
            </div>
          </div>

          <div className="border-r border-[var(--sp-rule)] bg-[var(--sp-paper)] px-6 py-16 sm:px-10 lg:px-14">
            <p className="sp-eyebrow text-[var(--sp-green-dark)]">What happens next</p>
            <div className="mt-7 border-t border-[var(--sp-rule)]">
              {nextSteps.map((step, index) => (
                <div
                  key={step}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[var(--sp-rule)] py-6"
                >
                  <span className="text-sm font-semibold text-[var(--sp-green-dark)]">
                    0{index + 1}
                  </span>
                  <p className="text-base leading-7 text-[var(--sp-ink)]/72">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-[var(--sp-forest)] p-7 text-white">
              <p className="text-xl font-semibold">Need immediate assistance?</p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Contact our team directly during business hours.
              </p>
              <div className="mt-6 grid gap-3">
                <a
                  href="tel:+16017465012"
                  className="flex items-center gap-3 border-t border-white/20 pt-4 text-sm font-semibold"
                >
                  <Phone className="size-4 text-[var(--sp-green)]" />
                  (601) 746-5012
                </a>
                <a
                  href="mailto:info@southernpallet.co"
                  className="flex items-center gap-3 border-t border-white/20 pt-4 text-sm font-semibold"
                >
                  <Mail className="size-4 text-[var(--sp-green)]" />
                  info@southernpallet.co
                </a>
              </div>
            </div>

            <p className="mt-8 text-xs leading-5 text-[var(--sp-sage)]">
              Most quotes are returned within one business hour. Delivery
              timing depends on product, quantity, and destination.
            </p>
          </div>
        </section>
      </main>
      <SharedFooter />
    </PublicSiteShell>
  );
}
