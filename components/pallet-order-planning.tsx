import Link from "next/link";

const details = [
  ["The pallet and the load", "Start with length and width, then describe the product, total loaded weight, and whether the load is evenly distributed. Include deck coverage and any overhang restrictions. A 48x40 footprint alone does not define how a pallet will perform."],
  ["How the pallet moves", "Tell us whether you use forklifts, pallet jacks, conveyors, floor stacking, or warehouse racking. Include entry direction and any customer receiving specification. Grade and appearance are only part of choosing a pallet that fits your equipment."],
  ["Quantity and reorder pattern", "Include the number needed for the first order and your expected weekly or monthly use. Flag seasonal peaks, changes in product mix, and the space available to store empty pallets. We can review ongoing requirements alongside a one-time order."],
  ["Freight and receiving", "Provide the delivery ZIP code, receiving hours, site contact, and dock or unloading arrangements. Ask for pallet pricing and freight terms together so you can compare the delivered cost of competing quotes."],
];

export default function PalletOrderPlanning() {
  return (
    <section id="order-planning" className="border-y border-[var(--sp-rule)] bg-[var(--sp-cream)] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="sp-eyebrow text-[var(--sp-green-dark)]">A better buying brief</p>
            <h2 className="sp-display mt-5 text-4xl text-[var(--sp-forest)] sm:text-5xl">Order the specification your operation needs.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[var(--sp-ink)]/75">Buying wood pallets for a business starts with the job they need to do. For a single shipment or recurring pallet supply, these four details help us quote a suitable new, hybrid, or recycled option from our Poplarville operation.</p>
        </div>
        <div className="mt-12 grid border-l border-t border-[var(--sp-rule)] md:grid-cols-2">
          {details.map(([title, copy], index) => (
            <article key={title} className="border-b border-r border-[var(--sp-rule)] bg-[var(--sp-paper)] p-7 sm:p-9">
              <p className="text-xs font-bold tracking-widest text-[var(--sp-green-dark)]">0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-semibold text-[var(--sp-forest)]">{title}</h3>
              <p className="mt-4 text-base leading-7 text-[var(--sp-ink)]/75">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-[var(--sp-forest)]">Comparing recycled pallets?</h3>
            <p className="mt-3 text-base leading-7 text-[var(--sp-ink)]/75">Use our <Link href="/blog/grade-a-vs-grade-b-pallets" className="font-semibold text-[var(--sp-green-dark)] underline underline-offset-4">Grade A versus Grade B pallet buying guide</Link> to compare repairs, appearance, and receiving requirements. A grade is not a universal weight rating or a substitute for a written specification.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--sp-forest)]">Buying from our Mississippi facility</h3>
            <p className="mt-3 text-base leading-7 text-[var(--sp-ink)]/75">Find the address and contact details for our <Link href="/locations/poplarville-ms" className="font-semibold text-[var(--sp-green-dark)] underline underline-offset-4">Poplarville pallet manufacturing and recycling facility</Link>. For collection or delivery, speak with the team before planning a trip or booking freight.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
