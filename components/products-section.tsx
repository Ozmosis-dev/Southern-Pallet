"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductsSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1e4a2b] mb-4">
            Quality Pallet Solutions for Every Need
          </h2>
          <p className="text-gray-600 text-lg">
            We offer a variety of standard and custom pallet options to meet
            your specific requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Recycled Pallets */}
          <div className="bg-white rounded-lg border border-gray-500 overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-100">
              <Image
                src="/recyled_pallet_card.jpg"
                alt="Recycled pallets"
                width={400}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#1e4a2b] mb-4">
                Recycled Pallets
              </h3>
              <div className="text-3xl font-bold text-[#1e4a2b] mb-2">
                Starting at $4.00 <span className="text-base font-normal">per pallet</span>
              </div>
              <p className="text-gray-600 mb-6">
                Environmentally friendly and cost-effective recycled pallets
                that meet quality standards for a variety of applications.
              </p>

              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Thoroughly inspected
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Repaired to specifications
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Environmentally responsible
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Cost-effective solution
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Multiple grades available
                </li>
              </ul>

              <Button 
                className="w-full bg-[#22c55e] text-black hover:bg-[#16a34a] font-semibold"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset;
                    const startPosition = window.scrollY;
                    const distance = elementPosition - startPosition;
                    const duration = 2000;
                    let start: number;

                    const animation = (currentTime: number) => {
                      if (!start) start = currentTime;
                      const timeElapsed = currentTime - start;
                      const progress = Math.min(timeElapsed / duration, 1);

                      const easeInOutCubic = (p: number): number => {
                        return p < 0.5
                          ? 4 * p * p * p
                          : 1 - Math.pow(-2 * p + 2, 3) / 2;
                      };

                      window.scrollTo({
                        top: startPosition + distance * easeInOutCubic(progress)
                      });

                      if (progress < 1) {
                        requestAnimationFrame(animation);
                      }
                    };

                    requestAnimationFrame(animation);
                  }
                }}
              >
                Order Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* A-Grade New Pallets */}
          <div className="bg-white rounded-lg border border-gray-500 overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-100">
              <Image
                src="/grade-a.svg"
                alt="New and Hybrid Pallets"
                width={400}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#1e4a2b] mb-4">
                New and Hybrid Pallets
              </h3>
              <div className="text-3xl font-bold text-[#1e4a2b] mb-2">
               Starting at $9.50{" "}
                <span className="text-base font-normal">per pallet</span>
              </div>
              <p className="text-gray-600 mb-6">
                Our high-quality new pallets are built to your specifications
                using premium lumber for maximum durability and performance.
              </p>

              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  48&quot; x 40&quot; dimensions
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  4-way entry
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Holds up to 2,800 lbs
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Kiln-dried lumber
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Available in bulk quantities
                </li>
              </ul>

              <Button 
                className="w-full bg-[#22c55e] text-black hover:bg-[#16a34a] font-semibold"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset;
                    const startPosition = window.scrollY;
                    const distance = elementPosition - startPosition;
                    const duration = 2000;
                    let start: number;

                    const animation = (currentTime: number) => {
                      if (!start) start = currentTime;
                      const timeElapsed = currentTime - start;
                      const progress = Math.min(timeElapsed / duration, 1);

                      const easeInOutCubic = (p: number): number => {
                        return p < 0.5
                          ? 4 * p * p * p
                          : 1 - Math.pow(-2 * p + 2, 3) / 2;
                      };

                      window.scrollTo({
                        top: startPosition + distance * easeInOutCubic(progress)
                      });

                      if (progress < 1) {
                        requestAnimationFrame(animation);
                      }
                    };

                    requestAnimationFrame(animation);
                  }
                }}
              >
                Get Quote <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Custom Pallets */}
          <div className="bg-white rounded-lg border border-gray-500 overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-100">
              <Image
                src="/custom.svg"
                alt="Custom pallets"
                width={400}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#1e4a2b] mb-4">
                Custom New & Used
              </h3>
              <div className="text-3xl font-bold text-[#1e4a2b] mb-2">
                Custom quote
              </div>
              <p className="text-gray-600 mb-6">
                Custom-built pallets designed to your exact specifications for
                specialized applications and unique requirements.
              </p>

              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Custom dimensions
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Weight capacity options
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Special wood treatments
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Reinforced designs available
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#1e4a2b] rounded-full mr-3"></div>
                  Perfect for unique cargo
                </li>
              </ul>

              <Button 
                className="w-full bg-[#22c55e] text-black hover:bg-[#16a34a] font-semibold"
                onClick={() => setIsContactModalOpen(true)}
              >
                Call Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
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
              <h3 className="text-2xl font-bold text-[#1e4a2b] mb-2">
                Contact Us for Custom Pallets
              </h3>
              <p className="text-gray-600">
                Choose how you&apos;d like to get in touch with us
              </p>
            </div>

            <div className="space-y-4">
              {/* Call Option */}
              <a
                href="tel:+16017465012"
                className="flex items-center justify-center gap-4 w-full p-4 bg-[#1e4a2b] text-white rounded-lg hover:bg-[#2d5a3d] transition-colors"
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
                href="mailto:info@southernpallet.co?subject=Custom Pallet Quote Request&body=Hi, I'm interested in getting a quote for custom pallets. Please contact me with more information."
                className="flex items-center justify-center gap-4 w-full p-4 bg-[#22c55e] text-black rounded-lg hover:bg-[#16a34a] transition-colors"
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
                We typically respond within 1 hour during business hours
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
