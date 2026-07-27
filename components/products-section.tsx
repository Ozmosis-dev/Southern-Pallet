"use client";

import { ArrowRight, Mail, Phone, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const products = [
  {
    name: "Recycled pallets",
    price: "Starting at $4.00",
    suffix: "per pallet",
    image: "/recyled_pallet_card.jpg",
    alt: "Recycled wood pallets",
    copy: "Environmentally responsible, cost-effective pallets inspected and repaired for dependable everyday use.",
    features: [
      "Thoroughly inspected",
      "Repaired to specification",
      "Multiple grades available",
      "Bulk quantities available",
    ],
    action: "Order recycled pallets",
  },
  {
    name: "New & hybrid pallets",
    price: "Starting at $9.50",
    suffix: "per pallet",
    image: "/grade-a.svg",
    alt: "New and hybrid pallets",
    copy: "High-quality pallets built with premium lumber for strength, consistency, and performance.",
    features: [
      'Standard 48" × 40"',
      "Four-way entry",
      "Up to 2,800 lb capacity",
      "Kiln-dried lumber",
    ],
    action: "Request a quote",
  },
  {
    name: "Custom new & used",
    price: "Custom quote",
    suffix: "built to spec",
    image: "/custom.svg",
    alt: "Custom-built pallets",
    copy: "Purpose-built pallets designed around specialized cargo, equipment, and operational requirements.",
    features: [
      "Custom dimensions",
      "Weight capacity options",
      "Special wood treatments",
      "Reinforced designs",
    ],
    action: "Talk to our team",
  },
];

function scrollToContact() {
  const element = document.getElementById("contact");
  if (!element) return;
  const headerOffset = 80;
  const elementPosition =
    element.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: elementPosition, behavior: "smooth" });
}

export default function ProductsSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section id="products" className="bg-[var(--sp-paper)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 border-b border-[var(--sp-rule)] pb-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="sp-eyebrow text-[var(--sp-green-dark)]">Product lineup</p>
            <h2 className="sp-display mt-5 max-w-3xl text-5xl leading-[0.94] text-[var(--sp-forest)] sm:text-6xl">
              The right pallet for every load.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[var(--sp-ink)]/68 lg:justify-self-end">
            Choose proven standard sizes or work with our team on a custom
            configuration. Every order is matched to your volume, timing, and
            delivery needs.
          </p>
        </div>

        <div className="grid border-l border-[var(--sp-rule)] lg:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.name}
              className="group flex flex-col border-b border-r border-[var(--sp-rule)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sp-cream)]">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <span className="absolute left-0 top-0 bg-[var(--sp-forest)] px-4 py-3 text-xs font-extrabold tracking-[0.15em] text-white">
                  0{index + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="sp-display text-4xl text-[var(--sp-forest)]">
                  {product.name}
                </h3>
                <p className="mt-5 text-2xl font-extrabold text-[var(--sp-forest)]">
                  {product.price}
                  <span className="ml-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--sp-ink)]/50">
                    {product.suffix}
                  </span>
                </p>
                <p className="mt-5 text-sm leading-6 text-[var(--sp-ink)]/68">
                  {product.copy}
                </p>
                <ul className="mt-6 grid gap-2 border-t border-[var(--sp-rule)] pt-5 text-sm font-semibold text-[var(--sp-ink)]/78">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="size-1.5 bg-[var(--sp-green-dark)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() =>
                    index === 2
                      ? setIsContactModalOpen(true)
                      : scrollToContact()
                  }
                  className="mt-8 inline-flex min-h-12 items-center justify-between bg-[var(--sp-green)] px-5 text-left text-xs font-extrabold uppercase tracking-[0.11em] text-[var(--sp-forest-deep)] hover:bg-[var(--sp-forest)] hover:text-white"
                >
                  {product.action} <ArrowRight className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="custom-pallet-title"
        >
          <button
            className="absolute inset-0 bg-[var(--sp-forest-deep)]/80 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
            aria-label="Close contact options"
          />
          <div className="relative w-full max-w-md border border-[var(--sp-rule)] bg-[var(--sp-paper)] p-8 shadow-2xl">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-[var(--sp-ink)]/55 hover:text-[var(--sp-forest)]"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            <p className="sp-eyebrow text-[var(--sp-green-dark)]">Custom orders</p>
            <h3 id="custom-pallet-title" className="sp-display mt-3 text-4xl text-[var(--sp-forest)]">
              Let&apos;s build the right pallet.
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--sp-ink)]/65">
              Choose how you&apos;d like to reach our team.
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
                href="mailto:info@southernpallet.co?subject=Custom Pallet Quote Request&body=Hi, I'm interested in getting a quote for custom pallets. Please contact me with more information."
                className="flex items-center gap-4 bg-[var(--sp-green)] p-4 font-bold text-[var(--sp-forest-deep)]"
                onClick={() => setIsContactModalOpen(false)}
              >
                <Mail className="size-5" />
                <span>Email info@southernpallet.co</span>
              </a>
            </div>
            <p className="mt-5 text-xs text-[var(--sp-ink)]/55">
              We typically respond within one hour during business hours.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
