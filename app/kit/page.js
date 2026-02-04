'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { KIT_STRIPE_CHECKOUT_URL } from '@/lib/consts';

export default function KitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [kits, setKits] = useState([]);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        const user = auth?.user;

        if (!user) {
          router.replace('/login?redirect=/kit');
          return;
        }

        if (!mounted) return;

        const email = (user.email || '').trim();
        const hasPaid = email
          ? (await fetch(`/api/entitlement?email=${encodeURIComponent(email)}`).then((r) => r.json()).then((d) => !!d?.isPaid))
          : false;

        if (!mounted) return;

        setPaid(hasPaid);

        if (hasPaid) {
          const res = await fetch('/api/kits');
          if (res.ok) {
            const { items } = await res.json();
            if (mounted) setKits(Array.isArray(items) ? items : []);
          }
        } else {
          setKits([]);
        }
      } catch {
        setPaid(false);
        setKits([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-slate-400">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative mx-auto w-full max-w-3xl px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">
            ← Back to home
          </Link>
        </div>

        {!paid ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h1 className="text-2xl font-semibold text-white">Access Required</h1>
            <p className="mt-2 text-slate-300">
              You need an active purchase to access the automation kits.
            </p>
            <a
              href={KIT_STRIPE_CHECKOUT_URL}
              className="mt-6 inline-flex rounded-xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-300"
            >
              Unlock Access
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-white">Your Automation Kits</h1>
            <p className="mt-2 text-slate-300">
              Your BottleKit automation kits are available below.
            </p>

            <div className="mt-6 grid gap-4">
              {kits.map((kit) => (
                <div
                  key={kit.id || kit.title}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
                >
                  <h2 className="text-lg font-semibold text-white">{kit.title}</h2>
                  {kit.desc && (
                    <p className="mt-1 text-sm text-slate-300">{kit.desc}</p>
                  )}
                  {kit.href && (
                    <a
                      href={kit.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
                    >
                      Open kit
                    </a>
                  )}
                </div>
              ))}
              {kits.length === 0 && (
                <p className="text-slate-400">No kits available yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
