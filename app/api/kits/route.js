// app/api/kits/route.js

// Hardcoded automation kits - no external dependency needed
const KITS = [
  {
    id: "ticket-triage",
    title: "Ticket Triage → Slack",
    desc: "Auto-route inbound tickets to the right Slack channel with context + priority.",
    href: "https://zapier.com/shared/80d11bf46db39d1a253079845a8bc308720c86a4",
  },
  {
    id: "meeting-minutes",
    title: "Meeting Minutes → Notion",
    desc: "Capture meeting notes and push structured minutes into Notion automatically.",
    href: "https://zapier.com/shared/80747cc7d68fef7c91f3d8350bcedc728572ec62",
  },
  {
    id: "email-drafter",
    title: "Email-Drafter",
    desc: "Drafts email replies automatically based on incoming messages and context.",
    href: "https://zapier.com/shared/a1069af5783b0ed010ef9a6a95d3790cff028594",
  },
];

export async function GET() {
  return Response.json({ items: KITS });
}
