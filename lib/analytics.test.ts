import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const analyticsPath = join(process.cwd(), "lib/analytics.ts");

test("successful lead forms queue the GA4 generate_lead event without personal data", async () => {
  assert.equal(
    existsSync(analyticsPath),
    true,
    "lib/analytics.ts must provide the lead conversion helper",
  );

  const { trackLeadGeneration } = await import(pathToFileURL(analyticsPath).href);
  const target = { dataLayer: [] as Array<ArrayLike<unknown>> };

  trackLeadGeneration(
    {
      formName: "Main Contact Form",
      formType: "quote_request",
      submissionId: "submission-123",
    },
    target,
  );

  assert.equal(target.dataLayer.length, 2);
  assert.equal(Array.from(target.dataLayer[0])[1], "form_submission");
  assert.deepEqual(Array.from(target.dataLayer[1]), [
    "event",
    "generate_lead",
    {
      form_name: "Main Contact Form",
      form_type: "quote_request",
      submission_id: "submission-123",
    },
  ]);
});

test("lead tracking uses an existing gtag queue when GA4 is ready", async () => {
  assert.equal(existsSync(analyticsPath), true);
  const { trackLeadGeneration } = await import(pathToFileURL(analyticsPath).href);
  const calls: unknown[][] = [];
  const target = {
    dataLayer: [] as Array<ArrayLike<unknown>>,
    gtag: (...args: unknown[]) => calls.push(args),
  };

  trackLeadGeneration(
    {
      formName: "Pallet Recycling Form",
      formType: "recycle_request",
      submissionId: "submission-456",
    },
    target,
  );

  assert.deepEqual(calls, [
    ["event", "form_submission", { form_name: "Pallet Recycling Form", form_type: "recycle_request", submission_id: "submission-456" }],
    [
      "event",
      "generate_lead",
      {
        form_name: "Pallet Recycling Form",
        form_type: "recycle_request",
        submission_id: "submission-456",
      },
    ],
  ]);
  assert.equal(target.dataLayer.length, 0);
});

test("careers completions are measurable without becoming sales leads", async () => {
  const analytics = await import(pathToFileURL(analyticsPath).href);
  assert.equal(typeof analytics.trackCareerApplication, "function");
  const target = { dataLayer: [] as Array<ArrayLike<unknown>> };
  analytics.trackCareerApplication({ submissionId: "job-123" }, target);
  assert.deepEqual(target.dataLayer.map(row=>Array.from(row)[1]), ["form_submission", "job_application_submit"]);
  const payload = Array.from(target.dataLayer[0])[2];
  assert.deepEqual(payload, { form_name: "Careers Application", form_type: "career_application", submission_id: "job-123" });
});

test("phone intent records placement and path without URL query strings or form data", async () => {
  const analytics = await import(pathToFileURL(analyticsPath).href);
  assert.equal(typeof analytics.trackPhoneClick, "function");
  const target = { dataLayer: [] as Array<ArrayLike<unknown>> };
  analytics.trackPhoneClick({ pagePath: "/contact", placement: "footer" }, target);
  assert.deepEqual(Array.from(target.dataLayer[0]), ["event", "phone_click", { page_path: "/contact", link_placement: "footer", contact_method: "phone" }]);
});
