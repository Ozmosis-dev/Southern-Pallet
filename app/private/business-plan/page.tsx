"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import components with no SSR to prevent hydration errors
const SharedHeader = dynamic(
  () => import("../../../components/shared-header"),
  {
    ssr: false,
  },
);

const SharedFooter = dynamic(
  () => import("../../../components/shared-footer"),
  {
    ssr: false,
  },
);

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Responsive Business Plan Content Component
const BusinessPlanPresentation = () => {
  const [pdfUrl] = useState(
    "/Southern_Pallet_Recycling_-_Updated_Investor_Presentation (4).pdf",
  );

  return (
    <div className="bg-white">
      {/* Header with download button */}
      <div className="bg-[#1e4a2b] text-white pt-6 pb-2 px-4 lg:px-6 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl lg:text-2xl font-bold text-center sm:text-left">
            Southern Pallet Recycling - Investor Presentation
          </h1>
          <a
            href={pdfUrl}
            download="Southern_Pallet_Recycling_Business_Plan.pdf"
            className="bg-[#22c55e] hover:bg-[#16a34a] text-black px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF
          </a>
        </div>
      </div>

      {/* Desktop: iframe for perfect desktop experience, Hidden on mobile/tablet */}
      <div
        className="hidden lg:block"
        style={{ height: "calc(100vh - 150px)" }}
      >
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          className="w-full h-full border-0"
          title="Southern Pallet Recycling Business Plan"
        />
      </div>

      {/* Mobile/Tablet: Responsive HTML content */}
      <div className="lg:hidden bg-white">
        {/* Summarized Version Message */}
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm md:text-base pt-18 text-blue-800 font-medium text-center">
              📋 This is a mobile/tablet optimized summary. Download the PDF
              from the button above for the complete business plan with charts,
              graphs, and full details.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-16">
          {/* Executive Summary */}
          <section className="space-y-8">
            <div className="text-center pb-8 border-b border-gray-200">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e4a2b] mb-4">
                Executive Summary
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Southern Pallet Recycling is revolutionizing the pallet industry
                through sustainable recycling practices, cost-effective
                solutions, and environmental stewardship.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-gray-50 p-6 md:p-8 lg:p-10 rounded-lg">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-4">
                  Market Opportunity
                </h3>
                <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
                  The global pallet market is valued at over $15 billion
                  annually, with growing demand for sustainable recycling
                  solutions as businesses prioritize environmental
                  responsibility and cost reduction.
                </p>
              </div>

              <div className="bg-gray-50 p-6 md:p-8 lg:p-10 rounded-lg">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-4">
                  Our Solution
                </h3>
                <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
                  We provide comprehensive pallet recycling services, extending
                  pallet lifecycles through expert repair, refurbishment, and
                  sustainable disposal practices while offering significant cost
                  savings to our clients.
                </p>
              </div>
            </div>
          </section>

          {/* Company Overview */}
          <section className="space-y-8">
            <div className="text-center pb-8 border-b border-gray-200">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e4a2b] mb-4">
                Company Overview
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b]">
                  Our Mission
                </h3>
                <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
                  To transform the pallet industry through innovative recycling
                  solutions that benefit businesses, communities, and the
                  environment while building long-term sustainable value.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b]">
                  Core Values
                </h3>
                <ul className="text-gray-700 text-base md:text-lg lg:text-xl space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    Environmental Sustainability
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    Customer-Centric Service
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    Quality & Reliability
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    Innovation & Growth
                  </li>
                </ul>
              </div>
            </div>

            {/* Company Stats */}
            <div className="bg-green-50 border border-green-200 p-6 md:p-8 lg:p-10 rounded-lg">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-6 text-center">
                Company Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                    500K+
                  </div>
                  <div className="text-sm md:text-base lg:text-lg text-gray-700">
                    Pallets Recycled Annually
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                    25+
                  </div>
                  <div className="text-sm md:text-base lg:text-lg text-gray-700">
                    Active Clients
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                    15
                  </div>
                  <div className="text-sm md:text-base lg:text-lg text-gray-700">
                    States Served
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                    95%
                  </div>
                  <div className="text-sm md:text-base lg:text-lg text-gray-700">
                    Customer Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services & Business Model */}
          <section className="space-y-8">
            <div className="text-center pb-8 border-b border-gray-200">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e4a2b] mb-4">
                Services & Business Model
              </h2>
            </div>

            <div className="grid gap-8 lg:gap-12">
              <div className="bg-green-50 border border-green-200 p-6 md:p-8 lg:p-10 rounded-lg">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-6">
                  Pallet Recycling Services
                </h3>
                <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 text-gray-700">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg md:text-xl">
                      Collection & Pickup
                    </h4>
                    <p className="text-base md:text-lg leading-relaxed">
                      Regular scheduled pickups and on-demand collection
                      services with flexible scheduling to meet your needs.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg md:text-xl">
                      Repair & Refurbishment
                    </h4>
                    <p className="text-base md:text-lg leading-relaxed">
                      Expert repair services to extend pallet lifecycle using
                      industry-standard techniques and quality materials.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg md:text-xl">
                      Quality Grading
                    </h4>
                    <p className="text-base md:text-lg leading-relaxed">
                      Professional assessment and grading of pallet conditions
                      according to industry standards (Grade A, B, C).
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg md:text-xl">
                      Sustainable Disposal
                    </h4>
                    <p className="text-base md:text-lg leading-relaxed">
                      Environmentally responsible disposal of end-of-life
                      pallets through recycling and biomass conversion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-6 md:p-8 lg:p-10 rounded-lg">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-6">
                  Revenue Streams
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 lg:p-6 bg-white rounded border border-blue-100">
                    <span className="font-semibold text-base md:text-lg">
                      Collection Services
                    </span>
                    <span className="text-blue-600 font-bold text-lg md:text-xl">
                      35%
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 lg:p-6 bg-white rounded border border-blue-100">
                    <span className="font-semibold text-base md:text-lg">
                      Refurbished Pallet Sales
                    </span>
                    <span className="text-blue-600 font-bold text-lg md:text-xl">
                      40%
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 lg:p-6 bg-white rounded border border-blue-100">
                    <span className="font-semibold text-base md:text-lg">
                      Raw Material Sales
                    </span>
                    <span className="text-blue-600 font-bold text-lg md:text-xl">
                      25%
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Area */}
              <div className="bg-gray-50 p-6 md:p-8 lg:p-10 rounded-lg">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-6 text-center">
                  Service Area Coverage
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e4a2b] mb-2">
                      15
                    </div>
                    <div className="text-sm md:text-base lg:text-lg text-gray-700">
                      States Covered
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e4a2b] mb-2">
                      200+
                    </div>
                    <div className="text-sm md:text-base lg:text-lg text-gray-700">
                      Mile Radius
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e4a2b] mb-2">
                      48hr
                    </div>
                    <div className="text-sm md:text-base lg:text-lg text-gray-700">
                      Response Time
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e4a2b] mb-2">
                      24/7
                    </div>
                    <div className="text-sm md:text-base lg:text-lg text-gray-700">
                      Support Available
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Market Analysis */}
          <section className="space-y-8">
            <div className="text-center pb-8 border-b border-gray-200">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e4a2b] mb-4">
                Market Analysis
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 md:p-8 lg:p-10 rounded-lg">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-6">
                    Market Size
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-base md:text-lg">
                        Global Pallet Market
                      </span>
                      <span className="font-bold text-lg md:text-xl text-green-600">
                        $15.2B
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base md:text-lg">
                        Annual Growth Rate
                      </span>
                      <span className="font-bold text-lg md:text-xl text-green-600">
                        4.8%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base md:text-lg">
                        Recycling Segment
                      </span>
                      <span className="font-bold text-lg md:text-xl text-green-600">
                        $3.8B
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 md:p-8 lg:p-10 rounded-lg">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-6">
                    Target Markets
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-lg">
                        •
                      </span>
                      <div>
                        <div className="font-semibold text-base md:text-lg">
                          Manufacturing & Distribution
                        </div>
                        <p className="text-sm md:text-base text-gray-600">
                          Large-scale pallet users with regular turnover
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-lg">
                        •
                      </span>
                      <div>
                        <div className="font-semibold text-base md:text-lg">
                          Retail & E-commerce
                        </div>
                        <p className="text-sm md:text-base text-gray-600">
                          Growing demand from online retail logistics
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-lg">
                        •
                      </span>
                      <div>
                        <div className="font-semibold text-base md:text-lg">
                          Food & Beverage
                        </div>
                        <p className="text-sm md:text-base text-gray-600">
                          High-volume users requiring quality standards
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-50 p-6 md:p-8 lg:p-10 rounded-lg">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-6">
                    Competitive Advantages
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-lg">
                        ✓
                      </span>
                      <div>
                        <div className="font-semibold text-base md:text-lg">
                          Cost Efficiency
                        </div>
                        <p className="text-sm md:text-base">
                          Up to 60% cost savings vs. new pallets
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-lg">
                        ✓
                      </span>
                      <div>
                        <div className="font-semibold text-base md:text-lg">
                          Environmental Impact
                        </div>
                        <p className="text-sm md:text-base">
                          Significant reduction in waste and deforestation
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-lg">
                        ✓
                      </span>
                      <div>
                        <div className="font-semibold text-base md:text-lg">
                          Quality Assurance
                        </div>
                        <p className="text-sm md:text-base">
                          Rigorous inspection and grading processes
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-lg">
                        ✓
                      </span>
                      <div>
                        <div className="font-semibold text-base md:text-lg">
                          Reliable Service
                        </div>
                        <p className="text-sm md:text-base">
                          Consistent pickup and delivery schedules
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-6 md:p-8 lg:p-10 rounded-lg">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-6">
                    Sustainability Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white p-4 rounded border border-green-100">
                      <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                        75%
                      </div>
                      <div className="text-sm md:text-base text-gray-700">
                        Waste Reduction
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded border border-green-100">
                      <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                        50%
                      </div>
                      <div className="text-sm md:text-base text-gray-700">
                        Carbon Footprint
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Industry Insights */}
            <div className="bg-blue-50 border border-blue-200 p-6 md:p-8 lg:p-10 rounded-lg">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-6 text-center">
                Industry Key Insights
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    2.6B
                  </div>
                  <div className="text-sm md:text-base lg:text-lg text-gray-700">
                    Pallets in US Circulation
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    85%
                  </div>
                  <div className="text-sm md:text-base lg:text-lg text-gray-700">
                    Wood Pallet Market Share
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    $650M
                  </div>
                  <div className="text-sm md:text-base lg:text-lg text-gray-700">
                    Annual Disposal Costs
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Financial Projections */}
          <section className="space-y-8">
            <div className="text-center pb-8 border-b border-gray-200">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e4a2b] mb-4">
                Financial Projections
              </h2>
            </div>

            <div className="space-y-8">
              <div className="overflow-x-auto bg-gray-50 p-4 md:p-6 lg:p-8 rounded-lg">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="pb-3 text-base md:text-lg font-semibold text-[#1e4a2b]">
                        Year
                      </th>
                      <th className="pb-3 text-base md:text-lg font-semibold text-[#1e4a2b] text-right">
                        Revenue
                      </th>
                      <th className="pb-3 text-base md:text-lg font-semibold text-[#1e4a2b] text-right">
                        Gross Profit
                      </th>
                      <th className="pb-3 text-base md:text-lg font-semibold text-[#1e4a2b] text-right">
                        Net Income
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-base md:text-lg font-medium">
                        2025
                      </td>
                      <td className="py-3 text-base md:text-lg text-right">
                        $2.5M
                      </td>
                      <td className="py-3 text-base md:text-lg text-right">
                        $1.1M
                      </td>
                      <td className="py-3 text-base md:text-lg text-right">
                        $275K
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-base md:text-lg font-medium">
                        2026
                      </td>
                      <td className="py-3 text-base md:text-lg text-right">
                        $4.2M
                      </td>
                      <td className="py-3 text-base md:text-lg text-right">
                        $1.9M
                      </td>
                      <td className="py-3 text-base md:text-lg text-right">
                        $580K
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-base md:text-lg font-medium">
                        2027
                      </td>
                      <td className="py-3 text-base md:text-lg text-right">
                        $6.8M
                      </td>
                      <td className="py-3 text-base md:text-lg text-right">
                        $3.1M
                      </td>
                      <td className="py-3 text-base md:text-lg text-right">
                        $1.1M
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-base md:text-lg font-bold text-[#1e4a2b]">
                        2028
                      </td>
                      <td className="py-3 text-base md:text-lg font-bold text-[#1e4a2b] text-right">
                        $10.5M
                      </td>
                      <td className="py-3 text-base md:text-lg font-bold text-[#1e4a2b] text-right">
                        $4.7M
                      </td>
                      <td className="py-3 text-base md:text-lg font-bold text-[#1e4a2b] text-right">
                        $1.8M
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                <div className="bg-blue-50 border border-blue-200 p-6 lg:p-8 rounded-lg text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                    22%
                  </div>
                  <div className="text-base md:text-lg text-gray-700">
                    Average Annual Growth
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 p-6 lg:p-8 rounded-lg text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                    45%
                  </div>
                  <div className="text-base md:text-lg text-gray-700">
                    Gross Margin (2028)
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-6 lg:p-8 rounded-lg text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">
                    17%
                  </div>
                  <div className="text-base md:text-lg text-gray-700">
                    Net Margin (2028)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Investment Ask */}
          <section className="space-y-8">
            <div className="text-center pb-8 border-b border-gray-200">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e4a2b] mb-4">
                Investment Opportunity
              </h2>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-6 md:p-8 lg:p-10 rounded-lg">
              <div className="text-center mb-8">
                <div className="text-4xl md:text-5xl font-bold text-[#1e4a2b] mb-4">
                  $2.5M
                </div>
                <div className="text-xl md:text-2xl text-gray-700 font-semibold">
                  Seeking Series A Investment
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b]">
                    Use of Funds
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded border border-gray-200">
                      <span className="text-base md:text-lg">
                        Facility Expansion
                      </span>
                      <span className="font-bold text-green-600">40%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border border-gray-200">
                      <span className="text-base md:text-lg">
                        Equipment & Technology
                      </span>
                      <span className="font-bold text-green-600">30%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border border-gray-200">
                      <span className="text-base md:text-lg">Team Growth</span>
                      <span className="font-bold text-green-600">20%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border border-gray-200">
                      <span className="text-base md:text-lg">
                        Working Capital
                      </span>
                      <span className="font-bold text-green-600">10%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b]">
                    Expected Returns
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded border border-gray-200">
                      <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                        3-5x
                      </div>
                      <div className="text-base md:text-lg text-gray-700">
                        Expected Return Multiple
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded border border-gray-200">
                      <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                        5-7 Years
                      </div>
                      <div className="text-base md:text-lg text-gray-700">
                        Investment Timeline
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-8">
            <div className="text-center pb-8 border-b border-gray-200">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e4a2b] mb-4">
                Contact Information
              </h2>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 lg:p-10 rounded-lg text-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1e4a2b] mb-8">
                Ready to Discuss Investment?
              </h3>
              <div className="space-y-4 md:space-y-0 md:flex md:justify-center md:gap-8">
                <a
                  href="mailto:investors@southernpallet.co"
                  className="inline-flex items-center gap-3 bg-[#1e4a2b] text-white px-6 py-3 rounded-lg hover:bg-[#2d5a3d] transition-colors duration-200 text-base md:text-lg font-semibold w-full md:w-auto justify-center"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Investors
                </a>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-base md:text-lg font-semibold w-full md:w-auto justify-center"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Schedule Call
                </a>
              </div>
              <p className="text-gray-600 text-base md:text-lg mt-6">
                For detailed financial models and additional documentation,
                please reach out directly.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// NOTE: this password check runs client-side, so it ships to every visitor's
// browser and can be read out of the JS bundle — it gates rendering, not
// actual access. Set NEXT_PUBLIC_BUSINESS_PLAN_PASSWORD to your own value,
// or replace this page with real server-side access control if this content
// needs to stay confidential.
function BusinessPlanContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the form data including SMS consent
    const formData = new FormData(e.currentTarget);
    const smsConsent = formData.get("smsConsent") === "on";

    if (password === (process.env.NEXT_PUBLIC_BUSINESS_PLAN_PASSWORD || "changeme")) {
      // Log the consent value for lead-capture integration
      console.log("Business plan access - SMS consent:", smsConsent);
      
      // You can send this data to your backend or analytics here
      if (typeof window !== 'undefined') {
        const gtmWindow = window as typeof window & { 
          dataLayer?: Array<Record<string, string | number | boolean>>
        };
        if (gtmWindow.dataLayer) {
          gtmWindow.dataLayer.push({
            event: 'business_plan_access',
            smsConsent: smsConsent
          });
        }
      }
      
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SharedHeader isPrivatePage={true} />

        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-8 py-8">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      Protected Content
                    </h1>
                    <p className="text-gray-600">
                      Please enter the password to access the business plan.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter password"
                        required
                      />
                      
                      <div className="flex items-start space-x-2 mt-4">
                        <input
                          type="checkbox"
                          id="smsConsent"
                          name="smsConsent"
                          className="mt-1"
                          required
                        />
                        <label htmlFor="smsConsent" className="text-xs text-gray-600">
                          I consent to receive transactional messages about my requests. Message & data rates may apply. Reply STOP to opt-out.
                        </label>
                      </div>
                      
                      {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      Access Business Plan
                    </button>
                  </form>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-gray-500">
                  Need access? Contact us at{" "}
                  <a
                    href="mailto:info@southernpallet.co"
                    className="text-green-600 hover:text-green-700"
                  >
                    info@southernpallet.co
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show responsive business plan content
  return (
    <div>
      <SharedHeader isPrivatePage={true} />
      <BusinessPlanPresentation />
      <SharedFooter />
    </div>
  );
}

export default function BusinessPlanPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BusinessPlanContent />
    </Suspense>
  );
}
