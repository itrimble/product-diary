// Builds the product diary into dist/ with routes:
//   /                        lead story, latest stories, sidebar
//   /category/<slug>/        one category's stories
//   /YYYY-MM-DD/             one day's overview
//   /<project>/              rolling per-project page (all its days)
//   /<project>/YYYY-MM-DD/   a single entry
//
// Source layout (markdown of record):
//   posts/YYYY-MM-DD/index.md            day overview
//   posts/YYYY-MM-DD/<project-slug>.md   one entry per canonical project
//   posts/YYYY-MM-DD/assets/*.png        images for that day
//   projects/<project-slug>/index.md     rolling per-project page
//   categories.json                      category list, and which category each project belongs to
//   index.md                             home page intro (optional)
//
// Optional frontmatter on an entry: project (canonical display name), summary, title, format,
// stats, category (overrides the project's category from categories.json).
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const POSTS = path.join(ROOT, "posts");
const PROJECTS = path.join(ROOT, "projects");
const DIST = path.join(ROOT, "dist");
const DOMAIN = "blog.remnantsecurity.com";
const SITE = "Product Diary";
const TAGLINE = "What changed across the projects, day by day.";

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

// ---- categories ------------------------------------------------------------
const CAT = JSON.parse(fs.readFileSync(path.join(ROOT, "categories.json"), "utf8"));
const CATS = CAT.categories;
const catBySlug = new Map(CATS.map((c) => [c.slug, c]));
const unmapped = new Set();
function categoryOf(meta, project) {
  if (meta.category) {
    if (!catBySlug.has(meta.category)) throw new Error(`unknown category "${meta.category}" (see categories.json)`);
    return meta.category;
  }
  const mapped = CAT.projects[project];
  if (mapped) return mapped;
  unmapped.add(project);
  return CAT.default;
}

// ---- collect entries -------------------------------------------------------
const slugify = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const decodeEntities = (t) =>
  t.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

// Give every h2 an id and return the table of contents it implies.
function withHeadingIds(html) {
  const toc = [];
  const seen = new Set();
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    let id = slugify(inner) || "section";
    while (seen.has(id)) id += "-2";
    seen.add(id);
    toc.push({ id, text: decodeEntities(inner.replace(/<[^>]+>/g, "")) });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

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
      const project = meta.project || slug;
      const { html, toc } = withHeadingIds(marked.parse(body));
      const words = body.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
      entries.push({
        slug,
        date,
        project,
        category: categoryOf(meta, project),
        title: meta.title || `${project} — ${date}`,
        summary: meta.summary || "",
        stats: meta.stats || "",
        format: meta.format || "",
        author: meta.format === "longform" ? "Ian Trimble" : "Product Diary",
        minutes: Math.max(1, Math.round(words / 220)),
        toc,
        html,
      });
    }
  }
}
entries.sort((a, b) => b.date.localeCompare(a.date) || a.project.localeCompare(b.project));
if (unmapped.size)
  console.warn(`note: no category for ${[...unmapped].join(", ")}; filed under "${CAT.default}". Add them to categories.json.`);

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

function firstImageAlt(p) {
  const m = p.html.match(/<img[^>]*\salt="([^"]*)"/);
  return m ? m[1] : "";
}

function rewriteAssets(html, date, dayAssets) {
  return html.replace(/(<img[^>]*\ssrc=")([^"]+)(")/g, (full, a, src, c) => {
    if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return full;
    const file = path.basename(src);
    return `${a}/assets/${date}/${encodeURIComponent(file)}${c}`;
  }).replace(/<img /g, '<img loading="lazy" decoding="async" ');
}

function renderStatBar(p) {
  if (!p.stats) return "";
  const items = p.stats.split("|").map((s) => s.trim()).filter(Boolean).map((pair) => {
    const i = pair.lastIndexOf("=");
    return i < 0 ? null : { label: pair.slice(0, i).trim(), value: pair.slice(i + 1).trim() };
  }).filter(Boolean);
  if (!items.length) return "";
  return `<div class="statbar" role="list" aria-label="Key numbers">${items.map((it) => `<div class="stat" role="listitem"><span class="stat-value">${esc(it.value)}</span><span class="stat-label">${esc(it.label)}</span></div>`).join("")}</div>`;
}

// The site-wide social card, used by any page with no image of its own.
const DEFAULT_OG = "/og-card.png";

// ---- icons: one hand-drawn set, 1.75 stroke, 24 grid -------------------------
const ico = (d) =>
  `<svg class="ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
  search: ico('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>'),
  rss: ico('<path d="M5 5a14 14 0 0 1 14 14"/><path d="M5 11a8 8 0 0 1 8 8"/><circle cx="6" cy="18" r="1.2" fill="currentColor" stroke="none"/>'),
  sun: ico('<circle cx="12" cy="12" r="3.8"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>'),
  moon: ico('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>'),
  list: ico('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  grid: ico('<rect x="4" y="4" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1"/>'),
  clock: ico('<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>'),
  cal: ico('<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>'),
  user: ico('<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>'),
};

// ---- page shell ------------------------------------------------------------
const catHref = (slug) => `/category/${slug}/`;
const catCounts = new Map(CATS.map((c) => [c.slug, entries.filter((e) => e.category === c.slug).length]));
const nav = (active) =>
  `<nav class="catbar" id="catbar" aria-label="Categories"><div class="wrap"><ul>` +
  `<li><a href="/"${active === "home" ? ' aria-current="page"' : ""}>Home</a></li>` +
  CATS.filter((c) => catCounts.get(c.slug) > 0 || c.slug === active)
    .map((c) => `<li><a href="${catHref(c.slug)}"${active === c.slug ? ' aria-current="page"' : ""}>${esc(c.name)}</a></li>`)
    .join("") +
  `</ul></div></nav>`;

// opts: { desc, path, image, active, wide }
const page = (title, content, opts = {}) => {
  const desc = opts.desc || TAGLINE;
  const url = `https://${DOMAIN}${opts.path ? `/${opts.path}/` : "/"}`.replace(/\/+$/, "/");
  // Tables get a scrollable wrapper so wide tables stay readable on phones.
  const wrapped = content.replaceAll("<table>", '<div class="table-wrap"><table>').replaceAll("</table>", "</table></div>");
  // Fall back to the site card so no page ever ships without an og:image.
  const img = `https://${DOMAIN}${opts.image || DEFAULT_OG}`;
  const isDefaultOg = !opts.image;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:site_name" content="${esc(SITE)}">
<meta property="og:type" content="${opts.path && opts.path.includes("/") && !opts.path.startsWith("category/") ? "article" : "website"}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(img)}">${isDefaultOg ? `
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Product Diary by Remnant Security - what changed across the projects, day by day.">` : ""}
<meta name="twitter:card" content="summary_large_image">
<meta name="color-scheme" content="light dark">
<link rel="alternate" type="application/rss+xml" title="${esc(SITE)}" href="/feed.xml">
<link rel="preload" href="/fonts/public-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
<script>try{var t=localStorage.getItem("pd-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<script src="/site.js" defer></script></head>
<body>
<a class="skip" href="#main">Skip to the stories</a>
<header class="top"><div class="wrap top-row">
<a href="/" class="brand"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">${SITE}</span><span class="by">by Remnant Security</span></a>
<form class="search" role="search" action="/" onsubmit="return false"><label class="sr" for="q">Search the diary</label>${ICON.search}<input id="q" type="search" placeholder="Search" autocomplete="off" aria-controls="results"><ul id="results" class="results" hidden></ul></form>
<div class="tools"><a class="tool rss-tool" href="/feed.xml" aria-label="RSS feed">${ICON.rss}</a><button class="tool" type="button" id="theme" aria-label="Switch between light and dark"><span class="i-moon">${ICON.moon}</span><span class="i-sun">${ICON.sun}</span></button><button class="tool nav-toggle" type="button" id="nav-toggle" aria-label="Show categories" aria-expanded="false" aria-controls="catbar">${ICON.list}</button></div>
</div>${nav(opts.active || "")}</header>
<main id="main" class="wrap">${wrapped}</main>
<footer class="foot"><div class="wrap"><p>${SITE} is the public build log of <a href="https://remnantsecurity.com">Remnant Security</a>. Written by Ian Trimble and a nightly run.</p><p><a href="/feed.xml">RSS</a> · <a href="https://remnantsecurity.com">remnantsecurity.com</a></p></div></footer>
</body></html>
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

const fmtDate = (d) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

const catName = (slug) => catBySlug.get(slug).name;

const meta = (p, { project = false } = {}) =>
  `<p class="meta"><span class="m">${ICON.user}${esc(p.author)}</span><span class="m">${ICON.cal}<time datetime="${p.date}">${fmtDate(p.date)}</time></span>` +
  `<span class="m">${ICON.clock}${p.minutes} min read</span>` +
  `<a class="m cat" href="${catHref(p.category)}">${esc(catName(p.category))}</a>` +
  (project ? `<a class="m proj" href="/${p.slug}/">${esc(p.project)}</a>` : "") +
  `</p>`;

const thumb = (p, cls = "thumb") => {
  const src = firstImage(p);
  return src
    ? `<a class="${cls}" href="/${p.slug}/${p.date}/" tabindex="-1" aria-hidden="true"><img src="${src}" alt="" loading="lazy" decoding="async"></a>`
    : "";
};

const story = (p) =>
  `<li class="story${firstImage(p) ? "" : " no-thumb"}">${thumb(p)}<div class="card"><h3><a href="/${p.slug}/${p.date}/">${esc(p.title)}</a></h3>${meta(p, { project: true })}${p.summary ? `<p class="sum">${esc(p.summary)}</p>` : ""}</div></li>`;

const stories = (items) =>
  items.length
    ? `<ul class="stories" data-view="list">${items.map(story).join("")}</ul>`
    : `<p class="empty">No stories yet.</p>`;

const viewToggle = () =>
  `<div class="view" role="group" aria-label="List layout"><button type="button" data-set="list" aria-pressed="true" aria-label="List view">${ICON.list}</button><button type="button" data-set="grid" aria-pressed="false" aria-label="Grid view">${ICON.grid}</button></div>`;

function write(rel, html) {
  const out = path.join(DIST, rel, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

// ---- sidebar ---------------------------------------------------------------
const projectCounts = (() => {
  const m = new Map();
  for (const p of entries) {
    const cur = m.get(p.slug) || { slug: p.slug, name: p.project, n: 0 };
    cur.n++;
    m.set(p.slug, cur);
  }
  return [...m.values()].sort((a, b) => b.n - a.n || a.name.localeCompare(b.name));
})();

function sidebar({ toc = [], more = null, activeCat = "" } = {}) {
  const blocks = [];
  if (toc.length >= 3)
    blocks.push(
      `<section class="side toc"><h2>In this article</h2><ol>${toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join("")}</ol></section>`,
    );
  if (more && more.items.length)
    blocks.push(
      `<section class="side"><h2>${esc(more.title)}</h2><ul class="mini">${more.items
        .map((p) => `<li><a href="/${p.slug}/${p.date}/">${esc(p.title)}</a><span class="d">${fmtDate(p.date)}</span></li>`)
        .join("")}</ul></section>`,
    );
  blocks.push(
    `<section class="side"><h2>Browse</h2><ul class="cats">${CATS.filter((c) => catCounts.get(c.slug) > 0)
      .map(
        (c) =>
          `<li><a href="${catHref(c.slug)}"${activeCat === c.slug ? ' aria-current="page"' : ""}>${esc(c.name)}</a><span class="n">${catCounts.get(c.slug)}</span></li>`,
      )
      .join("")}</ul></section>`,
  );
  blocks.push(
    `<section class="side"><h2>Recent days</h2><ul class="mini">${days
      .slice(0, 7)
      .map((d) => {
        const n = entries.filter((e) => e.date === d).length;
        return `<li><a href="/${d}/">${fmtDate(d)}</a><span class="d">${n} ${n === 1 ? "story" : "stories"}</span></li>`;
      })
      .join("")}</ul></section>`,
  );
  blocks.push(
    `<section class="side"><h2>Projects</h2><ul class="cats">${projectCounts
      .slice(0, 10)
      .map((p) => `<li><a href="/${p.slug}/">${esc(p.name)}</a><span class="n">${p.n}</span></li>`)
      .join("")}</ul></section>`,
  );
  return `<aside class="sidebar" aria-label="More from the diary">${blocks.join("")}</aside>`;
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

// Home: a lead story, then the latest stories. Quiet days still get a line so a
// published quiet day is never invisible.
const home = parseOptional(path.join(ROOT, "index.md"));
const introHtml = home.body.trim() ? `<div class="intro">${marked.parse(home.body)}</div>` : "";
const lead = entries.find((e) => firstImage(e) && e.format === "longform") || entries.find((e) => firstImage(e)) || entries[0];
const rest = entries.filter((e) => e !== lead).slice(0, 24);
const leadHtml = lead
  ? `<article class="lead"><a class="lead-img" href="/${lead.slug}/${lead.date}/" tabindex="-1" aria-hidden="true">${firstImage(lead) ? `<img src="${firstImage(lead)}" alt="" decoding="async" fetchpriority="high">` : ""}</a><div class="lead-body"><h2><a href="/${lead.slug}/${lead.date}/">${esc(lead.title)}</a></h2>${meta(lead, { project: true })}<p class="sum">${esc(lead.summary)}</p></div></article>`
  : "";
const quietDays = days.filter((d) => !entries.some((e) => e.date === d)).slice(0, 5);
const quietHtml = quietDays.length
  ? `<section class="quiet-days"><h2>Quiet days</h2><ul>${quietDays
      .map((d) => {
        const f = path.join(POSTS, d, "index.md");
        const note = fs.existsSync(f) ? parse(f).body.trim().split(/(?<=[.!?])\s/)[0] : "";
        return `<li><a href="/${d}/">${fmtDate(d)}</a> ${esc(note || "Nothing shipped.")}</li>`;
      })
      .join("")}</ul></section>`
  : "";
write(
  "",
  page(
    home.meta.title || SITE,
    `<h1 class="sr">${esc(home.meta.title || SITE)}</h1>${introHtml}<div class="layout"><div class="col">${leadHtml}<div class="list-head"><h2>Latest stories</h2>${viewToggle()}</div>${stories(rest)}${quietHtml}</div>${sidebar()}</div>`,
    { path: "", active: "home", image: lead && firstImage(lead) ? firstImage(lead) : "" },
  ),
);

// Category pages.
for (const c of CATS) {
  const items = entries.filter((e) => e.category === c.slug);
  write(
    path.join("category", c.slug),
    page(
      `${c.name} · ${SITE}`,
      `<div class="layout"><div class="col"><div class="list-head"><div><h1>${esc(c.name)}</h1><p class="blurb">${esc(c.blurb)}</p></div>${viewToggle()}</div>${stories(items)}</div>${sidebar({ activeCat: c.slug })}</div>`,
      {
        path: `category/${c.slug}`,
        active: c.slug,
        desc: `${c.blurb} ${items.length} ${items.length === 1 ? "story" : "stories"}.`,
      },
    ),
  );
}

// Day overviews.
for (const date of days) {
  const f = path.join(POSTS, date, "index.md");
  const items = entries.filter((e) => e.date === date);
  const inner = fs.existsSync(f)
    ? `<div class="intro">${marked.parse(parse(f).body)}</div>`
    : `<p class="lede">${items.length} project${items.length === 1 ? "" : "s"} changed.</p>`;
  write(date, page(`${fmtDate(date)} · ${SITE}`, `<div class="layout"><div class="col"><h1>${fmtDate(date)}</h1>${inner}${stories(items)}</div>${sidebar()}</div>`, {
    path: date,
    desc: items.length
      ? `${items.length} project${items.length === 1 ? "" : "s"} changed on ${date}: ${items.map((i) => i.project).join(", ")}.`
      : `Nothing shipped on ${date}.`,
  }));
}

// Per-project rolling pages and single-day entries.
function groupBySlug(items) {
  const m = new Map();
  for (const p of items) {
    if (!m.has(p.slug)) m.set(p.slug, []);
    m.get(p.slug).push(p);
  }
  return m;
}
const RESERVED = new Set(["category", "assets", "fonts"]);
for (const [slug, items] of groupBySlug(entries)) {
  if (RESERVED.has(slug)) throw new Error(`project slug "${slug}" collides with a reserved route`);
  const pj = path.join(PROJECTS, slug, "index.md");
  const body = fs.existsSync(pj)
    ? marked.parse(parse(pj).body)
    : `<p class="lede">Rolling diary for ${esc(items[0].project)}.</p>`;
  write(slug, page(`${items[0].project} · ${SITE}`, `<div class="layout"><div class="col"><h1>${esc(items[0].project)}</h1><div class="intro">${body}</div>${stories(items)}</div>${sidebar({ activeCat: items[0].category })}</div>`, {
    path: slug,
    active: items[0].category,
    desc: `Diary entries for ${items[0].project} — ${items.length} day${items.length === 1 ? "" : "s"}.`,
  }));
  for (const p of items) {
    const sameCat = entries.filter((e) => e !== p && e.category === p.category).slice(0, 5);
    const crumbs = `<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Diary</a><a href="${catHref(p.category)}">${esc(catName(p.category))}</a><a href="/${slug}/">${esc(p.project)}</a></nav>`;
    const keep = entries.filter((e) => e !== p && (e.project === p.project || e.category === p.category)).slice(0, 3);
    write(
      path.join(slug, p.date),
      page(
        `${p.title} · ${SITE}`,
        `<div class="layout"><article class="col post${p.format === "longform" ? " long" : ""}">${crumbs}<h1>${esc(p.title)}</h1>${meta(p)}${p.summary ? `<p class="dek">${esc(p.summary)}</p>` : ""}${renderStatBar(p)}<div class="prose">${rewriteAssets(p.html, p.date, dayAssets.get(p.date))}</div>${keep.length ? `<section class="keep"><h2>Keep reading</h2><ul class="stories compact">${keep.map(story).join("")}</ul></section>` : ""}</article>${sidebar({ toc: p.toc, more: { title: `More in ${catName(p.category)}`, items: sameCat }, activeCat: p.category })}</div>`,
        { path: `${slug}/${p.date}`, active: p.category, desc: p.summary || `${p.project} on ${p.date}.`, image: firstImage(p) },
      ),
    );
  }
}

write("404", page(`Not found · ${SITE}`, `<div class="layout"><div class="col"><h1>Not found</h1><p>That page is not here. <a href="/">Back to the diary</a>, or pick a category above.</p></div>${sidebar()}</div>`, { path: "404" }));
fs.renameSync(path.join(DIST, "404", "index.html"), path.join(DIST, "404.html"));
fs.rmdirSync(path.join(DIST, "404"));

// ---- feed, sitemap, robots, search index -------------------------------------
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
    <category>${esc(catName(p.category))}</category>
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
  <description>${esc(TAGLINE)}</description>
  <language>en</language>${days.length ? `\n  <lastBuildDate>${rfc822(days[0])}</lastBuildDate>` : ""}
${feedItems}
</channel>
</rss>
`,
);

const urls = [
  "",
  ...CATS.filter((c) => catCounts.get(c.slug) > 0).map((c) => `category/${c.slug}`),
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
fs.writeFileSync(
  path.join(DIST, "search.json"),
  JSON.stringify(
    entries.map((p) => ({ t: p.title, s: p.summary, p: p.project, c: catName(p.category), u: `/${p.slug}/${p.date}/`, d: p.date })),
  ),
);

fs.writeFileSync(path.join(DIST, "styles.css"), fs.readFileSync(path.join(ROOT, "styles.css")));
fs.writeFileSync(path.join(DIST, "site.js"), fs.readFileSync(path.join(ROOT, "site.js")));
fs.cpSync(path.join(ROOT, "assets", "fonts"), path.join(DIST, "fonts"), { recursive: true });
fs.copyFileSync(path.join(ROOT, "og-card.png"), path.join(DIST, "og-card.png"));
fs.writeFileSync(path.join(DIST, "CNAME"), DOMAIN + "\n");
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
console.log(
  `Built ${entries.length} entries across ${groupBySlug(entries).size} projects, ${days.length} days, ` +
    `${CATS.length} categories + feed/sitemap/robots/search -> dist/`,
);
