// app/thank-you/page.js  (Server Component — no "use client")

import Link from "next/link";

export const metadata = {
  title: "Thank you | BottleKit AI",
  description: "Purchase successful — access unlocked.",
};

export default function ThankYouPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-slate-200">
      <h1 className="text-3xl font-bold mb-3">Thank you! 🎉</h1>
      <p className="text-slate-300">
        Your purchase was successful. You now have access to the kit and setup links.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/dashboard"
          className="rounded-lg bg-sky-500/90 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
        >
          Go to dashboard
        </Link>
        <Link href="/" className="text-sky-400 hover:underline">
          Back home
        </Link>
      </div>
    </main>
  );
}
