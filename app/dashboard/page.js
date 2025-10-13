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
          { id: 'email-drafter', title: 'Email-Drafter Zap', type: 'zap', desc: 'Draft reply from HubSpot note', href: '#' },
          { id: 'ticket-triage', title: 'Ticket-Triage Zap', type: 'zap', desc: 'Auto-prioritize tickets', href: '#' },
          { id: 'minutes-bot', title: 'Minutes Bot Zap', type: 'zap', desc: 'Summarize meetings → tasks', href: '#' },
          { id: 'qs-email', title: 'Quick-Start: Email-Drafter', type: 'pdf', desc: '2-page setup checklist', href: '#' },
          { id: 'qs-triage', title: 'Quick-Start: Ticket-Triage', type: 'pdf', desc: '2-page setup checklist', href: '#' },
          { id: 'qs-minutes', title: 'Quick-Start: Minutes Bot', type: 'pdf', desc: '2-page setup checklist', href: '#' },
          { id: 'roi-sheet', title: 'ROI Calculator Sheet', type: 'sheet', desc: 'Savings model', href: '#' },
          { id: 'loom-email', title: 'Loom Tutorial: Email-Drafter', type: 'video', desc: 'Short walkthrough', href: '#' },
          { id: 'loom-triage', title: 'Loom Tutorial: Ticket-Triage', type: 'video', desc: 'Short walkthrough', href: '#' },
          { id: 'loom-minutes', title: 'Loom Tutorial: Minutes Bot', type: 'video', desc: 'Short walkthrough', href: '#' },
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
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5 transition"
          >
            ⟵ Back to home
          </Link>
        </div>

        <div className="mt-8">
          {loading && <div className="text-slate-400 text-sm">Loading…</div>}
          {err && !loading && <div className="text-red-400 text-sm">Error: {err}</div>}

          {!loading && kits?.length > 0 && (
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
