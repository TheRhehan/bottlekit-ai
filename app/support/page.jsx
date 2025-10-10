// app/support/page.jsx
"use client";
import { useState } from "react";

export default function SupportPage() {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    setTimeout(() => setStatus("✅ Ticket submitted successfully! We’ll be in touch soon."), 1000);
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-4 text-2xl font-semibold text-white">Support / Contact</h1>
      <p className="mb-8 text-slate-400">
        Need help? Reach out directly or submit a support ticket below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-slate-300">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          required
        />
        <textarea
          placeholder="Describe your issue..."
          rows="4"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          required
        ></textarea>

        <button
          type="submit"
          className="rounded-xl bg-green-600 px-4 py-3 text-white hover:bg-green-500 transition"
        >
          Submit Ticket
        </button>

        {status && (
          <p className="text-sm text-slate-400 mt-2">{status}</p>
        )}
      </form>

      <div className="mt-8 border-t border-slate-700 pt-6 text-slate-400 text-sm">
        <p>Or email us directly at <a href="mailto:support@bottlekit.ai" className="underline">support@bottlekit.ai</a></p>
      </div>
    </main>
  );
}
