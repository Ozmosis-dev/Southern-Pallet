import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ArticleHeader from "@/components/blog/article-header";
import JsonLd from "@/components/seo/json-ld";
import {
  BUSINESS_ID,
  DEFAULT_OG_IMAGE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site-config";

const title = "Where to Buy Used Pallets for Your Business";
const description =
  "Compare used pallet suppliers, understand grades and specifications, and use a practical inspection checklist before ordering recycled wood pallets.";
const path = "/blog/where-to-buy-used-pallets";
const datePublished = "2025-01-27";
const dateModified = "2026-07-28";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
  },
  authors: [{ name: "Southern Pallet", url: SITE_URL }],
  openGraph: {
    type: "article",
    title,
    description,
    url: path,
    images: [DEFAULT_OG_IMAGE],
    publishedTime: datePublished,
    modifiedTime: dateModified,
    authors: [SITE_URL],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": `${SITE_URL}${path}#article`,
      headline: title,
      description,
      image: absoluteUrl("/recyled_pallet_card.jpg"),
      datePublished,
      dateModified,
      mainEntityOfPage: `${SITE_URL}${path}`,
      author: {
        "@id": BUSINESS_ID,
      },
      publisher: {
        "@id": BUSINESS_ID,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pallet Resources",
          item: `${SITE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: `${SITE_URL}${path}`,
        },
      ],
    },
  ],
};

const listClass = "list-disc space-y-3 pl-6 text-lg leading-relaxed text-gray-700";
const headingClass = "mt-14 text-3xl font-bold text-gray-900";
const subheadingClass = "mt-9 text-2xl font-semibold text-gray-900";
const paragraphClass = "mt-5 text-lg leading-relaxed text-gray-700";

export default function WhereToBuyUsedPalletsPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={articleSchema} />
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28">
        <article>
          <ArticleHeader
            title={title}
            description="The right source is a supplier that can document the pallet size, grade, condition, quantity, and delivery terms your operation actually needs."
            image={{
              src: "/recyled_pallet_card.jpg",
              alt: "Stacks of used wood pallets ready for inspection",
            }}
            datePublished={datePublished}
            dateModified={dateModified}
            readingTime="6 min read"
          />

          <div>
            <h2 className={headingClass}>The short answer</h2>
            <p className={paragraphClass}>
              For a business order, start with a pallet manufacturer, recycler,
              or dedicated pallet supplier that serves your facility. A
              professional supplier is more likely to offer repeatable grades,
              inspection, repair, volume planning, and delivery than an
              informal marketplace listing. The lowest advertised unit price
              is not always the lowest delivered cost if dimensions vary,
              damaged pallets interrupt handling, or the load arrives late.
            </p>

            <h2 className={headingClass}>Common sources for used wood pallets</h2>

            <h3 className={subheadingClass}>Local pallet suppliers and recyclers</h3>
            <p className={paragraphClass}>
              This is usually the strongest option for recurring business use.
              Ask whether the supplier sorts by grade, repairs damaged units,
              can maintain your required volume, and delivers to your location.
              A nearby recycler may also collect your outbound or surplus
              pallets, which can simplify return logistics.
            </p>

            <h3 className={subheadingClass}>Manufacturers with recycled inventory</h3>
            <p className={paragraphClass}>
              Manufacturers that also repair and recycle pallets can help when
              your operation needs a mix of new, recycled, and custom units.
              That flexibility matters when one load requires a standard
              48-by-40-inch pallet while another needs a different footprint,
              load design, or heat-treated material.
            </p>

            <h3 className={subheadingClass}>Brokers and multi-market networks</h3>
            <p className={paragraphClass}>
              A broker can be useful for multiple facilities or markets outside
              one supplier&apos;s normal delivery area. Confirm who is responsible
              for grading, quality issues, delivery scheduling, and rejected
              loads. Standards can vary when inventory comes from different
              yards.
            </p>

            <h3 className={subheadingClass}>Auctions and online marketplaces</h3>
            <p className={paragraphClass}>
              These channels may work for a one-time purchase when you can
              inspect the load and arrange transportation. They are less
              predictable for an operation that needs consistent dimensions,
              condition, or replenishment. Never assume a pallet is suitable
              for your product solely because the listing says “used.”
            </p>

            <h2 className={headingClass}>What to specify before requesting a quote</h2>
            <p className={paragraphClass}>
              A useful quote starts with a useful specification. Give each
              supplier the same information so you can compare like for like:
            </p>
            <ul className={`${listClass} mt-5`}>
              <li>
                Required dimensions, entry type, and pallet style.
              </li>
              <li>
                Expected load, racking, conveyor, or material-handling conditions.
              </li>
              <li>
                Acceptable grade, repair standard, and cosmetic condition.
              </li>
              <li>
                Quantity per order and expected weekly or monthly demand.
              </li>
              <li>
                Delivery address, dock constraints, and required arrival window.
              </li>
              <li>
                Whether the shipment will be exported and needs compliant
                heat-treatment markings.
              </li>
              <li>
                Any cleanliness, prior-use, moisture, or industry-specific
                receiving requirements.
              </li>
            </ul>

            <h2 className={headingClass}>Used pallet inspection checklist</h2>
            <p className={paragraphClass}>
              Inspect a representative sample before accepting a new source,
              then define how damaged or nonconforming pallets will be handled.
            </p>
            <ul className={`${listClass} mt-5`}>
              <li>
                <strong>Deck boards:</strong> Look for missing, split, or badly
                warped boards that could affect load support.
              </li>
              <li>
                <strong>Stringers and blocks:</strong> Reject components with
                serious cracks, rot, or damage that compromises the structure.
              </li>
              <li>
                <strong>Fasteners:</strong> Check for protruding nails, loose
                boards, and repairs that could damage product or equipment.
              </li>
              <li>
                <strong>Contamination:</strong> Avoid pallets with chemical
                residue, strong odors, mold, pests, or unknown spills.
              </li>
              <li>
                <strong>Dimensions:</strong> Measure the pallet rather than
                relying only on a verbal description.
              </li>
              <li>
                <strong>Markings:</strong> Confirm treatment or ownership marks
                when they matter. A mark does not replace a condition
                inspection.
              </li>
            </ul>

            <h2 className={headingClass}>When new pallets may be the better fit</h2>
            <p className={paragraphClass}>
              Recycled pallets are a strong fit for many domestic warehouse and
              shipping uses, but new or custom pallets can be the better choice
              when a load requires a precise design, controlled materials,
              consistent appearance, or a specification that used inventory
              cannot reliably meet. The decision should follow the load and
              handling requirements—not a blanket assumption that one option is
              always cheaper or stronger.
            </p>

            <h2 className={headingClass}>Buying used pallets in the Southeast</h2>
            <p className={paragraphClass}>
              Freight can materially affect pallet economics because pallets
              are bulky. A supplier with inventory near your route, dependable
              delivery, and the ability to collect reusable cores may provide
              better total value than a distant source with a lower unit price.
              Southern Pallet supplies and recycles pallets from facilities in
              Alabama and Mississippi for customers across the region.
            </p>

            <div className="my-12 rounded-lg border border-green-200 bg-green-50 p-7">
              <h2 className="text-2xl font-semibold text-gray-900">
                Request a used pallet quote
              </h2>
              <p className="mt-3 text-lg text-gray-700">
                Share your size, quantity, application, and delivery location.
                We&apos;ll help determine whether a recycled, new, hybrid, or custom
                pallet is the right fit.
              </p>
              <Link
                href="/#contact"
                className="mt-5 inline-block rounded bg-[#1e4a2b] px-5 py-3 font-semibold text-white hover:bg-[#163d20]"
              >
                Contact Southern Pallet
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
