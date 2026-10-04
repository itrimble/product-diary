// Builds the product diary into dist/ with routes:
//   /                        every entry, most recent day first
//   /YYYY-MM-DD/             one day's overview
//   /<project>/              rolling per-project page (all its days)
//   /<project>/YYYY-MM-DD/   a single entry
//
// Source layout (markdown of record):
//   posts/YYYY-MM-DD/index.md            day overview
//   posts/YYYY-MM-DD/<project-slug>.md   one entry per canonical project
//   posts/YYYY-MM-DD/assets/*.png        images for that day
//   projects/<project-slug>/index.md     rolling per-project page
//   index.md                             home page
//
// Optional frontmatter on an entry: project (canonical display name), summary, title.
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const POSTS = path.join(ROOT, "posts");
const PROJECTS = path.join(ROOT, "projects");
const DIST = path.join(ROOT, "dist");
const DOMAIN = "blog.remnantsecurity.com";
const SITE = "Product Diary";

const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

function parse(file) {
  let src = fs.readFileSync(file, "utf8");
  const meta = {};
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0)
        meta[line.slice(0, i).trim()] = line
          .slice(i + 1)
          .trim()
          .replace(/^["']|["']$/g, "");
    }
    src = src.slice(m[0].length);
  }
  return { meta, body: src };
}

// Same as parse(), but an absent file is simply an empty page.
function parseOptional(file) {
  return fs.existsSync(file) ? parse(file) : { meta: {}, body: "" };
}

// ---- collect entries -------------------------------------------------------
const entries = [];
const days = [];
if (fs.existsSync(POSTS)) {
  for (const date of fs.readdirSync(POSTS).sort().reverse()) {
    const dir = path.join(POSTS, date);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !fs.statSync(dir).isDirectory()) continue;
    days.push(date);
    for (const f of fs.readdirSync(dir).sort()) {
      const slug = f.replace(/\.md$/, "");
      if (slug === "index" || !f.endsWith(".md")) continue;
      const { meta, body } = parse(path.join(dir, f));
      entries.push({
        slug,
        date,
        project: meta.project || slug,
        title: meta.title || `${meta.project || slug} — ${date}`,
        summary: meta.summary || "",
        html: marked.parse(body),
      });
    }
  }
}
entries.sort((a, b) => b.date.localeCompare(a.date) || a.project.localeCompare(b.project));

// ---- assets ----------------------------------------------------------------
// Each day's assets are published under /assets/<date>/ so filenames cannot
// collide across days. Image references inside posts are rewritten to match.
function collectDayAssets() {
  const byDate = new Map();
  for (const date of days) {
    const dir = path.join(POSTS, date, "assets");
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith(".")) continue;
      const out = path.join(DIST, "assets", date, f);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.copyFileSync(path.join(dir, f), out);
      if (!byDate.has(date)) byDate.set(date, new Set());
      byDate.get(date).add(f);
    }
  }
  return byDate;
}

function rewriteAssets(html, date, dayAssets) {
  return html.replace(/(<img[^>]*\ssrc=")([^"]+)(")/g, (full, a, src, c) => {
    if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return full;
    const file = path.basename(src);
    if (dayAssets && dayAssets.has(file)) return `${a}/assets/${date}/${encodeURIComponent(file)}${c}`;
    return `${a}/assets/${date}/${encodeURIComponent(file)}${c}`;
  });
}

// ---- page shell ------------------------------------------------------------
const page = (title, content) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><link rel="stylesheet" href="/styles.css"></head>
<body><header><a href="/" class="brand">${SITE}</a><span class="by">Remnant Security</span></header>
<main>${content}</main>
<footer><a href="https://remnantsecurity.com">remnantsecurity.com</a></footer></body></html>
`;

const groupByDay = (items) => {
  const out = new Map();
  for (const p of items) {
    if (!out.has(p.date)) out.set(p.date, []);
    out.get(p.date).push(p);
  }
  return out;
};

const list = (items) =>
  items.length
    ? `<ul class="entries">${items
        .map(
          (p) =>
            `<li><a href="/${p.slug}/${p.date}/"><time>${p.date}</time> <strong>${esc(
              p.project,
            )}</strong> ${esc(p.title)}</a>${
              p.summary ? `<p>${esc(p.summary)}</p>` : ""
            }</li>`,
        )
        .join("")}</ul>`
    : `<p class="empty">No entries yet.</p>`;

function write(rel, html) {
  const out = path.join(DIST, rel, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

// ---- build -----------------------------------------------------------------
// The repo usually lives on an SMB mount, where deleting an open file leaves a
// `.smbdelete*` tombstone behind. A plain recursive rm of dist/ then fails with
// ENOTEMPTY forever after. Renaming the directory aside always works, so swap it
// out first and treat the delete of the leftovers as best-effort.
function cleanDist() {
  if (fs.existsSync(DIST)) {
    let aside = `${DIST}.old.${process.pid}.${Date.now()}`;
    try {
      fs.renameSync(DIST, aside);
    } catch {
      aside = null;
    }
    if (aside) {
      try {
        fs.rmSync(aside, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      } catch {
        // Tombstones may survive; they are inside a discarded directory.
      }
    }
  }
  // Sweep any stale swapped-aside directories from earlier runs.
  for (const f of fs.readdirSync(ROOT)) {
    if (!f.startsWith("dist.old.")) continue;
    try {
      fs.rmSync(path.join(ROOT, f), { recursive: true, force: true });
    } catch {
      // Best-effort.
    }
  }
  fs.mkdirSync(DIST, { recursive: true });
}
cleanDist();
const dayAssets = collectDayAssets();

// Home: every day, newest first.
const home = parseOptional(path.join(ROOT, "index.md"));
let homeHtml = marked.parse(home.body);
for (const [date, items] of groupByDay(entries))
  homeHtml += `<h2><a href="/${date}/">${date}</a></h2>${list(items)}`;
write(
  "",
  page(
    home.meta.title || SITE,
    `<h1>${esc(home.meta.title || SITE)}</h1>${homeHtml || `<p class="lede">What changed across the projects, day by day.</p>`}`,
  ),
);

// Day overviews.
for (const date of days) {
  const f = path.join(POSTS, date, "index.md");
  const items = entries.filter((e) => e.date === date);
  const inner = fs.existsSync(f)
    ? marked.parse(parse(f).body)
    : `<p class="lede">${items.length} project${items.length === 1 ? "" : "s"} changed.</p>`;
  write(date, page(`${date} · ${SITE}`, `<h1>${date}</h1>${inner}${list(items)}`));
}

// Per-project rolling pages and single-day entries.
for (const [slug, items] of groupBySlug(entries)) {
  const pj = path.join(PROJECTS, slug, "index.md");
  const body = fs.existsSync(pj)
    ? marked.parse(parse(pj).body)
    : `<p class="lede">Rolling diary for ${esc(items[0].project)}.</p>`;
  write(slug, page(`${items[0].project} · ${SITE}`, `<h1>${esc(items[0].project)}</h1>${body}${list(items)}`));
  for (const p of items) {
    write(
      path.join(slug, p.date),
      page(
        `${p.title} · ${SITE}`,
        `<article><p class="crumbs"><a href="/${slug}/">${esc(p.project)}</a> · <time>${p.date}</time></p><h1>${esc(p.title)}</h1>${rewriteAssets(p.html, p.date, dayAssets.get(p.date))}</article>`,
      ),
    );
  }
}

function groupBySlug(items) {
  const m = new Map();
  for (const p of items) {
    if (!m.has(p.slug)) m.set(p.slug, []);
    m.get(p.slug).push(p);
  }
  return m;
}

write("404", page(`Not found · ${SITE}`, `<h1>Not found</h1><p><a href="/">Back to the diary</a></p>`));
fs.renameSync(path.join(DIST, "404", "index.html"), path.join(DIST, "404.html"));
fs.rmdirSync(path.join(DIST, "404"));

fs.writeFileSync(path.join(DIST, "styles.css"), fs.readFileSync(path.join(ROOT, "styles.css")));
fs.writeFileSync(path.join(DIST, "CNAME"), DOMAIN + "\n");
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
console.log(
  `Built ${entries.length} entries across ${groupBySlug(entries).size} projects, ${days.length} days -> dist/`,
);
