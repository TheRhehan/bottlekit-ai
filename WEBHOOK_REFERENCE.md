# Stripe Webhook Implementation — Technical Reference

This document explains how the webhook processes Stripe events and updates the database.

---

## Overview

The webhook endpoint at `/api/webhooks/stripe` handles Stripe events and updates both the `entitlements` and `profiles` tables to track paid access.

### Endpoint
```
POST https://yourdomain.com/api/webhooks/stripe
```

### Signature Verification
All requests are verified using `STRIPE_WEBHOOK_SECRET` before processing. Invalid signatures are rejected with `400 Bad Signature`.

---

## Events Handled

### 1. `checkout.session.completed` (Payment Success)

**When**: Customer completes checkout and payment is successful.

**Action**:
1. Extract customer email from checkout session (`customer_details.email` or `customer_email`)
2. Upsert into `entitlements` table:
   - `email` (unique)
   - `is_paid = true`
   - `purchased_at = now()`
3. Call `grantAccessByEmail()` to also update `profiles.paid = true`

**Result**: User can now access `/kit` and see kits.

**Example Flow**:
```
[User clicks "Unlock Access"]
        ↓
  [Stripe Payment Link]
        ↓
[Payment successful]
        ↓
[Stripe sends checkout.session.completed]
        ↓
[Webhook: upsert entitlements]
[Webhook: update profiles.paid = true]
        ↓
[/kit page fetches via /api/entitlement?email=user@example.com]
        ↓
[isPaid = true → show kits]
```

---

### 2. `customer.subscription.deleted` (Subscription Cancelled)

**When**: Customer or admin cancels their subscription.

**Action**:
1. Extract Stripe customer ID from subscription object
2. Call `getEmailFromCustomerId()` to fetch customer email from Stripe API
3. Call `revokeAccessByEmail()` to set:
   - `entitlements.is_paid = false`
   - `profiles.paid = false`

**Result**: User loses access to kits on next visit to `/kit`.

**Example Flow**:
```
[User cancels subscription in Stripe Dashboard]
        ↓
[Stripe sends customer.subscription.deleted]
        ↓
[Webhook: fetch customer email from Stripe]
[Webhook: set entitlements.is_paid = false]
[Webhook: set profiles.paid = false]
        ↓
[Next time user visits /kit]
[/api/entitlement?email=user@example.com returns isPaid = false]
        ↓
[/kit shows paywall]
```

---

### 3. `charge.refunded` (Refund Issued)

**When**: Customer is refunded (e.g., payment dispute, manual refund).

**Action**:
1. Extract email from charge (`billing_details.email` or `receipt_email`)
2. If no email, fetch customer email via Stripe API
3. Call `revokeAccessByEmail()` to revoke access

**Result**: Refunded customer loses kit access.

---

## Database Sync

### Tables Updated

#### `entitlements` (always updated)
```
email (unique) | is_paid (bool) | purchased_at | updated_at
```

**Upsert on payment**:
```sql
INSERT INTO entitlements (email, is_paid, purchased_at)
VALUES (user@example.com, true, '2026-02-03T10:00:00Z')
ON CONFLICT (email) DO UPDATE SET is_paid = true, purchased_at = now();
```

**Revoke on cancellation/refund**:
```sql
UPDATE entitlements SET is_paid = false WHERE email = 'user@example.com';
```

#### `profiles` (synced via webhook helper functions)
```
id (user_id) | email | paid (bool)
```

**Grant on payment**:
```sql
UPDATE profiles SET paid = true WHERE LOWER(email) = 'user@example.com';
```

**Revoke on cancellation/refund**:
```sql
UPDATE profiles SET paid = false WHERE LOWER(email) = 'user@example.com';
```

---

## Code Flow Diagram

### `grantAccessByEmail(supabase, email)`
```javascript
async function grantAccessByEmail(supabase, email) {
  const e = (email || '').trim().toLowerCase();
  if (!e) return;
  
  // Find user in profiles table by email
  const { data: user } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', e)
    .maybeSingle();
  
  // If found, set paid = true
  if (user?.id) {
    await supabase.from('profiles').update({ paid: true }).eq('id', user.id);
  }
}
```

### `revokeAccessByEmail(supabase, email)`
```javascript
async function revokeAccessByEmail(supabase, email) {
  const e = (email || '').trim().toLowerCase();
  if (!e) return;
  
  // Step 1: Revoke from entitlements
  await supabase.from('entitlements').update({ is_paid: false }).eq('email', e);
  
  // Step 2: Also revoke from profiles
  const { data: user } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', e)
    .maybeSingle();
  
  if (user?.id) {
    await supabase.from('profiles').update({ paid: false }).eq('id', user.id);
  }
}
```

### `getEmailFromCustomerId(stripe, customerId)`
```javascript
async function getEmailFromCustomerId(stripe, customerId) {
  if (!stripe || !customerId || typeof customerId !== 'string') return null;
  
  try {
    const customer = await stripe.customers.retrieve(customerId);
    // If customer is deleted, return null
    // Otherwise return email if available
    return customer.deleted ? null : (customer.email || '').trim() || null;
  } catch {
    return null;
  }
}
```

---

## Error Handling

### Missing Credentials
If `STRIPE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` are not set, webhook returns `500 Server configuration error`.

### Bad Signature
If webhook signature verification fails, returns `400 Bad signature` without processing.

### Missing Email
If email cannot be extracted from Stripe event (or Stripe customer), the event is logged but silently skipped (no update occurs).

### Database Errors
If a database update fails (e.g., table doesn't exist), the error is logged to Vercel logs but webhook still returns `200 ok` (to prevent Stripe from retrying).

---

## Testing & Debugging

### Local Testing with Stripe CLI

```bash
# Install Stripe CLI (https://stripe.com/docs/stripe-cli)
stripe login

# Forward webhook events to your local dev server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# In another terminal, trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.deleted
stripe trigger charge.refunded
```

### Production Debugging

Check webhook logs in Stripe Dashboard:
1. Go to **Developers** → **Webhooks**
2. Click on your endpoint URL
3. View **Recent Events** — click each event to see request/response

Check Vercel Function Logs:
1. Go to Vercel Dashboard → your project
2. **Functions** or **Deployments** → click your deployment
3. View logs to see any errors from the webhook

### Test Event Payloads

**checkout.session.completed**:
```json
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "customer_email": "user@example.com",
      "customer_details": {
        "email": "user@example.com"
      }
    }
  }
}
```

**customer.subscription.deleted**:
```json
{
  "type": "customer.subscription.deleted",
  "data": {
    "object": {
      "customer": "cus_123456"
    }
  }
}
```

**charge.refunded**:
```json
{
  "type": "charge.refunded",
  "data": {
    "object": {
      "receipt_email": "user@example.com",
      "customer": "cus_123456"
    }
  }
}
```

---

## Important Notes

1. **Email Lookup**: The webhook uses email to update `profiles.paid` because the checkout session provides email but not the user ID. The Stripe API is queried to get customer email for subscription/refund events.

2. **Case Normalization**: All emails are lowercased (`email.toLowerCase()`) to ensure consistent lookups in both tables.

3. **Dual Update**: Both `entitlements` and `profiles` are updated to keep them in sync. This allows the app to use either table for checking paid status.

4. **Upsert on Conflict**: The entitlements upsert uses `onConflict: 'email'` to handle duplicate payments gracefully. **Important**: Your `entitlements` table must have a **UNIQUE constraint on email** for this to work.

5. **Silent Failures**: If an email cannot be found in `profiles`, the update is skipped gracefully (no error thrown). This is intentional to prevent webhook failures if a profile hasn't been created yet.

---

## Database Constraint Requirements

For the webhook to work correctly, ensure these constraints exist in Supabase:

```sql
-- In entitlements table
CREATE UNIQUE INDEX IF NOT EXISTS idx_entitlements_email_unique ON public.entitlements(LOWER(email));

-- In profiles table (if using email lookup)
-- Should already exist if profiles is linked to auth.users
```

Verify in Supabase SQL Editor:
```sql
SELECT constraint_name, table_name 
FROM information_schema.table_constraints 
WHERE constraint_type = 'UNIQUE' 
  AND table_name IN ('entitlements', 'profiles');
```

---

## Flow Chart: End-to-End Payment to Access

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User visits /kit (unpaid)                                     │
│    → Sees paywall with "Unlock Access" button                    │
└────────────────┬──────────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. User clicks "Unlock Access"                                   │
│    → Redirects to Stripe Payment Link (KIT_STRIPE_CHECKOUT_URL)  │
└────────────────┬──────────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. Stripe Payment Link                                           │
│    → User enters card, completes payment                         │
│    → Payment successful                                          │
└────────────────┬──────────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. Stripe sends checkout.session.completed webhook               │
│    → POST /api/webhooks/stripe                                   │
└────────────────┬──────────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. Webhook Processing                                            │
│    ✓ Verify signature using STRIPE_WEBHOOK_SECRET                │
│    ✓ Extract email: user@example.com                             │
│    ✓ Upsert entitlements: is_paid = true                         │
│    ✓ Update profiles: paid = true                                │
└────────────────┬──────────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│ 6. User redirected to success page                               │
│    → Shows "Payment successful" message                          │
└────────────────┬──────────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│ 7. User revisits /kit or refreshes                               │
│    → Fetches /api/entitlement?email=user@example.com             │
│    → Returns isPaid = true                                       │
│    → /kit displays kits instead of paywall                       │
│    → User can click kit links (open in new tab)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

*Last updated: February 3, 2026*
