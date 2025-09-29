// app/terms/page.js  (Server Component — no "use client")

import Link from "next/link";

export const metadata = {
  title: "Terms of Service | BottleKit AI",
  description: "Terms and conditions for using BottleKit AI.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-slate-200">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4 text-slate-400 text-sm">Last updated: Sept 2025</p>

      <section className="space-y-4 leading-7">
        <p>
          By accessing or using BottleKit AI you agree to these Terms.
          If you do not agree, do not use the service.
        </p>

        <h2 className="text-xl font-semibold mt-6">Accounts</h2>
        <p>You are responsible for your account and all activity under it.</p>

        <h2 className="text-xl font-semibold mt-6">Acceptable Use</h2>
        <p>No illegal, harmful, or abusive activity.</p>

        <h2 className="text-xl font-semibold mt-6">Limitation of Liability</h2>
        <p>BottleKit AI is provided “as is” without warranties of any kind.</p>

        <h2 className="text-xl font-semibold mt-6">Changes</h2>
        <p>We may revise these Terms. Continued use means you accept updates.</p>
      </section>

      <div className="mt-10">
        <Link href="/" className="text-sky-400 hover:underline">← Back home</Link>
      </div>
    </main>
  );
}
