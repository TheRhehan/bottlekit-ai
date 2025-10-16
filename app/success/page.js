'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { PAID_KEY } from '../../lib/consts';

export default function Success() {
  useEffect(() => {
    try {
      localStorage.setItem(PAID_KEY, 'true');
    } catch {}
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-3xl font-semibold mb-2">Payment successful ✅</h1>
        <p className="text-slate-400 mb-6">Your access has been unlocked on this device.</p>
        <Link
          href="/dashboard"
          className="inline-block rounded-md bg-slate-200 text-slate-900 px-6 py-3 font-semibold hover:bg-white"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
