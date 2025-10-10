// app/page.jsx
import SignupBlock from "./components/SignupBlock";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">BottleKit AI</h1>
      <p className="mb-10 text-slate-600">
        Plug-and-play AI automations for small teams.
      </p>
      <SignupBlock />
    </main>
  );
}
