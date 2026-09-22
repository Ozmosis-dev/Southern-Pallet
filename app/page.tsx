import Header from "../components/header"
import HeroSection from "../components/hero-section"
import AboutSection from "../components/about-section"
import ProductsSection from "../components/products-section"
import ServicesSection from "../components/services-section"
import EnvironmentalSection from "../components/environmental-section"
import DeliverySection from "../components/delivery-section"
import FAQSection from "../components/faq-section"
import ContactSection from "../components/contact-section"
import Footer from "../components/footer"
import type { Metadata } from "next"
import PublicSiteShell from "../components/public-site-shell"
import JsonLd from "@/components/seo/json-ld"
import { localBusinessSchema } from "@/lib/site-schema"
import { createSocialMetadata } from "@/lib/social-metadata"

export const metadata: Metadata = {
  title: {
    absolute: "Southeast Wood Pallet Supplier | Southern Pallet",
  },
  description:
    "Order new, recycled, heat-treated, and custom wood pallets with regional delivery, repair, recycling, and buyback service for businesses across the Southeast.",
  alternates: {
    canonical: "/",
  },
  ...createSocialMetadata({
    title: "Southeast Wood Pallet Supplier",
    description:
      "Order new, recycled, heat-treated, and custom wood pallets with regional delivery, repair, and recycling across the Southeast.",
    path: "/",
    card: "home",
  }),
}

export default function Page() {
  return (
    <PublicSiteShell>
      <JsonLd data={localBusinessSchema} />
      <Header />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <EnvironmentalSection />
      <DeliverySection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </PublicSiteShell>
  )
}
