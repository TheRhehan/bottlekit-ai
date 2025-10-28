"use client";

import Link from "next/link";
import { STRIPE_URL } from "@/lib/consts";

export default function PricingDashboard() {
  return (
    <section className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <h3 className="text-lg font-semibold text-white">Pricing</h3>
        <p className="mt-1 text-sm text-white/70">Own the kits outright or pay monthly.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-white font-semibold">Starter (Monthly)</div>
            <div className="mt-1 text-2xl font-bold text-white">$49<span className="text-sm text-white/60">/mo</span></div>
            <ul className="mt-3 space-y-1 text-sm text-white/70">
              <li>• Access to core kits</li>
              <li>• Updates included</li>
              <li>• Cancel anytime</li>
            </ul>
            <Link href={STRIPE_URL} className="mt-4 inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100">
              Choose Monthly
            </Link>
          </div>

          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
            <div className="text-white font-semibold">One-time (Best value)</div>
            <div className="mt-1 text-2xl font-bold text-white">$399</div>
            <ul className="mt-3 space-y-1 text-sm text-white/70">
              <li>• All kits unlocked</li>
              <li>• Updates included</li>
              <li>• No subscription</li>
            </ul>
            <Link href={STRIPE_URL} className="mt-4 inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100">
              Buy One-time
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
