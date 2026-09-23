import { ArrowRight, Clock3 } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PublicSiteShell from "../../components/public-site-shell";
import JsonLd from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/site-config";
import { createSocialMetadata } from "@/lib/social-metadata";

export const metadata: Metadata = {
  title: "Wood Pallet Guides",
  description:
    "Explore practical wood pallet guides on buying, grading, recycling, cost control, and inventory management from Southern Pallet Recycling's regional team.",
  alternates: { canonical: "/blog" },
  ...createSocialMetadata({
    title: "Wood Pallet Guides & Recycling Resources",
    description:
      "Practical guides for buying, inspecting, reusing, recycling, and managing wood pallets.",
    path: "/blog",
    card: "resources",
  }),
};

const posts = [
  {
    href: "/blog/where-to-buy-used-pallets",
    title: "Where to buy used pallets near you",
    description:
      "How to compare local sources, evaluate quality, and find a dependable recycled pallet supplier.",
    image: "/inspected-recycled-wood-pallets.jpg",
    alt: "Stacks of inspected recycled wood pallets available for purchase",
    readTime: "5 min read",
    topic: "Buying guide",
  },
  {
    href: "/blog/pallet-recycling-environmental-benefits",
    title: "The environmental value of pallet recycling",
    description:
      "How recovery programs reduce waste, conserve material, and support practical sustainability goals.",
    image: "/used-wood-pallets-recycling.jpg",
    alt: "Used wood pallets stacked inside a recycling facility",
    readTime: "6 min read",
    topic: "Sustainability",
  },
  {
    href: "/blog/cost-effective-pallet-management-strategies",
    title: "Cost-effective pallet management strategies",
    description:
      "Practical ways to reduce procurement, storage, repair, and transportation costs without sacrificing quality.",
    image: "/stacked-wood-pallets.webp",
    alt: "Organized stacks of wood pallets ready for distribution",
    readTime: "7 min read",
    topic: "Operations",
  },
];

const blogIndexSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Southern Pallet Recycling Resources",
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
};

export default function BlogPage() {
  const [featured, ...supporting] = posts;

  return (
    <PublicSiteShell>
      <JsonLd data={blogIndexSchema} />
      <Header />
      <main data-blog-index="true" className="bg-[var(--sp-paper)] pt-20">
        <section className="sp-grid border-b border-[var(--sp-rule)] bg-[var(--sp-cream)] py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:px-10">
            <div>
              <p className="sp-eyebrow text-[var(--sp-green-dark)]">Southern Pallet Recycling field notes</p>
              <h1 className="sp-display mt-5 max-w-2xl text-5xl text-[var(--sp-forest)] sm:text-6xl">
                Wood pallet guides for better operations.
              </h1>
            </div>
            <p className="max-w-xl text-base leading-7 text-[var(--sp-ink)]/68 lg:justify-self-end">
              Guides on sourcing pallets, managing inventory, controlling cost,
              and building a more responsible recovery program. Compare our{" "}
              <Link
                href="/#products"
                className="font-semibold text-[var(--sp-forest)] underline decoration-[var(--sp-green-dark)] underline-offset-4 hover:text-[var(--sp-green-dark)]"
              >
                wood pallet product options
              </Link>
              , learn about{" "}
              <Link
                href="/#about"
                className="font-semibold text-[var(--sp-forest)] underline decoration-[var(--sp-green-dark)] underline-offset-4 hover:text-[var(--sp-green-dark)]"
              >
                Southern Pallet Recycling’s regional operation
              </Link>
              , or{" "}
              <Link
                href="/contact"
                className="font-semibold text-[var(--sp-forest)] underline decoration-[var(--sp-green-dark)] underline-offset-4 hover:text-[var(--sp-green-dark)]"
              >
                contact our pallet supply team
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Link
            href={featured.href}
            className="group grid border border-[var(--sp-rule)] lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="relative min-h-[360px] overflow-hidden lg:min-h-[560px]">
              <Image
                src={featured.image}
                alt={featured.alt}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
            <article className="flex flex-col justify-between bg-[var(--sp-forest)] p-7 text-white sm:p-10">
              <div>
                <p className="sp-eyebrow text-[var(--sp-green)]">{featured.topic}</p>
                <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-7 text-white/68">
                  {featured.description}
                </p>
              </div>
              <div className="mt-12 flex items-center justify-between border-t border-white/20 pt-6">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
                  <Clock3 className="size-4 text-[var(--sp-green)]" />
                  {featured.readTime}
                </span>
                <ArrowRight className="size-5 text-[var(--sp-green)] transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          </Link>

          <div className="mt-10 grid border-l border-t border-[var(--sp-rule)] md:grid-cols-2">
            {supporting.map((post, index) => (
              <Link
                key={post.href}
                href={post.href}
                className="group grid border-b border-r border-[var(--sp-rule)] sm:grid-cols-[0.85fr_1.15fr]"
              >
                <div className="relative min-h-[240px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    sizes="(min-width: 768px) 25vw, 100vw"
                  />
                </div>
                <article className="flex flex-col justify-between p-7">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--sp-green-dark)]">
                      0{index + 2} · {post.topic}
                    </p>
                    <h2 className="mt-4 text-xl font-semibold text-[var(--sp-forest)]">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--sp-ink)]/65">
                      {post.description}
                    </p>
                  </div>
                  <p className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sp-sage)]">
                    <Clock3 className="size-4 text-[var(--sp-green-dark)]" />
                    {post.readTime}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </PublicSiteShell>
  );
}
