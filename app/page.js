// /app/page.js
'use client';

import Link from 'next/link';
import SocialProof from '@/components/SocialProof';
import UrgencyBar from '@/components/UrgencyBar';
import WhoFor from '@/components/WhoFor';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_35%_at_20%_10%,rgba(120,119,198,0.25),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20">
        {/* Eyebrow pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          AI Operations • Ready-to-run Kits
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Automate support & ops in minutes—plug-and-play AI
          <br />
          <span className="text-white/90">kits that actually ship.</span>
        </h1>

        {/* Lead */}
        <p className="mt-5 max-w-2xl text-lg leading-7 text-slate-300">
          Stop wasting hours on tickets, emails, and notes. BottleKit automates the
          grunt work — replies, triage, summaries, ROI — so you reclaim time
          without adding headcount. Install once, win time every day.
        </p>

        {/* Bullets */}
        <ul className="mt-6 space-y-3 text-slate-300">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>
              <span className="font-semibold text-white">Email-Drafter:</span>{' '}
              Reply to customers in your tone with context pulled from the thread.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>
              <span className="font-semibold text-white">Ticket-Triage:</span>{' '}
              Auto-route, prioritize, and tag support tickets—no manual sorting.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>
              <span className="font-semibold text-white">Minutes Bot:</span>{' '}
              Turn meeting recordings into action items and summaries instantly.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>
              <span className="font-semibold text-white">ROI Calculator:</span>{' '}
              Show the value of automation to your team in dollars saved per week.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <p>Stripe checkout, instant access, cancel anytime.</p>
          </li>
        </ul>

        {/* Primary CTA */}
        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/signup"
            className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#0B1220] hover:bg-slate-200"
          >
            Get started
          </Link>
          <Link
            href="/kit"
            className="rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
          >
            Go to Kit
          </Link>
        </div>

        {/* Anti-risk / urgency microcopy under CTA */}
        <UrgencyBar />

        {/* Social proof / compatibility */}
        <SocialProof />

        {/* Who it's for (targeting band) */}
        <WhoFor />

        {/* Core Product Section — Zapier Kits */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Core Product — Automation Kits</h2>
          <p className="mt-2 text-slate-300">
            Ready-to-deploy Zapier automation kits for your team. Click any link to review and install.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://zapier.com/shared/a1069af5783b0ed010ef9a6a95d3790cff028594"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold">Email-Drafter</h3>
              <p className="mt-1 text-sm text-slate-300">
                Drafts email replies automatically based on incoming messages and context.
              </p>
              <p className="mt-2 text-xs text-emerald-400 font-medium">View Zap →</p>
            </a>

            <a
              href="https://zapier.com/shared/80d11bf46db39d1a253079845a8bc308720c86a4"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold">Ticket-Triage</h3>
              <p className="mt-1 text-sm text-slate-300">
                Auto-routes incoming tickets to the correct Slack channel with priority and context.
              </p>
              <p className="mt-2 text-xs text-emerald-400 font-medium">View Zap →</p>
            </a>

            <a
              href="https://zapier.com/shared/80747cc7d68fef7c91f3d8350bcedc728572ec62"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold">Minutes Bot</h3>
              <p className="mt-1 text-sm text-slate-300">
                Summarizes meeting notes and saves structured minutes into Notion.
              </p>
              <p className="mt-2 text-xs text-emerald-400 font-medium">View Zap →</p>
            </a>
          </div>
        </div>

        {/* Support & Enablement Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Support & Enablement</h2>
          <p className="mt-2 text-slate-300">
            Quick-start guides, video tutorials, and ROI tools to help you get the most value.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://drive.google.com/file/d/1XnSlamDdMrKkLMxmM7YCnHDGYKHu1ur-/view"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold">Quick-Start: Email PDF</h3>
              <p className="mt-1 text-sm text-slate-300">
                Step-by-step guide to set up Email-Drafter in your workflow.
              </p>
              <p className="mt-2 text-xs text-sky-400 font-medium">Open PDF →</p>
            </a>

            <a
              href="https://drive.google.com/file/d/1RPeWl-BXa4VYNdLyV1gdPJnTdjZM_6Q2/view"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold">Quick-Start: Ticket PDF</h3>
              <p className="mt-1 text-sm text-slate-300">
                Fast setup for Ticket-Triage and integration with your support stack.
              </p>
              <p className="mt-2 text-xs text-sky-400 font-medium">Open PDF →</p>
            </a>

            <a
              href="https://drive.google.com/file/d/1UQwMdqb_cWpddWPSBt-wuJlrhpDnt17F/view"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold">Quick-Start: Minutes PDF</h3>
              <p className="mt-1 text-sm text-slate-300">
                Get Minutes Bot up and running with your calendar and note-taking tools.
              </p>
              <p className="mt-2 text-xs text-sky-400 font-medium">Open PDF →</p>
            </a>

            <a
              href="https://docs.google.com/spreadsheets/d/1tDWoQfRtlBnBBgkxubew4bTq78p22JQuXzufNskWyD4/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold">ROI Calculator</h3>
              <p className="mt-1 text-sm text-slate-300">
                Estimate hours saved and cost reduction to justify the investment to leadership.
              </p>
              <p className="mt-2 text-xs text-sky-400 font-medium">Open Sheet →</p>
            </a>

            <a
              href="https://www.loom.com/share/b6bd919be075401495293a6959c8cc90"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold">Loom Tutorial: Email</h3>
              <p className="mt-1 text-sm text-slate-300">
                Video walkthrough of Email-Drafter setup and best practices.
              </p>
              <p className="mt-2 text-xs text-sky-400 font-medium">Watch Video →</p>
            </a>

            <a
              href="https://www.loom.com/share/03849fc57c9545b4a9bbc8e1df1aa272"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold">Loom Tutorial: Ticket</h3>
              <p className="mt-1 text-sm text-slate-300">
                Video guide for Ticket-Triage configuration and Slack channel mapping.
              </p>
              <p className="mt-2 text-xs text-sky-400 font-medium">Watch Video →</p>
            </a>

            <a
              href="https://www.loom.com/share/8066bc82f3a542f8a43714bd0982523b"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold">Loom Tutorial: Minutes</h3>
              <p className="mt-1 text-sm text-slate-300">
                Video walkthrough of Minutes Bot connection and automated summary setup.
              </p>
              <p className="mt-2 text-xs text-sky-400 font-medium">Watch Video →</p>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-14 flex items-center justify-center gap-6 border-t border-white/10 pt-6 text-sm text-slate-400">
          <Link href="/privacy" className="hover:text-slate-200">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-slate-200">
            Terms
          </Link>
        </footer>
      </div>
    </main>
  );
}
