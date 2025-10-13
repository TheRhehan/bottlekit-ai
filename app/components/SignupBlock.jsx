"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TERMS_VERSION = "bk_terms_v1";
const TERMS_DATE = "2025-10-09";

export default function SignupBlock() {
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem(TERMS_VERSION) === TERMS_DATE) {
      router.replace("/dashboard"); // already accepted → skip to dashboard
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) return;
    localStorage.setItem(TERMS_VERSION, TERMS_DATE);
    localStorage.setItem("bk_terms_accepted_at", new Date().toISOString());
    router.push("/dashboard"); // <<< was /portal, change to /dashboard
  };

  return (
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
          </a>.
        </span>
      </label>

      <button
        type="submit"
        disabled={!agree}
        className={`w-full rounded-xl px-4 py-3 text-white transition ${
          agree ? "bg-black hover:opacity-90" : "bg-gray-500 cursor-not-allowed"
        }`}
      >
        Create Account / Get Access
      </button>
    </form>
  );
}
