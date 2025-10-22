// /components/Header.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0B1220]/70 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/bottlekit-logo.png"
            alt="BottleKit AI"
            width={120}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Right: Auth actions */}
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md bg-white px-3.5 py-1.5 text-sm font-semibold text-[#0B1220] hover:bg-slate-200"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
