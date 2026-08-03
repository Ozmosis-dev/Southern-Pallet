import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pallet Quote Request Received",
  description:
    "We've received your request and will be in touch soon. Southern Pallet appreciates your interest in our pallet services.",
  alternates: {
    canonical: "/thank-you",
  },
  openGraph: {
    title: "Pallet Quote Request Received",
    description: "We've received your request and will be in touch soon. Southern Pallet appreciates your interest in our pallet services.",
    url: "/thank-you",
    images: ['/southern_pallet_og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pallet Quote Request Received",
    description: "We've received your request and will be in touch soon. Southern Pallet appreciates your interest in our pallet services.",
    images: ['/southern_pallet_og_image.png'],
  },
  robots: {
    index: false,
    follow: true,
  }
};

export default function ThankYouPage() {
  return (
          <div className="min-h-screen bg-[#1e4a2b] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-[#22c55e] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Thank You!
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-200 mb-6">
            Your quote request has been submitted successfully
          </h2>
        </div>

        <div className="bg-[#001f35] p-8 rounded-lg border border-gray-600 mb-8">
          <h3 className="text-2xl font-bold text-[#fbca0b] mb-4">
            What happens next?
          </h3>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#fbca0b] text-black rounded-full flex items-center justify-center text-sm font-bold mt-1">
                1
              </div>
              <p className="text-gray-200">
                Our team will review your quote request within the next hour
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#fbca0b] text-black rounded-full flex items-center justify-center text-sm font-bold mt-1">
                2
              </div>
              <p className="text-gray-200">
                We&apos;ll prepare a personalized quote based on your specific needs
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#fbca0b] text-black rounded-full flex items-center justify-center text-sm font-bold mt-1">
                3
              </div>
              <p className="text-gray-200">
                You&apos;ll receive your competitive quote via email or phone call
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold text-[#002947] mb-4">
            Need immediate assistance?
          </h3>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#002947]" />
              <span className="font-semibold text-[#002947]">
                (601) 746-5012
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#002947]" />
              <span className="font-semibold text-[#002947]">
                info@southernpallet.co
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-[#22c55e] text-black hover:bg-[#16a34a] font-semibold">
              Return to Homepage
            </Button>
          </Link>
          <Link href="/#products">
            <Button 
              variant="outline" 
              className="text-white border-white/50 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white"
            >
              View Our Products
            </Button>
          </Link>
        </div>

        <p className="text-gray-400 text-sm mt-8">
          Most quotes are returned within 1 hour • Most deliveries within 24 hours
        </p>
      </div>
    </div>
  );
}
