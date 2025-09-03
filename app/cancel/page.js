// app/cancel/page.js
import Link from "next/link";

export default function Cancel() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">Checkout canceled</h1>
      <p className="mt-2 text-slate-500">
        No worries — you weren&rsquo;t charged.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
      >
        Try again
      </Link>
    </main>
  );
}
