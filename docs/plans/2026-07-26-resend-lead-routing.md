# Resend Lead Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deliver both website lead forms to a configurable inbox through Resend while retaining the optional webhook route and preventing false success responses.

**Architecture:** A shared server-only delivery module owns Resend and webhook delivery. The existing contact and recycle route handlers validate their required fields, call the shared module, and translate configuration or delivery failures into meaningful HTTP status codes.

**Tech Stack:** Next.js 15 route handlers, TypeScript, Resend Node SDK, Node.js built-in test runner.

### Task 1: Add the failing contact-email route test

**Files:**
- Create: `app/api/lead-routing.test.ts`
- Modify: `package.json`

**Step 1: Write the failing test**

Create a route-level test that sets `RESEND_API_KEY`,
`LEAD_NOTIFICATION_EMAIL`, and `LEAD_FROM_EMAIL`, calls the existing contact
route, and asserts that the HTTP boundary receives a Resend email request with
the configured sender/recipient and the lead's email as Reply-To.

**Step 2: Run the test to verify it fails**

Run: `npm run test:forms`

Expected: FAIL because the current contact route does not call Resend.

**Step 3: Commit the test**

Run:

```bash
git add app/api/lead-routing.test.ts package.json
git commit -m "Test Resend lead routing"
```

### Task 2: Implement shared Resend delivery

**Files:**
- Create: `lib/lead-delivery.ts`
- Modify: `app/api/contact/route.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Install the official SDK**

Run: `npm install resend`

**Step 2: Write the minimal delivery module**

Implement:

- Plain-text lead formatting.
- Resend delivery from `RESEND_API_KEY`.
- Configurable `LEAD_NOTIFICATION_EMAIL` and `LEAD_FROM_EMAIL`.
- Reply-To using the lead's submitted email.
- Typed not-configured and delivery-failed errors.

**Step 3: Connect the contact route**

Validate `name` and `email`, call the shared delivery module, and return `503`
when no delivery channel is configured or `502` when configured delivery fails.

**Step 4: Run the test to verify it passes**

Run: `npm run test:forms`

Expected: PASS for the contact Resend test.

**Step 5: Commit**

Run:

```bash
git add lib/lead-delivery.ts app/api/contact/route.ts package.json package-lock.json
git commit -m "Route contact leads through Resend"
```

### Task 3: Cover recycle delivery and webhook fallback

**Files:**
- Modify: `app/api/lead-routing.test.ts`
- Modify: `app/api/recycle/route.ts`
- Modify: `lib/lead-delivery.ts`

**Step 1: Write failing tests**

Add tests that assert:

- Recycle submissions use the recycle-specific form label and subject.
- An unconfigured route returns `503`.
- The existing webhook is called when it is the only configured channel.
- A non-success webhook response produces `502`.

**Step 2: Run tests to verify the new cases fail**

Run: `npm run test:forms`

Expected: FAIL on recycle Resend routing, unconfigured status, and webhook error handling.

**Step 3: Implement the minimal behavior**

Connect the recycle route to shared delivery, preserve the webhook payload, and
attempt every configured channel. Return success if at least one channel
succeeds and failure if all configured channels fail.

**Step 4: Run tests to verify they pass**

Run: `npm run test:forms`

Expected: all form-routing tests PASS.

**Step 5: Commit**

Run:

```bash
git add app/api/lead-routing.test.ts app/api/recycle/route.ts lib/lead-delivery.ts
git commit -m "Complete lead delivery routing"
```

### Task 4: Document configuration

**Files:**
- Modify: `env.example.txt`
- Modify: `README.md`

**Step 1: Document the environment variables**

Document `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, and `LEAD_FROM_EMAIL`.
State that Resend requires a verified custom domain for production recipients
and that `LEAD_WEBHOOK_URL` remains optional.

**Step 2: Verify secrets remain absent**

Run:

```bash
git diff --check
rg -n "re_[A-Za-z0-9]{20,}" . -g '!node_modules/**'
```

Expected: no hardcoded Resend key and no whitespace errors.

**Step 3: Commit**

Run:

```bash
git add env.example.txt README.md
git commit -m "Document Resend lead delivery"
```

### Task 5: Final verification

**Files:**
- Verify all modified files.

**Step 1: Run form-routing tests**

Run: `npm run test:forms`

Expected: all tests PASS.

**Step 2: Run existing navigation regression**

Run: `npm run test:navigation`

Expected: header navigation verified across six routes.

**Step 3: Run TypeScript and production build checks**

Run:

```bash
npx tsc --noEmit
npm run build
```

Expected: TypeScript and the optimized Next.js build complete successfully.

**Step 4: Inspect the final branch**

Run:

```bash
git status --short --branch
git log --oneline main..HEAD
git diff --check main...HEAD
```

Expected: only the planned Resend integration, tests, and documentation are present.
