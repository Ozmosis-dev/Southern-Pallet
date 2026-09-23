import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";

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
  "app/contact/page.tsx",
  "app/recycle-pallets/page.tsx",
  "app/careers/page.tsx",
  "app/blog/page.tsx",
  "app/blog/where-to-buy-used-pallets/page.tsx",
  "app/blog/pallet-recycling-environmental-benefits/page.tsx",
  "app/blog/cost-effective-pallet-management-strategies/page.tsx",
];

check("the conversion page is excluded from the public content inventory", () => {
  assert.equal(publicPages.includes("app/thank-you/page.tsx"), false);
});

function extractMetaDescription(file) {
  const source = read(file);
  const match = source.match(
    /(?:const description\s*=|description:)\s*\n?\s*"([^"]+)"/,
  );

  assert.ok(match, `${file} must define a static metadata description`);
  return match[1];
}

function sourceFiles(directory) {
  return readdirSync(join(root, directory), {
    recursive: true,
    withFileTypes: true,
  })
    .filter(
      (entry) =>
        entry.isFile() &&
        [".ts", ".tsx"].includes(extname(entry.name)) &&
        !entry.name.endsWith(".test.ts"),
    )
    .map((entry) => join(entry.parentPath, entry.name));
}

check("all canonical signals use southernpallet.co", () => {
  const files = [
    "app/layout.tsx",
    "app/page.tsx",
    "app/recycle-pallets/page.tsx",
    "app/careers/page.tsx",
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

check("Next.js redirects www to the non-www canonical hostname with one 301", () => {
  const nextConfig = read("next.config.ts");

  assert.match(nextConfig, /trailingSlash:\s*false/);
  assert.match(nextConfig, /source:\s*["']\/:path\*["']/);
  assert.match(nextConfig, /type:\s*["']host["']/);
  assert.match(nextConfig, /value:\s*["']www\.southernpallet\.co["']/);
  assert.match(
    nextConfig,
    /destination:\s*["']https:\/\/southernpallet\.co\/:path\*["']/,
  );
  assert.match(nextConfig, /statusCode:\s*301/);
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
    '"/contact"',
    '"/recycle-pallets"',
    '"/careers"',
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
    assert.doesNotMatch(
      read(file),
      /title:\s*["'][^"']*\|\s*Southern Pallet Recycling/,
    );
  }
});

check("the canonical business identity and location roles are explicit", () => {
  const siteConfig = read("lib/site-config.ts");
  assert.match(siteConfig, /SITE_NAME\s*=\s*"Southern Pallet Recycling"/);
  assert.match(siteConfig, /LEGAL_NAME\s*=\s*SITE_NAME/);
  assert.match(
    siteConfig,
    /PRIMARY_FACILITY\s*=\s*{[\s\S]*streetAddress:\s*"119 Industrial Park Dr"[\s\S]*addressLocality:\s*"Poplarville"[\s\S]*addressRegion:\s*"MS"[\s\S]*postalCode:\s*"39470"/,
  );
  assert.match(
    siteConfig,
    /SATELLITE_OFFICE\s*=\s*{[\s\S]*streetAddress:\s*"5695 Rabbit Creek Dr Ste 101"[\s\S]*addressLocality:\s*"Theodore"[\s\S]*addressRegion:\s*"AL"[\s\S]*postalCode:\s*"36582"/,
  );
});

check("public application code uses the full business name and no Summerford affiliation", () => {
  const files = ["app", "components", "lib"]
    .flatMap(sourceFiles)
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");

  assert.doesNotMatch(files, /Southern Pallet(?! Recycling)/);
  assert.doesNotMatch(files, /Summerford/i);
});

check("careers focuses on the primary Poplarville facility", () => {
  const careersPage = read("app/careers/page.tsx");
  const careersForm = read("components/careers-application-form.tsx");
  assert.match(careersPage, /Poplarville, Mississippi/);
  assert.doesNotMatch(careersPage, /Theodore/);
  assert.match(careersForm, /value="Poplarville, MS"/);
  assert.doesNotMatch(careersForm, /value="Theodore, AL"/);
});

check("indexable pages have unique 150-160 character meta descriptions", () => {
  const descriptions = publicPages.map((file) => ({
    file,
    description: extractMetaDescription(file),
  }));

  for (const { file, description } of descriptions) {
    assert.ok(
      description.length >= 150 && description.length <= 160,
      `${file} description is ${description.length} characters`,
    );
  }

  assert.equal(
    new Set(descriptions.map(({ description }) => description)).size,
    descriptions.length,
    "indexable page descriptions must be unique",
  );
});

check("blog articles provide complete article signals", () => {
  for (const file of publicPages.slice(5)) {
    const source = read(file);
    assert.match(source, /datePublished/);
    assert.match(source, /dateModified/);
    assert.match(source, /BlogArticleShell/);
  }
  const shell = read("components/blog-article-shell.tsx");
  assert.match(shell, /BlogPosting/);
  assert.match(shell, /<article/);
  assert.match(shell, /<time/);
});

check("internal quote links resolve to the standalone contact page", () => {
  for (const file of [
    ...publicPages.slice(5),
    "components/blog-article-shell.tsx",
  ]) {
    assert.doesNotMatch(read(file), /href=["']\/#contact["']/);
    assert.match(read(file), /href=["']\/contact["']/);
  }
});

check("unsupported blog claims are absent", () => {
  const source = publicPages.slice(4).map(read).join("\n");
  for (const claim of [
    /30-50%/,
    /40 million trees/i,
    /90% less energy/i,
    /Carbon Neutral Operations/i,
    /Renewable Energy/i,
    /Technology Integration/i,
    /warranty and quality guarantees/i,
    /0\.5 trees/i,
    /60-80%/,
    /thousands of gallons/i,
    /200\+ pounds/i,
    /Zero Waste Policy/i,
    /Community Partnerships/i,
    /Transparent Reporting/i,
    /ensuring zero waste/i,
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
  assert.match(read("app/recycle-pallets/page.tsx"), /#sell-pallets/);
  assert.match(read("components/recycle-cta-section.tsx"), /id="sell-pallets"/);
});

check("the homepage LocalBusiness schema includes complete contact and geo data", () => {
  const homepage = read("app/page.tsx");
  const contactSection = read("components/contact-section.tsx");
  const siteConfig = read("lib/site-config.ts");
  const siteSchema = read("lib/site-schema.ts");

  assert.match(homepage, /localBusinessSchema/);
  assert.match(siteSchema, /LocalBusiness/);
  assert.match(siteSchema, /telephone:\s*CONTACT\.phone/);
  assert.match(siteSchema, /priceRange:\s*"\$4\.00 and up"/);
  assert.match(siteSchema, /address:\s*{[\s\S]*PRIMARY_FACILITY/);
  assert.match(siteSchema, /geo:\s*{[\s\S]*GeoCoordinates/);
  assert.match(siteSchema, /openingHoursSpecification/);
  assert.match(siteSchema, /absoluteUrl\("\/contact"\)/);
  assert.match(contactSection, /id="contact"/);
  assert.match(siteConfig, /latitude:\s*30\.827312000955/);
  assert.match(siteConfig, /longitude:\s*-89\.524405075319/);
});

check("the standalone contact page is indexable and reuses business data", () => {
  const contactPagePath = "app/contact/page.tsx";
  assert.equal(existsSync(join(root, contactPagePath)), true);

  const contactPage = read(contactPagePath);
  assert.match(contactPage, /export const metadata:\s*Metadata/);
  assert.match(contactPage, /canonical:\s*"\/contact"/);
  assert.match(contactPage, /ContactSection/);
  assert.match(contactPage, /localBusinessSchema/);
  assert.match(read("app/sitemap.ts"), /path:\s*"\/contact"/);
});

if (failures.length > 0) {
  console.error("\nSEO foundation check failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nSEO foundation check passed.");
