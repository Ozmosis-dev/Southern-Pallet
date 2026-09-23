export const SOCIAL_CARD_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const SOCIAL_CARD_VERSION = "v1";

export const SOCIAL_CARDS = {
  home: {
    eyebrow: "PALLET SUPPLY · SOUTHEAST",
    title: "Southeast wood pallet supplier.",
    image: "/inspected-recycled-wood-pallets.jpg",
    alt: "Southern Pallet Recycling Southeast wood pallet supply and delivery",
  },
  contact: {
    eyebrow: "QUOTES · DELIVERY · SUPPORT",
    title: "Talk directly with our pallet team.",
    image: "/used-wood-pallets-recycling.jpg",
    alt: "Contact Southern Pallet Recycling for a wood pallet quote",
  },
  recycling: {
    eyebrow: "PALLET RECOVERY · BUYBACK",
    title: "Put used wood pallets back to work.",
    image: "/used-wood-pallets-recycling.jpg",
    alt: "Southern Pallet Recycling used wood pallet recycling and buyback",
  },
  careers: {
    eyebrow: "CAREERS · POPLARVILLE, MISSISSIPPI",
    title: "Build dependable operations with us.",
    image: "/inspected-recycled-wood-pallets.jpg",
    alt: "Careers in pallet manufacturing and operations at Southern Pallet Recycling",
  },
  resources: {
    eyebrow: "SOUTHERN PALLET RECYCLING FIELD NOTES",
    title: "Wood pallet guides for better operations.",
    image: "/used-wood-pallets-recycling.jpg",
    alt: "Southern Pallet Recycling wood pallet guides and recycling resources",
  },
  "used-pallet-buying": {
    eyebrow: "BUYING GUIDE",
    title: "Where to buy used pallets for your business.",
    image: "/inspected-recycled-wood-pallets.jpg",
    alt: "Guide to buying inspected used wood pallets for a business",
  },
  "recycling-benefits": {
    eyebrow: "SUSTAINABILITY GUIDE",
    title: "The environmental value of pallet recycling.",
    image: "/used-wood-pallets-recycling.jpg",
    alt: "Guide to the environmental benefits of wood pallet recycling",
  },
  "pallet-costs": {
    eyebrow: "OPERATIONS GUIDE",
    title: "Eight practical ways to reduce pallet costs.",
    image: "/inspected-recycled-wood-pallets.jpg",
    alt: "Guide to reducing wood pallet procurement and handling costs",
  },
  "request-received": {
    eyebrow: "REQUEST RECEIVED",
    title: "Your pallet request is with our team.",
    image: "/inspected-recycled-wood-pallets.jpg",
    alt: "Southern Pallet Recycling request confirmation",
  },
} as const;

export type SocialCardKey = keyof typeof SOCIAL_CARDS;

export function isSocialCardKey(value: string): value is SocialCardKey {
  return value in SOCIAL_CARDS;
}

export function socialCardPath(card: SocialCardKey) {
  return `/social-card/${SOCIAL_CARD_VERSION}/${card}`;
}
