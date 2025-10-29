'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (!email || !pw) return setErr('Email and password are required.');
    if (pw !== pw2) return setErr('Passwords do not match.');
    if (!supabase) return setErr('Auth client not initialized.');

    setLoading(true);
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pw,
        options: {
          emailRedirectTo: `${origin}/success`
        }
      });

      if (error) throw error;

      // If confirmations ON, Supabase sends an email; if OFF, session is ready.
      if (data?.session) {
        window.location.href = '/dashboard';
      } else {
        setMsg('Check your email to confirm your account. Once confirmed, you’ll be redirected.');
      }
    } catch (e2) {
      setErr(e2.message || 'Sign up failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Create your BottleKit account</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-md bg-slate-900 border border-slate-800 px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-md bg-slate-900 border border-slate-800 px-3 py-2"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Confirm password</label>
            <input
              type="password"
              className="w-full rounded-md bg-slate-900 border border-slate-800 px-3 py-2"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              required
            />
          </div>

          {err && <p className="text-sm text-rose-400">{err}</p>}
          {msg && <p className="text-sm text-emerald-400">{msg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 px-3 py-2 font-semibold"
          >
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-4">
          Already have an account? <Link href="/login" className="underline">Sign in</Link>
        </p>

        <p className="text-sm text-slate-500 mt-6">
          ← <Link href="/" className="underline">Back to home</Link>
        </p>
      </div>
    </main>
  );
}
