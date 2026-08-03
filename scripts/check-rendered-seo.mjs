import assert from "node:assert/strict";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const canonicalOrigin = "https://southernpallet.co";

const publicRoutes = [
  {
    path: "/",
    title: "Wood Pallet Supplier in Alabama & Mississippi | Southern Pallet",
  },
  {
    path: "/recycle-pallets",
    title: "Used Pallet Recycling & Buyback | Southern Pallet",
  },
  {
    path: "/blog",
    title: "Wood Pallet Guides & Recycling Resources | Southern Pallet",
  },
  {
    path: "/blog/where-to-buy-used-pallets",
    title: "Where to Buy Used Pallets for Your Business | Southern Pallet",
    schemaType: "BlogPosting",
  },
  {
    path: "/blog/pallet-recycling-environmental-benefits",
    title:
      "Environmental Benefits of Recycling Wood Pallets | Southern Pallet",
    schemaType: "BlogPosting",
  },
  {
    path: "/blog/cost-effective-pallet-management-strategies",
    title: "How to Reduce Pallet Costs: 8 Practical Steps | Southern Pallet",
    schemaType: "BlogPosting",
  },
];

function getAttribute(html, tagPattern, attribute) {
  const match = html.match(tagPattern);
  if (!match) return null;
  return match[0].match(new RegExp(`${attribute}="([^"]*)"`))?.[1] ?? null;
}

function decodeHtmlText(value) {
  return value
    ?.replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

function getJsonLd(html) {
  const scripts = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ];
  return scripts.map((match) => JSON.parse(match[1]));
}

function containsType(value, expectedType) {
  if (Array.isArray(value)) {
    return value.some((item) => containsType(item, expectedType));
  }
  if (!value || typeof value !== "object") return false;
  if (
    value["@type"] === expectedType ||
    (Array.isArray(value["@type"]) && value["@type"].includes(expectedType))
  ) {
    return true;
  }
  return Object.values(value).some((item) => containsType(item, expectedType));
}

for (const route of publicRoutes) {
  const response = await fetch(`${baseUrl}${route.path}`);
  assert.equal(response.status, 200, `${route.path} should return 200`);
  const html = await response.text();

  const renderedTitle = decodeHtmlText(
    html.match(/<title>(.*?)<\/title>/)?.[1],
  );
  assert.equal(renderedTitle, route.title, `${route.path} title should be exact`);

  const descriptions = [
    ...html.matchAll(/<meta[^>]*name="description"[^>]*>/g),
  ];
  assert.equal(
    descriptions.length,
    1,
    `${route.path} should have one meta description`,
  );
  const description = getAttribute(
    html,
    /<meta[^>]*name="description"[^>]*>/,
    "content",
  );
  assert.ok(
    description && description.length >= 120 && description.length <= 170,
    `${route.path} description should be 120-170 characters; received ${description?.length}`,
  );

  const canonicals = [
    ...html.matchAll(/<link[^>]*rel="canonical"[^>]*>/g),
  ];
  assert.equal(
    canonicals.length,
    1,
    `${route.path} should have one canonical`,
  );
  assert.equal(
    getAttribute(html, /<link[^>]*rel="canonical"[^>]*>/, "href"),
    `${canonicalOrigin}${route.path === "/" ? "" : route.path}`,
    `${route.path} canonical should use the production domain`,
  );

  const robots = getAttribute(
    html,
    /<meta[^>]*name="robots"[^>]*>/,
    "content",
  );
  assert.doesNotMatch(
    robots ?? "",
    /noindex/,
    `${route.path} should be indexable`,
  );

  const jsonLd = getJsonLd(html);
  assert.ok(jsonLd.length > 0, `${route.path} should render valid JSON-LD`);
  if (route.schemaType) {
    assert.ok(
      jsonLd.some((value) => containsType(value, route.schemaType)),
      `${route.path} should render ${route.schemaType} JSON-LD`,
    );
  }
}

for (const route of ["/thank-you", "/private/business-plan"]) {
  const response = await fetch(`${baseUrl}${route}`);
  assert.equal(response.status, 200, `${route} should return 200`);
  const html = await response.text();
  const robots = getAttribute(
    html,
    /<meta[^>]*name="robots"[^>]*>/,
    "content",
  );
  assert.match(robots ?? "", /noindex/, `${route} should render noindex`);
  assert.equal(
    getAttribute(html, /<link[^>]*rel="canonical"[^>]*>/, "href"),
    `${canonicalOrigin}${route}`,
    `${route} should use a self-referencing canonical`,
  );
}

const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
assert.equal(robotsResponse.status, 200, "robots.txt should return 200");
const robots = await robotsResponse.text();
assert.match(robots, /Sitemap: https:\/\/southernpallet\.co\/sitemap\.xml/);
assert.doesNotMatch(robots, /_next|private|thank-you/);

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200, "sitemap.xml should return 200");
const sitemap = await sitemapResponse.text();
for (const route of publicRoutes) {
  const expectedUrl = `${canonicalOrigin}${route.path}`;
  assert.match(sitemap, new RegExp(`<loc>${expectedUrl}</loc>`));
}
assert.doesNotMatch(sitemap, /thank-you|private/);

console.log(
  `Rendered SEO verified across ${publicRoutes.length} public routes, 2 noindex routes, robots.txt, and sitemap.xml.`,
);
