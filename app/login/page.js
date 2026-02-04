'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!supabase) return setErr('Auth client not initialized.');
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) throw error;
      if (data?.session) window.location.href = redirect.startsWith('/') ? redirect : '/dashboard';
      else setErr('Login failed. Please try again.');
    } catch (e2) {
      setErr(e2.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Sign in</h1>

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

        {err && <p className="text-sm text-rose-400">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 px-3 py-2 font-semibold"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-sm text-slate-400 mt-4">
        Need an account? <Link href="/signup" className="underline">Create one</Link>
      </p>

      <p className="text-sm text-slate-500 mt-6">
        ← <Link href="/" className="underline">Back to home</Link>
      </p>
    </div>
  );
}

export default function Login() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <Suspense fallback={<div className="max-w-md mx-auto text-slate-400">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
