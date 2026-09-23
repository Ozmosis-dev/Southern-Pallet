import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { NextRequest } from "next/server";
import { deliverLead } from "../../lib/lead-delivery";
import { POST as postContact } from "./contact/route";
import { POST as postRecycle } from "./recycle/route";

const originalFetch = globalThis.fetch;
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const deliveryEnvironmentKeys = [
  "RESEND_API_KEY",
  "LEAD_NOTIFICATION_EMAIL",
  "LEAD_FROM_EMAIL",
  "LEAD_WEBHOOK_URL",
  "LEAD_DELIVERY_TIMEOUT_MS",
] as const;
const originalEnvironment = Object.fromEntries(
  deliveryEnvironmentKeys.map((key) => [key, process.env[key]]),
);

function clearDeliveryEnvironment() {
  for (const key of deliveryEnvironmentKeys) {
    delete process.env[key];
  }
}

function createContactRequest() {
  return new NextRequest("http://localhost/api/contact", {
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
  });
}

beforeEach(() => {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;

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
  clearDeliveryEnvironment();
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.LEAD_NOTIFICATION_EMAIL = "info@example.com";
  process.env.LEAD_FROM_EMAIL = "Southern Pallet Recycling Website <leads@example.com>";

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

  const response = await postContact(createContactRequest());

  assert.equal(response.status, 200);
  assert.equal(sentRequest?.url, "https://api.resend.com/emails");

  const body = JSON.parse(String(sentRequest?.init?.body));
  assert.equal(body.from, "Southern Pallet Recycling Website <leads@example.com>");
  assert.deepEqual(body.to, ["info@example.com"]);
  assert.equal(body.reply_to, "jordan@example.com");
  assert.match(body.subject, /quote request/i);
  assert.match(body.text, /Jordan Buyer/);
  assert.match(body.text, /Need 100 pallets/);
  assert.match(
    new Headers(sentRequest?.init?.headers).get("Idempotency-Key") ?? "",
    /^southern-pallet-[a-f0-9]{64}$/,
  );
});

test("recycle submissions use the recycle email label and subject", async () => {
  clearDeliveryEnvironment();
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.LEAD_NOTIFICATION_EMAIL = "info@example.com";
  process.env.LEAD_FROM_EMAIL = "Southern Pallet Recycling Website <leads@example.com>";

  let sentBody: Record<string, unknown> | undefined;
  globalThis.fetch = async (_input, init) => {
    sentBody = JSON.parse(String(init?.body));
    return Response.json({ id: "email_456" });
  };

  const response = await postRecycle(
    new NextRequest("http://localhost/api/recycle", {
      method: "POST",
      body: JSON.stringify({
        fullName: "Taylor Seller",
        companyName: "Example Warehouse",
        email: "taylor@example.com",
        phone: "(555) 987-6543",
        palletType: "standard",
        quantity: "100+",
        condition: "good",
        location: "Mobile, AL",
        pickupService: "yes",
        timestamp: "2026-07-26T20:05:00.000Z",
        source: "website_recycle_pallet",
      }),
    }),
  );

  assert.equal(response.status, 200);
  assert.match(String(sentBody?.subject), /recycl/i);
  assert.equal(sentBody?.reply_to, "taylor@example.com");
  assert.match(String(sentBody?.text), /pallet_sell_request/);
  assert.match(String(sentBody?.text), /Taylor Seller/);
});

test("a form submission returns 503 when no delivery channel is configured", async () => {
  clearDeliveryEnvironment();
  globalThis.fetch = async () => {
    throw new Error("No network request should be made");
  };

  const response = await postContact(createContactRequest());
  assert.equal(response.status, 503);
});

test("the existing webhook remains a delivery fallback", async () => {
  clearDeliveryEnvironment();
  process.env.LEAD_WEBHOOK_URL = "https://hooks.example.com/leads";

  let webhookRequest:
    | {
        url: string;
        body: Record<string, unknown>;
      }
    | undefined;

  globalThis.fetch = async (input, init) => {
    webhookRequest = {
      url: input instanceof Request ? input.url : String(input),
      body: JSON.parse(String(init?.body)),
    };
    return Response.json({ accepted: true });
  };

  const response = await postContact(createContactRequest());

  assert.equal(response.status, 200);
  assert.equal(webhookRequest?.url, "https://hooks.example.com/leads");
  assert.equal(webhookRequest?.body.formType, "contact_request");
});

test("a failed webhook returns 502 instead of reporting success", async () => {
  clearDeliveryEnvironment();
  process.env.LEAD_WEBHOOK_URL = "https://hooks.example.com/leads";
  globalThis.fetch = async () =>
    new Response("Webhook unavailable", { status: 503 });

  const response = await postContact(createContactRequest());
  assert.equal(response.status, 502);
});

test("non-string required contact fields return 400", async () => {
  clearDeliveryEnvironment();
  process.env.LEAD_WEBHOOK_URL = "https://hooks.example.com/leads";
  globalThis.fetch = async () => {
    throw new Error("Malformed submissions must not trigger delivery");
  };

  const response = await postContact(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: 42,
        email: "jordan@example.com",
      }),
    }),
  );

  assert.equal(response.status, 400);
});

test("non-string required recycle fields return 400", async () => {
  clearDeliveryEnvironment();
  process.env.LEAD_WEBHOOK_URL = "https://hooks.example.com/leads";
  globalThis.fetch = async () => {
    throw new Error("Malformed submissions must not trigger delivery");
  };

  const response = await postRecycle(
    new NextRequest("http://localhost/api/recycle", {
      method: "POST",
      body: JSON.stringify({
        fullName: "Taylor Seller",
        email: 42,
      }),
    }),
  );

  assert.equal(response.status, 400);
});

test("a stalled webhook does not block a successful Resend delivery", async () => {
  clearDeliveryEnvironment();
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.LEAD_NOTIFICATION_EMAIL = "info@example.com";
  process.env.LEAD_FROM_EMAIL = "Southern Pallet Recycling Website <leads@example.com>";
  process.env.LEAD_WEBHOOK_URL = "https://hooks.example.com/leads";
  process.env.LEAD_DELIVERY_TIMEOUT_MS = "10";

  globalThis.fetch = async (input, init) => {
    const url = input instanceof Request ? input.url : String(input);

    if (url === "https://api.resend.com/emails") {
      return Response.json({ id: "email_789" });
    }

    return await new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => {
        reject(new DOMException("The operation was aborted.", "AbortError"));
      });
    });
  };

  const result = await Promise.race([
    postContact(createContactRequest()),
    new Promise<"timed-out">((resolve) => {
      setTimeout(() => resolve("timed-out"), 200);
    }),
  ]);

  assert.notEqual(result, "timed-out");
  assert.equal((result as Response).status, 200);
  assert.deepEqual((await (result as Response).json()).deliveryChannels, [
    "resend",
  ]);
});

test("honeypot submissions do not trigger delivery", async () => {
  clearDeliveryEnvironment();
  process.env.LEAD_WEBHOOK_URL = "https://hooks.example.com/leads";
  let deliveryAttempted = false;
  globalThis.fetch = async () => {
    deliveryAttempted = true;
    return Response.json({ accepted: true });
  };

  const response = await postContact(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Spam Bot",
        email: "bot@example.com",
        website: "https://spam.example.com",
      }),
    }),
  );

  assert.equal(response.status, 200);
  assert.equal(deliveryAttempted, false);
});

test("user retries reuse the same Resend idempotency key", async () => {
  clearDeliveryEnvironment();
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.LEAD_NOTIFICATION_EMAIL = "info@example.com";
  process.env.LEAD_FROM_EMAIL = "Southern Pallet Recycling Website <leads@example.com>";

  const idempotencyKeys: string[] = [];
  globalThis.fetch = async (_input, init) => {
    idempotencyKeys.push(
      new Headers(init?.headers).get("Idempotency-Key") ?? "",
    );
    return Response.json({ id: `email_${idempotencyKeys.length}` });
  };

  for (const timestamp of [
    "2026-07-26T20:00:00.000Z",
    "2026-07-26T20:01:00.000Z",
  ]) {
    await postContact(
      new NextRequest("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Jordan Buyer",
          email: "jordan@example.com",
          submissionId: "submission_123",
          timestamp,
        }),
      }),
    );
  }

  assert.equal(idempotencyKeys.length, 2);
  assert.equal(idempotencyKeys[0], idempotencyKeys[1]);
});

test("null JSON bodies return 400 for both form routes", async () => {
  clearDeliveryEnvironment();
  process.env.LEAD_WEBHOOK_URL = "https://hooks.example.com/leads";
  globalThis.fetch = async () => {
    throw new Error("Malformed submissions must not trigger delivery");
  };

  const contactResponse = await postContact(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: "null",
    }),
  );
  const recycleResponse = await postRecycle(
    new NextRequest("http://localhost/api/recycle", {
      method: "POST",
      body: "null",
    }),
  );

  assert.equal(contactResponse.status, 400);
  assert.equal(recycleResponse.status, 400);
});

test("career delivery supports multiple recipients and includes a resume", async () => {
  clearDeliveryEnvironment();
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.LEAD_NOTIFICATION_EMAIL = "quotes@example.com";
  process.env.LEAD_FROM_EMAIL = "Southern Pallet Recycling Website <leads@example.com>";
  process.env.LEAD_WEBHOOK_URL = "https://hooks.example.com/leads";

  let sentBody: Record<string, unknown> | undefined;
  globalThis.fetch = async (_input, init) => {
    sentBody = JSON.parse(String(init?.body));
    return Response.json({ id: "career_email_123" });
  };

  const result = await deliverLead({
    formType: "career_application",
    subject: "New Southern Pallet Recycling employment application",
    replyTo: "applicant@example.com",
    notificationEmail: "careers@example.com, staffing@example.com",
    allowWebhook: false,
    attachments: [
      {
        filename: "resume.pdf",
        content: "cGRmLWNvbnRlbnQ=",
        contentType: "application/pdf",
      },
    ],
    payload: {
      firstName: "Jordan",
      lastName: "Applicant",
      submissionId: "career_submission_123",
    },
  });

  assert.deepEqual(result.channels, ["resend"]);
  assert.deepEqual(sentBody?.to, [
    "careers@example.com",
    "staffing@example.com",
  ]);
  assert.deepEqual(sentBody?.attachments, [
    {
      filename: "resume.pdf",
      content: "cGRmLWNvbnRlbnQ=",
      content_type: "application/pdf",
    },
  ]);
});
