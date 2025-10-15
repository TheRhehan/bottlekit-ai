'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
  useEffect(() => {
    // Fire the Google Ads conversion once when this page loads
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17649929324/vbPCO7owg0DEovYrkUBB', // your snippet's send_to
      });
    }
  }, []);

  return (
    <main className="thank-you-page" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1>Thank you!</h1>
      <p>Your submission has been received successfully.</p>
      <p>We’ll get in touch soon or you can return to the homepage.</p>

      <Link
        href="/"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
        }}
      >
        Go back home
      </Link>
    </main>
  );
}
