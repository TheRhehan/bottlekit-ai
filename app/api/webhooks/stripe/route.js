// app/api/webhooks/stripe/route.js
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: '2024-06-20' });
}

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function revokeAccessByEmail(supabase, email) {
  const e = (email || '').trim().toLowerCase();
  if (!e) return;
  await supabase.from('entitlements').update({ is_paid: false }).eq('email', e);
  // Also revoke from profiles table
  const { data: user } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', e)
    .maybeSingle();
  if (user?.id) {
    await supabase.from('profiles').update({ paid: false }).eq('id', user.id);
  }
}

async function grantAccessByEmail(supabase, email) {
  const e = (email || '').trim().toLowerCase();
  if (!e) return;
  // Find user by email and update profiles.paid
  const { data: user } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', e)
    .maybeSingle();
  if (user?.id) {
    await supabase.from('profiles').update({ paid: true }).eq('id', user.id);
  }
}

async function getEmailFromCustomerId(stripe, customerId) {
  if (!stripe || !customerId || typeof customerId !== 'string') return null;
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer.deleted ? null : (customer.email || '').trim() || null;
  } catch {
    return null;
  }
}

export async function POST(req) {
  const stripe = getStripe();
  const supabase = getSupabase();
  if (!stripe || !supabase) {
    return new Response('Server configuration error', { status: 500 });
  }

  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Bad Stripe signature:', err.message);
    return new Response('Bad signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object;
    const email = s.customer_details?.email || s.customer_email;
    if (email) {
      await supabase.from('entitlements').upsert(
        {
          email: email.toLowerCase(),
          is_paid: true,
          purchased_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );
      // Also grant access in profiles table
      await grantAccessByEmail(supabase, email);
    }
    return new Response('ok', { status: 200 });
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;
    const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;
    const email = await getEmailFromCustomerId(stripe, customerId);
    if (email) await revokeAccessByEmail(supabase, email);
    return new Response('ok', { status: 200 });
  }

  if (event.type === 'charge.refunded') {
    const charge = event.data.object;
    let email =
      charge.billing_details?.email?.trim() ||
      charge.receipt_email?.trim() ||
      null;
    if (!email && charge.customer) {
      const customerId = typeof charge.customer === 'string' ? charge.customer : charge.customer?.id;
      email = await getEmailFromCustomerId(stripe, customerId);
    }
    if (email) await revokeAccessByEmail(supabase, email);
    return new Response('ok', { status: 200 });
  }

  return new Response('ok', { status: 200 });
}
