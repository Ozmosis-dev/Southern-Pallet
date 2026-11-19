import { pageImageSchema } from "@/lib/site-schema";
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
    absolute: "Heat Treated Pallets Company Poplarville for Quality Pallets",
  },
  description:
    "Find a heat treated pallets company Poplarville for quality wood pallets. Buy pallets near me with new & recycled options for your shipping and storage needs.",
  alternates: {
    canonical: "/",
  },
  ...createSocialMetadata({
    title: "Heat Treated Pallets Company Poplarville for Quality Pallets",
    description:
      "Find a heat treated pallets company Poplarville for quality wood pallets. Buy pallets near me with new & recycled options for your shipping and storage needs.",
    path: "/",
    card: "home",
  }),
}

export default function Page() {
  return (
    <PublicSiteShell>
      <JsonLd data={pageImageSchema("/", "/wood-pallet-dispatch.webp", "Used wood pallets stacked beside an open warehouse door")} />
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
