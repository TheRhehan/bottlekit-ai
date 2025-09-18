'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const STRIPE_URL = 'https://buy.stripe.com/14AbJ22rX7zJ5Dv3Qebwk01';

function isExternal(href = '') {
  return /^https?:\/\//i.test(href);
}

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/kits')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((data) => setItems(Array.isArray(data?.items) ? data.items : []))
      .catch((err) => setError(err?.message || 'Failed to load kits'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/70 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Brand (internal link => Next Link) */}
          <Link href="/" className="font-semibold tracking-tight text-lg">
            BottleKit AI
          </Link>

          {/* Nav (all internal links use <Link/>) */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-slate-300 transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* CTAs (external Stripe link = <a>, internal auth links = <Link/>) */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-lg text-sm border border-white/15 hover:bg-white/5 transition"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1.5 rounded-lg text-sm border border-white/15 hover:bg-white/5 transition"
            >
              Create account
            </Link>
            <a
              href={STRIPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-medium transition"
            >
              Buy now
            </a>
          </div>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            AI automations that{' '}
            <span className="text-emerald-400">draft</span>,{' '}
            <span className="text-emerald-400">triage</span>, and{' '}
            <span className="text-emerald-400">assign</span> in minutes.
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Plug-and-play kit of Zapier + GPT workflows that connect your stack
            (HubSpot + Gmail, Zendesk + Slack, Zoom + Asana). No rebuild. No BS.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href={STRIPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition"
            >
              Buy now
            </a>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition"
            >
              See dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Kits Grid ---------- */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {loading && (
          <div className="text-slate-400 text-sm">Loading kits…</div>
        )}

        {error && (
          <div className="text-red-400 text-sm">API error: {error}</div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <article
                key={it.id ?? it.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{it.title}</h3>
                  <span className="text-xs text-slate-400">{it.type}</span>
                </div>

                <p className="mt-2 text-sm text-slate-300 min-h-[2.5rem]">
                  {it.desc}
                </p>

                <div className="mt-4">
                  {/* Kit link — external target */}
                  <a
                    href={it.href}
                    target={isExternal(it.href) ? '_blank' : undefined}
                    rel={isExternal(it.href) ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5 transition"
                  >
                    See kit
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-10 text-xs text-slate-400">
          Data comes from Google Sheets via{' '}
          <code className="text-slate-300">NEXT_PUBLIC_SHEET_JSON_URL</code>.
        </p>
      </main>
    </div>
  );
}
