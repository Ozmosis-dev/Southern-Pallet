"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function DeliverySection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const states = [
    "Alabama",
    "Georgia",
    "Florida",
    "Tennessee",
    "Mississippi",
    "Louisiana",
    "South Carolina",
    "North Carolina",
  ];

  return (
    <section id="delivery" className="py-20 bg-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Service info */}
          <div>
            <div className="bg-white p-8 rounded-lg border border-gray-500 mb-8">
              <div className="flex items-center mb-6">
                              <MapPin className="w-6 h-6 text-[#1e4a2b] mr-3" />
              <h3 className="text-xl font-bold text-[#1e4a2b]">
                  Service Areas
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {states.map((state) => (
                  <div
                    key={state}
                    className="bg-gray-100 px-3 py-2 rounded text-sm text-[#002947] font-medium border border-gray-500 inline-block"
                  >
                    {state}
                  </div>
                ))}
              </div>

              <div className="flex items-center mb-6">
                              <Phone className="w-6 h-6 text-[#1e4a2b] mr-3" />
              <h3 className="text-xl font-bold text-[#1e4a2b]">
                  Schedule a Delivery
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                Contact us today to schedule a delivery or discuss your pallet
                needs.
              </p>

              <Button 
                className="w-full bg-[#22c55e] text-black hover:bg-[#16a34a] font-semibold mb-8"
                onClick={() => setIsContactModalOpen(true)}
              >
                Get In Touch
              </Button>

              <div className="flex items-center mb-4">
                              <Clock className="w-6 h-6 text-[#1e4a2b] mr-3" />
              <h3 className="text-xl font-bold text-[#1e4a2b]">
                  Delivery Schedule
                </h3>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <strong>Monday - Friday :</strong> 7:00 AM - 5:00 PM (CST)
                </div>
                <div>
                  <strong>Saturday :</strong> 8:00 AM - 12:00 PM (CST)
                </div>
                <div className="pt-2 text-[#002947] font-medium">
                  Same-day delivery available for orders placed before 10:00 AM (CST)
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Map and title */}
          <div>
            <h2 className="text-4xl font-bold text-[#1e4a2b] mb-6">
              Delivery Throughout the Southeast
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              We provide reliable delivery services to businesses throughout the
              southeastern United States. Our fleet of trucks ensures your
              pallets arrive on time and in perfect condition.
            </p>

            <div className="bg-white p-8 rounded-lg">
              <Image
                src="/map.svg"
                alt="Southeastern US delivery map"
                width={500}
                height={300}
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl p-8 mx-4 max-w-md w-full">
            {/* Close button */}
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal content */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#002947] mb-2">
                Schedule Your Delivery
              </h3>
              <p className="text-gray-600">
                Get in touch to schedule delivery or discuss your pallet needs
              </p>
            </div>

            <div className="space-y-4">
              {/* Call Option */}
              <a
                href="tel:+16017465012"
                className="flex items-center justify-center gap-4 w-full p-4 bg-[#002947] text-white rounded-lg hover:bg-[#003a5f] transition-colors"
                onClick={() => setIsContactModalOpen(false)}
              >
                <Phone className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Call Now</div>
                  <div className="text-sm text-gray-200">(601) 746-5012</div>
                </div>
              </a>

              {/* Email Option */}
              <a
                href="mailto:info@southernpallet.co?subject=Delivery Scheduling Request&body=Hi, I'd like to schedule a delivery for pallets. Please contact me to discuss details and timing."
                className="flex items-center justify-center gap-4 w-full p-4 bg-[#fbca0b] text-black rounded-lg hover:bg-[#dbaf06] transition-colors"
                onClick={() => setIsContactModalOpen(false)}
              >
                <Mail className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Send Email</div>
                  <div className="text-sm text-gray-700">info@southernpallet.co</div>
                </div>
              </a>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Same-day delivery available for orders placed before 10:00 AM
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
