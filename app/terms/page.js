'use client';

export const metadata = {
  title: 'Terms of Service | BottleKit AI',
  description: 'Terms and conditions for using BottleKit AI.',
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">Terms of Service</h1>
      <p className="text-slate-300 mb-4">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-4 text-slate-300">
        <p>
          Welcome to BottleKit AI (“Company”, “we”, “our”, “us”). These Terms govern your use of our
          website, products, and services (“Services”). By accessing or using our Services, you agree
          to be bound by these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Accounts & Access</h2>
        <p>
          You are responsible for maintaining the confidentiality of any login credentials and for all
          activities under your account. You must be at least 18 years old to use the Services.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. License & Acceptable Use</h2>
        <p>
          We grant you a limited, non-transferable license to use the Services for your business
          purposes. You agree not to misuse the Services, including (without limitation) sharing
          license keys publicly, reverse engineering, or distributing content beyond your license.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Payments & Refunds</h2>
        <p>
          Purchases are processed via third-party processors (e.g., Stripe). Please see our Refund
          Policy for details on eligibility and process.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Intellectual Property</h2>
        <p>
          The Services, including code, design, and content are owned by us or our licensors and
          protected by applicable laws. You may not copy, modify, or distribute them except as
          permitted by your license.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. Warranties & Disclaimers</h2>
        <p>
          The Services are provided “as is” without warranties of any kind. We do not guarantee the
          Services will be error-free or uninterrupted.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Liability</h2>
        <p>
          To the fullest extent permitted by law, we will not be liable for indirect, incidental,
          special, consequential, or punitive damages.
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Termination</h2>
        <p>
          We may suspend or terminate access if you violate these Terms. Upon termination, your
          license ends and you must stop using the Services.
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Changes</h2>
        <p>
          We may update these Terms. Continued use of the Services after changes means you accept the
          updated Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6">9. Contact</h2>
        <p>
          Questions? Email us at <a className="underline" href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
        </p>
      </section>
    </main>
  );
}
