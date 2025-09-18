// app/api/kits/route.js

// --- Minimal parser for Google Sheets "gviz" JSON and CSV --- //
function parseGviz(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return [];

  const json = JSON.parse(text.slice(start, end + 1));
  const cols = (json.table?.cols || []).map((c) =>
    String(c?.label || "").trim().toLowerCase()
  );
  const idx = Object.fromEntries(cols.map((c, i) => [c, i]));
  const rows = (json.table?.rows || []).map((r) => r.c || []);

  const cell = (cells, i) =>
    cells[i] && cells[i].v != null ? String(cells[i].v) : "";

  return rows.map((cells) => ({
    id: cell(cells, idx.id),
    title: cell(cells, idx.title),
    href: (cell(cells, idx.link) || cell(cells, idx.url)).trim(),
    type: String(cell(cells, idx.type)).trim().toLowerCase(),
    desc: cell(cells, idx.desc),
    sort: Number(cell(cells, idx.sort)) || 0,
    group: String(cell(cells, idx.group)).trim().toLowerCase(),
  }));
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idx = Object.fromEntries(headers.map((h, i) => [h, i]));

  return lines.slice(1).map((line) => {
    // naive CSV split; good enough for simple sheets without quoted commas
    const cells = line.split(",").map((s) => s.trim());
    const get = (k) => (idx[k] != null ? cells[idx[k]] || "" : "");
    return {
      id: get("id"),
      title: get("title"),
      href: (get("link") || get("url")).trim(),
      type: String(get("type")).trim().toLowerCase(),
      desc: get("desc"),
      sort: Number(get("sort")) || 0,
      group: String(get("group")).trim().toLowerCase(),
    };
  });
}

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SHEET_JSON_URL;
  if (!url) {
    return new Response("Missing NEXT_PUBLIC_SHEET_JSON_URL", { status: 500 });
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    return new Response(`Sheet fetch failed: ${res.status}`, { status: 500 });
  }

  const text = await res.text();
  const raw =
    text.includes("google.visualization.Query") ? parseGviz(text) : parseCsv(text);

  // Normalize + drop any placeholders or missing data
  const items = raw
    .map((r) => ({
      id: r.id || r.title || "",
      title: r.title || "",
      href: (r.href || "").trim(),
      type: r.type || "",
      desc: r.desc || "",
      sort: r.sort || 0,
      group: r.group || "",
    }))
    .filter(
      (x) =>
        x.title &&
        x.href &&
        !x.href.startsWith("REPLACE_") &&
        !x.href.includes("PLACEHOLDER") &&
        !x.href.includes("zapier.com/shared/REPLACE")
    )
    .sort((a, b) => a.sort - b.sort);

  return Response.json({ items });
}
