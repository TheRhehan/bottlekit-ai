export default function Success() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">Payment received ✅</h1>
      <p className="mt-2 text-slate-500">
        Thanks! We’ll activate your BottleKit AI access shortly.
      </p>

      <div className="mt-6 flex gap-3">
        <a
          href="/"
          className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Back to home
        </a>
        <a
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/10"
        >
          View dashboard
        </a>
      </div>
    </main>
  );
}
