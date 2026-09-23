import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { NextRequest } from "next/server";
import { POST } from "./route";

const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;
const originalConsoleLog = console.log;
const environmentKeys = [
  "RESEND_API_KEY",
  "LEAD_FROM_EMAIL",
  "LEAD_NOTIFICATION_EMAIL",
  "LEAD_WEBHOOK_URL",
  "CAREERS_NOTIFICATION_EMAIL",
] as const;
const originalEnvironment = Object.fromEntries(
  environmentKeys.map((key) => [key, process.env[key]]),
);

function clearEnvironment() {
  for (const key of environmentKeys) {
    delete process.env[key];
  }
}

function createApplicationForm(
  overrides: Record<string, string | File | null> = {},
): FormData {
  const values: Record<string, string | File | null> = {
    positionInterest: "Production team",
    preferredLocation: "Poplarville, MS",
    firstName: "Jordan",
    lastName: "Applicant",
    email: "jordan@example.com",
    phone: "(555) 123-4567",
    streetAddress: "123 Main Street",
    city: "Mobile",
    state: "AL",
    zipCode: "36602",
    shiftAvailability: "Any shift",
    startDate: "2026-08-15",
    howHeard: "Search engine",
    experience: "Three years of warehouse experience.",
    workAuthorized: "yes",
    accuracyConfirmed: "yes",
    submissionId: "career_submission_123",
    website: "",
    resume: new File(["resume content"], "Jordan-Resume.pdf", {
      type: "application/pdf",
    }),
    ...overrides,
  };
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (value !== null) {
      formData.set(key, value);
    }
  }

  return formData;
}

function createRequest(formData: FormData): NextRequest {
  return new NextRequest("http://localhost/api/careers", {
    method: "POST",
    body: formData,
  });
}

beforeEach(() => {
  clearEnvironment();
  console.error = () => {};
  console.log = () => {};
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
  console.log = originalConsoleLog;

  for (const key of environmentKeys) {
    const originalValue = originalEnvironment[key];
    if (originalValue === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = originalValue;
    }
  }
});

test("valid applications email the careers inbox with the resume attached", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.LEAD_FROM_EMAIL = "Southern Pallet Recycling Careers <careers@example.com>";
  process.env.CAREERS_NOTIFICATION_EMAIL = "jobs@example.com";
  process.env.LEAD_WEBHOOK_URL = "https://hooks.example.com/leads";

  let sentRequest:
    | {
        url: string;
        body: Record<string, unknown>;
      }
    | undefined;

  globalThis.fetch = async (input, init) => {
    sentRequest = {
      url: input instanceof Request ? input.url : String(input),
      body: JSON.parse(String(init?.body)),
    };
    return Response.json({ id: "career_email_123" });
  };

  const response = await POST(createRequest(createApplicationForm()));
  const responseBody = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(responseBody.deliveryChannels, ["resend"]);
  assert.equal(sentRequest?.url, "https://api.resend.com/emails");
  assert.deepEqual(sentRequest?.body.to, ["jobs@example.com"]);
  assert.equal(sentRequest?.body.reply_to, "jordan@example.com");
  assert.match(String(sentRequest?.body.subject), /employment application/i);
  assert.deepEqual(sentRequest?.body.attachments, [
    {
      filename: "Jordan-Resume.pdf",
      content: Buffer.from("resume content").toString("base64"),
      content_type: "application/pdf",
    },
  ]);
});

test("applications return 503 when the careers inbox is not configured", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.LEAD_FROM_EMAIL = "Southern Pallet Recycling Careers <careers@example.com>";
  globalThis.fetch = async () => {
    throw new Error("No delivery should be attempted");
  };

  const response = await POST(createRequest(createApplicationForm()));
  assert.equal(response.status, 503);
});

test("missing required applicant fields return 400", async () => {
  process.env.CAREERS_NOTIFICATION_EMAIL = "jobs@example.com";
  globalThis.fetch = async () => {
    throw new Error("Invalid applications must not trigger delivery");
  };

  const response = await POST(
    createRequest(createApplicationForm({ firstName: "" })),
  );
  assert.equal(response.status, 400);
});

test("missing acknowledgements return 400", async () => {
  process.env.CAREERS_NOTIFICATION_EMAIL = "jobs@example.com";
  globalThis.fetch = async () => {
    throw new Error("Invalid applications must not trigger delivery");
  };

  const response = await POST(
    createRequest(createApplicationForm({ accuracyConfirmed: null })),
  );
  assert.equal(response.status, 400);
});

test("honeypot applications return success without sending", async () => {
  process.env.CAREERS_NOTIFICATION_EMAIL = "jobs@example.com";
  let deliveryAttempted = false;
  globalThis.fetch = async () => {
    deliveryAttempted = true;
    return Response.json({ id: "unexpected" });
  };

  const response = await POST(
    createRequest(
      createApplicationForm({ website: "https://spam.example.com" }),
    ),
  );

  assert.equal(response.status, 200);
  assert.equal(deliveryAttempted, false);
});

test("resume files larger than 5 MB return 413", async () => {
  process.env.CAREERS_NOTIFICATION_EMAIL = "jobs@example.com";
  globalThis.fetch = async () => {
    throw new Error("Oversized files must not trigger delivery");
  };
  const oversizedResume = new File(
    [new Uint8Array(5 * 1024 * 1024 + 1)],
    "large-resume.pdf",
    { type: "application/pdf" },
  );

  const response = await POST(
    createRequest(createApplicationForm({ resume: oversizedResume })),
  );
  assert.equal(response.status, 413);
});

test("unsupported resume file types return 415", async () => {
  process.env.CAREERS_NOTIFICATION_EMAIL = "jobs@example.com";
  globalThis.fetch = async () => {
    throw new Error("Unsupported files must not trigger delivery");
  };
  const imageResume = new File(["image"], "resume.png", {
    type: "image/png",
  });

  const response = await POST(
    createRequest(createApplicationForm({ resume: imageResume })),
  );
  assert.equal(response.status, 415);
});
