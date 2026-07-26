"use client";

import { Button } from "@/components/ui/button";

export default function RecycleQuoteSection() {
  return (
    <section id="quote" className="pb-16 md:pt-16 bg-[#1e4a2b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start md:items-center gap-6">
            <div className="bg-[#22c55e] p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="#1e4a2b"
                stroke="#1e4a2b"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M12 2v20M17 5h-6c-2 0-3 1.5-3 3s1 3 3 3h4c2 0 3 1.5 3 3s-1 3-3 3h-8" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Quotes Available for All Pallet Types
              </h3>
              <p className="text-gray-300">
                Get a competitive quote for your pallets—quick, transparent, and
                hassle-free.
              </p>
            </div>
          </div>
          <Button
            className="bg-[#22c55e] text-black hover:bg-[#16a34a] font-semibold px-6 md:px-8 py-3 text-base md:text-lg w-full md:w-auto"
            onClick={() => {
              document.querySelector("#sell-pallets")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            Get a Quote Now
          </Button>
        </div>
      </div>
    </section>
  );
}
