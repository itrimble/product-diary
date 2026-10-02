// Builds posts/<project>/YYYY-MM-DD.md into dist/ with routes:
//   /                       all entries, newest first
//   /<project>/             one project's entries
//   /<project>/YYYY-MM-DD/  a single entry
// Optional frontmatter: title, project (display name), summary.
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const POSTS = path.join(ROOT, "posts");
const ASSETS = path.join(ROOT, "assets");
const DIST = path.join(ROOT, "dist");
const DOMAIN = "blog.remnantsecurity.com";
const SITE = "Product Diary";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function parse(file) {
  let src = fs.readFileSync(file, "utf8");
  const meta = {};
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
    src = src.slice(m[0].length);
  }
  return { meta, body: src };
}

const posts = [];
if (fs.existsSync(POSTS)) {
  for (const slug of fs.readdirSync(POSTS)) {
    const dir = path.join(POSTS, slug);
    if (slug.startsWith(".") || !fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir)) {
      const date = f.match(/^(\d{4}-\d{2}-\d{2})\.md$/)?.[1];
      if (!date) continue;
      const { meta, body } = parse(path.join(dir, f));
      posts.push({
        slug, date,
        project: meta.project || slug,
        title: meta.title || `${meta.project || slug} — ${date}`,
        summary: meta.summary || "",
        html: marked.parse(body),
      });
    }
  }
}
posts.sort((a, b) => b.date.localeCompare(a.date) || a.project.localeCompare(b.project));

const page = (title, content) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><link rel="stylesheet" href="/styles.css"></head>
<body><header><a href="/" class="brand">${SITE}</a><span class="by">Remnant Security</span></header>
<main>${content}</main>
<footer><a href="https://remnantsecurity.com">remnantsecurity.com</a></footer></body></html>
`;

const list = (items) => items.length
  ? `<ul class="entries">${items.map((p) => `<li><a href="/${p.slug}/${p.date}/"><time>${p.date}</time> <strong>${esc(p.project)}</strong> ${esc(p.title)}</a>${p.summary ? `<p>${esc(p.summary)}</p>` : ""}</li>`).join("")}</ul>`
  : `<p class="empty">No entries yet.</p>`;

function write(rel, html) {
  const out = path.join(DIST, rel, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
if (fs.existsSync(ASSETS)) fs.cpSync(ASSETS, path.join(DIST, "assets"), { recursive: true, filter: (s) => !path.basename(s).startsWith(".") });

write("", page(SITE, `<h1>${SITE}</h1><p class="lede">What changed across the projects, day by day.</p>${list(posts)}`));
const bySlug = Map.groupBy(posts, (p) => p.slug);
for (const [slug, items] of bySlug) {
  write(slug, page(`${items[0].project} · ${SITE}`, `<h1>${esc(items[0].project)}</h1>${list(items)}`));
  for (const p of items) {
    write(path.join(slug, p.date), page(`${p.title} · ${SITE}`,
      `<article><p class="crumbs"><a href="/${slug}/">${esc(p.project)}</a> · <time>${p.date}</time></p><h1>${esc(p.title)}</h1>${p.html}</article>`));
  }
}
write("404", page(`Not found · ${SITE}`, `<h1>Not found</h1><p><a href="/">Back to the diary</a></p>`));
fs.renameSync(path.join(DIST, "404", "index.html"), path.join(DIST, "404.html"));
fs.rmdirSync(path.join(DIST, "404"));

fs.writeFileSync(path.join(DIST, "styles.css"), fs.readFileSync(path.join(ROOT, "styles.css")));
fs.writeFileSync(path.join(DIST, "CNAME"), DOMAIN + "\n");
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
console.log(`Built ${posts.length} entries across ${bySlug.size} projects -> dist/`);
