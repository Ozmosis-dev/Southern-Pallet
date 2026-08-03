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

const title = "Environmental Benefits of Recycling Wood Pallets";
const description =
  "Learn how pallet repair, reuse, component recovery, and responsible recycling can extend material life and reduce avoidable wood waste.";
const path = "/blog/pallet-recycling-environmental-benefits";
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
      image: absoluteUrl("/recyle_pallet_hero.jpg"),
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

export default function PalletRecyclingEnvironmentalBenefitsPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={articleSchema} />
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28">
        <article>
          <ArticleHeader
            title={title}
            description="The greatest value usually comes from keeping a serviceable pallet in use, repairing it when practical, and recovering usable material when repair is no longer safe."
            image={{
              src: "/recyle_pallet_hero.jpg",
              alt: "Used wood pallets collected for repair and recycling",
            }}
            datePublished={datePublished}
            dateModified={dateModified}
            readingTime="6 min read"
          />

          <div>
            <h2 className={headingClass}>Why pallet reuse matters</h2>
            <p className={paragraphClass}>
              A wood pallet contains harvested, milled, dried, transported, and
              assembled material. Throwing away a repairable pallet also throws
              away the work and resources already invested in it. Reuse and
              repair can extend that useful life without requiring a complete
              replacement for every trip.
            </p>
            <p className={paragraphClass}>
              The environmental benefit is not created by a label alone. It
              depends on pallet condition, the number of additional uses, how
              far material is transported, and what happens when the pallet can
              no longer carry a load safely.
            </p>

            <h2 className={headingClass}>A practical wood pallet recovery hierarchy</h2>

            <h3 className={subheadingClass}>1. Reuse serviceable pallets</h3>
            <p className={paragraphClass}>
              Pallets that remain structurally sound and appropriate for the
              load can return to service. Sorting by size, design, ownership
              marks, and condition prevents usable pallets from entering the
              waste stream prematurely.
            </p>

            <h3 className={subheadingClass}>2. Repair when it is safe and practical</h3>
            <p className={paragraphClass}>
              A qualified recycler may replace damaged deck boards or other
              components and return the pallet to an appropriate grade. Repair
              is not suitable for every unit; severe structural damage,
              contamination, rot, or an incompatible specification may require
              a different recovery path.
            </p>

            <h3 className={subheadingClass}>3. Recover usable components</h3>
            <p className={paragraphClass}>
              When a whole pallet is beyond repair, sound boards or components
              may still be useful in compatible repair or remanufacturing
              programs. Component recovery makes more complete use of the
              original wood.
            </p>

            <h3 className={subheadingClass}>4. Process remaining clean wood</h3>
            <p className={paragraphClass}>
              Clean wood that cannot be reused as a pallet component may have
              another approved outlet, depending on local equipment, markets,
              and material requirements. Contaminated or treated materials need
              to be identified and handled according to applicable rules rather
              than mixed into a general wood stream.
            </p>

            <h2 className={headingClass}>Environmental benefits businesses can influence</h2>
            <ul className={`${listClass} mt-5`}>
              <li>
                <strong>Longer material life:</strong> More safe trips from the
                same pallet or components can reduce premature replacement.
              </li>
              <li>
                <strong>Less avoidable disposal:</strong> Sorting and repair keep
                usable wood out of dumpsters and landfills.
              </li>
              <li>
                <strong>Better material recovery:</strong> Damaged units can be
                separated into reusable components and residual material.
              </li>
              <li>
                <strong>More efficient return logistics:</strong> Coordinated
                pickup or backhaul can reduce separate disposal movements.
              </li>
              <li>
                <strong>Clearer purchasing decisions:</strong> Condition data
                helps buyers choose new, recycled, or hybrid pallets based on
                the application rather than habit.
              </li>
            </ul>

            <h2 className={headingClass}>How a pallet recycling program works</h2>
            <p className={paragraphClass}>
              A business first identifies the pallet streams generated at each
              facility: common sizes, approximate quantities, condition,
              ownership restrictions, and how quickly loads accumulate. The
              recycler then determines which pallets have resale or repair
              value, which require component recovery, and which cannot be
              accepted.
            </p>
            <p className={paragraphClass}>
              Consistent staging makes the program safer and easier to measure.
              Separate pallet stacks from general trash, keep aisles and fire
              access clear, and avoid mixing visibly contaminated material with
              reusable inventory. Pickup frequency should match the space
              available and the volume generated.
            </p>

            <h2 className={headingClass}>What to measure</h2>
            <p className={paragraphClass}>
              Use operational measures that your team and recycler can verify.
              If you publish emissions or resource-saving claims, document the
              methodology and boundaries rather than applying a generic
              conversion factor.
            </p>
            <ul className={`${listClass} mt-5`}>
              <li>Number of pallets collected by facility and period.</li>
              <li>Share returned to use, repaired, dismantled, or rejected.</li>
              <li>Disposal volume and cost before and after the program.</li>
              <li>Pickup frequency, trailer utilization, and avoidable trips.</li>
              <li>Common damage causes and opportunities to improve handling.</li>
            </ul>

            <h2 className={headingClass}>When a pallet should not be reused</h2>
            <p className={paragraphClass}>
              Sustainability never overrides safety or product requirements.
              Remove pallets with serious structural damage, protruding
              fasteners, rot, pest activity, chemical contamination, or
              unknown spills. Export loads may require properly marked
              heat-treated pallets, and regulated or sensitive products may
              have additional receiving standards.
            </p>

            <h2 className={headingClass}>Build recycling into daily operations</h2>
            <p className={paragraphClass}>
              Train forklift and warehouse teams to avoid preventable damage,
              create clearly labeled staging areas, and assign responsibility
              for monitoring pallet stacks. When purchasing, match pallet
              specifications to the load and handling system. Overbuilt pallets
              can waste material and money; under-specified pallets can fail
              early and create safety problems.
            </p>

            <div className="my-12 rounded-lg border border-green-200 bg-green-50 p-7">
              <h2 className="text-2xl font-semibold text-gray-900">
                Put surplus pallets back into use
              </h2>
              <p className="mt-3 text-lg text-gray-700">
                Southern Pallet evaluates used wood pallets for pickup,
                buyback, repair, reuse, and recycling across the Southeast.
              </p>
              <Link
                href="/recycle-pallets"
                className="mt-5 inline-block rounded bg-[#1e4a2b] px-5 py-3 font-semibold text-white hover:bg-[#163d20]"
              >
                Explore pallet recycling
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
