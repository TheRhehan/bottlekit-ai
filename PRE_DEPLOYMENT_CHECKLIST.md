# Pre-Deployment Checklist

Use this checklist before deploying to production.

---

## Code Implementation (✅ All Done)

- [x] Marketing page "Go to Kit" CTA implemented
- [x] `/kit` route created with auth protection
- [x] Login redirect back to `/kit` working
- [x] Paywall UI displays correctly for unpaid users
- [x] Kit display UI for paid users
- [x] `/api/entitlement` endpoint created
- [x] `/api/kits` endpoint created
- [x] Stripe webhook handler created
- [x] Webhook syncs both `entitlements` and `profiles` tables
- [x] Build passes: `npm run build` ✅
- [x] No syntax errors or warnings
- [x] All dependencies installed

---

## Database Setup (⏳ Required)

### Pre-Check
- [ ] Access to Supabase dashboard
- [ ] Permission to run SQL queries

### Setup Tasks
- [ ] Open [DATABASE_SCHEMA.sql](DATABASE_SCHEMA.sql)
- [ ] Copy entire SQL content
- [ ] Go to Supabase → SQL Editor → New Query
- [ ] Paste and execute the SQL
- [ ] Verify `entitlements` table created
- [ ] Verify `profiles.paid` column exists
- [ ] Verify UNIQUE constraint on `entitlements.email`

### Verification Queries
```sql
-- Check entitlements table
SELECT * FROM information_schema.columns 
WHERE table_name = 'entitlements';

-- Check profiles.paid column
SELECT * FROM information_schema.columns 
WHERE table_name = 'profiles' AND column_name = 'paid';

-- Check unique constraint
SELECT constraint_name FROM information_schema.table_constraints 
WHERE table_name = 'entitlements' AND constraint_type = 'UNIQUE';
```

---

## Vercel Environment Variables (⏳ Required)

### Pre-Check
- [ ] Access to Vercel dashboard
- [ ] Permission to manage environment variables
- [ ] All credential values ready (see table below)

### Variable Setup

| Variable Name | Value Source | Obtain From |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Ready | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Ready | Supabase → Settings → API → anon public |
| `SUPABASE_URL` | ✅ Ready | Same as `NEXT_PUBLIC_SUPABASE_URL` |
| `SUPABASE_SERVICE_ROLE_KEY` | ⏳ Get | Supabase → Settings → API → Service role secret |
| `STRIPE_SECRET_KEY` | ⏳ Get | Stripe → Developers → API Keys → Secret Key |
| `STRIPE_WEBHOOK_SECRET` | ⏳ Get | Follow Stripe setup below |
| `NEXT_PUBLIC_SHEET_JSON_URL` | ⏳ Get | Follow Google Sheets setup below |

### Setup Steps
1. [ ] Go to Vercel Dashboard → BottleKit project
2. [ ] Click **Settings** → **Environment Variables**
3. [ ] For each variable in the table above:
   - [ ] Click **Add New**
   - [ ] Enter variable name exactly as shown
   - [ ] Enter value from source
   - [ ] Set Environment to: `Production`, `Preview`, `Development`
   - [ ] Click **Save**
4. [ ] Verify all 7 variables are listed
5. [ ] Trigger redeploy if needed

---

## Stripe Configuration (⏳ Required)

### Pre-Check
- [ ] Access to Stripe dashboard (production or test mode)
- [ ] Admin or developer permissions

### Part 1: API Keys

- [ ] Go to [Stripe Dashboard](https://dashboard.stripe.com)
- [ ] Click **Developers** (left sidebar)
- [ ] Click **API Keys**
- [ ] Copy **Secret Key** (starts with `sk_live_` or `sk_test_`)
- [ ] Add to Vercel as `STRIPE_SECRET_KEY`

### Part 2: Webhook Endpoint

1. [ ] In Stripe Dashboard, go to **Developers** → **Webhooks**
2. [ ] Click **+ Add endpoint**
3. [ ] **Endpoint URL**: `https://your-vercel-domain.com/api/webhooks/stripe`
   - [ ] Replace `your-vercel-domain.com` with your actual domain
4. [ ] **Events to send** — Select these checkboxes:
   - [ ] `checkout.session.completed`
   - [ ] `customer.subscription.deleted`
   - [ ] `charge.refunded`
5. [ ] Click **Add endpoint**
6. [ ] On the endpoint detail page:
   - [ ] Reveal **Signing secret** (click eye icon)
   - [ ] Copy the secret (starts with `whsec_`)
   - [ ] Add to Vercel as `STRIPE_WEBHOOK_SECRET`

### Part 3: Verify Payment Links

1. [ ] In Stripe Dashboard, go to **Products** → **Payment Links**
2. [ ] For **KIT** payment link (used by `/kit` page):
   - [ ] Click to view details
   - [ ] Verify **Success URL** = `https://your-domain.com/success`
   - [ ] Verify **Cancel URL** = `https://your-domain.com/cancel`
   - [ ] Verify **Collect email** is enabled (default)
   - [ ] Note the payment link URL (should match `KIT_STRIPE_CHECKOUT_URL` in code)
3. [ ] For **DASHBOARD** payment link (used by other pages):
   - [ ] Click to view details
   - [ ] Verify URLs are correct
   - [ ] Note the payment link URL (should match `STRIPE_URL` in code)

### Part 4: Test Webhook Delivery

After deploying, test webhook delivery:
1. [ ] In Stripe Dashboard, go to **Webhooks** → Your endpoint
2. [ ] Click **Send test webhook**
3. [ ] Select event type: `checkout.session.completed`
4. [ ] Click **Send test event**
5. [ ] Check response code (should be 200)
6. [ ] Repeat for other event types

---

## Google Sheets Configuration (⏳ Required)

### Pre-Check
- [ ] Have a Google Drive account
- [ ] Permission to create/share sheets

### Setup Steps

1. [ ] Create a new Google Sheet with columns:
   - [ ] `title` (kit name)
   - [ ] `desc` (short description)
   - [ ] `href` (external link URL)

2. [ ] Add sample kit rows:
   ```
   title        | desc                        | href
   Widget Auto  | Automate widget creation    | https://zapier.com/...
   Email Flow   | Email workflow automation   | https://zapier.com/...
   ```

3. [ ] Share the sheet:
   - [ ] Click **Share** (top right)
   - [ ] Click **Change to anyone with link**
   - [ ] Set permission to **Viewer**
   - [ ] Copy the link (you'll use this in step 5)

4. [ ] Publish the sheet:
   - [ ] Go to **File** → **Publish to the web**
   - [ ] Select your sheet tab
   - [ ] Select format: **JSON** or **CSV**
   - [ ] Click **Publish**
   - [ ] Copy the public URL

5. [ ] Set the URL in Vercel:
   - [ ] In Vercel environment variables
   - [ ] Add `NEXT_PUBLIC_SHEET_JSON_URL` = your public sheet URL
   - [ ] Example format: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/gviz?tqx=out:json`

### Verification

Test the API locally:
```bash
# In your project directory
npm run dev

# In another terminal, test the API
curl http://localhost:3000/api/kits
```

Should return:
```json
{
  "items": [
    {
      "id": "1",
      "title": "Widget Auto",
      "desc": "Automate widget creation",
      "href": "https://zapier.com/...",
      "type": "",
      "sort": 0,
      "group": ""
    }
  ]
}
```

---

## Pre-Deployment Testing (✅ Recommended)

### Local Testing

```bash
# 1. Create .env.local with test credentials
cp .env.example .env.local
# Edit .env.local with real values (or use existing)

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

# 4. Test in browser
# - Visit http://localhost:3000
# - Click "Go to Kit"
# - Should redirect to login if not authed
# - Sign in, then revisit /kit
# - Should show paywall (if unpaid) or kits (if paid)
```

### Manual Flow Testing

| Scenario | Expected | Status |
|----------|----------|--------|
| Unauth user visits `/kit` | Redirect to `/login?redirect=/kit` | [ ] Pass |
| Auth user (unpaid) visits `/kit` | Show paywall with "Unlock Access" | [ ] Pass |
| Click "Unlock Access" | Redirect to Stripe Payment Link | [ ] Pass |
| Complete payment | Success page shown | [ ] Pass |
| Revisit `/kit` after payment | Show "Your Automation Kits" | [ ] Pass |
| Click kit link | Opens in new tab ✓ | [ ] Pass |

---

## Production Deployment (✅ Ready When Above Complete)

- [ ] All database tables created
- [ ] All Vercel environment variables set
- [ ] Stripe webhook configured
- [ ] Google Sheets published and URL set
- [ ] Local testing passed
- [ ] No errors in `npm run build`

### Deployment Steps

```bash
# 1. Commit all changes
git add .
git commit -m "feat: kit access feature complete"

# 2. Push to main branch
git push origin main

# 3. Vercel auto-deploys
# Monitor deployment in Vercel Dashboard

# 4. Wait for build to complete (~2-3 minutes)

# 5. Test in production
# Visit https://yourdomain.com/kit
# Run through all flow tests above
```

---

## Post-Deployment Monitoring (✅ Do This)

### First 24 Hours

- [ ] Monitor Stripe webhook in Dashboard → Webhooks → Endpoint → Recent Events
- [ ] Check Vercel Function logs for errors
- [ ] Test a real payment (if test mode, use test card: 4242 4242 4242 4242)
- [ ] Verify database updates in Supabase after payment

### First Week

- [ ] Monitor webhook success rate (should be >95%)
- [ ] Monitor error logs for any issues
- [ ] Test cancellation flow
- [ ] Test refund flow
- [ ] Ensure no 500 errors in production

### Ongoing

- [ ] Weekly check of webhook delivery status
- [ ] Monthly review of payment data
- [ ] Alert on webhook failures (configure in Stripe)

---

## Troubleshooting Quick Reference

| Issue | Likely Cause | Solution |
|-------|---|---|
| Webhook returns 400 | Wrong `STRIPE_WEBHOOK_SECRET` | Verify in Stripe Dashboard |
| Paid users see paywall | `SUPABASE_SERVICE_ROLE_KEY` missing | Check Vercel env vars |
| No kits show | `NEXT_PUBLIC_SHEET_JSON_URL` missing or wrong | Check Google Sheets export URL |
| Build fails | Missing dependency or syntax error | Run `npm run build` locally |
| "Database error" | Table doesn't exist | Run DATABASE_SCHEMA.sql |
| Webhook not delivering | Endpoint URL wrong | Check Stripe Dashboard → Webhooks |

---

## Success Criteria

Feature is **100% successful** when:

1. ✅ All database tables exist
2. ✅ All Vercel env vars set
3. ✅ Stripe webhook configured and delivering
4. ✅ Google Sheets URL working
5. ✅ Unauth flow works (login redirect)
6. ✅ Unpaid flow works (paywall shows)
7. ✅ Payment flow works (webhook updates DB)
8. ✅ Paid access works (kits show)
9. ✅ Cancellation works (paywall re-appears)
10. ✅ No errors in Vercel logs or Stripe

---

## Sign-Off

- [ ] I have completed all checklist items above
- [ ] All tests have passed
- [ ] I am ready to deploy to production

---

**Date Completed**: _______________  
**Completed By**: _______________  
**Notes**: _______________

---

*Checklist version: 1.0*  
*Updated: February 3, 2026*
