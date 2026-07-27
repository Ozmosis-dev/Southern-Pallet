import { Clock, MapPin, Star, Settings } from "lucide-react";

const strengths = [
  {
    icon: Clock,
    title: "Fast turnaround",
    copy: "Most orders ready within 24–48 hours.",
  },
  {
    icon: MapPin,
    title: "Regional delivery",
    copy: "Serving businesses throughout the Southeast.",
  },
  {
    icon: Star,
    title: "Quality guaranteed",
    copy: "Built to last with carefully selected materials.",
  },
  {
    icon: Settings,
    title: "Custom solutions",
    copy: "Pallets manufactured to your exact specifications.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="sp-grid bg-[var(--sp-cream)] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <p className="sp-eyebrow text-[var(--sp-green-dark)]">Built for industry</p>
          <h2 className="sp-display mt-5 max-w-xl text-4xl text-[var(--sp-forest)] sm:text-5xl">
            A family-owned pallet partner that moves at your speed.
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-7 text-[var(--sp-ink)]/72">
            <p>
              Southern Pallet Recycling is a new and innovative pallet company
              dedicated to providing quality service. We manufacture new
              pallets, recycle used pallets, and provide reliable delivery to
              meet your specific needs.
            </p>
            <p>
              Our 60,000 sq ft manufacturing and recycling facility in
              Poplarville, Mississippi helps us serve businesses across the
              Southeast with dependable production and quick turnaround times.
            </p>
            <a
              href="/recycle-pallets"
              className="inline-flex border-b-2 border-[var(--sp-green-dark)] pb-1 font-semibold text-[var(--sp-forest)]"
            >
              Explore pallet recycling
            </a>
          </div>
        </div>

        <div className="border-t border-[var(--sp-rule)]">
          {strengths.map(({ icon: Icon, title, copy }, index) => (
            <article
              key={title}
              className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[var(--sp-rule)] py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-center"
            >
              <span className="sp-display text-xl text-[var(--sp-green-dark)]">
                0{index + 1}
              </span>
              <div>
                <h3 className="sp-display text-2xl text-[var(--sp-forest)]">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-[var(--sp-ink)]/65">{copy}</p>
              </div>
              <Icon className="hidden size-7 text-[var(--sp-green-dark)] sm:block" strokeWidth={1.7} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
