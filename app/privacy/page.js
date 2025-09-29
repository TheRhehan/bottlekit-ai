// app/privacy/page.js  (Server Component — no "use client")

import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | BottleKit AI",
  description: "How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-slate-200">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-slate-400 text-sm">Last updated: Sept 2025</p>

      <section className="space-y-4 leading-7">
        <p>
          We collect the minimum information needed to operate BottleKit AI,
          including payment and basic contact details. We do not sell your data.
        </p>
        <h2 className="text-xl font-semibold mt-6">What we collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Account info (name, email) if you create an account</li>
          <li>Payment info is processed by Stripe; we don’t store card numbers</li>
          <li>Usage analytics to improve the product</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">How we use data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and support BottleKit AI</li>
          <li>To communicate important product or billing updates</li>
          <li>To detect, prevent, and respond to abuse or fraud</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Contact</h2>
        <p>
          Questions? Email <a className="underline" href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
        </p>
      </section>

      <div className="mt-10">
        <Link href="/" className="text-sky-400 hover:underline">← Back home</Link>
      </div>
    </main>
  );
}
