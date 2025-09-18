'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Zap,
  FileText,
  PlayCircle,
  Table2,
  Lock,
  CheckCircle2,
  Sparkles,
  LogIn,
  LogOut,
  ArrowRight,
  Shield,
} from 'lucide-react';

/* ---------------------------------------------------------
   LIVE DATA: read resources from Google Sheet (gviz JSON)
   --------------------------------------------------------- */

const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_JSON_URL; // must be set in Vercel

async function fetchSheetResources() {
  if (!SHEET_URL) throw new Error('Missing NEXT_PUBLIC_SHEET_JSON_URL');

  const res = await fetch(SHEET_URL, { cache: 'no-store' });
  const text = await res.text();

  // gviz JSON is wrapped with "google.visualization.Query.setResponse({...});"
  const json = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));

  // Create a map of column name -> index
  const cols = json.table.cols.map((c) => (c.label || c.id || '').toLowerCase());
  const idx = (name) => cols.indexOf(name);

  // Helper to safely retrieve cell values by index
  const cell = (i) => (i >= 0 && i < cells.length && cells[i] && cells[i].v != null ? cells[i].v : '');

  const rows =
    (json.table.rows || [])
      .filter((r) => r && r.c)
      .map((r) => {
        const cells = r.c || [];
        return {
          id: Number(cell(idx('id'))) || undefined,
          title: String(cell(idx('title')) || ''),
          type: String(cell(idx('type')) || '').toLowerCase(),
          url: String(cell(idx('url')) || ''),
          desc: String(cell(idx('desc')) || ''),
          sort: Number(cell(idx('sort'))) || 0,
          group: String(cell(idx('group')) || '').toLowerCase(),
          data: cell(idx('data')) ?? null,
        };
      });

  return rows;
}

// tiny hook so components can use the live rows
function useResources() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetchSheetResources()
      .then((r) => {
        if (!cancelled) setRows(r);
      })
      .catch((err) => console.error('Sheet load failed:', err));

    return () => {
      cancelled = true;
    };
  }, []);

  return rows;
}

/* -------------------------
   Small helper UI bits
   ------------------------- */

function typeToIcon(type) {
  switch (type) {
    case 'zap':
      return <Zap className="h-5 w-5" />;
    case 'pdf':
      return <FileText className="h-5 w-5" />;
    case 'video':
      return <PlayCircle className="h-5 w-5" />;
    case 'sheet':
      return <Table2 className="h-5 w-5" />;
    default:
      return <Sparkles className="h-5 w-5" />;
  }
}

function typeToButtonLabel(type) {
  switch (type) {
    case 'zap':
      return 'Import to Zapier';
    case 'pdf':
      return 'Open Quick-Start';
    case 'video':
      return 'Watch Tutorial';
    case 'sheet':
      return 'Open ROI Calculator';
    default:
      return 'Open';
  }
}

/* ---------------------------------------------------------
   MAIN COMPONENT
   --------------------------------------------------------- */

export default function BottlekitAIClientPortal() {
  const [route, setRoute] = useState('landing'); // landing | login | signup | dashboard
  const [isPaid, setIsPaid] = useState(false);
  const [user, setUser] = useState(null); // {email}

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header
        route={route}
        setRoute={setRoute}
        user={user}
        setUser={setUser}
        isPaid={isPaid}
        setIsPaid={setIsPaid}
      />
      {route === 'landing' && <Landing setRoute={setRoute} user={user} />}
      {route === 'login' && (
        <Auth
          type="login"
          onSuccess={(email) => {
            setUser({ email });
            setRoute('dashboard');
          }}
        />
      )}
      {route === 'signup' && (
        <Auth
          type="signup"
          onSuccess={(email) => {
            setUser({ email });
            setRoute('dashboard');
          }}
        />
      )}
      {route === 'dashboard' && <Dashboard isPaid={isPaid} grantPaid={() => setIsPaid(true)} />}
      <footer />
    </div>
  );
}

/* -------------------------
   UI sections
   ------------------------- */

function Header({ route, setRoute, user, setUser, isPaid, setIsPaid }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div
          className="font-semibold tracking-tight text-lg"
          onClick={() => setRoute('landing')}
          role="button"
        >
          BottleKit AI
        </div>

        <nav className="flex items-center gap-2">
          <button onClick={() => setRoute('landing')} className={navBtn(route === 'landing')}>
            Home
          </button>
          <button onClick={() => setRoute('dashboard')} className={navBtn(route === 'dashboard')}>
            Dashboard
          </button>

          {!user ? (
            <>
              <button onClick={() => setRoute('login')} className={navBtn(false)}>
                <LogIn className="mr-1 h-4 w-4 inline" />
                Sign in
              </button>
              <button
                onClick={() => setRoute('signup')}
                className="ml-1 inline-flex items-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium shadow hover:bg-blue-500 active:translate-y-px"
              >
                Create account
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setUser(null);
                setIsPaid(false);
                setRoute('landing');
              }}
              className={navBtn(false)}
            >
              <LogOut className="mr-1 h-4 w-4 inline" />
              Sign out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

function navBtn(active) {
  return `inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium transition border ${
    active ? 'bg-white/10 border-white/15' : 'border-white/10 hover:bg-white/10'
  }`;
}

function Landing({ setRoute, user }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="my-14 md:my-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            AI automations that <span className="text-blue-400">draft</span>,{' '}
            <span className="text-emerald-400">triage</span>, and{' '}
            <span className="text-emerald-400">assign</span> in minutes.
          </h1>
          <p className="mt-4 text-slate-300">
            BottleKit AI is a plug-and-play kit of three Zapier + GPT automations that connect your
            existing stack: HubSpot + Gmail, Zendesk + Slack, Zoom + Asana. No rebuild. No BS. (ρ)
          </p>

          {/* LIVE payment link */}
          <a
            href="https://buy.stripe.com/14AbJ22rX7zJ5Dv3Qebwk01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold shadow hover:bg-blue-500 active:translate-y-px mt-6"
          >
            Buy now <ArrowRight className="ml-2 h-4 w-4" />
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="mr-2 h-4 w-4" /> 30-day bug-fix window
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="mr-2 h-4 w-4" /> No data migration
            </div>
          </div>
        </div>

        <HeroPreview />
      </section>
    </main>
  );
}

function HeroPreview() {
  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-emerald-500/10 p-4" />
      <div className="text-xs text-slate-300">HubSpot GPT • CRM + Gmail</div>
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-emerald-500/10 p-4" />
      <div className="text-xs text-slate-300">Zendesk + Slack</div>
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-emerald-500/10 p-4" />
      <div className="text-xs text-slate-300">Zoom transcripts → Asana tasks</div>
    </div>
  );
}

function Auth({ type = 'login', onSuccess }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h2 className="text-xl font-semibold">Create your account</h2>
      <p className="mt-2 text-slate-400 text-sm">
        Demo only — this mock doesn’t store credentials.
      </p>

      <div className="mt-6 grid gap-3">
        <label className="text-sm">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
        />
        <label className="text-sm">Password</label>
        <input
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          type="password"
          placeholder="••••••••"
          className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          onClick={() => onSuccess?.(email)}
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold shadow hover:bg-blue-500"
        >
          {type === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </div>
    </main>
  );
}

function Dashboard({ isPaid, grantPaid }) {
  // --- live rows from Google Sheet ---
  const rows = useResources() || [];

  // normalize + sort; accept either 'link' or 'url' header
  const items = rows
    .map((r) => ({
      id: String(r.id ?? ""),
      title: r.title ?? "",
      type: r.type ?? "",
      href: (r.link || r.url || "").trim(),  // ← KEY: from Sheet, no placeholders
      desc: r.desc ?? "",
      sort: Number(r.sort) || 0,
      group: r.group ?? "",
    }))
    .filter((x) => x.title && x.href) // drop any without a link
    .sort((a, b) => a.sort - b.sort);

  // fail loudly if anything is missing (helps catch bad data instead of silent '#')
  if (items.some((x) => !x.href)) {
    const bad = items.filter((x) => !x.href).map((x) => x.title).join(", ");
    throw new Error(`Missing href for: ${bad}`);
  }

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">BottleKit AI</h1>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-2xl border p-4">
            <div className="font-semibold mb-1">{item.title}</div>
            {item.desc ? (
              <div className="text-sm opacity-80 mb-3">{item.desc}</div>
            ) : null}
            <a
              href={item.href}                 // ← USE THE SHEET URL
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-xl border px-3 py-2 text-sm"
            >
              See kit
            </a>
          </li>
        ))}
      </ul>

{/* optional footer (keep ONLY if you want it) */}
<footer className="mt-6 text-sm text-slate-400 space-x-4">
  <a href="/privacy" className="hover:text-slate-200">Privacy</a>
  <a href="/terms" className="hover:text-slate-200">Terms</a>
  <a href="mailto:support@yourdomain.com" className="hover:text-slate-200">Support</a>
</footer>

</main>
);
}
