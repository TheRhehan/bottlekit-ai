// /app/layout.js
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "BottleKit",
  description: "BottleKit",
};

const GADS_ID = "AW-17649929324"; // <- your Google Ads ID from the Install the tag modal

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Ads base tag (gtag.js) */}
        <Script
          id="gads-base"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        />
        <Script id="gads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // Configure your Google Ads property
            gtag('config', '${GADS_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
