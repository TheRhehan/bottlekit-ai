'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetch('/api/kits')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((data) => setKits(Array.isArray(data?.items) ? data.items : []))
      .catch((e) => setErr(e?.message || 'Failed to load kits'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5 transition"
          >
            ← Back to home
          </Link>
        </div>

        <p className="mt-2 text-slate-400 text-sm">
          Placeholder dashboard showing your kit list from the same API.
        </p>

        <div className="mt-8">
          {loading && <div className="text-slate-400 text-sm">Loading…</div>}
          {err && <div className="text-red-400 text-sm">Error: {err}</div>}

          {!loading && !err && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {kits.map((k) => (
                <article
                  key={k.id ?? k.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{k.title}</h3>
                    <span className="text-xs text-slate-400">{k.type}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300 min-h-[2.5rem]">
                    {k.desc}
                  </p>
                  <div className="mt-4">
                    <a
                      href={k.href}
                      target={/^https?:\/\//i.test(k.href) ? '_blank' : undefined}
                      rel={/^https?:\/\//i.test(k.href) ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5 transition"
                    >
                      Open kit
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
