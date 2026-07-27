import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  ["60K", "Sq ft manufacturing facility"],
  ["500K+", "Pallets recycled annually"],
  ["100%", "On-time delivery focus"],
];

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-[var(--sp-forest)] pt-20 text-white">
      <div className="sp-grid absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[740px] max-w-7xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center px-6 py-20 lg:px-10 lg:py-28">
          <p className="sp-eyebrow mb-7 text-[var(--sp-green)]">
            Pallet supply · Southeast
          </p>
          <h1 className="sp-display max-w-3xl text-6xl leading-[0.87] text-white sm:text-7xl lg:text-[6.8rem]">
            Pallets delivered fast. Every time.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/72">
            No delays. No headaches. No surprises. Just dependable pallet
            supply, recycling, and delivery built around your operation.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--sp-green)] px-7 text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--sp-forest-deep)] hover:bg-white"
            >
              Get a free quote <ArrowRight className="size-4" />
            </a>
            <Link
              href="/recycle-pallets"
              className="inline-flex min-h-12 items-center justify-center border border-white/50 px-7 text-sm font-extrabold uppercase tracking-[0.12em] text-white hover:border-white hover:bg-white hover:text-[var(--sp-forest-deep)]"
            >
              Sell your pallets
            </Link>
          </div>
        </div>

        <div className="relative min-h-[440px] border-t border-white/15 lg:min-h-full lg:border-l lg:border-t-0">
          <Image
            src="/stack.svg"
            alt="A large stack of wooden pallets ready for delivery"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 53vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--sp-forest-deep)]/65 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 border-t border-white/25 bg-[var(--sp-forest-deep)]/90 backdrop-blur-sm">
            {stats.map(([value, label], index) => (
              <div
                key={value}
                className={`p-4 sm:p-6 ${index ? "border-l border-white/20" : ""}`}
              >
                <p className="sp-display text-3xl text-[var(--sp-green)] sm:text-5xl">
                  {value}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-white/70 sm:text-xs">
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
