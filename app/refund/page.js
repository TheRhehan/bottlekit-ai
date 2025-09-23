'use client';

export const metadata = {
  title: 'Refund Policy | BottleKit AI',
  description: 'How refunds work for BottleKit AI purchases.',
};

export default function RefundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">Refund Policy</h1>
      <p className="text-slate-300 mb-4">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-4 text-slate-300">
        <p>
          We want you to be successful. If you encounter issues, contact us at{' '}
          <a className="underline" href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
        </p>

        <h2 className="text-xl font-semibold mt-6">Eligibility</h2>
        <p>
          Refund requests must be made within 7 days of purchase and require a brief description of the
          issue. We may request proof to help us understand and resolve the problem.
        </p>

        <h2 className="text-xl font-semibold mt-6">Non-Refundable Situations</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Buyer’s remorse without a product issue.</li>
          <li>Violation of Terms of Service or license sharing.</li>
          <li>Requests made after the refund window.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Process</h2>
        <p>
          Email us with your order email, date, and reason. If approved, refunds are issued to the
          original payment method by our payment processor.
        </p>
      </section>
    </main>
  );
}
