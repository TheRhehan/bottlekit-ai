'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Thank you | BottleKit AI',
  description: 'Purchase successful — access unlocked.',
};

export default function ThankYouPage() {
  useEffect(() => {
    // Mark user as paid in localStorage (simple client-side gating)
    try {
      localStorage.setItem('bk_paid', 'true');
    } catch {}
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-2">Thanks for your purchase! 🎉</h1>
      <p className="text-slate-300">
        Your access is unlocked on this device. Click below to view your kit.
      </p>

      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-xl border px-4 py-2 text-sm hover:bg-white/5">
          Go to Home
        </Link>
        <Link href="/dashboard" className="rounded-xl border px-4 py-2 text-sm hover:bg-white/5">
          Open Dashboard
        </Link>
      </div>

      <p className="text-xs text-slate-400 mt-8">
        Tip: If you plan to access from multiple devices, consider moving to a server-side license
        check later (webhook + user account). This page uses a simple local unlock for speed.
      </p>
    </main>
  );
}
