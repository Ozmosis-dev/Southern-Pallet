import assert from "node:assert/strict";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const publicRoutes = [
  "/",
  "/recycle-pallets",
  "/careers",
  "/blog",
  "/blog/where-to-buy-used-pallets",
  "/blog/pallet-recycling-environmental-benefits",
  "/blog/cost-effective-pallet-management-strategies",
  "/thank-you",
];

for (const route of publicRoutes) {
  const response = await fetch(`${baseUrl}${route}`);
  assert.equal(response.status, 200, `${route} should render successfully`);
  const html = await response.text();
  assert.match(
    html,
    /data-public-site="true"/,
    `${route} should opt into the public design system`,
  );
}

const privateResponse = await fetch(`${baseUrl}/private/business-plan`);
assert.equal(privateResponse.status, 200);
assert.doesNotMatch(
  await privateResponse.text(),
  /data-public-site="true"/,
  "the private business plan must stay outside the public design system",
);

console.log(
  `Public design shell verified across ${publicRoutes.length} routes; private page excluded.`,
);
