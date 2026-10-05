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

// og:image wants an absolute path; entries reference images by bare filename.
function firstImage(p) {
  const m = p.html.match(/<img[^>]*\ssrc="([^"]+)"/);
  if (!m) return "";
  const file = path.basename(m[1]);
  return `/assets/${p.date}/${encodeURIComponent(file)}`;
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
// opts: { desc, path, image } — path is the route, used for canonical and og:url.
const page = (title, content, opts = {}) => {
  const desc = opts.desc || "What changed across the projects, day by day.";
  const url = `https://${DOMAIN}${opts.path ? `/${opts.path}/` : "/"}`.replace(/\/+$/, "/");
  const img = opts.image ? `https://${DOMAIN}${opts.image}` : "";
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:site_name" content="${esc(SITE)}">
<meta property="og:type" content="${opts.path && opts.path.includes("/") ? "article" : "website"}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">${img ? `\n<meta property="og:image" content="${esc(img)}">` : ""}
<meta name="twitter:card" content="${img ? "summary_large_image" : "summary"}">
<link rel="alternate" type="application/rss+xml" title="${esc(SITE)}" href="/feed.xml">
<link rel="stylesheet" href="/styles.css"></head>
<body><header><a href="/" class="brand">${SITE}</a><span class="by">Remnant Security</span></header>
<main>${content}</main>
<footer><a href="https://remnantsecurity.com">remnantsecurity.com</a> · <a href="/feed.xml">RSS</a></footer></body></html>
`;
};

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
// Every day that was written about appears here, including quiet ones. Listing
// only days that have entries made a published quiet day invisible, so the site
// looked like nothing had ever run.
for (const date of days) {
  const items = entries.filter((e) => e.date === date);
  homeHtml += `<h2><a href="/${date}/">${date}</a></h2>`;
  if (items.length) {
    homeHtml += list(items);
  } else {
    const f = path.join(POSTS, date, "index.md");
    const note = fs.existsSync(f) ? parse(f).body.trim().split(/(?<=[.!?])\s/)[0] : "";
    homeHtml += `<p class="quiet">${esc(note || "Nothing shipped.")}</p>`;
  }
}
write(
  "",
  page(
    home.meta.title || SITE,
    `<h1>${esc(home.meta.title || SITE)}</h1>${homeHtml || `<p class="lede">What changed across the projects, day by day.</p>`}`,
    { path: "" },
  ),
);

// Day overviews.
for (const date of days) {
  const f = path.join(POSTS, date, "index.md");
  const items = entries.filter((e) => e.date === date);
  const inner = fs.existsSync(f)
    ? marked.parse(parse(f).body)
    : `<p class="lede">${items.length} project${items.length === 1 ? "" : "s"} changed.</p>`;
  write(date, page(`${date} · ${SITE}`, `<h1>${date}</h1>${inner}${list(items)}`, {
    path: date,
    desc: items.length
      ? `${items.length} project${items.length === 1 ? "" : "s"} changed on ${date}: ${items.map((i) => i.project).join(", ")}.`
      : `Nothing shipped on ${date}.`,
  }));
}

// Per-project rolling pages and single-day entries.
for (const [slug, items] of groupBySlug(entries)) {
  const pj = path.join(PROJECTS, slug, "index.md");
  const body = fs.existsSync(pj)
    ? marked.parse(parse(pj).body)
    : `<p class="lede">Rolling diary for ${esc(items[0].project)}.</p>`;
  write(slug, page(`${items[0].project} · ${SITE}`, `<h1>${esc(items[0].project)}</h1>${body}${list(items)}`, {
    path: slug,
    desc: `Diary entries for ${items[0].project} — ${items.length} day${items.length === 1 ? "" : "s"}.`,
  }));
  for (const p of items) {
    write(
      path.join(slug, p.date),
      page(
        `${p.title} · ${SITE}`,
        `<article><p class="crumbs"><a href="/${slug}/">${esc(p.project)}</a> · <time>${p.date}</time></p><h1>${esc(p.title)}</h1>${rewriteAssets(p.html, p.date, dayAssets.get(p.date))}</article>`,
        { path: `${slug}/${p.date}`, desc: p.summary || `${p.project} on ${p.date}.`, image: firstImage(p) },
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

write("404", page(`Not found · ${SITE}`, `<h1>Not found</h1><p><a href="/">Back to the diary</a></p>`, { path: "404" }));
fs.renameSync(path.join(DIST, "404", "index.html"), path.join(DIST, "404.html"));
fs.rmdirSync(path.join(DIST, "404"));

// ---- feed, sitemap, robots -------------------------------------------------
// A blog without a feed is a web page. Dates carry no time of day, so entries
// are stamped at midnight UTC on their date.
const rfc822 = (d) => new Date(`${d}T00:00:00Z`).toUTCString();
const feedItems = entries
  .slice(0, 50)
  .map(
    (p) => `  <item>
    <title>${esc(p.title)}</title>
    <link>https://${DOMAIN}/${p.slug}/${p.date}/</link>
    <guid isPermaLink="true">https://${DOMAIN}/${p.slug}/${p.date}/</guid>
    <pubDate>${rfc822(p.date)}</pubDate>
    <category>${esc(p.project)}</category>
    <description>${esc(p.summary || p.title)}</description>
  </item>`,
  )
  .join("\n");
fs.writeFileSync(
  path.join(DIST, "feed.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(SITE)}</title>
  <link>https://${DOMAIN}/</link>
  <atom:link href="https://${DOMAIN}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>What changed across the projects, day by day.</description>
  <language>en</language>${days.length ? `\n  <lastBuildDate>${rfc822(days[0])}</lastBuildDate>` : ""}
${feedItems}
</channel>
</rss>
`,
);

const urls = [
  "",
  ...days.map((d) => d),
  ...[...groupBySlug(entries).keys()],
  ...entries.map((p) => `${p.slug}/${p.date}`),
];
fs.writeFileSync(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>https://${DOMAIN}/${u ? `${u}/` : ""}</loc></url>`).join("\n")}
</urlset>
`,
);
fs.writeFileSync(
  path.join(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: https://${DOMAIN}/sitemap.xml\n`,
);

fs.writeFileSync(path.join(DIST, "styles.css"), fs.readFileSync(path.join(ROOT, "styles.css")));
fs.writeFileSync(path.join(DIST, "CNAME"), DOMAIN + "\n");
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
console.log(
  `Built ${entries.length} entries across ${groupBySlug(entries).size} projects, ${days.length} days, ` +
    `+ feed/sitemap/robots -> dist/`,
);
