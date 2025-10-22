'use client';

import Link from 'next/link';

export default function Header({ onGetStarted }) {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Left — Logo only (keep) */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-white"></div>
          <span className="text-white font-semibold">BottleKit&nbsp;AI</span>
        </Link>

        {/* Right — Log in + Get started (keep) */}
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-slate-300 hover:text-white transition-colors px-3 py-2 text-sm"
          >
            Log in
          </Link>
          <button
            onClick={onGetStarted}
            className="rounded-lg bg-white text-slate-900 hover:bg-slate-200 transition-colors px-4 py-2 text-sm font-medium"
          >
            Get started
          </button>
        </nav>
      </div>
    </header>
  );
}
