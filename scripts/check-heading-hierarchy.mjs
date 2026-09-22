import assert from "node:assert/strict";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";

const routes = [
  { path: "/", primaryKeyword: "southeast wood pallet supplier" },
  { path: "/contact", primaryKeyword: "wood pallet quote" },
  { path: "/recycle-pallets", primaryKeyword: "recycle used wood pallets" },
  { path: "/careers", primaryKeyword: "pallet company careers" },
  { path: "/blog", primaryKeyword: "wood pallet guides" },
  {
    path: "/blog/where-to-buy-used-pallets",
    primaryKeyword: "where to buy used pallets",
  },
  {
    path: "/blog/pallet-recycling-environmental-benefits",
    primaryKeyword: "recycling wood pallets",
  },
  {
    path: "/blog/cost-effective-pallet-management-strategies",
    primaryKeyword: "reduce pallet costs",
  },
  { path: "/thank-you", primaryKeyword: "wood pallet request" },
  { path: "/private/business-plan", primaryKeyword: "protected content" },
];

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll(/<[^>]+>/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function extractHeadings(html) {
  return [...html.matchAll(/<h([1-3])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/gi)].map(
    ([, level, content]) => ({
      level: Number(level),
      text: decodeHtml(content),
    }),
  );
}

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route.path}`);
  assert.equal(response.status, 200, `${route.path} should return 200`);

  const headings = extractHeadings(await response.text());
  const h1s = headings.filter(({ level }) => level === 1);

  assert.equal(h1s.length, 1, `${route.path} should render exactly one H1`);
  assert.ok(
    h1s[0].text.toLowerCase().includes(route.primaryKeyword),
    `${route.path} H1 should include “${route.primaryKeyword}”; received “${h1s[0].text}”`,
  );
  assert.equal(
    headings[0]?.level,
    1,
    `${route.path} should begin its heading outline with the H1`,
  );

  for (let index = 1; index < headings.length; index += 1) {
    const previous = headings[index - 1];
    const current = headings[index];
    assert.ok(
      current.level <= previous.level + 1,
      `${route.path} should not skip from H${previous.level} “${previous.text}” to H${current.level} “${current.text}”`,
    );
    assert.ok(
      current.text.length >= 3,
      `${route.path} H${current.level} headings should be descriptive`,
    );
  }
}

console.log(
  `Heading hierarchy verified across ${routes.length} routes: one keyword-relevant H1 per page with no skipped H2/H3 levels.`,
);
