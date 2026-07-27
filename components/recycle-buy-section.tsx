import { Banknote, Boxes, Leaf, PackageCheck, Truck } from "lucide-react";

const palletTypes = [
  {
    title: "Standard GMA pallets",
    detail:
      '48" × 40" pallets used across shipping, warehousing, grocery, and general manufacturing.',
  },
  {
    title: "Box pallets",
    detail:
      "Heavy-duty enclosed pallets used to secure bulk materials and protect specialized loads.",
  },
];

const benefits = [
  {
    icon: Banknote,
    title: "Competitive pricing",
    detail: "Clear, market-based quotes for usable pallet inventory.",
  },
  {
    icon: Leaf,
    title: "Responsible recovery",
    detail: "Keep valuable wood in circulation and out of the waste stream.",
  },
  {
    icon: Truck,
    title: "Pickup support",
    detail: "Pickup may be available for qualifying quantities and locations.",
  },
  {
    icon: PackageCheck,
    title: "Fast evaluation",
    detail: "Send the details once and our team will review the load quickly.",
  },
];

export default function RecycleBuySection() {
  return (
    <section id="buy" className="sp-grid bg-[var(--sp-cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 border-b border-[var(--sp-rule)] pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="sp-eyebrow text-[var(--sp-green-dark)]">What we recover</p>
            <h2 className="sp-display mt-5 max-w-2xl text-4xl text-[var(--sp-forest)] sm:text-5xl">
              We buy the pallets your operation no longer needs.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[var(--sp-ink)]/68 lg:justify-self-end">
            Type, size, condition, quantity, and location all affect value.
            Share what you have and we’ll give you a clear next step.
          </p>
        </div>

        <div className="grid border-l border-[var(--sp-rule)] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-r border-[var(--sp-rule)] p-7 sm:p-10">
            <div className="flex items-center gap-3">
              <Boxes className="size-6 text-[var(--sp-green-dark)]" strokeWidth={1.8} />
              <h3 className="text-2xl font-semibold text-[var(--sp-forest)]">
                Pallet types
              </h3>
            </div>
            <div className="mt-8 border-t border-[var(--sp-rule)]">
              {palletTypes.map((item, index) => (
                <article key={item.title} className="border-b border-[var(--sp-rule)] py-6">
                  <p className="text-xs font-bold tracking-[0.12em] text-[var(--sp-green-dark)]">
                    0{index + 1}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-[var(--sp-forest)]">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[var(--sp-ink)]/65">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid border-b border-[var(--sp-rule)] sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, detail }, index) => (
              <article
                key={title}
                className={`p-7 sm:p-8 ${
                  index % 2 === 0 ? "sm:border-r" : ""
                } ${index < 2 ? "border-b" : ""} border-[var(--sp-rule)]`}
              >
                <Icon className="size-6 text-[var(--sp-green-dark)]" strokeWidth={1.7} />
                <h3 className="mt-6 text-xl font-semibold text-[var(--sp-forest)]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--sp-ink)]/65">
                  {detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
