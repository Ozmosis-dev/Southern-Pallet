"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RecycleHeroSection() {
  return (
    <section className="relative bg-[#1e4a2b] text-white min-h-[600px] overflow-hidden pt-16">
      {/* Background and image section */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#1e4a2b]"></div>
        {/* Mobile banner */}
        <div className="lg:hidden absolute top-0 left-0 right-0 h-[375px] md:h-full md:w-1/2 md:right-0 md:left-auto bg-[#1e4a2b]">
          <Image
            src="/recyle_pallet_hero.jpg"
            alt="Stack of recycled pallets"
            width={400}
            height={450}
            className="w-full h-full object-cover rounded-none"
          />
        </div>
        {/* Large screen slanted section */}
        <div
          className="hidden lg:block absolute right-0 top-0 w-3/6 h-full bg-[#1e4a2b]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
          }}
        >
          <Image
            src="/recyle_pallet_hero.jpg"
            alt="Stack of recycled pallets"
            width={800}
            height={600}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Gradient overlay for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-[320px] md:pt-20 pb-20">
        <div className="max-w-2xl relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 leading-tight">
            Sell & Recycle{" "}
            <span className="text-[#22c55e]">Used Wood Pallets</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Request a Pallet Buyback or Pickup Quote
          </h2>

          <p className="text-xl mb-12 text-gray-200 leading-relaxed">
            Tell us the pallet size, condition, quantity, and location. We&apos;ll
            review the load and recommend the most practical pickup, reuse, or
            recycling option.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-[#22c55e] text-black hover:bg-[#16a34a] hover:brightness-90 transition-all font-semibold"
              onClick={() => {
                document.querySelector("#sell-pallets")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Get a Quote
            </Button>
            <Button
              variant="outline"
              className="text-white border-white/50 bg-white/5 backdrop-blur-sm hover:bg-white hover:border-black hover:text-black transition-all"
              onClick={() => {
                window.location.href = "/#services";
              }}
            >
              Our Services
            </Button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-16 text-center">
            <div className="px-4 sm:border-r border-gray-600 last:border-r-0">
              <div className="text-3xl font-bold text-[#22c55e] mb-2">
                Fair
              </div>
              <div className="text-sm text-gray-300">
                Condition-Based Quotes
              </div>
            </div>
            <div className="px-4 sm:border-r border-gray-600 last:border-r-0">
              <div className="text-3xl font-bold text-[#22c55e] mb-2">
                Flexible
              </div>
              <div className="text-sm text-gray-300">
                Pickup and Drop-Off Options
              </div>
            </div>
            <div className="px-4 sm:border-r border-gray-600 last:border-r-0">
              <div className="text-3xl font-bold text-[#22c55e] mb-2">
                Reuse
              </div>
              <div className="text-sm text-gray-300">
                Repair and Recycling Paths
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
