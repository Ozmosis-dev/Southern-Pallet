import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const failures = [];

function check(label, test) {
  try {
    test();
    console.log(`✓ ${label}`);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
    console.error(`✗ ${label}`);
  }
}

const publicPages = [
  "app/page.tsx",
  "app/recycle-pallets/page.tsx",
  "app/blog/page.tsx",
  "app/blog/where-to-buy-used-pallets/page.tsx",
  "app/blog/pallet-recycling-environmental-benefits/page.tsx",
  "app/blog/cost-effective-pallet-management-strategies/page.tsx",
];

check("all canonical signals use southernpallet.co", () => {
  const files = [
    "app/layout.tsx",
    "app/page.tsx",
    "app/recycle-pallets/page.tsx",
    "app/blog/page.tsx",
    "app/blog/where-to-buy-used-pallets/page.tsx",
    "app/blog/pallet-recycling-environmental-benefits/page.tsx",
    "app/blog/cost-effective-pallet-management-strategies/page.tsx",
    "app/thank-you/page.tsx",
    "public/robots.txt",
    "public/sitemap.xml",
  ].filter((path) => existsSync(join(root, path)));

  for (const file of files) {
    assert.doesNotMatch(read(file), /southernpalletcompany\.com/);
  }
});

check("the root layout does not hard-code a canonical link", () => {
  assert.doesNotMatch(read("app/layout.tsx"), /<link\s+rel=["']canonical["']/);
});

check("robots and sitemap use Next metadata routes", () => {
  assert.equal(existsSync(join(root, "app/robots.ts")), true);
  assert.equal(existsSync(join(root, "app/sitemap.ts")), true);
  assert.equal(existsSync(join(root, "public/robots.txt")), false);
  assert.equal(existsSync(join(root, "public/sitemap.xml")), false);
});

check("the sitemap contains only indexable public routes", () => {
  const sitemap = read("app/sitemap.ts");
  for (const route of [
    '"/"',
    '"/recycle-pallets"',
    '"/blog"',
    '"/blog/where-to-buy-used-pallets"',
    '"/blog/pallet-recycling-environmental-benefits"',
    '"/blog/cost-effective-pallet-management-strategies"',
  ]) {
    assert.match(sitemap, new RegExp(route.replaceAll("/", "\\/")));
  }
  assert.doesNotMatch(sitemap, /thank-you|private/);
});

check("conversion and private routes provide page-level noindex", () => {
  assert.match(read("app/thank-you/page.tsx"), /index:\s*false/);
  assert.match(read("app/private/layout.tsx"), /index:\s*false/);
});

check("child page titles do not duplicate the root brand template", () => {
  for (const file of publicPages) {
    assert.doesNotMatch(read(file), /title:\s*["'][^"']*\|\s*Southern Pallet/);
  }
});

check("blog articles provide complete article signals", () => {
  for (const file of publicPages.slice(3)) {
    const source = read(file);
    assert.match(source, /BlogPosting/);
    assert.match(source, /datePublished/);
    assert.match(source, /dateModified/);
    assert.match(source, /<article/);
    assert.match(source, /ArticleHeader/);
  }
  assert.match(read("components/blog/article-header.tsx"), /<time/);
});

check("internal quote links resolve to the homepage contact section", () => {
  for (const file of publicPages) {
    assert.doesNotMatch(read(file), /href=["']\/contact["']/);
  }
});

check("unsupported blog claims are absent", () => {
  const source = publicPages.slice(3).map(read).join("\n");
  for (const claim of [
    /30-50%/,
    /40 million trees/i,
    /90% less energy/i,
    /Carbon Neutral Operations/i,
    /Renewable Energy/i,
    /Technology Integration/i,
    /warranty and quality guarantees/i,
  ]) {
    assert.doesNotMatch(source, claim);
  }
});

check("the homepage LCP image uses an optimizable priority asset", () => {
  const hero = read("components/hero-section.tsx");
  assert.doesNotMatch(hero, /stack\.svg/);
  assert.match(hero, /priority/);
  assert.match(hero, /sizes=/);
});

check("structured data URLs target real page anchors", () => {
  assert.doesNotMatch(
    read("app/recycle-pallets/page.tsx"),
    /#sell-pallets/,
  );
});

if (failures.length > 0) {
  console.error("\nSEO foundation check failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nSEO foundation check passed.");
