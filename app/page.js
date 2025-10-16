'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { STRIPE_URL } from '../lib/consts';

export default function Home() {
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-semibold mb-2">BottleKit AI</h1>
        <p className="text-slate-400 mb-8">Plug-and-play AI automations for small teams.</p>

        <label className="flex items-start gap-3 mb-4">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            I agree to the{' '}
            <Link href="/terms" className="underline">
              Terms of Use &amp; License Agreement
            </Link>.
          </span>
        </label>

        <button
          disabled={!agreed}
          onClick={() => (window.location.href = '/dashboard')}
          className={`w-full rounded-md px-6 py-4 font-semibold transition
            ${agreed ? 'bg-slate-300 text-slate-900 hover:bg-slate-200' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
        >
          Continue
        </button>

        {/* optional buy link on home */}
        <div className="mt-4 text-center">
          <a
            href={STRIPE_URL}
            className="inline-block text-sm underline text-slate-300 hover:text-white"
            rel="noopener noreferrer"
          >
            Get Access — $1,200
          </a>
        </div>
      </div>
    </main>
  );
}
