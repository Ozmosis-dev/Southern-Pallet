import {
  BUSINESS_ID,
  CONTACT,
  DEFAULT_OG_IMAGE,
  LEGAL_NAME,
  PRIMARY_FACILITY,
  PRIMARY_FACILITY_GEO,
  SATELLITE_OFFICE,
  SATELLITE_OFFICE_GEO,
  SERVICE_STATES,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site-config";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": BUSINESS_ID,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/southern-pallet-logo.png"),
    width: 1076,
    height: 309,
  },
  image: absoluteUrl(DEFAULT_OG_IMAGE.url),
  description:
    "Southern Pallet Recycling is a pallet supplier and recycling company in Poplarville, Mississippi, specializing in new, recycled, custom, and heat-treated wood pallets, pallet manufacturing, repair, recycling, and delivery.",
  telephone: CONTACT.phone,
  email: CONTACT.email,
  priceRange: "$4.00 and up",
  address: {
    "@type": "PostalAddress",
    ...PRIMARY_FACILITY,
  },
  geo: {
    "@type": "GeoCoordinates",
    ...PRIMARY_FACILITY_GEO,
  },
  location: [
    {
      "@type": "Place",
      name: "Southern Pallet Recycling Primary Manufacturing and Recycling Facility",
      address: {
        "@type": "PostalAddress",
        ...PRIMARY_FACILITY,
      },
      geo: {
        "@type": "GeoCoordinates",
        ...PRIMARY_FACILITY_GEO,
      },
    },
    {
      "@type": "Place",
      name: "Southern Pallet Recycling Satellite Corporate Office",
      address: {
        "@type": "PostalAddress",
        ...SATELLITE_OFFICE,
      },
      geo: {
        "@type": "GeoCoordinates",
        ...SATELLITE_OFFICE_GEO,
      },
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACT.phone,
    email: CONTACT.email,
    url: absoluteUrl("/contact"),
    contactType: "sales and customer service",
    areaServed: "US",
    availableLanguage: "English",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "07:00",
    closes: "16:00",
  },
  areaServed: SERVICE_STATES.map((name) => ({
    "@type": "State",
    name,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pallet Products and Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Pallet Products",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "New Wood Pallets",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Recycled Wood Pallets",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Custom Wood Pallets",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Heat-Treated Pallets",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Hybrid Wood Pallets",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Pallet Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pallet Manufacturing",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pallet Recycling",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pallet Repair and Reconditioning",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pallet Pickup and Recovery",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pallet Delivery",
            },
          },
        ],
      },
    ],
  },
} as const;

export function pageImageSchema(path: string, image: string, caption: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(image),
      caption,
    },
  };
}
