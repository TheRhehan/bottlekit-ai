"use client";

export default function WhoFor() {
  const items = [
    { title: "SaaS startups", body: "No dedicated support team? Automate replies and triage today." },
    { title: "Solo founders", body: "Ship ops you can trust without hiring or writing prompts." },
    { title: "Agencies/MSPs", body: "Handle more client communication with fewer manual cycles." },
  ];
  return (
    <section className="mt-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="text-lg font-semibold text-white">Built for teams that need time back</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {items.map((it) => (
              <div key={it.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-medium text-white">{it.title}</div>
                <div className="mt-1 text-sm text-white/70">{it.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
