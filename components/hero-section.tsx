import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-[#1e4a2b] text-white min-h-[600px] overflow-hidden pt-40">
      {/* Background and image section */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#1e4a2b]"></div>
        {/* Mobile banner */}
        <div className="lg:hidden absolute -top-32 -left-60 -right-60 h-[600px] md:h-full md:w-1/2 md:right-0 md:left-auto bg-[#1e4a2b] overflow-hidden">
          <Image
            src="/stack.svg"
            alt="Stack of wooden pallets"
            width={1400}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Large screen slanted section */}
        <div
          className="hidden lg:block absolute right-0 top-0 w-1/2 h-full bg-[#1e4a2b] overflow-hidden"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <Image
            src="/stack.svg"
            alt="Stack of wooden pallets"
            width={800}
            height={600}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-[320px] md:pt-20 pb-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Pallets Delivered
            <br />
            Fast. Every Time.
          </h1>
          <p className="md:text-xl mb-8 text-gray-200">
            No delays. No headaches. No surprises. Just reliable pallets when
            you need them, where you need them.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a 
              href="#contact" 
              className="bg-[#22c55e] text-black px-8 py-3 rounded font-semibold hover:bg-[#16a34a] transition-colors text-center"
            >
              Get Free Quote
            </a>
            <a 
              href="/recycle-pallets" 
              className="border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-[#1e4a2b] transition-colors text-center"
            >
              Sell Your Pallets
            </a>
          </div>

          <div className="grid grid-cols-3 gap-0 md:gap-8 -mx-6 md:mx-0">
            <div className="text-center px-6 md:px-2">
              <div className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-1 md:mb-2">
                60K
              </div>
              <div className="text-xs md:text-sm text-center">
                Sq Ft Manufacturing
                <br />& Recycling Facility
              </div>
            </div>
            <div className="text-center border-x border-gray-400 px-8 md:px-4">
              <div className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-1 md:mb-2">
                500K+
              </div>
              <div className="text-xs md:text-sm">
                Pallets Recycled
                <br />
                Annually
              </div>
            </div>
            <div className="text-center px-6 md:px-2">
              <div className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-1 md:mb-2">
                100%
              </div>
              <div className="text-sm">
                On time
                <br />
                Delivery
              </div>
            </div>
          </div>
        </div>

        <div className="relative"></div>
      </div>
    </section>
  );
}
