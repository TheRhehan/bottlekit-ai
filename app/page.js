'use client';

import React, { useEffect, useState } from 'react';

/** ====== Top-level links (edit these) ====== */
const signInUrl = '/login';            // change to your real sign-in route later
const createAccountUrl = '/signup';    // change to your real sign-up route later
const buyNowUrl = 'https://buy.stripe.com/14AbJ22rX7zJ5Dv3Qebwk01'; // your Stripe link

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  // Load kits from the API we added (/api/kits)
  useEffect(() => {
    fetch('/api/kits')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((data) => {
        const rows = Array.isArray(data) ? data : (data.items || []);
        setItems(rows);
      })
      .catch((e) => setError(e?.message || 'Failed to load kits'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-semibold tracking-tight">BottleKit AI</a>
            <a href="/" className="text-sm text-slate-300 hover:text-white">Home</a>
            <a href="/dashboard" className="text-sm text-slate-300 hover:text-white">Dashboard</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={signInUrl}
              className="text-sm rounded-xl px-3 py-1.5 border border-white/10 hover:bg-white/5"
            >
              Sign in
            </a>
            <a
              href={createAccountUrl}
              className="text-sm rounded-xl px-3 py-1.5 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/10"
            >
              Create account
            </a>
            <a
              href={buyNowUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm rounded-xl px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Buy now →
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
          AI automations that <span className="text-emerald-400">draft</span>,{' '}
          <span className="text-emerald-400">triage</span>, and{' '}
          <span className="text-emerald-400">assign</span> in minutes.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Plug-and-play kits powered by Zapier + GPT that connect your existing stack.
          No rebuild. No BS.
        </p>
        <div className="mt-6 flex gap-3">
          <a
            href={buyNowUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            Buy now →
          </a>
          <a
            href="/dashboard"
            className="rounded-xl px-4 py-2 border border-white/10 hover:bg-white/5"
          >
            Go to dashboard
          </a>
        </div>
      </header>

      {/* ===== CONTENT ===== */}
      <main className="mx-auto max-w-6xl px-4 pb-16">
        {/* Loading / Error states */}
        {loading && (
          <div className="text-slate-300">Loading kits…</div>
        )}
        {!!error && (
          <div className="text-red-400">API error: {error}</div>
        )}

        {/* Kits grid */}
        {!loading && !error && (
          <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, i) => {
              // Accept either { title, desc, href } or { title, desc, link }
              const href = it.href || it.link || '#';
              const title = it.title || `Kit ${i + 1}`;
              const desc = it.desc || '';
              return (
                <article
                  key={title + i}
                  className="rounded-2xl border border-white/10 hover:border-white/20 transition overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold leading-snug">{title}</h3>
                    </div>
                    {desc ? (
                      <p className="text-sm text-slate-300">{desc}</p>
                    ) : (
                      <div className="h-5" />
                    )}
                    <div className="mt-4">
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block rounded-xl border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5"
                      >
                        See kit
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Admin note */}
        <p className="mt-10 text-xs text-slate-400">
          Data comes from Google Sheets via <code>NEXT_PUBLIC_SHEET_JSON_URL</code>.
        </p>
      </main>
    </div>
  );
}
