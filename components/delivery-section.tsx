"use client";

import { ArrowRight, Clock, Mail, MapPin, Phone, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const states = [
  "Alabama",
  "Georgia",
  "Florida",
  "Tennessee",
  "Mississippi",
  "Louisiana",
  "South Carolina",
  "North Carolina",
];

export default function DeliverySection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section id="delivery" className="sp-grid bg-[var(--sp-paper)] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div className="flex flex-col justify-center">
          <p className="sp-eyebrow text-[var(--sp-green-dark)]">Regional fleet</p>
          <h2 className="sp-display mt-5 text-5xl leading-[0.94] text-[var(--sp-forest)] sm:text-6xl">
            Delivery throughout the Southeast.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--sp-ink)]/68">
            Our fleet keeps pallets moving throughout the region, with a
            delivery team focused on getting every order there on time and in
            ready-to-use condition.
          </p>

          <div className="mt-9 border-y border-[var(--sp-rule)] py-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-[var(--sp-green-dark)]" />
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--sp-forest)]">
                  Service area
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--sp-ink)]/68">
                  {states.join(" · ")}
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-[var(--sp-rule)] py-6">
            <div className="flex items-start gap-4">
              <Clock className="mt-1 size-5 shrink-0 text-[var(--sp-green-dark)]" />
              <div className="text-sm leading-7 text-[var(--sp-ink)]/68">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--sp-forest)]">
                  Delivery schedule
                </h3>
                <p className="mt-3">Monday–Friday · 7:00 AM–5:00 PM CST</p>
                <p>Saturday · 8:00 AM–12:00 PM CST</p>
                <p className="mt-2 font-bold text-[var(--sp-forest)]">
                  Same-day delivery may be available before 10:00 AM.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="mt-8 inline-flex min-h-12 w-fit items-center gap-3 bg-[var(--sp-green)] px-6 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--sp-forest-deep)] hover:bg-[var(--sp-forest)] hover:text-white"
          >
            Schedule delivery <ArrowRight className="size-4" />
          </button>
        </div>

        <div className="relative min-h-[500px] overflow-hidden border border-[var(--sp-rule)] bg-[var(--sp-cream)] lg:min-h-[650px]">
          <Image
            src="/map.svg"
            alt="Map of the Southeastern United States delivery region"
            fill
            className="object-contain p-6 sm:p-12"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
          <div className="absolute bottom-0 left-0 border-r border-t border-[var(--sp-rule)] bg-[var(--sp-forest)] p-6 text-white">
            <p className="sp-display text-4xl text-[var(--sp-green)]">8 states</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/65">
              One delivery partner
            </p>
          </div>
        </div>
      </div>

      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delivery-contact-title"
        >
          <button
            className="absolute inset-0 bg-[var(--sp-forest-deep)]/80 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
            aria-label="Close delivery contact options"
          />
          <div className="relative w-full max-w-md border border-[var(--sp-rule)] bg-[var(--sp-paper)] p-8 shadow-2xl">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-[var(--sp-ink)]/55 hover:text-[var(--sp-forest)]"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            <p className="sp-eyebrow text-[var(--sp-green-dark)]">Delivery desk</p>
            <h3 id="delivery-contact-title" className="sp-display mt-3 text-4xl text-[var(--sp-forest)]">
              Schedule your delivery.
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--sp-ink)]/65">
              Contact our team to confirm timing, volume, and destination.
            </p>
            <div className="mt-7 grid gap-3">
              <a
                href="tel:+16017465012"
                className="flex items-center gap-4 bg-[var(--sp-forest)] p-4 font-bold text-white"
                onClick={() => setIsContactModalOpen(false)}
              >
                <Phone className="size-5 text-[var(--sp-green)]" />
                <span>Call (601) 746-5012</span>
              </a>
              <a
                href="mailto:info@southernpallet.co?subject=Delivery Scheduling Request&body=Hi, I'd like to schedule a delivery for pallets. Please contact me to discuss details and timing."
                className="flex items-center gap-4 bg-[var(--sp-green)] p-4 font-bold text-[var(--sp-forest-deep)]"
                onClick={() => setIsContactModalOpen(false)}
              >
                <Mail className="size-5" />
                <span>Email info@southernpallet.co</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
