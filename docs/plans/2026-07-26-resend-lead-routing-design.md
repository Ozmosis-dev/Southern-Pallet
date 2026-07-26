# Resend Lead Routing Design

## Goal

Route both Southern Pallet website forms to a configurable notification inbox
through Resend while preserving the existing optional webhook integration.

## Architecture

Both existing API routes remain the public form endpoints:

- `POST /api/contact`
- `POST /api/recycle`

They pass their validated form data to a shared server-only delivery module.
That module sends a plain-text notification through Resend when the Resend
environment variables are configured. If `LEAD_WEBHOOK_URL` is also configured,
the same normalized payload is forwarded there as a secondary channel.

No recipient address, sender address, API key, or webhook URL is hardcoded.
Configuration remains server-only:

- `RESEND_API_KEY`
- `LEAD_NOTIFICATION_EMAIL`
- `LEAD_FROM_EMAIL`
- `LEAD_WEBHOOK_URL` (optional existing fallback)

## Email behavior

The contact and recycle forms use distinct fixed subjects and form-type labels.
The submitter's validated email address becomes the email's Reply-To address, so
replying from the notification inbox responds directly to the lead.

Notifications use plain text instead of HTML. This keeps the first version
simple and prevents customer-entered markup from being rendered in email.

## Error handling

The API returns:

- `200` when at least one configured delivery channel succeeds.
- `400` when required lead fields are missing.
- `503` when no delivery channel is configured.
- `502` when channels are configured but all delivery attempts fail.

If both Resend and the webhook are configured, both are attempted. A partial
success returns `200` and logs the failed channel server-side.

## Testing

Node's built-in test runner exercises the real Next.js route handlers with
synthetic requests. Network delivery is intercepted at the HTTP boundary so
tests can verify the Resend request, webhook fallback, status codes, and form
labels without sending email.

The existing navigation regression test, TypeScript validation, and production
build remain part of final verification.

## Activation

The integration is intentionally inactive until the Resend API key, verified
sender address, and notification recipient are added to Vercel. The expected
production recipient is `info@southernpallet.co`, but that value belongs in
`LEAD_NOTIFICATION_EMAIL`, not source code.
