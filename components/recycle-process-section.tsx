import Link from "next/link";

const steps = [
  ["01", "Share your inventory", "Tell us the pallet type, approximate quantity, condition, and location."],
  ["02", "Receive an evaluation", "Our team reviews the details and follows up with current pricing and options."],
  ["03", "Plan the handoff", "We coordinate pickup when available or provide delivery instructions for your load."],
];

export default function RecycleProcessSection() {
  return (
    <section id="process" className="bg-[var(--sp-paper)] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.65fr_1.35fr] lg:px-10">
        <div>
          <p className="sp-eyebrow text-[var(--sp-green-dark)]">A direct process</p>
          <h2 className="sp-display mt-5 max-w-md text-4xl text-[var(--sp-forest)] sm:text-5xl">
            From excess inventory to a clear next step.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[var(--sp-ink)]/65">
            Standard 48&quot; × 40&quot; pallets in usable condition are often
            the most valuable, but we evaluate every request individually.
            Compare our{" "}
            <Link
              href="/#products"
              className="font-semibold text-[var(--sp-forest)] underline decoration-[var(--sp-green-dark)] underline-offset-4 hover:text-[var(--sp-green-dark)]"
            >
              new and recycled wood pallet options
            </Link>
            , learn about{" "}
            <Link
              href="/#about"
              className="font-semibold text-[var(--sp-forest)] underline decoration-[var(--sp-green-dark)] underline-offset-4 hover:text-[var(--sp-green-dark)]"
            >
              Southern Pallet Recycling’s recovery operation
            </Link>
            , or{" "}
            <Link
              href="/contact"
              className="font-semibold text-[var(--sp-forest)] underline decoration-[var(--sp-green-dark)] underline-offset-4 hover:text-[var(--sp-green-dark)]"
            >
              contact our pallet recycling team
            </Link>
            .
          </p>
        </div>
        <div className="border-t border-[var(--sp-rule)]">
          {steps.map(([number, title, detail]) => (
            <article
              key={number}
              className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[var(--sp-rule)] py-7 sm:grid-cols-[4rem_0.7fr_1fr]"
            >
              <span className="text-sm font-semibold text-[var(--sp-green-dark)]">
                {number}
              </span>
              <h3 className="text-xl font-semibold text-[var(--sp-forest)]">{title}</h3>
              <p className="col-start-2 text-sm leading-6 text-[var(--sp-ink)]/65 sm:col-start-auto">
                {detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
