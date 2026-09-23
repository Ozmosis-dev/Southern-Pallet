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

  assert.equal(target.dataLayer.length, 1);
  assert.deepEqual(Array.from(target.dataLayer[0]), [
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
