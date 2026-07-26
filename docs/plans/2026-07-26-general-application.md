# General Application Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a polished `/careers` general application page, shared navigation link, and secure Resend-backed application delivery to a separately configured careers inbox.

**Architecture:** A client form component submits multipart data to a Node.js App Router endpoint. The endpoint validates fields and an optional resume, then calls the existing shared delivery module with a recipient override and attachment. The page reuses the shared header/footer and reports success or failure inline.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, Resend, Node test runner with tsx.

---

### Task 1: Extend lead delivery for careers

**Files:**
- Modify: `lib/lead-delivery.ts`
- Modify: `app/api/lead-routing.test.ts`

**Step 1: Write the failing test**

Add a test that invokes `deliverLead` with a recipient override and attachment,
then asserts the Resend request uses the careers address and includes the
attachment.

**Step 2: Run test to verify it fails**

Run: `npm run test:forms`
Expected: FAIL because delivery options do not accept a recipient override or
attachment.

**Step 3: Write minimal implementation**

Add optional `notificationEmail`, `attachments`, and `allowWebhook` delivery
options. Preserve the existing defaults for quote and recycling forms.

**Step 4: Run test to verify it passes**

Run: `npm run test:forms`
Expected: PASS.

**Step 5: Commit**

Commit message: `Support career application delivery`.

### Task 2: Build the careers API route

**Files:**
- Create: `app/api/careers/route.ts`
- Create: `app/api/careers/route.test.ts`
- Modify: `package.json`

**Step 1: Write failing route tests**

Cover valid multipart delivery, missing careers configuration, non-string or
missing required fields, honeypot filtering, resume size/type rejection, and
acknowledgement validation.

**Step 2: Run tests to verify they fail**

Run: `npm run test:forms`
Expected: FAIL because `/api/careers` does not exist.

**Step 3: Implement the route**

Parse `request.formData()`, validate the application, convert an accepted resume
to a Buffer attachment, and invoke `deliverLead` with
`CAREERS_NOTIFICATION_EMAIL` and webhook delivery disabled. Return `200`, `400`,
`413`, `415`, `502`, or `503` as appropriate.

**Step 4: Run tests to verify they pass**

Run: `npm run test:forms`
Expected: PASS.

**Step 5: Commit**

Commit message: `Add careers application endpoint`.

### Task 3: Build the application page

**Files:**
- Create: `app/careers/page.tsx`
- Create: `components/careers-application-form.tsx`
- Modify: `components/shared-header.tsx`
- Modify: `scripts/check-header-navigation.mjs`

**Step 1: Extend the navigation regression test**

Add `/careers` to the tested routes and assert desktop/mobile `Careers` links
target `/careers`.

**Step 2: Run the test to verify it fails**

Run: `npm run test:navigation`
Expected: FAIL because the page and navigation link do not exist.

**Step 3: Implement the page and form**

Add page metadata, the compact application hero, the responsive multipart form,
file constraints, honeypot, persistent submission ID, loading state, accessible
error message, and inline success confirmation. Add `Careers` to both shared
navigation variants.

**Step 4: Run focused verification**

Run: `npm run test:navigation && npx tsc --noEmit`
Expected: PASS.

**Step 5: Commit**

Commit message: `Build general application page`.

### Task 4: Document configuration and protect the endpoint

**Files:**
- Modify: `README.md`
- Modify: `env.example.txt`

**Step 1: Document the environment variable**

Add `CAREERS_NOTIFICATION_EMAIL` and resume limits to the environment and forms
documentation.

**Step 2: Expand the Vercel WAF rule**

Update the existing rule path from `^/api/(contact|recycle)$` to
`^/api/(contact|recycle|careers)$`, retaining five requests per IP per ten
minutes.

**Step 3: Verify the active rule**

Read the active Vercel firewall configuration and confirm the rule is valid.

**Step 4: Commit**

Commit message: `Document careers application setup`.

### Task 5: Final verification

**Files:**
- Verify all changed files

**Step 1: Run automated verification**

Run:

```bash
npm run test:forms
npm run test:navigation
npx tsc --noEmit
npm run build
git diff --check
```

Expected: all commands exit successfully.

**Step 2: Run browser verification**

Check `/careers` at desktop and mobile widths, required-field behavior, invalid
file feedback, missing-configuration feedback, keyboard navigation, and header
links. Confirm there is no framework error overlay.

**Step 3: Review the branch**

Review the final diff against `main` and address actionable findings before
integration.
