import { pageImageSchema } from "@/lib/site-schema";
import RecycleLoadPreparation from "@/components/recycle-load-preparation";
import RecycleHeader from "../../components/recycle-header";
import RecycleHeroSection from "../../components/recycle-hero-section";
import RecycleBuySection from "../../components/recycle-buy-section";
import RecycleQuoteSection from "../../components/recycle-quote-section";
import RecycleProcessSection from "../../components/recycle-process-section";
import RecycleFAQSection from "../../components/recycle-faq-section";
import RecycleCTASection from "../../components/recycle-cta-section";
import RecycleFooter from "../../components/recycle-footer";
import type { Metadata } from "next";
import PublicSiteShell from "../../components/public-site-shell";
import JsonLd from "@/components/seo/json-ld";
import {
  BUSINESS_ID,
  SERVICE_STATES,
  SITE_URL,
} from "@/lib/site-config";
import { createSocialMetadata } from "@/lib/social-metadata";
import { recycleFaqs } from "@/lib/recycle-page-content";

export const metadata: Metadata = {
  title: {
    absolute: "Wood Pallet Recycling Company | Southern Pallet Recycling",
  },
  description:
    "Choose Southern Pallet Recycling, a wood pallet recycling company, for pickup, repair, and recovery. Find pallet recycling companies near me for business needs.",
  alternates: {
    canonical: "/recycle-pallets",
  },
  ...createSocialMetadata({
    title: "Wood Pallet Recycling Company",
    description:
      "Choose Southern Pallet Recycling, a wood pallet recycling company, for pickup, repair, and recovery. Find pallet recycling companies near me for business needs.",
    path: "/recycle-pallets",
    card: "recycling",
  }),
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
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/recycle-pallets#faq`,
      mainEntity: recycleFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.paragraphs.join(" "),
        },
      })),
    },
  ],
};

export default function RecyclePalletsPage() {
  return (
    <PublicSiteShell>
      <JsonLd data={pageImageSchema("/recycle-pallets", "/recycled-pallet-recovery.webp", "Used wood pallets with replacement boards stacked in a recovery bay")} />
      <JsonLd data={recyclingSchema} />
      
      <RecycleHeader />
      <main>
        <RecycleHeroSection />
        <RecycleBuySection />
        <RecycleLoadPreparation />
        <RecycleQuoteSection />
        <RecycleProcessSection />
        <RecycleFAQSection />
        <RecycleCTASection />
      </main>
      <RecycleFooter />
    </PublicSiteShell>
  );
}
