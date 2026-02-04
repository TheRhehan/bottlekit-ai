# Quick Reference — Kit Access Feature

**TL;DR**: All code is implemented and tested. Follow these 3 steps to deploy.

---

## 3-Step Deployment Checklist

### Step 1: Configure Database (5 minutes)

1. Go to [Supabase Dashboard](https://supabase.com) → your BottleKit project
2. Navigate to **SQL Editor**
3. Copy all SQL from [DATABASE_SCHEMA.sql](DATABASE_SCHEMA.sql)
4. Paste into a new SQL query
5. Click **Run**

**What it does**: Creates `entitlements` table and adds `paid` column to `profiles`.

---

### Step 2: Set Environment Variables in Vercel (5 minutes)

1. Go to [Vercel Dashboard](https://vercel.com) → BottleKit project
2. Click **Settings** → **Environment Variables**
3. Add these 7 variables (get values from sources below):

| Variable | Source |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon public |
| `SUPABASE_URL` | Same as `NEXT_PUBLIC_SUPABASE_URL` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → Service role secret |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys → Secret Key |
| `STRIPE_WEBHOOK_SECRET` | Follow Step 3 below |
| `NEXT_PUBLIC_SHEET_JSON_URL` | Your Google Sheets export URL |

---

### Step 3: Configure Stripe Webhook (10 minutes)

#### 3a. Create Webhook Endpoint

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Developers** (left sidebar) → **Webhooks**
3. Click **+ Add endpoint**
4. **Endpoint URL**: `https://your-vercel-domain.com/api/webhooks/stripe`
5. **Events to send** — Select these:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `charge.refunded`
6. Click **Add endpoint**

#### 3b. Get Signing Secret

1. On the endpoint detail page, click to reveal **Signing secret**
2. Copy the secret (starts with `whsec_`)
3. Add to Vercel as `STRIPE_WEBHOOK_SECRET`

#### 3c. Verify Payment Links

1. In Stripe Dashboard, go to **Products** → **Payment Links**
2. Click each of the two payment links (for kits + dashboard)
3. Verify:
   - **Success URL**: `https://your-vercel-domain.com/success`
   - **Cancel URL**: `https://your-vercel-domain.com/cancel`
4. Ensure **Collect email** is enabled (default)

---

## Quick Verification

After deploying, test these flows:

### Flow 1: Unauth User
```
Visit https://your-domain.com/kit
→ Redirects to /login?redirect=/kit ✓
```

### Flow 2: Auth User (No Payment)
```
Sign in → Visit /kit
→ Shows "Access Required" paywall ✓
→ Click "Unlock Access"
→ Redirected to Stripe Payment Link ✓
```

### Flow 3: After Payment
```
Complete payment in Stripe
→ Redirected to /success ✓
→ Revisit /kit
→ Shows "Your Automation Kits" with kit links ✓
```

### Flow 4: After Cancellation
```
Cancel subscription in Stripe Dashboard
→ Webhook triggers
→ Visit /kit (next time)
→ Shows paywall again ✓
```

---

## File Reference

| File | Purpose |
|------|---------|
| [DATABASE_SCHEMA.sql](DATABASE_SCHEMA.sql) | SQL to set up database tables |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Detailed deployment guide |
| [WEBHOOK_REFERENCE.md](WEBHOOK_REFERENCE.md) | Webhook technical details |
| [IMPLEMENTATION_VERIFICATION.md](IMPLEMENTATION_VERIFICATION.md) | Full implementation checklist |
| [KIT_ACCESS_CHECKPOINTS.md](KIT_ACCESS_CHECKPOINTS.md) | Feature completeness summary |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Paywall shows for paid users** | Check `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel |
| **"No kits available yet"** | Check `NEXT_PUBLIC_SHEET_JSON_URL` is set in Vercel |
| **Webhook returns 400** | Check `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard |
| **Build fails** | Run `npm run build` locally to see error details |

---

## What's Already Done

✅ All code implemented  
✅ Build passes  
✅ Paywall UI complete  
✅ Stripe webhook complete  
✅ Auth protection complete  
✅ Database schema provided  
✅ Documentation complete  

---

## What You Need to Do

⏳ Run DATABASE_SCHEMA.sql in Supabase  
⏳ Set 7 environment variables in Vercel  
⏳ Configure Stripe webhook endpoint  
⏳ Test payment flows  

---

**Status**: 🚀 **Ready to Deploy**

Once all configuration is complete, the feature will be 100% operational.

---

*Generated: February 3, 2026*
