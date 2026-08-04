import assert from "node:assert/strict";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const measurementId =
  process.env.TEST_GOOGLE_ANALYTICS_ID ??
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

assert.ok(
  measurementId,
  "Set TEST_GOOGLE_ANALYTICS_ID or NEXT_PUBLIC_GOOGLE_ANALYTICS_ID before running this check",
);

const response = await fetch(baseUrl);
assert.equal(response.status, 200, "The homepage should return 200");

const html = await response.text();
const escapedMeasurementId = measurementId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

assert.match(
  html,
  new RegExp(
    `https://www\\.googletagmanager\\.com/gtag/js\\?id=${escapedMeasurementId}`,
  ),
  "The homepage should load gtag.js with the configured GA4 measurement ID",
);

console.log(`Rendered Google Analytics verified for ${measurementId}.`);
