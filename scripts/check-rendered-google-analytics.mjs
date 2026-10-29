import assert from "node:assert/strict";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const containerId = process.env.TEST_GTM_ID ?? process.env.NEXT_PUBLIC_GTM_ID;

assert.ok(
  containerId,
  "Set TEST_GTM_ID or NEXT_PUBLIC_GTM_ID before running this check",
);

const response = await fetch(baseUrl);
assert.equal(response.status, 200, "The homepage should return 200");

const html = await response.text();
const escapedContainerId = containerId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

assert.match(
  html,
  new RegExp(
    `https://www\\.googletagmanager\\.com/ns\\.html\\?id=${escapedContainerId}`,
  ),
  "The homepage should render the GTM noscript fallback with the configured container ID",
);
assert.match(html, new RegExp(escapedContainerId), "The GTM container ID should be rendered");
assert.doesNotMatch(
  html,
  /googletagmanager\.com\/gtag\/js\?id=/,
  "The homepage must not load a second direct Google Analytics tag",
);

console.log(`Rendered Google Tag Manager verified for ${containerId}.`);
