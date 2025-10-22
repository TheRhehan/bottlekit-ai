'use client';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative">
      {/* subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[28rem] w-[50rem] rounded-full bg-fuchsia-500/20 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="max-w-2xl">
          {/* small eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            AI Operations • Ready-to-run Kits
          </div>

          <h1 className="mt-5 text-4xl/tight font-semibold sm:text-5xl/tight">
            Automate your workflows in minutes—no setup, just plug-and-play kits.
          </h1>

          <p className="mt-4 text-slate-300 text-lg">
            Email drafting, ticket triage, meeting minutes and more—all in one
            dashboard. Ship automations that actually work, without writing code.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-slate-900 hover:bg-slate-200 transition-colors"
            >
              Get started — free
            </button>
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition-colors px-3 py-2"
            >
              See what’s inside
            </a>
          </div>

          {/* bullets */}
          <ul className="mt-8 grid gap-3 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              One-click access unlocks all kits after purchase
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              Secure checkout • Stripe
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              No lock-in — cancel anytime
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
