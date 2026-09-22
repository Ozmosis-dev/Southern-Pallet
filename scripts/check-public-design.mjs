import assert from "node:assert/strict";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const publicRoutes = [
  "/",
  "/contact",
  "/recycle-pallets",
  "/careers",
  "/blog",
  "/blog/where-to-buy-used-pallets",
  "/blog/pallet-recycling-environmental-benefits",
  "/blog/cost-effective-pallet-management-strategies",
  "/thank-you",
];
let careersHtml = "";

for (const route of publicRoutes) {
  const response = await fetch(`${baseUrl}${route}`);
  assert.equal(response.status, 200, `${route} should render successfully`);
  const html = await response.text();
  if (route === "/careers") careersHtml = html;
  assert.match(
    html,
    /data-public-site="true"/,
    `${route} should opt into the public design system`,
  );
  if (route === "/thank-you") {
    assert.match(
      html,
      /data-submission-confirmation="true"/,
      "the thank-you route should use the shared submission confirmation layout",
    );
  }
}

const careersMain = careersHtml.match(/<main>([\s\S]*?)<\/main>/)?.[1] ?? "";
assert.match(
  careersHtml,
  /<title>Pallet Company Careers in Theodore, Alabama \| Southern Pallet<\/title>/,
  "the careers title should describe hiring in Theodore only",
);
assert.match(
  careersMain,
  /Theodore, (?:AL|Alabama)/,
  "the careers page should list Theodore as the hiring location",
);
assert.doesNotMatch(
  careersMain,
  /Poplarville|Either location/,
  "the careers page should not offer Poplarville or an either-location choice",
);

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
