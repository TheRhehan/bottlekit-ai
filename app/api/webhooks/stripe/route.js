// app/api/webhooks/stripe/route.js
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
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
      await supabase.from('entitlements').upsert({
        email: email.toLowerCase(),
        is_paid: true,
        purchased_at: new Date().toISOString(),
      });
    }
  }

  return new Response('ok', { status: 200 });
}
