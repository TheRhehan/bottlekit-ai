'use client'
import { useEffect } from "react"

export default function ThankYouPage() {
  useEffect(() => {
    // Fire Google Ads conversion event once page loads
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-17649929324/vKbPCO7owq0DEOyYrkUB",
      })
      console.log("Google Ads conversion event fired: Signup – BottleKit")
    } else {
      console.warn("gtag not found – ensure the global site tag is loaded on all pages.")
    }
  }, [])

  return (
    <main
      className="thank-you-page"
      style={{ textAlign: "center", padding: "60px 20px" }}
    >
      <h1>Thank you!</h1>
      <p>Your submission has been received successfully.</p>
      <p>We’ll get in touch soon or you can return to the homepage.</p>
      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Go back home
      </a>
    </main>
  )
}
