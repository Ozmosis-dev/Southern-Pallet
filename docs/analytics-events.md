# Public website event measurement

The configured `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` enables GA4 and the shared phone-click listener. Keep measurement IDs environment-configured. Do not add a second GTM or native tag that sends the same custom events.

| Event | Trigger | Parameters | Interpretation |
| --- | --- | --- | --- |
| form_submission | API success for quote, recycling or careers | form_name, form_type, submission_id | Successful submission across all public forms |
| generate_lead | API success for quote or recycling | form_name, form_type, submission_id | Commercial form lead; existing sales key event |
| job_application_submit | API success for careers | form_name, form_type, submission_id | Career application, separate from commercial leads |
| phone_click | Click on any public tel link | page_path, link_placement, contact_method | Intent to call, not a connected call |

The document capture listener also covers portalled mobile menus and future public telephone links. Placement values are header, footer, mobile_menu and page_content. Private business-plan controls and its placeholder telephone number are excluded. The private password gate is not a customer lead form.

No form field values, names, emails, applicant phone numbers, addresses, messages or resumes are included in these event payloads. A random submission ID identifies a delivered request without personal details. GA4 does not automatically deduplicate arbitrary submission_id parameters; never add additional tags on top of these handlers. Client tracking can be blocked independently of successful form delivery, so these counts are not a server-side lead ledger.

For reports, use Event count filtered to the exact event name. Do not add form_submission and generate_lead together as unique leads: a commercial submission intentionally emits both for different reporting questions. Keep commercial lead reporting filtered to generate_lead rather than all key events. Use event-scoped custom dimensions form_name, form_type and link_placement for breakdowns when registered. Phone intent and careers remain separate outcomes.

Google enhanced measurement's form_start/form_submit events describe interaction or submission attempts and may fire independently of accepted delivery. The custom form_submission event is the successful-completion source. New events have no historical backfill and may take time to appear in standard GA4 reports.

Verification: unit payload checks, existing API delivery/validation tests, production build, and an isolated local browser proxy with mocked API success and event capture. This proxy does not send test email, place calls or send measurement hits to production GA4. Verify received event uptake after publication in GA4 and carry any collection/reporting gaps into the private scorecard action ledger.
