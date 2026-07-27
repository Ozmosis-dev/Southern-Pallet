import assert from "node:assert/strict";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";

const routes = [
  { path: "/", sectionPrefix: "#", homeHref: "#home" },
  { path: "/blog", sectionPrefix: "/#", homeHref: "/" },
  {
    path: "/blog/where-to-buy-used-pallets",
    sectionPrefix: "/#",
    homeHref: "/",
  },
  {
    path: "/blog/pallet-recycling-environmental-benefits",
    sectionPrefix: "/#",
    homeHref: "/",
  },
  {
    path: "/blog/cost-effective-pallet-management-strategies",
    sectionPrefix: "/#",
    homeHref: "/",
  },
  { path: "/recycle-pallets", sectionPrefix: "/#", homeHref: "/" },
  { path: "/careers", sectionPrefix: "/#", homeHref: "/" },
];

const sectionLinks = [
  ["Products", "products"],
  ["Services", "services"],
  ["About Us", "about"],
  ["Delivery", "delivery"],
  ["Contact", "contact"],
];

function getLinkHrefs(html, label) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const linkPattern = new RegExp(
    `<a\\b[^>]*href="([^"]*)"[^>]*>\\s*${escapedLabel}\\s*</a>`,
    "g",
  );

  return [...html.matchAll(linkPattern)].map((match) => match[1]);
}

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route.path}`);
  assert.equal(response.status, 200, `${route.path} should render successfully`);

  const html = await response.text();

  for (const [label, section] of sectionLinks) {
    const hrefs = getLinkHrefs(html, label);
    const expectedHref = `${route.sectionPrefix}${section}`;

    assert.ok(hrefs.length > 0, `${route.path} should render the ${label} link`);
    assert.ok(
      hrefs.every((href) => href === expectedHref),
      `${route.path} ${label} links should target ${expectedHref}; received ${hrefs.join(", ")}`,
    );
  }

  const homeHrefs = getLinkHrefs(html, "Home");
  assert.ok(homeHrefs.length > 0, `${route.path} should render the mobile Home link`);
  assert.ok(
    homeHrefs.every((href) => href === route.homeHref),
    `${route.path} Home links should target ${route.homeHref}; received ${homeHrefs.join(", ")}`,
  );

  const careersHrefs = getLinkHrefs(html, "Careers");
  assert.ok(
    careersHrefs.length > 0,
    `${route.path} should render the Careers link`,
  );
  assert.ok(
    careersHrefs.every((href) => href === "/careers"),
    `${route.path} Careers links should target /careers; received ${careersHrefs.join(", ")}`,
  );
}

console.log(`Header navigation verified across ${routes.length} routes.`);
