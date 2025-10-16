"use client";

import Link from "next/link";

export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Canceled</h1>
      <p className="text-gray-700 mb-8">
        Your payment was canceled. If this was a mistake, you can try again or return to the homepage.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
