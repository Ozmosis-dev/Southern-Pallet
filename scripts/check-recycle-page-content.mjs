import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const contentPath = join(root, "lib/recycle-page-content.ts");
const sectionPath = join(root, "components/recycle-faq-section.tsx");

assert.equal(
  existsSync(contentPath),
  true,
  "lib/recycle-page-content.ts must define the approved recycling-page copy",
);
assert.equal(
  existsSync(sectionPath),
  true,
  "components/recycle-faq-section.tsx must render the visible FAQ block",
);

const { RECYCLE_FAQ_LABEL, RECYCLE_PAGE_H1, recycleFaqs } = await import(
  pathToFileURL(contentPath).href
);

const requiredH1 =
  "We Buy & Recycle Used Pallets — Free Quote and Pickup Across the Southeast";
const requiredQuestions = [
  "How does pallet recycling work?",
  "What pallets do we buy? (standard, box, GMA, damaged)",
  "Where can I sell used pallets?",
  "How do I get rid of old pallets?",
  "How much do you pay for used pallets?",
  "Do you offer free pallet pickup? Where do you pick up?",
];

assert.equal(RECYCLE_PAGE_H1, requiredH1);
assert.equal(RECYCLE_FAQ_LABEL, "Frequently Asked Questions");
assert.deepEqual(
  recycleFaqs.map(({ question }) => question),
  requiredQuestions,
);

const faqWords = recycleFaqs
  .flatMap(({ paragraphs }) => paragraphs)
  .join(" ")
  .match(/[A-Za-z0-9][A-Za-z0-9’'&×-]*/g)?.length ?? 0;

assert.ok(
  faqWords >= 650 && faqWords <= 850,
  `FAQ answers must contain 650-850 words so the full page reaches 900-1,200 words; found ${faqWords}`,
);

for (const faq of recycleFaqs) {
  assert.ok(faq.paragraphs.length >= 2, `${faq.question} needs a complete answer`);
}

const unconfirmedProcessCopy = recycleFaqs.slice(4).flatMap(({ paragraphs }) => paragraphs).join(" ");
assert.doesNotMatch(
  unconfirmedProcessCopy,
  /\$|\b\d+(?:[.,]\d+)?\s*(?:pallets?|miles?|hours?|days?|weeks?|%|percent|dollars?|cents?)\b/i,
  "Payout and pickup answers must not invent figures, minimums, radii, fees, or lead times",
);

const sectionSource = readFileSync(sectionPath, "utf8");
assert.match(sectionSource, /<h2[^>]*>\s*{faq\.question}\s*<\/h2>/);
assert.doesNotMatch(sectionSource, /aria-expanded|openFAQ|hidden/);

const pageSource = readFileSync(join(root, "app/recycle-pallets/page.tsx"), "utf8");
const processIndex = pageSource.indexOf("<RecycleProcessSection />");
const faqIndex = pageSource.indexOf("<RecycleFAQSection />");
const ctaIndex = pageSource.indexOf("<RecycleCTASection />");

assert.ok(processIndex >= 0, "the recycling process section must remain on the page");
assert.ok(faqIndex > processIndex, "the FAQ must follow the buyback/process content");
assert.ok(ctaIndex > faqIndex, "the FAQ must sit immediately above the contact CTA");

console.log(
  `Recycle page content contract passed: ${recycleFaqs.length} required H2s and ${faqWords} FAQ-answer words.`,
);
