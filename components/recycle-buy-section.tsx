"use client";

export default function RecycleBuySection() {
  return (
    <section id="buy" className="py-20 bg-[#1e4a2b] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">We Buy Used Pallets</h2>
          <h3 className="text-2xl font-semibold text-[#22c55e] mb-4">
            Get the Best Prices for Your Pallets in the Southeast
          </h3>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Southern Pallet offers competitive rates for standard and box
            pallets with quick pickup and reliable service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Pallet Types */}
          <div className="bg-[#163d20] p-8 rounded-lg border border-gray-600">
            <h3 className="text-2xl font-bold text-[#22c55e] mb-8">
              We Buy These Pallet Types
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#22c55e] p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1e4a2b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M3 6l9-3 9 3v12l-9 3-9-3V6z" />
                    <path d="M3 6l9 3 9-3" />
                    <path d="M12 9v12" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-200 mb-2">
                    Standard GMA Pallets
                  </h4>
                  <p className="text-gray-300 mb-2">
                    48&quot; x 40&quot; pallets. The industry standard for durability and
                    versatility, perfect for shipping and storage.
                  </p>
                  <p className="text-gray-300 italic">
                    The go-to choice for efficient storage and safe
                    transportation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#22c55e] p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1e4a2b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M3 6l9-3 9 3v12l-9 3-9-3V6z" />
                    <path d="M3 6l9 3 9-3" />
                    <path d="M12 9v12" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-200 mb-2">
                    Box Pallets
                  </h4>
                  <p className="text-gray-300 mb-2">
                    Heavy-duty, enclosed pallets ideal for transporting bulk
                    materials and securing fragile goods.
                  </p>
                  <p className="text-gray-300 italic">
                    Built tough to handle bulk shipments with ease.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="bg-[#163d20] p-8 rounded-lg border border-gray-600">
            <h3 className="text-2xl font-bold text-[#22c55e] mb-8">
              Why Choose Us
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#22c55e] p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#1e4a2b"
                    stroke="#1e4a2b"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#22c55e]"
                  >
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Competitive Pricing
                  </h4>
                  <p className="text-gray-300">
                    Get the best value for your pallets with our transparent
                    pricing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#22c55e] p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#1e4a2b"
                    stroke="#1e4a2b"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#22c55e]"
                  >
                    <path d="M11 20A7 7 0 0 1 4 13V4h7a7 7 0 0 1 7 7v9" />
                    <path d="M4 4v9" />
                    <path d="M11 4v9" />
                    <path d="M18 11v9" />
                    <path d="M4 13h14" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Eco-Friendly Solutions
                  </h4>
                  <p className="text-gray-300">
                    Contribute to sustainability by recycling your pallets
                    responsibly with Southern Pallet.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#22c55e] p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#1e4a2b"
                    stroke="#1e4a2b"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#22c55e]"
                  >
                    <path d="M10 17h4V5H2v12h3m5 0h4" />
                    <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
                    <circle cx="7.5" cy="17.5" r="2.5" />
                    <circle cx="17.5" cy="17.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Free Pickup Available
                  </h4>
                  <p className="text-gray-300">
                    We can arrange pickup for large quantities, making it easy
                    for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#22c55e] p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#1e4a2b"
                    stroke="#1e4a2b"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#22c55e]"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-200 mb-1">
                    Get a Quote
                  </h4>
                  <p className="text-gray-300">
                    Fast and transparent pricing for your pallet inventory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
