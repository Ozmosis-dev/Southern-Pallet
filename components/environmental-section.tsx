import { Button } from "@/components/ui/button";
import { Recycle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EnvironmentalSection() {
  return (
    <section id="environmental" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:block rounded-lg overflow-hidden">
            <Image
              src="/recycle.svg"
              alt="Wooden pallets for recycling"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-[#1e4a2b] text-white p-12 rounded-lg">
            <div className="text-sm font-semibold text-[#22c55e] mb-4">
              We&apos;ve Saved
            </div>
            
            {/* Mobile layout - icon left, text right */}
            <div className="flex items-center gap-4 mb-6 md:hidden">
              <Recycle className="w-12 h-12 text-white flex-shrink-0" />
              <div>
                <div className="text-4xl font-bold mb-1">500K+</div>
                <div className="text-lg">Pallets from Landfills</div>
              </div>
            </div>

            {/* Desktop layout - original vertical */}
            <div className="hidden md:block">
              <div className="text-5xl font-bold mb-2">500K+</div>
              <div className="text-xl mb-6">Pallets from Landfills</div>
              <div className="flex items-center mb-8">
                <Recycle className="w-16 h-16 text-white mr-4" />
              </div>
            </div>

            <p className="text-gray-200 mb-8">
              Our recycling initiative helps companies cut costs and waste by
              collecting, repairing, and reconditioning used pallets — giving
              them a second life and reducing environmental impact.
            </p>

            <Link href="/recycle-pallets">
              <Button className="bg-[#22c55e] text-black hover:bg-[#16a34a] font-semibold">
                Join the Movement
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
