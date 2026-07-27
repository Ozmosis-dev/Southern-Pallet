import assert from "node:assert/strict";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const articles = [
  "/blog/where-to-buy-used-pallets",
  "/blog/pallet-recycling-environmental-benefits",
  "/blog/cost-effective-pallet-management-strategies",
];

const indexResponse = await fetch(`${baseUrl}/blog`);
assert.equal(indexResponse.status, 200);
assert.match(
  await indexResponse.text(),
  /data-blog-index="true"/,
  "the blog index should use the editorial index layout",
);

for (const route of articles) {
  const response = await fetch(`${baseUrl}${route}`);
  assert.equal(response.status, 200, `${route} should render`);
  const html = await response.text();
  assert.match(
    html,
    /data-blog-article="true"/,
    `${route} should use the shared article shell`,
  );
  assert.match(
    html,
    /href="\/blog"/,
    `${route} should provide a back link to the blog index`,
  );
}

console.log(`Editorial blog layout verified across ${articles.length} articles.`);
