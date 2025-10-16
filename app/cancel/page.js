export default function Cancel() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-3xl font-semibold mb-2">Checkout canceled</h1>
        <p className="text-slate-400 mb-6">You can resume anytime.</p>
        <a href="/" className="underline">Back to home</a>
      </div>
    </main>
  );
}
