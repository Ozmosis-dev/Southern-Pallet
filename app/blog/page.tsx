import Header from "../../components/header"
import Footer from "../../components/footer"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import JsonLd from "@/components/seo/json-ld"
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Wood Pallet Guides & Recycling Resources",
  description: "Practical guides for buying, inspecting, reusing, recycling, and managing wood pallets from Southern Pallet's manufacturing and recycling team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Wood Pallet Guides & Recycling Resources",
    description: "Practical guides for buying, inspecting, reusing, recycling, and managing wood pallets.",
    url: "/blog",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wood Pallet Guides & Recycling Resources",
    description: "Practical guides for buying, inspecting, reusing, recycling, and managing wood pallets.",
    images: [DEFAULT_OG_IMAGE.url],
  },
}

const posts = [
  {
    href: "/blog/where-to-buy-used-pallets",
    title: "Where to Buy Used Pallets for Your Business",
    description:
      "Compare supplier options and learn what to inspect before ordering recycled wood pallets.",
    image: "/recyled_pallet_card.jpg",
    imageAlt: "Stacks of used wood pallets ready for inspection",
    date: "2026-07-28",
    readTime: "6 min read",
  },
  {
    href: "/blog/pallet-recycling-environmental-benefits",
    title: "Environmental Benefits of Recycling Wood Pallets",
    description:
      "See how repair, reuse, and material recovery can extend pallet life and reduce avoidable waste.",
    image: "/recyle_pallet_hero.jpg",
    imageAlt: "Used wood pallets collected for repair and recycling",
    date: "2026-07-28",
    readTime: "6 min read",
  },
  {
    href: "/blog/cost-effective-pallet-management-strategies",
    title: "How to Reduce Pallet Costs: 8 Practical Steps",
    description:
      "Control pallet spend by matching specifications, tracking loss, improving handling, and planning returns.",
    image: "/recyle_pallet_hero.jpg",
    imageAlt: "Wood pallets organized for efficient inventory management",
    date: "2026-07-28",
    readTime: "7 min read",
  },
] as const

const blogIndexSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Southern Pallet Resources",
  url: `${SITE_URL}/blog`,
  description:
    "Guides about buying, inspecting, reusing, recycling, and managing wood pallets.",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}${post.href}`,
      name: post.title,
    })),
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={blogIndexSchema} />
      <Header />
      <main className="max-w-7xl mx-auto px-4 pb-20 pt-28">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Wood Pallet Guides & Resources
          </h1>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Straightforward guidance for the people who buy, handle, return, and
            recycle pallets across warehouses, plants, and distribution centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.href} href={post.href} className="block h-full">
              <article className="h-full overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="mb-3 text-xl font-semibold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-gray-600">{post.description}</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-gray-500">
                      <time dateTime={post.date}>Updated Jul 28, 2026</time>
                      {" · "}
                      {post.readTime}
                    </span>
                    <span className="shrink-0 font-medium text-blue-700">
                      Read guide →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
