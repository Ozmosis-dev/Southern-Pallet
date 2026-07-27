"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How is pallet pricing determined?",
      answer:
        "Pallet pricing is more complex than in many industries. The pricing we display on our website reflects average truckload pricing for standard configurations. However, actual pricing can vary based on several factors:\n\n• Specific customizations (notching, strapping, stacking requirements)\n• Current market conditions and lumber costs\n• Order volume and frequency\n• Delivery location and logistics\n\nUnlike some industries, larger orders don't always mean lower per-unit costs - especially with custom specifications. We're committed to transparent pricing and will always provide detailed quotes that reflect your exact needs.",
    },
    {
      question: "What sizes of pallets do you offer?",
      answer:
        "We offer standard 48x40 GMA pallets, which are the most common size used in the industry. However, we also manufacture custom pallets in any size or configuration to meet your specific needs. Just let us know your requirements, and we'll build pallets to your exact specifications.",
    },
    {
      question: "Do you offer delivery services?",
      answer:
        "Yes, we provide delivery throughout the southeastern United States with our own fleet of trucks. We can typically deliver orders within 24-48 hours, and same-day delivery is available for orders placed before 10:00 AM. For locations outside our standard delivery area, please contact us to discuss options.",
    },
    {
      question: "What is your minimum order quantity?",
      answer:
        "For standard pallets, our minimum order is 25 units. For custom pallets, the minimum order may vary depending on the specifications. We're happy to work with businesses of all sizes, so please contact us if you have special requirements or smaller quantity needs.",
    },
    {
      question: "Do you buy used pallets?",
      answer:
        "Yes, we have an active pallet recycling program. We purchase used pallets in good condition for repair and resale. We can also arrange regular pickup services for businesses that generate a consistent volume of used pallets. Please contact us for current buying prices and to arrange a pickup.",
    },
    {
      question: "What types of wood do you use for your pallets?",
      answer:
        "We primarily use southern yellow pine and oak for our pallets, which provide an excellent balance of strength, durability, and cost-effectiveness. All our lumber is sourced from sustainable suppliers. For special applications, we can also use hardwoods or treated lumber upon request.",
    },
    {
      question: "Do you offer heat-treated pallets for international shipping?",
      answer:
        "Yes, we offer ISPM-15 compliant heat-treated pallets for international shipping. These pallets are specially treated to meet international regulations designed to prevent the spread of pests and diseases. Each heat-treated pallet is properly stamped to indicate compliance with international standards.",
    },
    {
      question: "Do larger orders receive volume discounts?",
      answer:
        "Unlike many industries, volume doesn't always equate to discounts in pallet manufacturing. While basic standard pallets may see some economies of scale, highly customized orders often require specialized production regardless of volume.\n\nFor example, if you need 12 truckloads of a specific custom pallet, we may need to adjust our manufacturing process to meet those specifications, potentially affecting the per-unit price. Our pricing structure is designed to be fair while accounting for the actual production requirements of your specific order.\n\nWe're always transparent about these considerations and will work with you to find the most cost-effective solution for your needs.",
    },
    {
      question: "How do your prices compare to other suppliers in the region?",
      answer:
        'We regularly analyze regional pricing trends to ensure our rates remain competitive. While most pallet suppliers don\'t publish their pricing online, our rates consistently fall within the standard market range for the Southeast region.<br/><br/>What sets us apart is our transparency, quality consistency, and reliable service. We\'re committed to providing clear pricing information upfront while maintaining the flexibility to address your specific needs. Our goal is to deliver the best overall value when considering quality, service, and price.<br/><br/><strong>Regional Pricing Summary</strong><br/><br/><div class="overflow-x-auto -mx-6 px-6"><table class="min-w-full border-collapse"><thead><tr class="bg-gray-100"><th class="border border-gray-300 px-2 sm:px-4 py-2 text-left font-medium text-sm">State</th><th class="border border-gray-300 px-2 sm:px-4 py-2 text-left font-medium text-sm">New</th><th class="border border-gray-300 px-2 sm:px-4 py-2 text-left font-medium text-sm">A-grade</th><th class="border border-gray-300 px-2 sm:px-4 py-2 text-left font-medium text-sm">B-grade</th></tr></thead><tbody><tr><td class="border border-gray-300 px-2 sm:px-4 py-2 font-medium text-sm">Mississippi</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$12–15</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$6–10</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$4–7</td></tr><tr class="bg-gray-50"><td class="border border-gray-300 px-2 sm:px-4 py-2 font-medium text-sm">Alabama</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$12–15</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$6.14</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$4.22</td></tr><tr><td class="border border-gray-300 px-2 sm:px-4 py-2 font-medium text-sm">Georgia</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$13–14</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$6.55</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$4.02</td></tr><tr class="bg-gray-50"><td class="border border-gray-300 px-2 sm:px-4 py-2 font-medium text-sm">Florida</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$12–15</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$6.15</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$4.05</td></tr><tr><td class="border border-gray-300 px-2 sm:px-4 py-2 font-medium text-sm">Louisiana</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$12–15</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$6–10</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$7.50</td></tr><tr class="bg-gray-50"><td class="border border-gray-300 px-2 sm:px-4 py-2 font-medium text-sm">Tennessee</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$12–15</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$5.78</td><td class="border border-gray-300 px-2 sm:px-4 py-2 text-sm">$3.94</td></tr></tbody></table></div><br/><em>*Prices shown are average truckload quantities and may vary based on specific requirements and current market conditions.</em>',
    },
    {
      question: "How quickly can you fulfill a custom order?",
      answer:
        "Turnaround time for custom orders depends on the complexity and quantity needed. For standard custom sizes, we can typically fulfill orders within 3-5 business days. For more complex designs or larger quantities, it may take 5-7 business days. We pride ourselves on our quick turnaround times and will always provide you with an accurate timeline when you place your order.",
    },
  ];

  return (
    <section className="bg-[var(--sp-cream)] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
        <div>
          <p className="sp-eyebrow text-[var(--sp-green-dark)]">Straight answers</p>
          <h2 className="sp-display mt-5 max-w-md text-5xl leading-[0.94] text-[var(--sp-forest)] sm:text-6xl">
            Pallet questions, answered.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-[var(--sp-ink)]/65">
            Everything you need to know about our products, pricing, delivery,
            and recycling services.
          </p>
        </div>

        <div className="border-t border-[var(--sp-rule)]">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[var(--sp-rule)]">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={openFAQ === index}
              >
                <span className="flex items-baseline gap-4">
                  <span className="sp-display text-lg text-[var(--sp-green-dark)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-extrabold text-[var(--sp-forest)] group-hover:text-[var(--sp-green-dark)]">
                    {faq.question}
                  </span>
                </span>
                {openFAQ === index ? (
                  <Minus className="size-5 shrink-0 text-[var(--sp-green-dark)]" />
                ) : (
                  <Plus className="size-5 shrink-0 text-[var(--sp-green-dark)]" />
                )}
              </button>
              {openFAQ === index && (
                <div className="pb-7 pl-0 sm:pl-12">
                  {faq.answer.includes("<table") ? (
                    <div
                      className="max-w-3xl text-sm leading-7 text-[var(--sp-ink)]/68"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  ) : (
                    <div className="max-w-3xl whitespace-pre-line text-sm leading-7 text-[var(--sp-ink)]/68">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
