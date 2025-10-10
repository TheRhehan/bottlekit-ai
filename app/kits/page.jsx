// app/kits/page.jsx
export default function KitsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-4 text-2xl font-semibold text-white">Your Automation Kits</h1>
      <p className="mb-8 text-slate-400">
        View, deploy, or request new BottleKit AI automation kits.
      </p>

      <ul className="space-y-4 text-slate-300">
        <li className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 hover:bg-slate-700 transition">
          🧩 <strong>Client Onboarding Automation</strong>
          <p className="text-slate-400 text-sm mt-1">
            Automatically collect client info, send welcome emails, and assign tasks.
          </p>
        </li>
        <li className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 hover:bg-slate-700 transition">
          💬 <strong>AI Email Drafter Workflow</strong>
          <p className="text-slate-400 text-sm mt-1">
            Auto-generate professional replies and updates using your company tone.
          </p>
        </li>
        <li className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 hover:bg-slate-700 transition">
          📊 <strong>ROI Calculator for Automations</strong>
          <p className="text-slate-400 text-sm mt-1">
            Estimate time saved and revenue impact per automation workflow.
          </p>
        </li>
      </ul>
    </main>
  );
}
