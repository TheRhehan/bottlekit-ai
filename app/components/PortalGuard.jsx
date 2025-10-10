// app/components/PortalGuard.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TERMS_VERSION, TERMS_DATE } from "./SignupBlock";

export default function PortalGuard({ children }) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(TERMS_VERSION) === TERMS_DATE;
    setOk(!!accepted);
  }, []);

  if (!ok) {
    return (
      <main className="mx-auto max-w-lg px-6 py-12">
        <h1 className="mb-2 text-2xl font-semibold">Accept Terms to Continue</h1>
        <p className="mb-6 text-slate-600">
          You need to accept the BottleKit AI Terms before accessing the portal.
        </p>
        <div className="space-x-3">
          <Link
            href="/terms"
            target="_blank"
            className="inline-block rounded-xl bg-black px-4 py-3 text-white"
          >
            Read Terms
          </Link>
          <button
            onClick={() => {
              localStorage.setItem(TERMS_VERSION, TERMS_DATE);
              localStorage.setItem("bk_terms_accepted_at", new Date().toISOString());
              setOk(true);
            }}
            className="inline-block rounded-xl border px-4 py-3"
          >
            I Agree
          </button>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
