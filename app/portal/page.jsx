// app/portal/page.jsx

export default function PortalPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <p className="mb-8 text-slate-400">
        Welcome to the BottleKit AI portal. Choose what you’d like to manage below.
      </p>

      <ul className="space-y-4 text-slate-300">
        <li>
          <a
            href="/kits"
            className="block rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 hover:bg-slate-700 transition"
          >
            🧩 See Kits
          </a>
        </li>
        <li>
          <a
            href="/account"
            className="block rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 hover:bg-slate-700 transition"
          >
            👤 Account Settings
          </a>
        </li>
        <li>
          <a
            href="/support"
            className="block rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 hover:bg-slate-700 transition"
          >
            💬 Support / Contact
          </a>
        </li>
      </ul>
    </main>
  );
}
