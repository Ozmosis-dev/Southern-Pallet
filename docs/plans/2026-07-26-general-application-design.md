# Southern Pallet General Application Design

## Scope

Add one focused general employment application page at `/careers`. This is not
a job board and will not contain individual job listings, filters, or a CMS.
The shared desktop and mobile navigation will include a `Careers` link that
opens the page.

## Page experience

The page will adapt the content hierarchy of the Bridges Staffing application
reference to Southern Pallet's established visual system:

- A compact split hero identifies the page as a general employment application
  and explains that qualified applicants will be contacted.
- A single responsive form follows directly below the introduction.
- The existing shared header and footer keep navigation and legal content
  consistent with the rest of the website.

The visual direction is industrial and straightforward: Southern Pallet green,
warm off-white form surfaces, safety-green accents, strong typography, and
subtle pallet-grid details. The page should feel intentional and welcoming
without suggesting that specific jobs are currently open.

## Form fields

The general application collects:

- Position or type of work of interest
- Preferred location
- First and last name
- Email and phone
- Street address, city, state, and ZIP code
- Shift availability
- Earliest available start date
- How the applicant heard about Southern Pallet
- Relevant experience or qualifications
- Optional PDF, DOC, or DOCX resume up to 5 MB
- Required work-authorization and accuracy acknowledgements

A visually hidden honeypot field filters basic bots.

## Delivery and configuration

The client sends multipart form data to `POST /api/careers`. The route validates
required text fields, acknowledgements, and resume constraints before invoking
the existing Resend delivery layer. Applications use
`CAREERS_NOTIFICATION_EMAIL`, separate from quote leads. `RESEND_API_KEY` and
`LEAD_FROM_EMAIL` remain the shared Resend credentials, and no values are
hardcoded.

The application remains inactive until the environment variables are added.
Missing configuration returns a service-unavailable response and the form shows
an accessible inline error. Successful submissions show an inline confirmation
and clear the form. Resend idempotency prevents duplicate emails on a retry.

## Safety and verification

- Resume files are type-checked and size-limited before being attached.
- Honeypot submissions return a generic success without sending.
- The Vercel rate-limit rule will be expanded to cover `/api/careers`.
- Route tests cover success, missing configuration, invalid files, malformed
  fields, honeypot behavior, and the separate careers recipient.
- Browser verification covers desktop and mobile navigation plus form error and
  success states.
