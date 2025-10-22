'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/60 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/bottlekit-logo.png"
            alt="BottleKit AI"
            width={28}
            height={28}
            priority
            className="h-7 w-7 rounded"
          />
          <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
            BottleKit AI
          </span>
        </Link>

        {/* Right: Auth CTAs */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="px-3 py-1.5 rounded-md bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
