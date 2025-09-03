export default function Cancel() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">Checkout canceled</h1>
      <p className="mt-2 text-slate-500">No worries—you weren’t charged.</p>
      <a href="/" className="inline-flex items-center mt-6 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500">
        Try again
      </a>
    </main>
  );
}
