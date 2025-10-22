// /components/Hero.jsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* top gradient wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_70%_0%,rgba(129,140,248,0.18),rgba(2,6,23,0)_70%)]" />

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        {/* eyebrow */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          <span>AI Operations • Ready-to-run Kits</span>
        </div>

        {/* heading */}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Automate support & ops in minutes—plug-and-play AI
          <br />
          kits that actually ship.
        </h1>

        {/* lead */}
        <p className="mt-6 max-w-2xl text-lg leading-7 text-white/70">
          BottleKit gives you a dashboard of prebuilt automations: draft emails, triage
          tickets, summarize meetings, calculate ROI, and more—without wiring up prompts
          or code. Turn it on and get time back today.
        </p>

        {/* bullets */}
        <ul className="mt-8 space-y-3 text-white/80">
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <div>
              <strong className="text-white">Email-Drafter:</strong>{" "}
              Reply to customers in your tone with context pulled from the thread.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <div>
              <strong className="text-white">Ticket-Triage:</strong>{" "}
              Auto-route, prioritize, and tag support tickets—no manual sorting.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <div>
              <strong className="text-white">Minutes Bot:</strong>{" "}
              Turn meeting recordings into action items and summaries instantly.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <div>
              <strong className="text-white">ROI Calculator:</strong>{" "}
              Show the value of automation to your team in dollars saved per week.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <div>Stripe checkout, instant access, cancel anytime.</div>
          </li>
        </ul>

        {/* CTA row (primary only, no “free” text, no secondary button) */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center rounded-xl border border-white/10 bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Get started
          </Link>
        </div>

        {/* feature tiles (unchanged) */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-semibold text-white">Email-Drafter</h3>
            <p className="mt-2 text-sm text-white/70">
              Draft customer replies in one click with thread context and your brand tone.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-semibold text-white">Ticket-Triage</h3>
            <p className="mt-2 text-sm text-white/70">
              Auto-tag, prioritize, and route support tickets to the right owner.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-semibold text-white">Minutes Bot</h3>
            <p className="mt-2 text-sm text-white/70">
              Upload meeting audio and get clean summaries, action items, and owners.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-semibold text-white">ROI Calculator</h3>
            <p className="mt-2 text-sm text-white/70">
              Estimate hours saved and cost reduction from each kit to share with stakeholders.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-semibold text-white">Quick-Start Zaps</h3>
            <p className="mt-2 text-sm text-white/70">
              Prebuilt Zapier recipes to connect your tools in minutes—no prompt wrangling.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-semibold text-white">Guided Setup</h3>
            <p className="mt-2 text-sm text-white/70">
              Short Looms walk you from zero to value. Hit “Open kit”.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
