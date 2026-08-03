import RecycleHeader from "../../components/recycle-header";
import RecycleHeroSection from "../../components/recycle-hero-section";
import RecycleBuySection from "../../components/recycle-buy-section";
import RecycleQuoteSection from "../../components/recycle-quote-section";
import RecycleProcessSection from "../../components/recycle-process-section";
import RecycleCTASection from "../../components/recycle-cta-section";
import RecycleFooter from "../../components/recycle-footer";
import type { Metadata } from "next";
import PublicSiteShell from "../../components/public-site-shell";
import JsonLd from "@/components/seo/json-ld";
import {
  BUSINESS_ID,
  DEFAULT_OG_IMAGE,
  SERVICE_STATES,
  SITE_URL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Used Pallet Recycling & Buyback",
  description:
    "Sell surplus wood pallets or schedule pallet recycling and pickup with Southern Pallet. Serving businesses across Alabama, Mississippi, and the Southeast.",
  alternates: {
    canonical: "/recycle-pallets",
  },
  openGraph: {
    title: "Used Pallet Recycling & Buyback",
    description:
      "Sell surplus wood pallets or schedule recycling and pickup with Southern Pallet across Alabama, Mississippi, and the Southeast.",
    url: "/recycle-pallets",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Pallet Recycling & Buyback",
    description:
      "Sell surplus wood pallets or schedule recycling and pickup with Southern Pallet across Alabama, Mississippi, and the Southeast.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

const recyclingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/recycle-pallets#service`,
      name: "Used Wood Pallet Recycling and Buyback",
      description:
        "Pallet pickup, repair, reuse, and recycling for businesses with surplus wood pallets.",
      url: `${SITE_URL}/recycle-pallets`,
      provider: { "@id": BUSINESS_ID },
      serviceType: "Wood pallet recycling and buyback",
      areaServed: SERVICE_STATES.map((name) => ({ "@type": "State", name })),
      offers: {
        "@type": "Offer",
        description:
          "Condition- and quantity-based quotes for eligible used wood pallets.",
        url: `${SITE_URL}/recycle-pallets#sell-pallets`,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pallet Recycling",
          item: `${SITE_URL}/recycle-pallets`,
        },
      ],
    },
  ],
};

export default function RecyclePalletsPage() {
  return (
    <PublicSiteShell>
      <JsonLd data={recyclingSchema} />
      
      <RecycleHeader />
      <RecycleHeroSection />
      <RecycleBuySection />
      <RecycleQuoteSection />
      <RecycleProcessSection />
      <RecycleCTASection />
      <RecycleFooter />
    </PublicSiteShell>
  );
}
