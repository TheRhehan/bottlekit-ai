'use client';

export const metadata = {
  title: 'Privacy Policy | BottleKit AI',
  description: 'How we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
      <p className="text-slate-300 mb-4">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-4 text-slate-300">
        <p>
          This Privacy Policy explains how BottleKit AI (“we”, “our”, “us”) collects, uses, and shares
          your information when you use our website and Services.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Account details you provide (e.g., email).</li>
          <li>Payment information handled by our payment processor (e.g., Stripe).</li>
          <li>Usage data, logs, and analytics to improve performance and reliability.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">2. How We Use Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, operate, and improve our Services.</li>
          <li>Process transactions and deliver purchase confirmations.</li>
          <li>Communicate product updates and support.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">3. Sharing</h2>
        <p>
          We share information with service providers as needed (e.g., hosting, analytics, payments).
          We do not sell your personal information.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Data Security</h2>
        <p>
          We use reasonable measures to protect your data. No method of transmission or storage is
          100% secure.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. Your Choices</h2>
        <p>
          You can request access, correction, or deletion of your data by emailing{' '}
          <a className="underline" href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Children</h2>
        <p>
          Our Services are not directed to children under 13 and we do not knowingly collect their
          information.
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Changes</h2>
        <p>
          We may update this Policy and will revise the “Last updated” date above.
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Contact</h2>
        <p>
          Questions? Email <a className="underline" href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
        </p>
      </section>
    </main>
  );
}
