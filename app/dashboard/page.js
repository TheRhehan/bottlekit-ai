// app/dashboard/page.jsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch('/api/kits', { cache: 'no-store' });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        const items = Array.isArray(data?.items) ? data.items : [];
        if (!items.length) throw new Error('No kits returned');
        setKits(items);
      } catch (e) {
        // TEMP fallback so the page renders even if API isn’t ready
        setErr(String(e?.message || e));
        setKits([
          { id: 'onboarding', title: 'Client Onboarding Automation', type: 'Workflow', desc: 'Collect client info, send welcome emails, create tasks.', href: '/kits' },
          { id: 'email-drafter', title: 'AI Email Drafter', type: 'Workflow', desc: 'Generate on-brand replies and updates automatically.', href: '/kits' },
          { id: 'roi-calc', title: 'ROI Calculator', type: 'Tool', desc: 'Estimate time saved and impact per automation.', href: '/kits' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link href="/" className="inline-flex items-center rounded-lg border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5 transition">
            ⟵ Back to home
          </Link>
        </div>

        <p className="mt-2 text-slate-400 text-sm">
          Placeholder dashboard showing your kit list from the same API.
        </p>

        <div className="mt-8">
          {loading && <div className="text-slate-400 text-sm">Loading…</div>}
          {err && !loading && <div className="text-red-400 text-sm">Error: {err}</div>}

          {!loading && kits?.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {kits.map((k) => (
                <article key={k.id ?? k.title} className="rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{k.title}</h3>
                    <span className="text-xs text-slate-400">{k.type}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300 min-h-[2.5rem]">{k.desc}</p>

                  <div className="mt-4">
                    {k.href ? (
                      <a
                        href={k.href}
                        target={k.href.startsWith('http') ? '_blank' : undefined}
                        rel={k.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5 transition"
                      >
                        Open kit
                      </a>
                    ) : (
                      <span className="text-slate-500 text-sm">No link provided</span>
                    )}
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
