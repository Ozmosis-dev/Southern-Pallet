import { Package, Recycle, Wrench, Truck } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: Package,
    title: "Pallet manufacturing",
    copy: "Standard and custom pallets built to specification with quality lumber and expert craftsmanship.",
  },
  {
    icon: Recycle,
    title: "Pallet recycling",
    copy: "Responsible recovery and reuse programs that reduce waste while lowering supply costs.",
  },
  {
    icon: Wrench,
    title: "Pallet repair",
    copy: "Professional repair and reconditioning services that extend pallet life and protect your investment.",
  },
  {
    icon: Truck,
    title: "Regional delivery",
    copy: "Reliable Southeast delivery supported by our own fleet and a team that understands your schedule.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-[var(--sp-forest)] py-24 text-white lg:py-32">
      <div className="sp-diagonal absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div>
          <p className="sp-eyebrow text-[var(--sp-green)]">One accountable partner</p>
          <h2 className="sp-display mt-5 max-w-2xl text-4xl sm:text-5xl">
            Complete pallet service, from the first board to final delivery.
          </h2>
          <div className="relative mt-12 aspect-[5/3] overflow-hidden border border-white/20">
            <Image
              src="/jack.svg"
              alt="Pallet handling equipment"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="absolute bottom-0 left-0 bg-[var(--sp-green)] px-5 py-4 text-xs font-bold uppercase tracking-[0.1em] text-[var(--sp-forest-deep)]">
              Manufactured · Recovered · Delivered
            </div>
          </div>
        </div>

        <div className="border-t border-white/25 lg:mt-14">
          {services.map(({ icon: Icon, title, copy }, index) => (
            <article
              key={title}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/25 py-7 sm:grid-cols-[3rem_1fr_auto]"
            >
              <span className="sp-display text-xl text-[var(--sp-green)]">0{index + 1}</span>
              <div>
                <h3 className="sp-display text-2xl">{title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/65">{copy}</p>
              </div>
              <Icon className="hidden size-6 text-[var(--sp-green)] sm:block" strokeWidth={1.7} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
