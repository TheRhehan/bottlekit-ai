"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { STRIPE_URL } from "@/lib/consts";

const BRAND = {
  name: "BottleKit",
  sub: "Your automation kits hub",
};

const KITS = [
  {
    id: "ticket-triage",
    title: "Ticket Triage → Slack",
    subtitle: "Auto-route inbound tickets to the right Slack channel with context + priority.",
    href: "https://zapier.com/",
    badge: "Support & Ops",
    status: "Ready",
  },
  {
    id: "meeting-minutes",
    title: "Meeting Minutes → Notion",
    subtitle: "Capture meeting notes and push structured minutes into Notion automatically.",
    href: "https://zapier.com/",
    badge: "Ops",
    status: "Ready",
  },
  {
    id: "lead-capture",
    title: "Lead Capture → Airtable",
    subtitle: "Turn form submissions into enriched leads in Airtable with tags + routing.",
    href: "https://zapier.com/",
    badge: "Sales",
    status: "Ready",
  },
  {
    id: "followup-sequence",
    title: "Follow-up Email Sequence",
    subtitle: "Trigger a clean follow-up sequence after a lead is captured (no manual chasing).",
    href: "https://zapier.com/",
    badge: "Sales",
    status: "Ready",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        const user = auth?.user;

        if (!user) {
          router.push("/login");
          return;
        }

        if (!mounted) return;

        setEmail(user.email || null);

        const { data: profile } = await supabase
          .from("profiles")
          .select("paid")
          .eq("id", user.id)
          .single();

        if (!mounted) return;

        setPaid(Boolean(profile?.paid));
      } catch (e) {
        setPaid(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [router]);

  const unlockedKits = useMemo(() => KITS, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <TopBar email={email} paid={paid} loading={loading} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <Sidebar paid={paid} />
          </aside>

          <main className="lg:col-span-9">
            <div className="rounded-2xl border border-slate-800 bg-[#0B1020] p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight">
                    Your Kits
                  </h1>
                  <p className="mt-1 text-sm text-slate-300">
                    {paid
                      ? "Access granted. Open a kit, then bookmark the links."
                      : "Locked until purchase. Unlock instant access below."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {paid ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/60 bg-emerald-950/40 px-3 py-1 text-xs text-emerald-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                      Access Active
                    </span>
                  ) : (
                    <a
                      href={STRIPE_URL}
                      className="inline-flex items-center justify-center rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300 active:bg-sky-200"
                    >
                      Unlock Access
                    </a>
                  )}

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-[#070A12] px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900/50"
                  >
                    Back to site
                  </Link>
                </div>
              </div>

              {!paid && (
                <div className="mt-4 rounded-xl border border-slate-800 bg-[#070A12] p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-100">
                        Unlock all kits + templates
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        After checkout, you’ll be redirected back here and everything unlocks.
                      </p>
                    </div>
                    <a
                      href={STRIPE_URL}
                      className="inline-flex items-center justify-center rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300 active:bg-sky-200"
                    >
                      Go to Checkout
                    </a>
                  </div>
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {unlockedKits.map((kit) => (
                  <KitCard key={kit.id} kit={kit} locked={!paid} />
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-slate-800 bg-[#070A12] p-4">
                <p className="text-sm font-semibold text-slate-100">Pro tip</p>
                <p className="mt-1 text-sm text-slate-300">
                  Once you open a kit, bookmark it. These links are your “control panel” for each automation.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <MiniCard
                title="Need help installing?"
                body="If you want, I can add a simple “Setup Guide” section for each kit (2–4 steps)."
              />
              <MiniCard
                title="Want a real portal later?"
                body="This MVP is fine. Later we can replace Zapier links with a guided installer + usage tracking."
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function TopBar({ email, paid, loading }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-[#0B1020] p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500"></div>
          <div>
            <p className="text-sm text-slate-300">{BRAND.sub}</p>
            <p className="text-lg font-semibold tracking-tight">{BRAND.name} Dashboard</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-xl border border-slate-800 bg-[#070A12] px-3 py-2 text-sm text-slate-200">
          {loading ? "Loading…" : email || "Signed in"}
        </span>

        <span className="rounded-xl border border-slate-800 bg-[#070A12] px-3 py-2 text-sm text-slate-200">
          {loading ? "…" : paid ? "Paid" : "Free"}
        </span>
      </div>
    </div>
  );
}

function Sidebar({ paid }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1020] p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-100">Quick Links</p>

      <div className="mt-3 grid gap-2">
        <Link
          href="/"
          className="rounded-xl border border-slate-800 bg-[#070A12] px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900/50"
        >
          Marketing Site
        </Link>

        <Link
          href="/terms"
          className="rounded-xl border border-slate-800 bg-[#070A12] px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900/50"
        >
          Terms
        </Link>

        <Link
          href="/privacy"
          className="rounded-xl border border-slate-800 bg-[#070A12] px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900/50"
        >
          Privacy
        </Link>

        {!paid && (
          <a
            href={STRIPE_URL}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-sky-400 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300 active:bg-sky-200"
          >
            Unlock Access
          </a>
        )}
      </div>

      <div className="mt-5 rounded-xl border border-slate-800 bg-[#070A12] p-4">
        <p className="text-sm font-semibold text-slate-100">Status</p>
        <p className="mt-1 text-sm text-slate-300">
          {paid ? "Access active. You’re good." : "Locked. Purchase to unlock."}
        </p>
      </div>
    </div>
  );
}

function KitCard({ kit, locked }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#070A12] p-5 hover:bg-slate-900/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-slate-300">{kit.badge}</p>
          <h3 className="mt-1 text-base font-semibold text-slate-100">{kit.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{kit.subtitle}</p>
        </div>

        <span className="shrink-0 rounded-full border border-slate-800 bg-[#0B1020] px-3 py-1 text-xs text-slate-200">
          {kit.status}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          disabled={locked}
          onClick={() => window.open(kit.href, "_blank")}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            locked
              ? "cursor-not-allowed border border-slate-800 bg-slate-900/40 text-slate-400"
              : "bg-sky-400 text-slate-950 hover:bg-sky-300 active:bg-sky-200"
          }`}
        >
          {locked ? "Locked" : "Open Kit"}
        </button>

        <span className="text-xs text-slate-400">
          {locked ? "Unlock to access link" : "Opens in new tab"}
        </span>
      </div>

      {locked && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#070A12] opacity-80"></div>
      )}
    </div>
  );
}

function MiniCard({ title, body }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1020] p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-100">{title}</p>
      <p className="mt-2 text-sm text-slate-300">{body}</p>
    </div>
  );
}
