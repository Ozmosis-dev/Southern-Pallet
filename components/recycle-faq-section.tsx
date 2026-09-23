import { RECYCLE_FAQ_LABEL, recycleFaqs } from "@/lib/recycle-page-content";

export default function RecycleFAQSection() {
  return (
    <section
      aria-labelledby="recycle-faq-label"
      className="sp-grid bg-[var(--sp-cream)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 border-b border-[var(--sp-rule)] pb-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p
              id="recycle-faq-label"
              className="sp-eyebrow text-[var(--sp-green-dark)]"
            >
              {RECYCLE_FAQ_LABEL}
            </p>
            <p className="sp-display mt-5 max-w-xl text-4xl text-[var(--sp-forest)] sm:text-5xl">
              Straight answers about selling and recycling pallets.
            </p>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[var(--sp-ink)]/68 lg:justify-self-end">
            Review the process before you request a quote. Final pricing and
            pickup terms depend on the inventory and site details you submit.
          </p>
        </div>

        <div className="grid border-l border-[var(--sp-rule)] lg:grid-cols-2">
          {recycleFaqs.map((faq, index) => (
            <article
              key={faq.question}
              className={`border-b border-r border-[var(--sp-rule)] p-7 sm:p-10 ${
                index % 2 === 0 ? "lg:border-r" : ""
              }`}
            >
              <p className="text-xs font-bold tracking-[0.12em] text-[var(--sp-green-dark)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-[var(--sp-forest)] sm:text-3xl">
                {faq.question}
              </h2>
              <div className="mt-5 space-y-4">
                {faq.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-7 text-[var(--sp-ink)]/68 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
