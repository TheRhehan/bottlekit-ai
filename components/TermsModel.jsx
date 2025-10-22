'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TermsModal({ open, onClose }) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!open) setAgreed(false);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* modal */}
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold">Before you continue</h2>
        <p className="mt-2 text-slate-300">
          Please agree to our{' '}
          <Link href="/terms" className="underline hover:text-white">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>
          .
        </p>

        <label className="mt-4 flex items-start gap-3 text-slate-200">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>I agree to the Terms and Privacy Policy.</span>
        </label>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!agreed}
            onClick={() => router.push('/signup')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              agreed
                ? 'bg-white text-slate-900 hover:bg-slate-200'
                : 'bg-white/20 text-slate-400 cursor-not-allowed'
            }`}
          >
            Continue to sign up
          </button>
        </div>
      </div>
    </div>
  );
}
