'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    if (pwd !== pwd2) {
      alert('Passwords do not match.');
      return;
    }
    alert(`Create account pressed for ${email}`); // placeholder
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="mt-2 text-slate-400 text-sm">
          This is a placeholder sign-up page. Wire it to your auth provider later.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm password</label>
            <input
              type="password"
              required
              value={pwd2}
              onChange={(e) => setPwd2(e.target.value)}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 transition"
          >
            Create account
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-400 hover:underline">
            Sign in
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/" className="inline-flex items-center rounded-lg border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
