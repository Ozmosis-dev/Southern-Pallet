import { Clock, MapPin, Star, Settings } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-[#1e4a2b] mb-6">
              About Us: Family-Owned Pallet Company
            </h2>
            <p className="text-gray-700 mb-6">
              Southern Pallet Recycling is a new and innovative pallet company
              dedicated to providing quality service. We manufacture new
              pallets, recycle used pallets, and provide reliable delivery to
              meet your specific needs.
            </p>
            <p className="text-gray-700 mb-8">
              As a leader in sustainable pallet solutions, we understand the
              unique needs of businesses in our region and pride ourselves on
              providing personalized service with quick turnaround times. Learn more about our <a href="/recycle-pallets" className="text-[#1e4a2b] font-semibold hover:underline">pallet recycling services</a> and how we help businesses achieve their sustainability goals.
            </p>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1e4a2b] mb-4">
                Our Facility
              </h3>
              <p className="text-gray-700">
                Our 60,000 sq ft manufacturing and recycling facility in
                Poplarville, MS allows us to produce high-quality pallets
                efficiently and meet the demands of businesses throughout the
                southeastern United States.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-3 sm:p-6 rounded-lg border border-gray-500 flex sm:block items-start gap-3 -mt-20 sm:mt-0">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#1e4a2b] flex-shrink-0 mt-1 sm:mt-0 sm:mb-4" />
              <div className="sm:block">
                <h3 className="text-lg sm:text-xl font-bold text-[#1e4a2b] mb-1 sm:mb-2">
                  Fast
                  <span className="sm:hidden"> Turnaround</span>
                  <br className="hidden sm:block" />
                  <span className="hidden sm:inline">Turnaround</span>
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  <span className="sm:hidden">
                    Most orders ready within 24-48 hours
                  </span>
                  <span className="hidden sm:block">
                    Most orders ready
                    <br />
                    within 24-48 hours
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-6 rounded-lg border border-gray-500 flex sm:block items-start gap-3">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#1e4a2b] flex-shrink-0 mt-1 sm:mt-0 sm:mb-4" />
              <div className="sm:block">
                <h3 className="text-lg sm:text-xl font-bold text-[#1e4a2b] mb-1 sm:mb-2">
                  Regional
                  <span className="sm:hidden"> Delivery</span>
                  <br className="hidden sm:block" />
                  <span className="hidden sm:inline">Delivery</span>
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  <span className="sm:hidden">
                    Serving the entire Southeast
                  </span>
                  <span className="hidden sm:block">
                    Serving the entire
                    <br />
                    Southeast
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-6 rounded-lg border border-gray-500 flex sm:block items-start gap-3">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-[#1e4a2b] flex-shrink-0 mt-1 sm:mt-0 sm:mb-4" />
              <div className="sm:block">
                <h3 className="text-lg sm:text-xl font-bold text-[#1e4a2b] mb-1 sm:mb-2">
                  Quality
                  <span className="sm:hidden"> Guaranteed</span>
                  <br className="hidden sm:block" />
                  <span className="hidden sm:inline">Guaranteed</span>
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  <span className="sm:hidden">
                    Built to last with premium materials
                  </span>
                  <span className="hidden sm:block">
                    Built to last with
                    <br />
                    premium materials
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-6 rounded-lg border border-gray-500 flex sm:block items-start gap-3 -mb-15 sm:mb-0">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-[#1e4a2b] flex-shrink-0 mt-1 sm:mt-0 sm:mb-4" />
              <div className="sm:block">
                <h3 className="text-lg sm:text-xl font-bold text-[#1e4a2b] mb-1 sm:mb-2">
                  Custom
                  <span className="sm:hidden"> Solutions</span>
                  <br className="hidden sm:block" />
                  <span className="hidden sm:inline">Solutions</span>
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  <span className="sm:hidden">
                    Pallets built to your specifications
                  </span>
                  <span className="hidden sm:block">
                    Pallets built to your
                    <br />
                    specifications
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
