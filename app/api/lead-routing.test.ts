import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { NextRequest } from "next/server";
import { POST as postContact } from "./contact/route.ts";

const originalFetch = globalThis.fetch;
const deliveryEnvironmentKeys = [
  "RESEND_API_KEY",
  "LEAD_NOTIFICATION_EMAIL",
  "LEAD_FROM_EMAIL",
  "LEAD_WEBHOOK_URL",
] as const;
const originalEnvironment = Object.fromEntries(
  deliveryEnvironmentKeys.map((key) => [key, process.env[key]]),
);

afterEach(() => {
  globalThis.fetch = originalFetch;

  for (const key of deliveryEnvironmentKeys) {
    const originalValue = originalEnvironment[key];
    if (originalValue === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = originalValue;
    }
  }
});

test("contact submissions are delivered through Resend when configured", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.LEAD_NOTIFICATION_EMAIL = "info@example.com";
  process.env.LEAD_FROM_EMAIL = "Southern Pallet Website <leads@example.com>";
  delete process.env.LEAD_WEBHOOK_URL;

  let sentRequest:
    | {
        url: string;
        init?: RequestInit;
      }
    | undefined;

  globalThis.fetch = async (input, init) => {
    sentRequest = {
      url: input instanceof Request ? input.url : String(input),
      init,
    };

    return Response.json({ id: "email_123" });
  };

  const response = await postContact(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Jordan Buyer",
        company: "Example Logistics",
        email: "jordan@example.com",
        phone: "(555) 123-4567",
        productInterest: "standard",
        message: "Need 100 pallets",
        timestamp: "2026-07-26T20:00:00.000Z",
        source: "website_new_contact_form",
      }),
    }),
  );

  assert.equal(response.status, 200);
  assert.equal(sentRequest?.url, "https://api.resend.com/emails");

  const body = JSON.parse(String(sentRequest?.init?.body));
  assert.equal(body.from, "Southern Pallet Website <leads@example.com>");
  assert.deepEqual(body.to, ["info@example.com"]);
  assert.equal(body.reply_to, "jordan@example.com");
  assert.match(body.subject, /quote request/i);
  assert.match(body.text, /Jordan Buyer/);
  assert.match(body.text, /Need 100 pallets/);
});
