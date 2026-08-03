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
import { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site-config"

export const metadata: Metadata = {
  description: "Order new, recycled, heat-treated, and custom wood pallets with fast regional delivery, repair, and recycling across Alabama, Mississippi, and the Southeast.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wood Pallet Supplier in Alabama & Mississippi",
    description: "Order new, recycled, heat-treated, and custom wood pallets with fast regional delivery, repair, and recycling across the Southeast.",
    url: "/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wood Pallet Supplier in Alabama & Mississippi",
    description: "Order new, recycled, heat-treated, and custom wood pallets with fast regional delivery, repair, and recycling across the Southeast.",
    images: [DEFAULT_OG_IMAGE.url],
  },
}

export default function Page() {
  return (
    <div className="min-h-screen">
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
    </div>
  )
}
