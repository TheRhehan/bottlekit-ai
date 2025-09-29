// app/refund/page.js  (Server Component — no "use client")

import Link from "next/link";

export const metadata = {
  title: "Refund Policy | BottleKit AI",
  description: "How refunds work for BottleKit AI purchases.",
};

export default function RefundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-slate-200">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      <p className="mb-4 text-slate-400 text-sm">Last updated: Sept 2025</p>

      <section className="space-y-4 leading-7">
        <p>
          If something isn’t right, contact us within 14 days of purchase and
          we’ll work with you. Approved refunds are processed to your original
          payment method. Some exclusions may apply for misuse or abuse.
        </p>
        <p>
          Email <a className="underline" href="mailto:support@yourdomain.com">support@yourdomain.com</a> with your order
          email and receipt for assistance.
        </p>
      </section>

      <div className="mt-10">
        <Link href="/" className="text-sky-400 hover:underline">← Back home</Link>
      </div>
    </main>
  );
}
