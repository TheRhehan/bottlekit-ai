'use client';

import React, { useEffect, useState } from 'react';

/**
 * 🔧 Set these to your real routes/URLs.
 * If you don’t have these routes yet, leave as '#'
 * until you wire them up (e.g. to NextAuth, Clerk, or your own pages).
 */
const signInUrl = '/login';          // or your auth provider URL
const createAccountUrl = '/signup';  // or your auth provider URL
const buyNowUrl = '/api/checkout';   // your Stripe (or other) checkout endpoint

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [grantPaid, setGrantPaid] = useState(false); // demo toggle for UI gating

  useEffect(() => {
    fetch('/api/kits')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : (data.items || [])))
      .catch((err) => setError(err?.message || 'Failed to load kits'))
      .finally(() => setLoading(false));
  }, []);

  // ——— quick links for the hero: pick 3 “featured” items
  const featured = pickFeatured(items, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      {/* Top nav */}
      <header className="border-b border-slate-800/70 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              BK
            </span>
            <span className="font-semibold tracking-tight">BottleKit AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-2 text-sm">
            <a href="/" className="px-3 py-1.5 rounded hover:bg-slate-800/60">Home</a>
            <a href="/dashboard" className="px-3 py-1.5 rounded hover:bg-slate-800/60">Dashboard</a>
            <a href={signInUrl} className="px-3 py-1.5 rounded hover:bg-slate-800/60">Sign in</a>
            <a
              href={createAccountUrl}
              className="px-3 py-1.5 rounded bg-slate-100 text-slate-900 hover:bg-white transition"
            >
              Create account
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-14">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: headline */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              AI automations that
              {' '}
              <span className="text-emerald-400">draft</span>,{' '}
              <span className="text-emerald-400">triage</span>, and{' '}
              <span className="text-emerald-400">assign</span>
              {' '}in minutes.
            </h1>

            <p className="mt-4 text-slate-300">
              BottleKit AI is a plug-and-play kit of three Zapier + GPT automations that connect
              your existing stack. No rebuild. No BS.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={buyNowUrl}
                className="inline-flex items-center gap-2 rounded bg-emerald-500 px-4 py-2 font-medium text-slate-950 hover:bg-emerald-400 transition"
              >
                Buy now
                <span aria-hidden>→</span>
              </a>

              {/* Demo-only: toggle paid state to reveal “paid” content if you use it */}
              <button
                type="button"
                onClick={() => setGrantPaid((v) => !v)}
                className={`inline-flex items-center gap-2 rounded px-3 py-2 border transition ${
                  grantPaid
                    ? 'border-emerald-500/70 text-emerald-300'
                    : 'border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
                title="Demo only — mock access toggle"
              >
                {grantPaid ? 'Paid access active' : 'Grant Paid (demo)'}
              </button>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Data comes from Google Sheets via <code className="text-slate-300">NEXT_PUBLIC_SHEET_JSON_URL</code>.
              Edit your sheet to update instantly.
            </p>
          </div>

          {/* Right: three quick links */}
          <div className="grid gap-3">
            {featured.map((f) => (
              <a
                key={f.id}
                href={f.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-4 hover:border-emerald-700/60 hover:bg-slate-900/70 transition"
              >
                <div className="text-sm text-slate-300">{f.title}</div>
                {f.desc ? (
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {f.desc}
                  </div>
                ) : null}
                <div className="mt-2 inline-flex items-center gap-1 text-emerald-400 text-sm">
                  Open<span aria-hidden>↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Kits grid */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        {loading && (
          <div className="text-slate-400 text-sm">Loading kits…</div>
        )}

        {error && (
          <div className="text-sm text-red-400">API error: {error}</div>
        )}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((it) => (
              <article
                key={it.id}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{it.title}</h3>
                  {/* tiny tag */}
                  {it.type ? (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {prettyType(it.type)}
                    </span>
                  ) : null}
                </div>

                {it.desc ? (
                  <p className="mt-2 text-sm text-slate-400 line-clamp-3">{it.desc}</p>
                ) : (
                  <div className="h-2" />
                )}

                <div className="mt-3">
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded border border-slate-700 px-3 py-1.5 text-sm hover:border-emerald-700/70 hover:text-emerald-300 transition"
                  >
                    See kit
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/** Heuristic: pick 3 “featured” items for hero links */
function pickFeatured(items, n = 3) {
  if (!Array.isArray(items)) return [];
  // Prefer type “zap” or titles that look like a main flow
  const zaps = items.filter((x) => (x.type || '').toLowerCase() === 'zap');
  const byTitleHint = items.filter((x) =>
    /hubspot|zendesk|zoom|minutes|triage/i.test(x.title || '')
  );
  const merged = dedupe([...zaps, ...byTitleHint, ...items], (x) => x.id);
  return merged.slice(0, n);
}

function dedupe(arr, keyFn) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    const k = keyFn(x);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(x);
    }
  }
  return out;
}

function prettyType(t = '') {
  const s = t.toLowerCase();
  if (s === 'zap') return 'Zap';
  if (s === 'video') return 'Video';
  if (s === 'sheet') return 'Sheet';
  if (s === 'pdf') return 'PDF';
  return t;
}
