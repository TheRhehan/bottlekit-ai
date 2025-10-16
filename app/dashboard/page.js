'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { STRIPE_URL, PAID_KEY } from '@/lib/consts';

function Sidebar() {
  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-6 space-y-3">
        <Link href="/signup" className="block w-full rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-3 text-left">
          Sign up
        </Link>
        <Link href="/login" className="block w-full rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-3 text-left">
          Sign in
        </Link>
        <Link href="/" className="block w-full rounded-lg bg-slate-900 hover:bg-slate-800 px-4 py-3 text-left">
          ← Back to home
        </Link>
      </div>
    </aside>
  );
}

function RightRail({ paid, setPaid }) {
  return (
    <aside className="w-80 shrink-0">
      <div className="sticky top-6 rounded-2xl bg-slate-900 p-5 border border-slate-800">
        <h3 className="font-semibold mb-2">Your Access</h3>
        {paid ? (
          <p className="text-green-400 mb-4">Access: Active</p>
        ) : (
          <p className="text-amber-400 mb-4">Access: Locked</p>
        )}

        {!paid && (
          <a
            href={STRIPE_URL}
            className="block w-full text-center rounded-lg bg-slate-200 text-slate-900 font-semibold px-4 py-3 hover:bg-white"
          >
            Get Access — $1,200
          </a>
        )}

        <div className="mt-4 text-xs text-slate-400">
          After purchase you’ll be redirected to <code>/success</code>. We unlock your access on that page.
        </div>

        {/* Dev helper: let you manually unlock while testing */}
        {!paid && (
          <button
            className="mt-4 text-xs underline text-slate-400 hover:text-slate-200"
            onClick={() => {
              localStorage.setItem(PAID_KEY, 'true');
              setPaid(true);
            }}
          >
            (Dev) Mark as paid
          </button>
        )}
      </div>
    </aside>
  );
}

function KitCard({ title, subtitle, locked, href }) {
  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>
        {locked && (
          <span className="text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700">Locked</span>
        )}
      </div>

      <div className="mt-4">
        <button
          disabled={locked}
          onClick={() => !locked && window.open(href, '_blank')}
          className={`rounded-lg px-4 py-2 font-medium transition
            ${locked ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-200 text-slate-900 hover:bg-white'}`}
        >
          {locked ? 'Preview only' : 'Open kit'}
        </button>
      </div>

      {locked && (
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-800 pointer-events-none" />
      )}
    </div>
  );
}

export default function Dashboard() {
  const [kits, setKits] = useState([]);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    // load kits the way your app already does
    fetch('/api/kits')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setKits(Array.isArray(data?.items) ? data.items : []))
      .catch(() => setKits([]));
  }, []);

  useEffect(() => {
    const flag = typeof window !== 'undefined' && localStorage.getItem(PAID_KEY) === 'true';
    setPaid(flag);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

        <div className="flex gap-6">
          {/* Left */}
          <Sidebar />

          {/* Middle */}
          <section className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {kits.length === 0 && (
                <>
                  <KitCard title="Email-Drafter Zap" subtitle="Draft reply from HubSpot note" locked={!paid} href="#" />
                  <KitCard title="Ticket-Triage Zap" subtitle="Auto-prioritize tickets" locked={!paid} href="#" />
                  <KitCard title="Minutes Bot Zap" subtitle="Summarize meetings → tasks" locked={!paid} href="#" />
                  <KitCard title="Quick-Start: Email-Drafter" subtitle="2-page setup checklist" locked={!paid} href="#" />
                  <KitCard title="ROI Calculator Sheet" subtitle="Savings model" locked={!paid} href="#" />
                  <KitCard title="Loom Tutorial: Minutes Bot" subtitle="Short walkthrough" locked={!paid} href="#" />
                </>
              )}

              {kits.map((k) => (
                <KitCard
                  key={k.id || k.title}
                  title={k.title}
                  subtitle={k.subtitle || k.description || ''}
                  locked={!paid}
                  href={k.url || '#'}
                />
              ))}
            </div>
          </section>

          {/* Right */}
          <RightRail paid={paid} setPaid={setPaid} />
        </div>
      </div>
    </main>
  );
}
