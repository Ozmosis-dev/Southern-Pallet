import { Package, Recycle, Wrench, Truck } from "lucide-react";
import Image from "next/image";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[#1e4a2b] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute border border-white"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                borderRadius: "50%",
                left: `${-50 - i * 25}px`,
                top: `${-50 - i * 25}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Complete Pallet Services</h2>
          <p className="text-xl text-gray-200">
            From manufacturing to recycling to delivery, we provide complete
            pallet solutions for businesses throughout the southeastern United
            States.
          </p>
        </div>

        <div className="relative min-h-[500px] md:min-h-[600px]">
          {/* Central pallet image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <Image
              src="/jack.svg"
              alt="Pallet with forklift"
              width={500}
              height={500}
              className="w-96 h-96 object-contain"
            />
          </div>

          {/* Service cards - simple grid on mobile, circular arrangement on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 relative">
            {/* Top row */}
            <div className="md:translate-y-12 md:-translate-x-4">
              <div className="bg-[#163d20] p-6 rounded-lg border border-gray-600 shadow-lg shadow-black/30 h-56 w-full max-w-64 flex flex-col justify-between mx-auto">
                <Package className="w-8 h-8 text-[#22c55e] mb-4" />
                <h3 className="text-xl font-bold mb-4">Pallet Manufacturing</h3>
                <p className="text-gray-300 text-sm">
                  Custom and standard pallets built to your specifications using
                  quality lumber and expert craftsmanship.
                </p>
              </div>
            </div>

            <div className="md:translate-y-12 md:-translate-x-4">
              <div className="bg-[#163d20] p-6 rounded-lg border border-gray-600 shadow-lg shadow-black/30 h-56 w-full max-w-64 flex flex-col justify-between mx-auto">
                <Recycle className="w-8 h-8 text-[#22c55e] mb-4" />
                <h3 className="text-xl font-bold mb-4">Pallet Recycling</h3>
                <p className="text-gray-300 text-sm">
                  Our core service: environmentally responsible pallet recycling
                  that helps reduce waste and lower costs.
                </p>
              </div>
            </div>

            {/* Bottom row */}
            <div className="md:translate-y-[100px] md:translate-x-4">
              <div className="bg-[#163d20] p-6 rounded-lg border border-gray-600 shadow-lg shadow-black/30 h-56 w-full max-w-64 flex flex-col justify-between mx-auto">
                <Wrench className="w-8 h-8 text-[#22c55e] mb-4" />
                <h3 className="text-xl font-bold mb-4">Pallet Repair</h3>
                <p className="text-gray-300 text-sm">
                  Extend the life of your pallets with our professional repair
                  and reconditioning services.
                </p>
              </div>
            </div>

            <div className="md:translate-y-[100px] md:translate-x-4">
              <div className="bg-[#163d20] p-6 rounded-lg border border-gray-600 shadow-lg shadow-black/30 h-56 w-full max-w-64 flex flex-col justify-between mx-auto">
                <Truck className="w-8 h-8 text-[#22c55e] mb-4" />
                <h3 className="text-xl font-bold mb-4">Regional Delivery</h3>
                <p className="text-gray-300 text-sm">
                  Prompt delivery throughout the southeastern United States with
                  our own fleet of trucks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
