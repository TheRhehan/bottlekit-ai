'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
  const [openTerms, setOpenTerms] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* HEADER: logo on left, auth on right */}
      <header className="sticky top-0 z-30 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-white"></div>
            <span className="text-white font-semibold">BottleKit&nbsp;AI</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-slate-300 hover:text-white transition-colors px-3 py-2 text-sm"
            >
              Log in
            </Link>
            <button
              onClick={() => setOpenTerms(true)}
              className="rounded-lg bg-white text-slate-900 hover:bg-slate-200 transition-colors px-4 py-2 text-sm font-medium"
            >
              Get started
            </button>
          </nav>
        </div>
      </header>

      {/* HERO: clear promise + what they get */}
      <section className="relative">
        {/* subtle glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[28rem] w-[50rem] rounded-full bg-fuchsia-500/20 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              AI Operations • Ready-to-run Kits
            </div>

            <h1 className="mt-5 text-4xl/tight font-semibold sm:text-5xl/tight">
              Automate support & ops in minutes—plug-and-play AI kits that
              actually ship.
            </h1>

            <p className="mt-4 text-slate-300 text-lg">
              BottleKit gives you a dashboard of prebuilt automations: draft
              emails, triage tickets, summarize meetings, calculate ROI, and
              more—without wiring up prompts or code. Turn it on and get time
              back today.
            </p>

            {/* Proof-y bullets about WHAT they get */}
            <ul className="mt-8 grid gap-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                <strong className="text-white">Email-Drafter:</strong>&nbsp;Reply
                to customers in your tone with context pulled from the thread.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                <strong className="text-white">Ticket-Triage:</strong>&nbsp;Auto-route,
                prioritize, and tag support tickets—no manual sorting.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                <strong className="text-white">Minutes Bot:</strong>&nbsp;Turn meeting
                recordings into action items and summaries instantly.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                <strong className="text-white">ROI Calculator:</strong>&nbsp;Show the value of
                automation to your team in dollars saved per week.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Stripe checkout, instant access, cancel anytime.
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => setOpenTerms(true)}
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-slate-900 hover:bg-slate-200 transition-colors"
              >
                Get started — free
              </button>
              <a
                href="#whats-inside"
                className="text-slate-300 hover:text-white transition-colors px-3 py-2"
              >
                See what’s inside
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary “what’s inside” strip */}
      <section id="whats-inside" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Email-Drafter',
              body:
                'Draft customer replies in one click with thread context and your brand tone.',
            },
            {
              title: 'Ticket-Triage',
              body:
                'Auto-tag, prioritize, and route support tickets to the right owner.',
            },
            {
              title: 'Minutes Bot',
              body:
                'Upload meeting audio and get clean summaries, action items, and owners.',
            },
            {
              title: 'ROI Calculator',
              body:
                'Estimate hours saved and cost reduction from each kit to share with stakeholders.',
            },
            {
              title: 'Quick-Start Zaps',
              body:
                'Prebuilt Zapier recipes to connect your tools in minutes—no prompt wrangling.',
            },
            {
              title: 'Guided Setup',
              body:
                'Short Looms walk you from zero to value. Hit “Open kit” and go.',
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} BottleKit AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* TERMS MODAL */}
      <TermsModal open={openTerms} onClose={() => setOpenTerms(false)} />
    </div>
  );
}

/* ------- Inline Terms Modal so there are no missing imports ------- */
function TermsModal({ open, onClose }) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!open) setAgreed(false);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold">Before you continue</h2>
        <p className="mt-2 text-slate-300">
          Please agree to our{' '}
          <Link href="/terms" className="underline hover:text-white">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
        </p>

        <label className="mt-4 flex items-start gap-3 text-slate-200">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>I agree to the Terms and Privacy Policy.</span>
        </label>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!agreed}
            onClick={() => router.push('/signup')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              agreed
                ? 'bg-white text-slate-900 hover:bg-slate-200'
                : 'bg-white/20 text-slate-400 cursor-not-allowed'
            }`}
          >
            Continue to sign up
          </button>
        </div>
      </div>
    </div>
  );
}
