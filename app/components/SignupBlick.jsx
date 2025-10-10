// app/components/SignupBlock.jsx
"use client";
import { useEffect, useState } from "react";

export const TERMS_VERSION = "bk_terms_v1"; // bump when you change terms text
export const TERMS_DATE = "2025-10-09";

export default function SignupBlock() {
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(TERMS_VERSION) === TERMS_DATE;
    if (accepted) setAgree(true);
  }, []);

  const handleSubmit = (e) => {
    if (!agree) {
      e.preventDefault();
      alert("You must agree to the Terms to continue.");
      return;
    }
    localStorage.setItem(TERMS_VERSION, TERMS_DATE);
    localStorage.setItem("bk_terms_accepted_at", new Date().toISOString());
    // proceed with your normal signup — if you have a form action, it will submit.
  };

  return (
    <section className="mx-auto max-w-xl rounded-2xl border p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">Get Started</h2>
      <p className="mb-6 text-sm text-slate-600">
        Start automating in minutes. No credit card required for the trial.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Replace with your real inputs if needed */}
        {/* <input className="w-full rounded border px-3 py-2" placeholder="Email" /> */}

        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
          <span>
            I agree to the{" "}
            <a className="underline" href="/terms" target="_blank" rel="noreferrer">
              Terms of Use & License Agreement
            </a>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={!agree}
          className={`w-full rounded-xl px-4 py-3 text-white transition
            ${agree ? "bg-black hover:opacity-90" : "bg-gray-400 cursor-not-allowed"}`}
        >
          Create Account / Get Access
        </button>
      </form>
    </section>
  );
}
