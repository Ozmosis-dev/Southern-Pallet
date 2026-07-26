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

export const metadata: Metadata = {
  title: "Pallets for Sale Near Me | Used & New Wood Pallets Supplier",
  description: "Southern Pallet offers new & used wood pallets for sale near you. Trusted pallet supplier with fast delivery, recycling, and complete pallet management.",
  alternates: {
    canonical: 'https://southernpallet.co',
  },
  openGraph: {
    title: "Pallets for Sale Near Me | Used & New Wood Pallets Supplier",
    description: "Southern Pallet offers new & used wood pallets for sale near you. Trusted pallet supplier with fast delivery, recycling, and complete pallet management.",
    url: 'https://southernpallet.co',
    images: ['/southern_pallet_og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pallets for Sale Near Me | Used & New Wood Pallets Supplier',
    description: 'Southern Pallet offers new & used wood pallets for sale near you. Trusted pallet supplier with fast delivery, recycling, and complete pallet management.',
    images: ['/southern_pallet_og_image.png'],
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
