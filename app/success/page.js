// app/success/page.js
import Link from "next/link";

export default function Success() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">
        Payment received <span role="img" aria-label="check">✅</span>
      </h1>
      <p className="mt-2 text-slate-500">
        Thanks we&rsquo;ll activate your BottleKit AI access shortly.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Back to home
        </Link>

        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/10"
        >
          View dashboard
        </Link>
      </div>
    </main>
  );
}
