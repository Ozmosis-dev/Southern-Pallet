import Link from "next/link";

const reviewItems = [
  ["Standard wood pallets", "Measure the footprint and separate standard 48x40 GMA pallets from other sizes. Count each group rather than quoting one total for a mixed stack. Let us know whether they are ready to reuse or need repair."],
  ["Box pallets and unusual sizes", "Include the dimensions and photos of the full construction. Enclosed pallets, oversized footprints, and mixed designs need an individual review; a usable pallet is not automatically a match for current buyback demand."],
  ["Damaged or uncertain inventory", "Show broken deck boards, stringer damage, missing parts, and any visible contamination. Keep questionable inventory separate and describe what it carried. Do not assume a damaged load is accepted for purchase or recycling before review."],
];

export default function RecycleLoadPreparation() {
  return (
    <section id="prepare-your-load" className="bg-[var(--sp-paper)] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="sp-eyebrow text-[var(--sp-green-dark)]">Before you sell or recycle</p>
            <h2 className="sp-display mt-5 text-4xl text-[var(--sp-forest)] sm:text-5xl">Turn a mixed pallet stack into a clear request.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[var(--sp-ink)]/75">If you are looking for a pallet recycling company or a buyer for used wood pallets, start with an inventory review. Southern Pallet Recycling evaluates the size, condition, quantity, and location before confirming purchase, recovery, or another next step.</p>
        </div>
        <div className="mt-12 grid border-l border-t border-[var(--sp-rule)] lg:grid-cols-3">
          {reviewItems.map(([title, copy], index) => (
            <article key={title} className="border-b border-r border-[var(--sp-rule)] p-7 sm:p-9">
              <p className="text-xs font-bold tracking-widest text-[var(--sp-green-dark)]">0{index + 1} · LOAD REVIEW</p>
              <h3 className="mt-5 text-2xl font-semibold text-[var(--sp-forest)]">{title}</h3>
              <p className="mt-4 text-base leading-7 text-[var(--sp-ink)]/75">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold text-[var(--sp-forest)]">Prepare a photo and inventory checklist</h3>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-7 text-[var(--sp-ink)]/75">
              <li>Take a full-stack photo plus clear views of the top, underside, and any repairs or damage. Have the photos ready to share when the team follows up.</li>
              <li>Record the count and dimensions for each group, your city or ZIP code, and whether this is a one-time load or a recurring surplus.</li>
              <li>Confirm you own the pallets or have permission to release them. Identify any rental, pool, or other ownership markings for review.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[var(--sp-forest)]">Confirm the handoff before moving the load</h3>
            <p className="mt-5 text-base leading-7 text-[var(--sp-ink)]/75">Include receiving hours, dock or forklift availability, loading access, and an on-site contact. Ask the team to confirm which pallets qualify, whether freight or handling charges apply, and whether pickup or an arranged drop-off is available. The team confirms the evaluation, any payment terms, and collection arrangements before the load moves.</p>
            <p className="mt-4 text-base leading-7 text-[var(--sp-ink)]/75">Our <Link href="/locations/poplarville-ms" className="font-semibold text-[var(--sp-green-dark)] underline underline-offset-4">Poplarville wood pallet recycling facility</Link> is the primary operating location. Please confirm acceptance and arrangements before bringing a load.</p>
            <Link href="/recycle-pallets#sell-pallets" className="mt-6 inline-flex min-h-12 items-center bg-[var(--sp-forest)] px-6 text-sm font-bold text-white hover:bg-[var(--sp-green-dark)]">Request a used pallet evaluation</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
