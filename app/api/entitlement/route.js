// app/api/entitlement/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ isPaid: false });

  const { data, error } = await supabase
    .from('entitlements')
    .select('is_paid')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error('entitlement lookup error:', error);
    return NextResponse.json({ isPaid: false });
  }

  return NextResponse.json({ isPaid: !!data?.is_paid });
}
