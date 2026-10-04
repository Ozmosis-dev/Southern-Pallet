export const PALLET_SERVICES_H1 =
  "Pallet Services for Businesses Across the Southeast";

export type PalletService = {
  id: string;
  name: string;
  copy: string;
  link?: { href: string; label: string };
};

export const palletServices: PalletService[] = [
  {
    id: "manufacturing",
    name: "Pallet manufacturing",
    copy: "We build new wood pallets at our Poplarville, Mississippi facility, including standard 48x40 GMA pallets with four-way entry and kiln-dried lumber rated up to 2,800 lb. Most standard orders are ready within 24–48 hours.",
    link: { href: "/pallet-supply", label: "New and recycled pallet supply" },
  },
  {
    id: "custom",
    name: "Custom pallets",
    copy: "When a standard size does not fit your product, racking, or equipment, we build pallets to your dimensions, deck coverage, and weight requirements. Standard custom sizes typically ship in 3–5 business days, and complex designs or larger runs in 5–7.",
    link: { href: "/pallet-supply", label: "Custom pallets" },
  },
  {
    id: "heat-treated",
    name: "Heat-treated pallets",
    copy: "For export shipments, we supply ISPM-15 compliant heat-treated pallets. Each pallet is stamped to show treatment so it clears international wood packaging requirements.",
  },
  {
    id: "recycled-supply",
    name: "Recycled pallet supply",
    copy: "Inspected and repaired 48x40 pallets in Grade A and Grade B give you a lower-cost option for domestic shipping and storage. Recycled pallets start at $4.00 per pallet.",
    link: { href: "/pallet-supply", label: "Compare pallet grades" },
  },
  {
    id: "repair",
    name: "Pallet repair",
    copy: "We replace broken deck boards, cracked stringers, and damaged components so serviceable pallets go back into use instead of being replaced. Repair is often the fastest way to stretch a pallet budget.",
  },
  {
    id: "recycling",
    name: "Pallet recycling and buyback",
    copy: "Surplus and damaged pallets are sorted for reuse, repair, or component recovery. We recycle more than 500,000 pallets a year and review each load to quote eligible inventory.",
    link: { href: "/recycle-pallets", label: "Pallet recycling and buyback" },
  },
  {
    id: "delivery",
    name: "Regional delivery",
    copy: "Our own fleet delivers across the Southeast. Same-day delivery may be available for orders placed before 10:00 AM, and delivery timing is confirmed with every quote.",
  },
];

export const palletIndustries = [
  "Manufacturers",
  "Distribution centers and warehouses",
  "Retail and grocery suppliers",
  "Agriculture and food processing",
  "Construction and building materials",
  "Exporters that need heat-treated pallets",
] as const;

export const palletServicesFaqs = [
  {
    question: "What pallet services does Southern Pallet Recycling offer?",
    paragraphs: [
      "Southern Pallet Recycling manufactures new and custom wood pallets, supplies recycled pallets in Grade A and Grade B, builds ISPM-15 heat-treated pallets for export, repairs damaged pallets, buys and recycles surplus pallets, and delivers across the Southeast with its own fleet.",
    ],
  },
  {
    question: "Do you repair pallets?",
    paragraphs: [
      "Yes. We replace damaged boards, stringers, and other components and inspect the finished pallet before it returns to service. Pallets that cannot be safely repaired are recycled, with sound components recovered where possible.",
    ],
  },
  {
    question: "Do you offer heat-treated pallets for export?",
    paragraphs: [
      "Yes. We supply ISPM-15 compliant heat-treated pallets, each stamped to show treatment, for shipments that must meet international wood packaging regulations.",
    ],
  },
  {
    question: "How quickly can you fill an order?",
    paragraphs: [
      "Most standard pallet orders are ready within 24–48 hours, and same-day delivery may be available for orders placed before 10:00 AM. Standard custom sizes typically take 3–5 business days, while more complex designs or larger quantities can take 5–7. We confirm an exact timeline with your quote.",
    ],
  },
  {
    question: "What wood do you use for your pallets?",
    paragraphs: [
      "We primarily build with southern yellow pine and oak, which balance strength, durability, and cost. Hardwoods or other lumber can be used for special applications on request, and new pallets use kiln-dried lumber.",
    ],
  },
  {
    question: "What is the minimum order?",
    paragraphs: [
      "The minimum order for standard pallets is 25 units. Custom pallet minimums depend on the specification, and we work with businesses of all sizes, so contact us if you need a smaller quantity.",
    ],
  },
  {
    question: "What areas do you deliver to?",
    paragraphs: [
      "We deliver from our Poplarville, Mississippi facility to businesses in Alabama, Mississippi, Florida, Georgia, Louisiana, Tennessee, North Carolina, and South Carolina. For locations outside that area, contact us to discuss options.",
    ],
  },
] as const;
