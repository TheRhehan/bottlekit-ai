// app/account/page.jsx
export default function AccountPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-4 text-2xl font-semibold text-white">Account Settings</h1>
      <p className="mb-8 text-slate-400">
        Manage your BottleKit AI account, preferences, and access.
      </p>

      <div className="space-y-6 text-slate-300">
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <p><strong>Email:</strong> user@example.com</p>
          <p><strong>Plan:</strong> Free Trial</p>
          <p><strong>Status:</strong> Active</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-500 transition">
            Upgrade Plan
          </button>
          <button className="rounded-xl border border-slate-600 px-4 py-3 hover:bg-slate-700 transition">
            Manage Billing
          </button>
          <button className="rounded-xl border border-red-600 text-red-400 px-4 py-3 hover:bg-red-600 hover:text-white transition">
            Cancel Account
          </button>
        </div>
      </div>
    </main>
  );
}
