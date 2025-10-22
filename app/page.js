'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TermsModal from '@/components/TermsModal';

export default function Page() {
  const [openTerms, setOpenTerms] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Top nav */}
      <Header onGetStarted={() => setOpenTerms(true)} />

      {/* Hero */}
      <Hero onGetStarted={() => setOpenTerms(true)} />

      {/* Footer (simple) */}
      <footer className="border-t border-white/10 mt-20">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} BottleKit AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Terms gate (only when user clicks Get started) */}
      <TermsModal open={openTerms} onClose={() => setOpenTerms(false)} />
    </div>
  );
}
