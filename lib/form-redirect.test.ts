import assert from "node:assert/strict";
import { test } from "node:test";
import { buildThankYouUrl } from "./form-redirect";

test("thank-you URLs retain attribution without exposing lead details", () => {
  const url = buildThankYouUrl("quote_request", {
    utm_source: "google",
    utm_campaign: "summer pallets",
    utm_term: "",
  });

  assert.equal(
    url,
    "/thank-you?form_type=quote_request&conversion=true&utm_source=google&utm_campaign=summer+pallets",
  );
  assert.doesNotMatch(url, /email|phone|message|name/i);
});
