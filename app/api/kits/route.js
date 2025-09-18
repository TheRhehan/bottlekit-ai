export const runtime = 'nodejs';

function parseGviz(text) {
  const json = JSON.parse(text.replace(/^[\s\S]*?\(/, '').replace(/\);\s*$/, ''));
  const table = json?.table || {};
  const cols = (table.cols || []).map(c => (c.label || c.id || '').toLowerCase());
  return (table.rows || []).map(r => {
    const obj = {};
    (r.c || []).forEach((cell, i) => (obj[cols[i]] = cell?.v ?? ''));
    return obj;
  });
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = (lines.shift() || '').split(',').map(h => h.trim().toLowerCase());
  return lines.map(line => {
    const cells = line.split(',');
    const obj = {};
    headers.forEach((h, i) => (obj[h] = (cells[i] ?? '').trim()));
    return obj;
  });
}

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SHEET_JSON_URL;
  if (!url) return new Response('Missing NEXT_PUBLIC_SHEET_JSON_URL', { status: 500 });

  const res = await fetch(url, { cache: 'no-store' });
  const text = await res.text();

  const rows = text.includes('google.visualization.Query.setResponse')
    ? parseGviz(text)
    : parseCsv(text);

  const items = rows
    .filter(r => String(r.title || '').trim() !== '')
    .map(r => ({
      id: r.id ?? '',
      title: r.title ?? '',
      type: r.type ?? '',
      href: (r.link || r.url || '').toString().trim(), // accepts 'link' or 'url'
      desc: r.desc ?? '',
      sort: Number(r.sort) || 0,
      group: r.group ?? '',
    }))
    .sort((a, b) => a.sort - b.sort);

  return Response.json({ items });
}
