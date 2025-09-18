// app/page.js
'use client';

import React, { useEffect, useState } from 'react';

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/kits')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : (data.items || [])))
      .catch((e) => setError(e.message || 'Failed to load kits'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">BottleKit AI</h1>

      {loading && <p>Loading…</p>}
      {error && (
        <p className="text-red-500">
          API error: {error}
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="text-slate-400">
          No items returned. Check your Google Sheet URL and tab name, and make sure the
          <code className="ml-1"> NEXT_PUBLIC_SHEET_JSON_URL </code>
          env var is set in Vercel.
        </p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.id || it.title} className="rounded-2xl border p-4">
            <div className="font-semibold mb-1">{it.title}</div>
            {it.desc && <p className="text-sm text-slate-500 mb-3">{it.desc}</p>}
            <a
              href={it.href}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-xl border px-3 py-2 text-sm"
            >
              See kit
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-slate-400">
        Data comes from Google Sheets via <code>NEXT_PUBLIC_SHEET_JSON_URL</code>.
      </p>
    </main>
  );
}
