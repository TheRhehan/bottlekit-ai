'use client'

import React, { useMemo, useState } from "react";
import { Zap, FileText, PlayCircle, Table2, Lock, CheckCircle2, Sparkles, LogIn, LogOut, ArrowRight, Shield } from "lucide-react";

// ---------- Mock data (replace with your Google Sheet later) ----------
const MOCK_RESOURCES = [
  { id: 1, title: "Email‑Drafter Zap", type: "zap", url: "https://zapier.com/shared/REPLACE_EMAIL_DRAFTER", desc: "Draft replies from HubSpot notes in seconds.", sort: 1, group: "paid" },
  { id: 2, title: "Ticket‑Triage Zap", type: "zap", url: "https://zapier.com/shared/REPLACE_TICKET_TRIAGE", desc: "Summarize, set P1–P3, alert Slack.", sort: 2, group: "paid" },
  { id: 3, title: "Minutes Bot Zap", type: "zap", url: "https://zapier.com/shared/REPLACE_MINUTES_BOT", desc: "Turn Zoom transcripts into Asana tasks.", sort: 3, group: "paid" },
  { id: 4, title: "Quick‑Start: Email‑Drafter", type: "pdf", url: "https://drive.google.com/file/d/REPLACE_QS_EMAIL", desc: "2‑page setup checklist.", sort: 4, group: "paid" },
  { id: 5, title: "Quick‑Start: Ticket‑Triage", type: "pdf", url: "https://drive.google.com/file/d/REPLACE_QS_TICKETS", desc: "2‑page setup checklist.", sort: 5, group: "paid" },
  { id: 6, title: "Quick‑Start: Minutes Bot", type: "pdf", url: "https://drive.google.com/file/d/REPLACE_QS_MINUTES", desc: "2‑page setup checklist.", sort: 6, group: "paid" },
  { id: 7, title: "Loom Tutorial – Overview (0:45)", type: "video", url: "https://www.loom.com/share/REPLACE_OVERVIEW", desc: "See the 3 wins, fast.", sort: 7, group: "paid" },
  { id: 8, title: "Loom – Ticket‑Triage", type: "video", url: "https://www.loom.com/share/REPLACE_TICKETS", desc: "Zendesk → Slack in action.", sort: 8, group: "paid" },
  { id: 9, title: "ROI Calculator", type: "sheet", url: "https://docs.google.com/spreadsheets/d/REPLACE_ROI", desc: "Estimate hours & $$ saved.", sort: 9, group: "paid" },
];

// ---------- Small helpers ----------
const typeToIcon = (type) => {
  switch (type) {
    case "zap": return <Zap className="h-5 w-5"/>;
    case "pdf": return <FileText className="h-5 w-5"/>;
    case "video": return <PlayCircle className="h-5 w-5"/>;
    case "sheet": return <Table2 className="h-5 w-5"/>;
    default: return <Sparkles className="h-5 w-5"/>;
  }
};

const typeToButtonLabel = (type) => {
  switch (type) {
    case "zap": return "Import to Zapier";
    case "pdf": return "Open Quick‑Start";
    case "video": return "Watch Tutorial";
    case "sheet": return "Open ROI Calculator";
    default: return "Open";
  }
};

// ---------- Main component ----------
export default function BottleKitAIClientPortalMock() {
  const [route, setRoute] = useState("landing"); // landing | login | signup | dashboard
  const [isPaid, setIsPaid] = useState(false);
  const [user, setUser] = useState(null); // {email}

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header route={route} setRoute={setRoute} user={user} setUser={setUser} isPaid={isPaid} setIsPaid={setIsPaid} />

      {route === "landing" && <Landing setRoute={setRoute} user={user} />}
      {route === "login" && <Auth type="login" onSuccess={(email)=>{ setUser({email}); setRoute("dashboard"); }} />}
      {route === "signup" && <Auth type="signup" onSuccess={(email)=>{ setUser({email}); setRoute("dashboard"); }} />}
      {route === "dashboard" && (
        <Dashboard isPaid={isPaid} grantPaid={()=>setIsPaid(true)} />
      )}

      <Footer />
    </div>
  );
}

// ---------- UI pieces ----------
function Header({ route, setRoute, user, setUser, isPaid, setIsPaid }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={()=>setRoute("landing")}>
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap className="h-5 w-5"/>
          </div>
          <div className="font-semibold tracking-tight text-lg">BottleKit AI</div>
          <div className="hidden md:flex text-slate-400 text-sm">Make work flow.</div>
        </div>
        <nav className="flex items-center gap-2">
          <button onClick={()=>setRoute("landing")} className={navBtn(route==='landing')}>Home</button>
          <button onClick={()=>setRoute("dashboard")} className={navBtn(route==='dashboard')}>Dashboard</button>
          {!user ? (
            <>
              <button onClick={()=>setRoute("login")} className={navBtn(route==='login')}><LogIn className="h-4 w-4 mr-1"/> Sign in</button>
              <button onClick={()=>setRoute("signup")} className="ml-1 inline-flex items-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium shadow hover:bg-blue-500 active:translate-y-px">
                Create account <ArrowRight className="ml-1 h-4 w-4"/>
              </button>
            </>
          ) : (
            <>
              <span className="text-xs text-slate-400 hidden md:inline">{user.email}</span>
              <button onClick={()=>{ setUser(null); setIsPaid(false); setRoute("landing"); }} className={navBtn(false)}>
                <LogOut className="h-4 w-4 mr-1"/> Sign out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function navBtn(active){
  return `inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium transition border ${active? 'bg-white/10 border-white/15' : 'border-white/10 hover:bg-white/10'}`;
}

function Landing({ setRoute, user }){
  return (
    <main className="mx-auto max-w-6xl px-4">
      <section className="py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">AI automations that <span className="text-blue-400">draft, triage,</span> and <span className="text-emerald-400">assign</span> in minutes.</h1>
          <p className="mt-4 text-slate-300">BottleKit AI is a plug‑and‑play kit of three Zapier + GPT automations that connect your existing stack: HubSpot → Gmail, Zendesk → Slack, Zoom → Asana. No rebuild. No BS.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://buy.stripe.com/14AbJ22rX7zJ5Dv3Qebwk01" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold shadow hover:bg-blue-500 active:translate-y-px">Buy now <ArrowRight className="ml-2 h-4 w-4" /></a>
            <button onClick={()=>setRoute("dashboard")} className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold border border-white/10 hover:bg-white/10"><PlayCircle className="mr-2 h-4 w-4"/> See the kit</button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2"><Shield className="h-4 w-4"/> 30‑day bug‑fix window</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4"/> No data migration</div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-xl shadow-black/30">
          <HeroPreview />
        </div>
      </section>
    </main>
  );
}

function HeroPreview(){
  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-emerald-500/10 p-4">
        <div className="text-xs text-slate-300">HubSpot → GPT → Gmail</div>
        <div className="mt-1 font-medium">Draft reply created</div>
        <div className="mt-2 text-xs text-slate-400">Subject: Re: Onboarding next steps…</div>
      </div>
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-blue-600/10 p-4">
        <div className="text-xs text-slate-300">Zendesk → GPT → Slack</div>
        <div className="mt-1 font-medium">P2 ticket routed to #support-prio</div>
        <div className="mt-2 text-xs text-slate-400">Summary: Billing error for ACME Inc.</div>
      </div>
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-fuchsia-500/10 p-4">
        <div className="text-xs text-slate-300">Zoom → GPT → Asana</div>
        <div className="mt-2 text-xs text-slate-400">3 tasks created in &quot;Action Items&quot;</div>
        <div className="mt-2 text-xs text-slate-400">Decisions captured; owners assigned.</div>
      </div>
    </div>
  );
}

function Auth({ type = "login", onSuccess }){
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-xl font-semibold">{type === "login" ? "Sign in" : "Create your account"}</h2>
        <p className="text-slate-400 text-sm mt-1">Demo only — this mock doesn’t store credentials.</p>
        <div className="mt-4 grid gap-3">
          <label className="grid gap-1 text-sm">
            <span>Email</span>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@company.com" className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"/>
          </label>
          <label className="grid gap-1 text-sm">
            <span>Password</span>
            <input value={pwd} onChange={(e)=>setPwd(e.target.value)} type="password" placeholder="••••••••" className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"/>
          </label>
          <button onClick={()=>onSuccess?.(email || "user@example.com")} className="mt-2 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold shadow hover:bg-blue-500 active:translate-y-px">
            {type === "login" ? "Sign in" : "Create account"}
          </button>
        </div>
      </div>
    </main>
  );
}

function Dashboard({ isPaid, grantPaid }){
  const resources = useMemo(
    () => [...MOCK_RESOURCES].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)),
    []
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your AI Kit</h2>
        {!isPaid ? (
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Lock className="h-4 w-4"/> Access locked — demo mode
            <button onClick={grantPaid} className="ml-2 inline-flex items-center rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-500">Grant Paid (demo)</button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-emerald-400"><CheckCircle2 className="h-4 w-4"/> Paid access active</div>
        )}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r)=> (
          <article key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs">{typeToIcon(r.type)}<span className="capitalize">{r.type}</span></span>
              <a className="text-xs text-slate-400 hover:text-slate-200" href="#" onClick={(e)=>{e.preventDefault(); alert("In production, this content is fed by your Google Sheet (Resources tab). Add or edit rows to update.");}}>How this works</a>
            </div>
            <h3 className="mt-3 font-medium leading-snug">{r.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{r.desc}</p>
            <div className="mt-4">
              <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20">
                {typeToButtonLabel(r.type)} <ArrowRight className="ml-2 h-4 w-4"/>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h4 className="font-medium">Admin notes</h4>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-400 space-y-1">
          <li>Replace this mock data with your Google Sheet via: <span className="text-slate-200">Data Source → Google Sheets → KitResources / Resources</span>.</li>
          <li>Each asset = one row. Set <code>group=paid</code> to gate.</li>
          <li>Zap links must be public templates (start with <code>zapier.com/shared/…</code>).</li>
        </ul>
      </div>
    </main>
  );
}

function Footer(){
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-400">
        <div>© {new Date().getFullYear()} BottleKit AI — Make work flow.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-200">Privacy</a>
          <a href="#" className="hover:text-slate-200">Terms</a>
          <a href="mailto:support@yourdomain.com" className="hover:text-slate-200">Support</a>
        </div>
      </div>
    </footer>
  );
}
