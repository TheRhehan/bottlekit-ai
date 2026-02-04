# BottleKit Kit Access — Setup & Deployment Checklist

> **Status**: Feature complete. This guide covers environment configuration, database setup, and Stripe/Supabase verification before production deployment.

---

## 1. Environment Variables Setup

### Required Variables

All variables must be set in **Vercel Project Settings** → **Environment Variables** or in `.env.local` for local development.

| Variable | Type | Required | Source | Notes |
|----------|------|----------|--------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | ✅ | Supabase | Your Supabase project URL (visible in browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | ✅ | Supabase | Supabase anonymous key (exposed to browser) |
| `SUPABASE_URL` | Private | ✅ | Supabase | Same as `NEXT_PUBLIC_SUPABASE_URL` (used server-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Private | ✅ | Supabase | **Server-only secret** — Do NOT expose. Use `Settings` → `API` in Supabase dashboard |
| `STRIPE_SECRET_KEY` | Private | ✅ | Stripe | **Server-only secret** — From Stripe Dashboard (Developers section) |
| `STRIPE_WEBHOOK_SECRET` | Private | ✅ | Stripe | From Stripe Webhook endpoint settings (see section 2.4 below) |
| `NEXT_PUBLIC_SHEET_JSON_URL` | Public | ✅ | Google Sheets | Public export URL of your kits spreadsheet (JSON or CSV) |

### Example `.env.local` (for local development)

```dotenv
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_URL=https://[your-project].supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (test keys for development)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Kits feed
NEXT_PUBLIC_SHEET_JSON_URL=https://docs.google.com/spreadsheets/d/[SHEET_ID]/gviz?tqx=out:json
```

---

## 2. Stripe Configuration

### 2.1 Stripe Secret Key

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Developers** (left sidebar) → **API Keys**
3. Copy the **Secret Key** (starts with `sk_live_` for production or `sk_test_` for testing)
4. Add to Vercel environment variables as `STRIPE_SECRET_KEY`

### 2.2 Webhook Signing Secret

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **+ Add endpoint**
3. **Endpoint URL**: `https://[your-vercel-domain]/api/webhooks/stripe`
4. **Events to send**: Select these event types:
   - `checkout.session.completed` (payment success)
   - `customer.subscription.deleted` (subscription cancelled)
   - `charge.refunded` (refund issued)
5. Click **Add endpoint**
6. On the endpoint detail page, reveal the **Signing secret** (starts with `whsec_`)
7. Copy and add to Vercel as `STRIPE_WEBHOOK_SECRET`

### 2.3 Payment Link Configuration

Two Stripe Payment Links are used: one for general dashboard (`STRIPE_URL`) and one for kits (`KIT_STRIPE_CHECKOUT_URL`).

Both are already configured in [lib/consts.js](lib/consts.js). Verify in Stripe Dashboard:

1. Go to **Products** → **Payment Links**
2. For each payment link, click to view details:
   - **Success URL**: Should redirect to your `/success` page (e.g., `https://yourdomain.com/success`)
   - **Cancel URL**: Should redirect to `/cancel` or `/kit` (e.g., `https://yourdomain.com/cancel`)
3. Ensure customer email is captured (usually enabled by default)

### 2.4 Testing Stripe Locally

To test webhook locally with `npm run dev`:

```bash
# Install Stripe CLI (https://stripe.com/docs/stripe-cli)
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the signing secret from the CLI output and use it as `STRIPE_WEBHOOK_SECRET` in `.env.local`.

---

## 3. Supabase Configuration

### 3.1 Find Your Credentials

1. Go to [Supabase Dashboard](https://supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. You'll see:
   - **Project URL** → Copy to `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_URL`
   - **anon public** → Copy to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service role secret** → Copy to `SUPABASE_SERVICE_ROLE_KEY` (keep private!)

### 3.2 Database Schema Setup

Run the SQL statements in [DATABASE_SCHEMA.sql](DATABASE_SCHEMA.sql):

1. In Supabase, go to **SQL Editor**
2. Click **+ New Query**
3. Copy and paste the SQL from `DATABASE_SCHEMA.sql`
4. Click **Run** to execute

This creates/updates:
- `profiles` table with `paid` column (if not exists)
- `entitlements` table with email-based tracking
- Indexes and RLS policies

### 3.3 Verify Schema

After running the SQL, verify the tables exist:

```bash
# In Supabase SQL Editor, run:
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('profiles', 'entitlements');
```

Should return both `profiles` and `entitlements`.

---

## 4. Google Sheets Setup (Kits Feed)

The `/api/kits` endpoint fetches automation kit links from a public Google Sheet.

### 4.1 Create the Sheet

1. Create a new Google Sheet with these columns:
   - `title` (kit name)
   - `desc` (short description)
   - `href` (external link to automation)

Example rows:
```
title             | desc                      | href
Widget Builder    | Create custom widgets     | https://zapier.com/...
Email Automator   | Automate email workflows  | https://zapier.com/...
```

### 4.2 Publish the Sheet

1. In Google Sheets, go to **File** → **Share** → **Publish to the web**
2. Select the sheet tab and export format (choose **CSV** or **JSON** for best compatibility)
3. Copy the public URL (will look like):
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/gviz?tqx=out:json
   ```
4. Add to Vercel as `NEXT_PUBLIC_SHEET_JSON_URL`

### 4.3 Test the Kits API

Once `NEXT_PUBLIC_SHEET_JSON_URL` is set, test locally:

```bash
curl http://localhost:3000/api/kits
```

Should return:
```json
{
  "items": [
    {
      "id": "1",
      "title": "Widget Builder",
      "desc": "Create custom widgets",
      "href": "https://zapier.com/..."
    }
  ]
}
```

---

## 5. Deployment to Vercel

### 5.1 Add Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your BottleKit project
3. Go to **Settings** → **Environment Variables**
4. Add all variables from Section 1:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_SHEET_JSON_URL`

**Important**: Set **Environment** to `Production`, `Preview`, and `Development` as needed.

### 5.2 Deploy

```bash
git add .
git commit -m "feat: kit access implementation complete"
git push origin main
```

Vercel will automatically deploy. Watch the deployment progress in the dashboard.

### 5.3 Verify Deployment

1. Once deployed, visit your site at `https://yourdomain.com/kit`
2. **Unpaid user**: Should see "Access Required" paywall
3. **Paid user**: Should see "Your Automation Kits" with kit links
4. Click "Unlock Access" → should redirect to Stripe Payment Link
5. After payment → webhook should update both `entitlements` and `profiles` tables

---

## 6. Testing Checklist

### 6.1 Local Testing

```bash
# Install dependencies
npm install

# Set up .env.local with test credentials
cp .env.example .env.local
# Edit .env.local with real values

# Run dev server
npm run dev

# Test in browser
# - Visit http://localhost:3000
# - Click "Go to Kit" → should redirect to /login if not logged in
# - Sign up, then revisit /kit → should show paywall (unpaid)
# - Complete payment in Stripe → should see kits (if NEXT_PUBLIC_SHEET_JSON_URL is set)
```

### 6.2 Production Testing (After Deploy)

| Scenario | Expected Behavior | Status |
|----------|-------------------|--------|
| Logged out, visit `/kit` | Redirect to `/login?redirect=/kit` | ⏳ Verify |
| Logged in, unpaid, visit `/kit` | Show paywall with "Unlock Access" button | ⏳ Verify |
| Click "Unlock Access" | Redirect to Stripe Payment Link | ⏳ Verify |
| Complete payment | Success page shown, `entitlements.is_paid` set to `true`, `profiles.paid` set to `true` | ⏳ Verify |
| Revisit `/kit` after payment | Show "Your Automation Kits" with links | ⏳ Verify |
| Cancel subscription in Stripe | Next visit to `/kit` shows paywall again | ⏳ Verify |

---

## 7. Common Issues & Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| **Webhook returns 400** | Incorrect `STRIPE_WEBHOOK_SECRET` | Check Stripe Dashboard → Webhooks for correct signing secret |
| **Paid users see paywall** | `SUPABASE_SERVICE_ROLE_KEY` missing or empty | Add to Vercel env vars |
| **No kits show** | `NEXT_PUBLIC_SHEET_JSON_URL` missing | Add Google Sheets public export URL to env vars |
| **Build fails** | Missing package or syntax error | Run `npm run build` locally to debug |
| **"Database error" on `/kit`** | Missing `profiles` or `entitlements` table | Run [DATABASE_SCHEMA.sql](DATABASE_SCHEMA.sql) in Supabase |

---

## 8. Security Checklist

- ✅ `STRIPE_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are **server-only** (no `NEXT_PUBLIC_` prefix)
- ✅ These secrets are NOT in `.env.local` committed to git (`.env.local` is `.gitignore`d)
- ✅ Webhook signature is verified before processing (`stripe.webhooks.constructEvent`)
- ✅ `/api/kits` is called only when user is already authenticated and paid (client-side logic)
- ✅ Stripe Payment Link handles card processing securely (PCI-DSS compliant)

---

## 9. Next Steps

After deploying:

1. **Monitor webhook deliveries** in Stripe Dashboard → Webhooks → Endpoint details
2. **Check logs** in Vercel → Function logs for any errors
3. **Verify database** — Run queries in Supabase SQL Editor to confirm:
   - `SELECT * FROM entitlements` (should have entries after payments)
   - `SELECT * FROM profiles WHERE paid = true` (should show paid users)
4. **Test cancellation** — In Stripe Dashboard, manually cancel a subscription to trigger the webhook

---

## 10. Reference Documentation

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Database](https://supabase.com/docs/guides/database)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe Payment Links](https://stripe.com/docs/payments/payment-links)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

*Last updated: February 3, 2026*
