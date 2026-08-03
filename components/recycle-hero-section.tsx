"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  ["Condition-based", "Practical quotes"],
  ["Flexible", "Pickup and drop-off"],
  ["Reuse first", "Repair and recycling"],
];

export default function RecycleHeroSection() {
  const scrollToForm = () => {
    document.querySelector("#sell-pallets")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[var(--sp-forest)] pt-20 text-white">
      <div className="sp-diagonal absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[680px] max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center px-6 py-20 lg:px-10">
          <p className="sp-eyebrow text-[var(--sp-green)]">Pallet recovery program</p>
          <h1 className="sp-display mt-6 max-w-2xl text-5xl sm:text-6xl">
            Sell & recycle used wood pallets.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
            We buy standard and box pallets throughout the Southeast, with
            straightforward quotes and pickup support that keeps excess
            inventory moving.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-2">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap bg-[var(--sp-green)] px-5 text-sm font-bold uppercase tracking-[0.1em] text-[var(--sp-forest-deep)] hover:bg-white xl:px-7"
            >
              Get a pallet quote <ArrowDown className="size-4" />
            </button>
            <Link
              href="/#services"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap border border-white/45 px-5 text-sm font-bold uppercase tracking-[0.1em] text-white hover:bg-white hover:text-[var(--sp-forest-deep)] xl:px-7"
            >
              View all services <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px] border-t border-white/15 lg:min-h-full lg:border-l lg:border-t-0">
          <Image
            src="/recyle_pallet_hero.jpg"
            alt="Stacks of used wooden pallets ready for recovery"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--sp-forest-deep)]/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 border-t border-white/25 bg-[var(--sp-forest-deep)]/90 backdrop-blur-sm">
            {stats.map(([value, label], index) => (
              <div
                key={value}
                className={`p-4 sm:p-6 ${index ? "border-l border-white/20" : ""}`}
              >
                <p className="text-sm font-semibold text-[var(--sp-green)] sm:text-lg">
                  {value}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-white/65 sm:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
