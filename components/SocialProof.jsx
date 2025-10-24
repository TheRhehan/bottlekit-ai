"use client";

export default function SocialProof() {
  return (
    <section className="mt-12">
      <div className="mx-auto max-w-7xl rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
        <div className="text-center text-xs uppercase tracking-wider text-white/50">
          Works with your stack
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4 text-center text-sm text-white/70 sm:grid-cols-4 md:grid-cols-6">
          <div>Gmail</div>
          <div>Slack</div>
          <div>Zendesk</div>
          <div>HubSpot</div>
          <div>Notion</div>
          <div>Zapier</div>
        </div>
      </div>
    </section>
  );
}
