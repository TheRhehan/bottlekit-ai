# Kit Access Integration — Checkpoints vs Client Requirements

This document compares the **client requirements** (Milestone 1: Kit Access UI + Routing, Milestone 2: Paywall + Paid Access) against the **current codebase**. It lists what is **done**, what is **remaining**, and what to **verify**. No existing implementations are overwritten; only gaps and follow-ups are called out.

---

## Milestone 1 — Kit Access Integration (UI + Routing)

### 1.1 Marketing page + “Go to Kit” CTA

| Checkpoint | Status | Notes |
|------------|--------|-------|
| “Go to Kit” CTA on marketing page | ✅ **DONE** | `app/page.js`: `<Link href="/kit">Go to Kit</Link>` next to “Get started” |
| CTA visible and clickable | ✅ **DONE** | Styled as secondary button, routes to `/kit` |
| Clicking “Go to Kit” routes to `/kit` | ✅ **DONE** | Uses Next.js `Link` to `/kit` |

### 1.2 `/kit` route and protection

| Checkpoint | Status | Notes |
|------------|--------|-------|
| `/kit` route exists | ✅ **DONE** | `app/kit/page.js` |
| `/kit` loads | ✅ **DONE** | Client component with loading state then content |
| `/kit` is a protected route | ✅ **DONE** | In-page check via `supabase.auth.getUser()` |
| Not logged in → redirect to login | ✅ **DONE** | `router.replace('/login?redirect=/kit')` when no user |
| Logged in → render kit page layout | ✅ **DONE** | Layout with “Back to home”, then paywall or kit content |
| Placeholder / kit content per M1+M2 | ✅ **DONE** | M2 replaces placeholder with real kit links; current implementation shows paywall vs kits |

### 1.3 “Bookmark” message (M1)

| Checkpoint | Status | Notes |
|------------|--------|-------|
| M1: “Message instructing users to bookmark the page” | ⚠️ **N/A per M2** | M2 explicitly: “No mention of bookmarking or permanent access” for kit display. Current `/kit` has no bookmark copy ✅ |

### 1.4 Auth protection and deployment

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Logged-out users cannot access `/kit` | ✅ **DONE** | Redirect to `/login?redirect=/kit` before any kit content |
| Code in existing GitHub repo | ✅ **DONE** | All work in this repo |
| Vercel build passes | ⏳ **VERIFY** | Run `npm run build` (uses `next build --turbopack`) and ensure no errors |
| Deployment succeeds on Vercel | ⏳ **VERIFY** | Push to connected branch and confirm deploy succeeds |

---

## Milestone 2 — Paywall + Paid Access Logic

### 2.1 Logged-out user

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Redirect to login | ✅ **DONE** | `/kit` → `/login?redirect=/kit` |
| After login, return to `/kit` | ✅ **DONE** | `app/login/page.js` uses `redirect` query param; `window.location.href = redirect` after sign-in |

### 2.2 Unpaid user (logged in, no access)

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Locked state on `/kit` | ✅ **DONE** | When `!paid`, paywall block is shown |
| “Access Required” | ✅ **DONE** | `app/kit/page.js`: `<h1>Access Required</h1>` |
| “You need an active purchase to access the automation kits.” | ✅ **DONE** | Present in same block |
| “Unlock Access” CTA | ✅ **DONE** | `<a href={KIT_STRIPE_CHECKOUT_URL}>Unlock Access</a>` |
| CTA routes to checkout | ✅ **DONE** | `KIT_STRIPE_CHECKOUT_URL` → Stripe Payment Link (`lib/consts.js`) |

### 2.3 Paid user (access granted)

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Display all automation kits on `/kit` | ✅ **DONE** | When `paid`, fetches `/api/kits` and renders `kits.map(...)` |
| “Your Automation Kits” | ✅ **DONE** | Heading on `/kit` |
| “Your BottleKit automation kits are available below.” | ✅ **DONE** | Subheading |
| Each kit: title | ✅ **DONE** | `kit.title` |
| Each kit: short description | ✅ **DONE** | `kit.desc` |
| Each kit: external link, opens in new tab | ✅ **DONE** | `<a href={kit.href} target="_blank" rel="noopener noreferrer">` |
| No mention of bookmarking / permanent access | ✅ **DONE** | No such copy on `/kit` |

### 2.4 Paywall logic and Stripe

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Conditionally render by access | ✅ **DONE** | `paid` from `profiles.paid` drives paywall vs kits |
| Integrate with existing Stripe flow | ✅ **DONE** | Uses `KIT_STRIPE_CHECKOUT_URL` for `/kit`; dashboard uses `STRIPE_URL` |
| Store access state | ⚠️ **GAP** | See **2.7** |
| Check access state | ✅ **DONE** | `/kit` reads `profiles.paid` via Supabase |

### 2.5 Acceptance criteria (behavior)

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Logged-in + unpaid cannot access links | ✅ **DONE** | Links only rendered when `paid`; unpaid sees paywall |
| Logged-in + paid sees all links | ✅ **DONE** | When `paid`, kits from `/api/kits` are shown |
| Cancelled/unpaid lose access on next visit | ❌ **REMAINING** | See **2.8** |
| Site remains live and stable | ⏳ **VERIFY** | After addressing gaps, re-test and confirm deploys |

### 2.6 Kits API and config

| Checkpoint | Status | Notes |
|------------|--------|-------|
| `/api/kits` exists and returns kit list | ✅ **DONE** | `app/api/kits/route.js` fetches from Google Sheet (gviz JSON or CSV) |
| Kit links used only by paid users (UI) | ✅ **DONE** | `/kit` fetches `/api/kits` only when `paid` |
| `NEXT_PUBLIC_SHEET_JSON_URL` set | ⏳ **VERIFY** | Required for `/api/kits`. If missing, API 500s and paid users see “No kits available yet.” |

### 2.7 **CRITICAL — `profiles.paid` vs `entitlements`**

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Sync paid status into source used by `/kit` | ❌ **REMAINING** | **Gap:** Stripe webhook updates `entitlements` (email → `is_paid`) only. `/kit` and dashboard use `profiles.paid` (user id). Nothing updates `profiles.paid`. Paid users will not see kits until this is fixed. |
| **Required fix (choose one):** | | |
| **(A)** Webhook also updates `profiles` | ❌ **REMAINING** | On `checkout.session.completed`, resolve user by `customer_details.email` (e.g. via `auth.admin.listUsers()` or a `profiles` lookup by email), then `update profiles set paid = true` for that user. |
| **(B)** `/kit` (and dashboard) use entitlement API | ❌ **REMAINING** | Replace `profiles.paid` check with `GET /api/entitlement?email=...` using current user’s email. Keep webhook writing only to `entitlements`. |

Until one of (A) or (B) is done, “paid” state never reaches the UI that gates kit access.

### 2.8 **Cancelled / unpaid users lose access**

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Revoke access when subscription cancelled or payment fails | ❌ **REMAINING** | Webhook only handles `checkout.session.completed` (sets paid). No handling for e.g. `customer.subscription.deleted`, `invoice.payment_failed`, or similar. |
| **Required change:** | | Add webhook handlers for subscription cancelled / payment failed and set `is_paid = false` in `entitlements` (and if using (A), also `paid = false` in `profiles` for that user). |

### 2.9 Access persists across sessions

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Access persists across sessions | ⚠️ **BLOCKED** | Intended via DB (`profiles` or `entitlements`). Currently broken until **2.7** is fixed. Success page sets `localStorage` (`PAID_KEY`) only; `/kit` does not use it. |

### 2.10 Stripe Payment Links (config outside repo)

| Checkpoint | Status | Notes |
|------------|--------|-------|
| `KIT_STRIPE_CHECKOUT_URL` success URL | ⏳ **VERIFY** | In Stripe Dashboard, confirm Payment Link points success URL to e.g. `/success` (or desired post-checkout page). |
| `KIT_STRIPE_CHECKOUT_URL` cancel URL | ⏳ **VERIFY** | Confirm cancel URL (e.g. `/cancel` or `/kit`) as required. |
| Webhook endpoint | ⏳ **VERIFY** | Stripe webhook target `.../api/webhooks/stripe`; ensure `STRIPE_WEBHOOK_SECRET` and `STRIPE_SECRET_KEY` are set in Vercel env. |

### 2.11 Optional hardening (not required by spec)

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Auth on `/api/kits` | Optional | API is currently unauthenticated. Only paid users hit it from `/kit` UI. Adding auth (e.g. require logged-in user + paid) would harden against direct API access. |
| `profiles` creation on signup | ⏳ **VERIFY** | If `/kit` keeps using `profiles.paid`, ensure `profiles` rows exist (e.g. Supabase trigger on `auth.users` insert). Otherwise `profile` lookup can miss. |

---

## Technical constraints (client)

| Checkpoint | Status | Notes |
|------------|--------|-------|
| Use existing Next.js app | ✅ **DONE** | |
| Use existing Vercel project | ✅ **DONE** | |
| No new repos | ✅ **DONE** | |
| No new Vercel deployments | ✅ **DONE** | |
| No Zapier credentials (links only) | ✅ **DONE** | Kits are external links; no Zapier config in app |
| No redesign outside `/kit` | ✅ **DONE** | Marketing, dashboard, login, etc. unchanged |
| No backend refactors unrelated to this feature | ✅ **DONE** | Only kit access–related logic touched |

---

## Definition of done

| Checkpoint | Status | Notes |
|------------|--------|-------|
| `/kit` exists, gated by login + payment | ✅ **DONE** (logic) / ⚠️ **BLOCKED** (paid) | Gate implemented; paid state not persisted until **2.7** fixed |
| Marketing page links correctly to `/kit` | ✅ **DONE** | |
| Paywall behaves correctly | ✅ **DONE** | Copy and CTAs match spec |
| Build passes on Vercel | ⏳ **VERIFY** | `npm run build` |
| Feature live on production | ⏳ **VERIFY** | After **2.7**, **2.8**, and config checks |

---

## Summary — REMAINING (must-do)

1. **Fix paid-status sync (2.7)**  
   Either update `profiles.paid` from the webhook (option A) or switch `/kit` (and dashboard) to entitlement API (option B). Otherwise paid users never get access.

2. **Handle cancellation / payment failure (2.8)**  
   Add webhook handlers to set `is_paid` (and `paid` if using profiles) to `false` when subscription is cancelled or payment fails.

3. **Verify**  
   - `npm run build` and Vercel deploy  
   - `NEXT_PUBLIC_SHEET_JSON_URL` and Stripe env vars  
   - Stripe Payment Link success/cancel URLs  
   - `profiles` creation on signup if still using `profiles.paid`

---

## Summary — DONE (do not overwrite)

- Marketing “Go to Kit” CTA → `/kit`
- `/kit` route, layout, and auth redirect to `/login?redirect=/kit`
- Login redirect back to `/kit` after sign-in
- Paywall: “Access Required”, “You need an active purchase…”, “Unlock Access” → `KIT_STRIPE_CHECKOUT_URL`
- Paid view: “Your Automation Kits”, “Your BottleKit automation kits are available below.”, kit cards with title, description, external link (new tab), no bookmark mention
- `/api/kits`, Stripe webhook (`checkout.session.completed` → `entitlements`), entitlement API
- Use of existing Stripe Payment Links and existing app structure

---

*Generated from codebase review. No existing code was modified.*

---

## Implementation log (remaining checkpoints)

The following was implemented to complete the remaining checkpoints:

### 2.7 Paid-status sync (option B — entitlement API)

- **`/kit`** and **dashboard** now use `GET /api/entitlement?email=...` with the logged-in user’s email instead of `profiles.paid`. Access is derived from `entitlements.is_paid` (updated by Stripe webhook).
- **`app/api/entitlement/route.js`**: Supabase client is lazy-initialized at request time (no top-level `createClient`) so the build succeeds when env vars are missing.

### 2.8 Cancellation / refund → revoke access

- **`app/api/webhooks/stripe/route.js`**:
  - **`customer.subscription.deleted`**: Resolves customer email via `stripe.customers.retrieve`, then `entitlements.update({ is_paid: false })` for that email.
  - **`charge.refunded`**: Uses `billing_details.email` or `receipt_email`, else fetches customer by id; then revokes access for that email.
- **`revokeAccessByEmail`** helper updates `entitlements` by email. **`getEmailFromCustomerId`** fetches Stripe customer for subscription/charge flows.
- Stripe and Supabase clients are lazy-initialized in the webhook handler to avoid build-time env requirements.
- **`checkout.session.completed`** upsert now uses `onConflict: 'email'` (ensure `entitlements` has a unique constraint on `email`).

### Build and misc

- **`app/login/page.js`**: `useSearchParams` wrapped in `<Suspense>` (Next.js static generation requirement).
- **Build**: `npm run build` passes.

### Still to verify (config / deploy)

- Set `NEXT_PUBLIC_SHEET_JSON_URL` so `/api/kits` returns kit links.
- Configure Stripe Payment Link success/cancel URLs and webhook for `.../api/webhooks/stripe`.
- Ensure `entitlements` has a **UNIQUE** constraint on `email` for upsert `onConflict: 'email'`.
