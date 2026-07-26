import Header from "../../components/header"
import Footer from "../../components/footer"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pallet Blog | Pallets for Sale, Recycling & Supplier Tips",
  description: "Explore our pallet blog for guides on buying new & used pallets, pallet recycling, supplier insights, and pallet management solutions near you.",
  alternates: {
    canonical: 'https://southernpallet.co/blog',
  },
  openGraph: {
    title: "Pallet Blog | Pallets for Sale, Recycling & Supplier Tips",
    description: "Explore our pallet blog for guides on buying new & used pallets, pallet recycling, supplier insights, and pallet management solutions near you.",
    url: 'https://southernpallet.co/blog',
    images: ['/southern_pallet_og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pallet Blog | Pallets for Sale, Recycling & Supplier Tips',
    description: 'Explore our pallet blog for guides on buying new & used pallets, pallet recycling, supplier insights, and pallet management solutions near you.',
    images: ['/southern_pallet_og_image.png'],
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Southern Pallet Blog
          </h1>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Welcome to our blog. Here we share insights on pallets for sale, pallet recycling, and pallet supplier tips to help businesses manage pallets better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Post 1 */}
          <Link href="/blog/where-to-buy-used-pallets" className="block">
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 relative overflow-hidden">
                <Image 
                  src="/recyled_pallet_card.jpg" 
                  alt="Stacked recycled wooden pallets showing cost-effective used pallet options for businesses" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Where to Buy Used Pallets Near Me
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Learn the best places to buy used pallets near you. Southern Pallet supplies recycled pallets with fast delivery, affordable prices, and trusted quality.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">5 min read</span>
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          </Link>

          {/* Blog Post 2 */}
          <Link href="/blog/pallet-recycling-environmental-benefits" className="block">
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 relative overflow-hidden">
                <Image 
                  src="/recyle_pallet_hero.jpg" 
                  alt="Professional pallet recycling process showing environmental sustainability and green business practices" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Pallet Recycling Environmental Benefits
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Discover the environmental benefits of pallet recycling. Learn how Southern Pallet&apos;s recycling program reduces waste, saves trees, and supports sustainable business practices.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">6 min read</span>
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          </Link>

          {/* Blog Post 3 */}
          <Link href="/blog/cost-effective-pallet-management-strategies" className="block">
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 relative overflow-hidden">
                <Image 
                  src="/recyle_pallet_hero.jpg" 
                  alt="High-quality wooden pallets stacked professionally demonstrating cost-effective pallet management and optimization strategies" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Cost-Effective Pallet Management Strategies
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Learn proven strategies to reduce pallet costs while maintaining quality. Discover Southern Pallet&apos;s cost-effective pallet management solutions for businesses of all sizes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">7 min read</span>
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
