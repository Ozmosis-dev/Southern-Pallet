import RecycleHeader from "../../components/recycle-header";
import RecycleHeroSection from "../../components/recycle-hero-section";
import RecycleBuySection from "../../components/recycle-buy-section";
import RecycleQuoteSection from "../../components/recycle-quote-section";
import RecycleProcessSection from "../../components/recycle-process-section";
import RecycleCTASection from "../../components/recycle-cta-section";
import RecycleFooter from "../../components/recycle-footer";
import { Metadata } from "next";
import Script from "next/script";
import PublicSiteShell from "../../components/public-site-shell";

export const metadata: Metadata = {
  title: "Recycle Wood Pallets | Used Pallet Recycling Near Me Supplier",
  description:
    "Southern Pallet makes it easy to recycle wood pallets. We buy and resell used pallets, providing affordable pallet recycling and supply services near you.",
  alternates: {
    canonical: 'https://southernpallet.co/recycle-pallets',
  },
  openGraph: {
    title: "Recycle Wood Pallets | Used Pallet Recycling Near Me Supplier",
    description: "Southern Pallet makes it easy to recycle wood pallets. We buy and resell used pallets, providing affordable pallet recycling and supply services near you.",
    url: 'https://southernpallet.co/recycle-pallets',
    images: ['/southern_pallet_og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recycle Wood Pallets | Used Pallet Recycling Near Me Supplier',
    description: 'Southern Pallet makes it easy to recycle wood pallets. We buy and resell used pallets, providing affordable pallet recycling and supply services near you.',
    images: ['/southern_pallet_og_image.png'],
  },
  keywords: [
    "sell pallets",
    "pallet recycling",
    "used pallets",
    "pallet buyback",
    "pallet disposal",
    "Alabama pallet recycling",
    "sustainable pallets"
  ],
};

export default function RecyclePalletsPage() {
  return (
    <PublicSiteShell>
      {/* Page-specific Schema for Recycling Service */}
      <Script
        id="schema-recycle-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Pallet Recycling Service",
            "description": "Professional pallet recycling and buyback service offering competitive prices for used wooden pallets.",
            "provider": {
              "@type": "Organization",
              "name": "Southern Pallet",
              "url": "https://www.southernpalletcompany.com"
            },
            "serviceType": "Pallet Recycling",
            "areaServed": {
              "@type": "State",
              "name": ["Alabama", "Mississippi", "Tennessee", "Georgia", "Florida"]
            },
            "offers": {
              "@type": "Offer",
              "description": "Competitive cash offers for used wooden pallets",
              "businessFunction": "http://purl.org/goodrelations/v1#Buy"
            }
          })
        }}
      />
      
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
