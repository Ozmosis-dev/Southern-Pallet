"use client";

import { ArrowDown, CircleDollarSign } from "lucide-react";

export default function RecycleQuoteSection() {
  return (
    <section id="quote" className="border-y border-white/15 bg-[var(--sp-forest)] text-white">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_auto]">
        <div className="flex items-start gap-5 px-6 py-10 lg:px-10">
          <CircleDollarSign className="mt-1 size-7 shrink-0 text-[var(--sp-green)]" strokeWidth={1.7} />
          <div>
            <h2 className="text-2xl font-semibold">
              Quotes available for all pallet types.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
              Get a competitive evaluation based on type, condition, volume,
              and pickup location.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex min-h-20 items-center justify-center gap-3 bg-[var(--sp-green)] px-8 text-sm font-bold uppercase tracking-[0.1em] text-[var(--sp-forest-deep)] hover:bg-white lg:min-h-full"
          onClick={() =>
            document.querySelector("#sell-pallets")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        >
          Start your quote <ArrowDown className="size-4" />
        </button>
      </div>
    </section>
  );
}
