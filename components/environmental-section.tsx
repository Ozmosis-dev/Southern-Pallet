import { ArrowRight, Recycle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EnvironmentalSection() {
  return (
    <section id="environmental" className="bg-[var(--sp-cream)]">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-[440px] border-x border-[var(--sp-rule)] lg:min-h-[650px]">
          <Image
            src="/recycle.svg"
            alt="Wooden pallets ready to be recovered and recycled"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute left-0 top-0 bg-[var(--sp-green)] p-5 text-[var(--sp-forest-deep)]">
            <Recycle className="size-8" strokeWidth={1.8} />
          </div>
        </div>
        <div className="flex flex-col justify-center border-r border-[var(--sp-rule)] px-6 py-20 sm:px-12 lg:px-16">
          <p className="sp-eyebrow text-[var(--sp-green-dark)]">Materials in motion</p>
          <p className="sp-display mt-6 text-[6rem] leading-none text-[var(--sp-forest)] sm:text-[9rem]">
            500K+
          </p>
          <h2 className="sp-display max-w-xl text-4xl leading-none text-[var(--sp-forest)] sm:text-5xl">
            Pallets kept out of landfills every year.
          </h2>
          <p className="mt-7 max-w-lg text-base leading-7 text-[var(--sp-ink)]/68">
            Our recycling initiative helps companies cut costs and waste by
            collecting, repairing, and reconditioning used pallets—giving
            useful material a second life.
          </p>
          <Link
            href="/recycle-pallets"
            className="mt-9 inline-flex min-h-12 w-fit items-center gap-3 bg-[var(--sp-forest)] px-6 text-xs font-extrabold uppercase tracking-[0.12em] text-white hover:bg-[var(--sp-green-dark)]"
          >
            Join the movement <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
