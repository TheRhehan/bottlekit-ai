// app/components/SignupBlock.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const TERMS_VERSION = "bk_terms_v1";   // bump when terms change
export const TERMS_DATE = "2025-10-09";       // update when you revise terms

export default function SignupBlock() {
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accepted = localStorage.getItem(TERMS_VERSION) === TERMS_DATE;
    if (accepted) setAgree(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // stop default form reload
    if (!agree) {
      alert("You must agree to the Terms to continue.");
      return;
    }
    localStorage.setItem(TERMS_VERSION, TERMS_DATE);
    localStorage.setItem("bk_terms_accepted_at", new Date().toISOString());
    router.push("/portal"); // go to portal
  };

  return (
    <section className="mx-auto max-w-xl rounded-2xl border p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">Get Started</h2>
      <p className="mb-6 text-sm text-slate-600">
        Start automating in minutes. No credit card required for the trial.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              Terms of Use &amp; License Agreement
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
