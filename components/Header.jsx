"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo (uses /public/bottlekit-logo.png) */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/bottlekit-logo.png"
              alt="BottleKit AI"
              width={28}
              height={28}
              className="rounded-md"
              priority
            />
            <span className="sr-only">BottleKit AI</span>
          </Link>

          {/* Right-side actions */}
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
      </div>
    </header>
  );
}
