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
const careersForm = read("components/careers-application-form.tsx");
const interactionAnalytics = read("components/interaction-analytics.tsx");

assert.doesNotMatch(
  layout,
  /GoogleAnalytics/,
  "analytics must use the explicit GTM integration",
);
assert.match(
  layout,
  /googletagmanager\.com\/gtm\.js\?id=/,
  "the site must load the configured GTM container",
);
assert.doesNotMatch(
  layout,
  /googletagmanager\.com\/gtag\/js\?id=/,
  "GA4 must be configured inside GTM instead of loaded a second time",
);
assert.doesNotMatch(layout, /googleAnalyticsId/);
assert.match(layout, /gtmId && <InteractionAnalytics/);
assert.match(interactionAnalytics, /document\.addEventListener\("click", onClick, true\)/);
assert.match(interactionAnalytics, /closest<HTMLAnchorElement>\('a\[href\^="tel:" i\]'/);
assert.match(careersForm, /trackCareerApplication\(\{ submissionId \}\)/);
assert.ok(careersForm.indexOf("if (!response.ok)") < careersForm.indexOf("trackCareerApplication({"));

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
  "Analytics foundation passed: thank-you noindex, GTM is the only loader, and conversions are tracked.",
);
