import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const layout = read("app/layout.tsx");
const thankYou = read("app/thank-you/page.tsx");
const sitemap = read("app/sitemap.ts");
const contactForm = read("components/contact-section.tsx");
const recycleForm = read("components/recycle-cta-section.tsx");

assert.doesNotMatch(
  layout,
  /GoogleAnalytics/,
  "GA4 must use an explicit next/script lazyOnload integration",
);
assert.match(
  layout,
  /googletagmanager\.com\/gtag\/js\?id=\$\{googleAnalyticsId\}/,
  "the GA4 loader must use the configured measurement ID",
);
assert.match(
  layout,
  /<Script[\s\S]*?src={`https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=\$\{googleAnalyticsId\}`}[\s\S]*?strategy=["']lazyOnload["'][\s\S]*?\/>/,
  "the external GA4 library must use next/script with lazyOnload",
);
assert.match(layout, /gtag\('config', '\$\{googleAnalyticsId\}'\)/);

assert.match(
  thankYou,
  /robots:\s*{\s*index:\s*false,\s*follow:\s*true\s*}/,
  "/thank-you must remain noindex, follow",
);
assert.doesNotMatch(
  sitemap,
  /["']\/thank-you["']/,
  "/thank-you must stay out of the content sitemap",
);

for (const [label, source, formType] of [
  ["contact", contactForm, "quote_request"],
  ["recycling", recycleForm, "recycle_request"],
]) {
  assert.match(
    source,
    /trackLeadGeneration\s*\(/,
    `${label} form must record a successful lead conversion`,
  );
  assert.match(
    source,
    new RegExp(`formType:\\s*["']${formType}["']`),
    `${label} form must send its stable form type`,
  );
  assert.match(
    source,
    /submissionId:\s*(?:data|submissionData)\.submissionId/,
    `${label} form must reuse its delivery submission ID for deduplication`,
  );
}

console.log(
  "Analytics foundation passed: thank-you noindex, GA4 lazy-loaded, and lead completions tracked.",
);
