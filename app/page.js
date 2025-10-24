// /app/page.js
'use client';

import Link from 'next/link';
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_35%_at_20%_10%,rgba(120,119,198,0.25),transparent_60%),radial-gradient(45%_30%_at_80%_0%,rgba(56,189,248,0.18),transparent_55%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          AI Operations • Ready-to-run Kits
        </div>

        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Automate support & ops in minutes—plug-and-play AI
          <br />
          <span className="text-white/90">kits that actually ship.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-7 text-slate-300">
          Stop wasting hours on tickets, emails, and notes. BottleKit automates
          the grunt work — replies, triage, summaries, ROI — so you reclaim time
          without adding headcount. Install once, win time every day.
        </p>

        {/* Bullets */}
        <ul className="mt-6 space-y-3 text-slate-300">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>
              <span className="font-semibold text-white">Email-Drafter:</span> Reply to customers in your tone with context pulled from the thread.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>
              <span className="font-semibold text-white">Ticket-Triage:</span> Auto-route, prioritize, and tag support tickets—no manual sorting.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>
              <span className="font-semibold text-white">Minutes Bot:</span> Turn meeting recordings into action items and summaries instantly.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>
              <span className="font-semibold text-white">ROI Calculator:</span> Show the value of automation to your team in dollars saved per week.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>
              Stripe checkout, instant access, cancel anytime.
            </p>
          </li>
        </ul>

        {/* Primary CTA only (no “free”, no secondary) */}
        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#0B1220] hover:bg-slate-200"
          >
            Get started
          </Link>
        </div>

        <SocialProof />

        {/* Feature tiles */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-white">Email-Drafter</h3>
            <p className="mt-1 text-sm text-slate-300">
              Draft customer replies in one click with thread context and your brand tone.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-white">Ticket-Triage</h3>
            <p className="mt-1 text-sm text-slate-300">
              Auto-tag, prioritize, and route support tickets to the right owner.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-white">Minutes Bot</h3>
            <p className="mt-1 text-sm text-slate-300">
              Upload meeting audio and get clean summaries, action items, and owners.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-white">ROI Calculator</h3>
            <p className="mt-1 text-sm text-slate-300">
              Estimate hours saved and cost reduction from each kit to share with stakeholders.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-white">Quick-Start Zaps</h3>
            <p className="mt-1 text-sm text-slate-300">
              Prebuilt Zapier recipes to connect your tools in minutes—no prompt wrangling.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-white">Guided Setup</h3>
            <p className="mt-1 text-sm text-slate-300">
              Short Looms walk you from zero to value. Hit “Open kit”.
            </p>
          </div>
        </div>

        <footer className="mt-14 flex items-center justify-center gap-6 border-t border-white/10 pt-6 text-sm text-slate-400">
          <Link href="/privacy" className="hover:text-slate-200">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-200">Terms</Link>
        </footer>
      </div>
    </main>
  );
}
