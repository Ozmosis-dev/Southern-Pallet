export default function RecycleProcessSection() {
  return (
    <section id="process" className="pt-16 md:pb-16 bg-[#163d20]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="bg-[#22c55e] p-4 rounded-full flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1e4a2b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              How Our Process Works
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-5xl">
              Pallet values vary based on type, size, and condition. Standard
              48&quot; x 40&quot; pallets in good condition are particularly
              valuable. Contact us for current rates based on your specific
              pallet needs and quantity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
