#!/usr/bin/env node
// Enforce bin/ENTRY-CONTRACT.md on one day's entries.
//
//   node bin/validate-entries.mjs 2026-10-04
//
// Exit 0: every entry conforms and may be published.
// Exit 1: at least one entry failed; reasons on stdout. The runner treats this
//         as "this provider did not deliver" and tries the next one.
//
// The point is consistency: Claude, GLM and DeepSeek do not write alike, so the
// blog's shape is defined here rather than left to whichever model ran.
import fs from "node:fs";
import path from "node:path";

const date = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
  console.error("usage: validate-entries.mjs YYYY-MM-DD");
  process.exit(2);
}
const ROOT = path.dirname(new URL(import.meta.url).pathname).replace(/\/bin$/, "");
const DAY = path.join(ROOT, "posts", date);

// Stems, not whole words: "leveraged" and "delving" are the same tell. Each
// entry is a regex fragment inserted between \b...\b.
const BANNED_WORDS = [
  "delv(?:e|es|ed|ing)", "leverag(?:e|es|ed|ing)", "robust(?:ly|ness)?",
  "seamless(?:ly)?", "elevat(?:e|es|ed|ing|ion)", "unlock(?:s|ed|ing)?",
  "empower(?:s|ed|ing|ment)?", "game[- ]chang(?:er|ing)",
  "cutting[- ]edge", "best[- ]in[- ]class", "journey(?:s)?",
  "landscape(?:s)?", "testament", "tapestr(?:y|ies)", "realm(?:s)?",
  "underscor(?:e|es|ed|ing)", "pivotal(?:ly)?", "crucial(?:ly)?",
  "vital(?:ly)?", "notably", "moreover", "furthermore",
];
const BANNED_PHRASES = [
  /it'?s not just .{1,40}?,? it'?s/i,
  /in today'?s fast[- ]paced/i,
  /stands as a testament/i,
  /^overall,/im,
  /various improvements/i,
  /a number of (changes|improvements|fixes)/i,
];
// Anything that would be a leak on a public site.
const SECRETS = [
  [/\b(sk|rk)-[A-Za-z0-9_-]{16,}/, "API-key-shaped string"],
  [/\bgh[pousr]_[A-Za-z0-9]{20,}/, "GitHub token"],
  [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key id"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "private key block"],
  [/\b(ANTHROPIC|OPENAI|DEEPSEEK|ZAI)_API_KEY\s*=\s*\S+/i, "API key assignment"],
  [/\bCLAUDE_CODE_OAUTH_TOKEN\s*=\s*\S+/i, "OAuth token assignment"],
  [/\beyJ[A-Za-z0-9_-]{20,}\./, "JWT"],
  [/\b[A-Fa-f0-9]{40,}\b/, "long hex string"],
];
const INTERNAL = [
  [/\b192\.168\.\d{1,3}\.\d{1,3}\b/, "internal IP"],
  [/\b10\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/, "internal IP"],
  [/\b100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.\d{1,3}\.\d{1,3}\b/, "Tailscale IP"],
  [/\b[\w-]+\.local\b/, "mDNS hostname"],
  [/\/Volumes\//, "local NAS path"],
  [/\/Users\/[a-z]+\//i, "home directory path"],
];

const problems = [];
const bad = (file, msg) => problems.push(`${file}: ${msg}`);

function frontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: null, body: src };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: src.slice(m[0].length) };
}

function scanShared(file, text) {
  for (const [re, what] of SECRETS) if (re.test(text)) bad(file, `looks like a ${what} — refusing to publish`);
  for (const [re, what] of INTERNAL) if (re.test(text)) bad(file, `contains ${what}`);
}

if (!fs.existsSync(DAY)) {
  console.log(`FAIL ${date}: posts/${date}/ does not exist — the agent wrote nothing`);
  process.exit(1);
}

// --- survey coverage --------------------------------------------------------
// A quiet day and a failed survey look identical in the output, so the claim has
// to be checkable: the agent writes one line per project folder, and every
// folder that exists must be accounted for. Without this, "nothing shipped"
// silently means "I ran out of time".
const PROJECTS_DIR = process.env.DIARY_PROJECTS_DIR || "/Volumes/nas/projects";
const surveyChanged = new Set();

// Folder names carry capitals, spaces and underscores ("AI Mesh", "SkillClaw",
// "threat_intel_hunter"); entry slugs are lowercase and hyphenated. Compare on
// a normalised form.
const slugify = (s2) =>
  String(s2).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// PROJECTS.md maps folders to display names, and several folders can be one
// product (qix-clone and qix-swift are both QixForge), so an entry may be named
// for the product rather than the folder that changed.
function folderDisplayNames() {
  const map = new Map();
  const f = path.join(PROJECTS_DIR, "PROJECTS.md");
  if (!fs.existsSync(f)) return map;
  for (const line of fs.readFileSync(f, "utf8").split("\n")) {
    const m = line.match(/^\|\s*(?:nas|ext|hub)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/);
    if (m) map.set(m[1], m[2]);
  }
  return map;
}
const surveyFile = path.join(ROOT, "logs", "surveys", `${date}.tsv`);
// The receipts live only on the NAS and are never committed, so CI cannot see
// them. CI proves provenance with bin/attest-day.sh instead. Locally this is
// never set, and the survey remains mandatory.
const NO_SURVEY = !!process.env.DIARY_NO_SURVEY;
let surveyChecked = null;
if (NO_SURVEY) {
  // Shape checks only.
} else if (!fs.existsSync(surveyFile)) {
  bad("survey", `logs/surveys/${date}.tsv is missing — the survey is not optional`);
} else {
  const surveyRows = fs
    .readFileSync(surveyFile, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("\t"));
  surveyChecked = new Set(surveyRows.map((r) => r[0].trim()).filter(Boolean));
  // A folder counts as changed if any of its counters is non-zero. The dirty
  // form (commits:0 + dirty:N + mtime:M) is only emitted when files actually
  // moved on the date, so its presence is itself the signal.
  for (const r of surveyRows) {
    const name = r[0].trim();
    if (!name) continue;
    const counters = r.slice(1);
    const changed = counters.some((c) => {
      const [k, v] = c.split(":");
      if (k === "error") return true; // unreadable is not the same as unchanged
      return Number(v) > 0;
    });
    if (changed) surveyChanged.add(name);
  }
  let actual = [];
  try {
    actual = fs
      .readdirSync(PROJECTS_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith(".") && d.name !== "product-diary")
      .map((d) => d.name);
  } catch {
    bad("survey", `cannot read ${PROJECTS_DIR} to check survey coverage`);
  }
  const missed = actual.filter((d) => !surveyChecked.has(d));
  if (missed.length) {
    bad(
      "survey",
      `${missed.length} of ${actual.length} project folders were never surveyed` +
        ` (e.g. ${missed.slice(0, 5).join(", ")}${missed.length > 5 ? ", ..." : ""})`,
    );
  }
}

// ---- the nightly story and its SEO rules ------------------------------------
// One magazine-style post per day, written after the project entries. See "Daily story"
// and "SEO" in ENTRY-CONTRACT.md. Days before STORY_FROM are left alone so they verify.
const DAILY_STORY = "Daily Story";
const HELD = new Set((process.env.DIARY_HELD_FILES || "").split(/\s+/).filter(Boolean));
const STORY_FROM = "2026-10-21";
const SEO_FROM = "2026-10-24";
const GENERIC_SLUGS = new Set(["story", "daily-story", "daily", "diary", "post", "update", "today", "news"]);
const GENERIC_HEADINGS = /^(introduction|intro|overview|conclusion|summary|final thoughts|wrapping up|closing thoughts|background|details)$/i;
const GENERIC_IMAGE = /^(img|image|shot|screenshot|screen|photo|pic|picture|capture|untitled)[-_ ]?\d*\.(png|jpe?g|webp|gif)$/i;

// Does an internal link point at a page that will exist?
function internalLinkOk(href) {
  const u = href.split("#")[0];
  if (/^\/(category|assets|fonts)\//.test(u) || u === "/" || u === "/feed.xml" || u.startsWith("/learning-to-sell")) return true;
  let m = u.match(/^\/(\d{4}-\d{2}-\d{2})\/$/);
  if (m) return fs.existsSync(path.join(ROOT, "posts", m[1]));
  m = u.match(/^\/([a-z0-9-]+)\/(\d{4}-\d{2}-\d{2})\/$/);
  if (m) return fs.existsSync(path.join(ROOT, "posts", m[2], `${m[1]}.md`));
  m = u.match(/^\/([a-z0-9-]+)\/$/);
  if (m) {
    for (const d of fs.readdirSync(path.join(ROOT, "posts"))) {
      if (fs.existsSync(path.join(ROOT, "posts", d, `${m[1]}.md`))) return true;
    }
  }
  return false;
}

function checkStory(f, slug, meta, body, paras, withoutFences, words) {
  const slugWords = slug.split("-").filter(Boolean);
  if (GENERIC_SLUGS.has(slug) || slugWords.length < 3 || slugWords.length > 8) {
    bad(f, `story filename "${slug}" is the page address: use 3-8 descriptive words naming the app and what happened`);
  }
  if (!meta.title) bad(f, "a story needs a title in the frontmatter");
  else {
    if (meta.title.length < 30 || meta.title.length > 62) bad(f, `title is ${meta.title.length} chars, SEO spec says 30-62`);
    if (/\d{4}-\d{2}-\d{2}/.test(meta.title)) bad(f, "title must not be just a date; name the app and what happened");
  }
  if (meta.summary && (meta.summary.length < 110 || meta.summary.length > 160)) {
    bad(f, `summary is ${meta.summary.length} chars; the story's meta description must be 110-160`);
  }
  if (words < 700 || words > 2500) bad(f, `story is ${words} words, SEO spec says 700-2500`);
  const lead = (paras[0] || "").trim().split(/\s+/).filter(Boolean).length;
  if (lead < 25 || lead > 70) bad(f, `first paragraph is ${lead} words; it becomes the search snippet, so 25-70`);

  const heads = [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  const h2 = heads.filter((h) => !/^sources$/i.test(h));
  if (h2.length < 3) bad(f, `${h2.length} section headings; the story needs at least 3 descriptive ## headings`);
  for (const h of heads) if (GENERIC_HEADINGS.test(h)) bad(f, `heading "${h}" says nothing to a search engine; name the app or the event`);
  if (/^#\s/m.test(body)) bad(f, "do not write a # heading; the page title is the only h1");

  const imgs = [...body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];
  if (imgs.length < 3) bad(f, `${imgs.length} screenshots; the story needs at least 3`);
  for (const [, alt, file] of imgs) {
    if (alt.trim().split(/\s+/).filter(Boolean).length < 6) bad(f, `alt text "${alt}" needs at least 6 words describing what the picture shows`);
    if (GENERIC_IMAGE.test(file) || /\s/.test(file)) bad(f, `image file "${file}" needs a descriptive name such as lightfence-title-screen-tv.png`);
  }

  const links = [...body.matchAll(/\[[^\]]+\]\((\/[^)\s]*)\)/g)].map((m) => m[1]);
  const distinct = new Set(links.map((l) => l.split("#")[0]));
  if (distinct.size < 3) bad(f, `${distinct.size} distinct internal links; link at least 3 of the day's entries, project pages or earlier stories`);
  for (const l of distinct) if (!internalLinkOk(l)) bad(f, `internal link ${l} does not point at a page that exists`);
  const dayEntries = fs.readdirSync(DAY).filter((x) => x.endsWith(".md") && x !== "index.md" && x !== f);
  if (dayEntries.length && !dayEntries.some((x) => links.some((l) => l.startsWith(`/${x.replace(/\.md$/, "")}/${date}/`)))) {
    bad(f, "link at least one of the day's project entries so readers and crawlers can reach the detail");
  }
}

const files = fs.readdirSync(DAY).filter((f) => f.endsWith(".md"));
const entries = files.filter((f) => f !== "index.md");
const assetsDir = path.join(DAY, "assets");
const assets = fs.existsSync(assetsDir) ? new Set(fs.readdirSync(assetsDir)) : new Set();

if (!files.includes("index.md")) bad("index.md", "missing — every day needs an overview");

// --- the day overview -------------------------------------------------------
if (files.includes("index.md")) {
  const src = fs.readFileSync(path.join(DAY, "index.md"), "utf8");
  scanShared("index.md", src);
  if (/^---\n/.test(src)) bad("index.md", "must not have frontmatter");
  const sentences = src.trim().split(/[.!?]+(?:\s|$)/).filter((s) => s.trim());
  // Accounting for flagged folders takes room: a day that names two folders and
  // says why each was left out cannot do it in three sentences, and the 1-3 cap
  // rejected a correct overview that did exactly what the contract asked.
  if (sentences.length < 1 || sentences.length > 7) {
    bad("index.md", `${sentences.length} sentences, contract says 1-6`);
  }
}

// --- project pages ----------------------------------------------------------
// Validated only when present, so this cannot fail a day written before the
// project page existed.
{
  const PROJ = path.join(ROOT, "projects");
  if (fs.existsSync(PROJ)) {
    for (const slug of fs.readdirSync(PROJ)) {
      const f = path.join(PROJ, slug, "index.md");
      if (!fs.existsSync(f)) continue;
      const rel = `projects/${slug}/index.md`;
      const src = fs.readFileSync(f, "utf8");
      scanShared(rel, src);
      if (/^---\n/.test(src)) bad(rel, "must not have frontmatter");
      if (/^#{1,6}\s/m.test(src)) bad(rel, "must not have a heading");
      const words = src.trim().split(/\s+/).filter(Boolean).length;
      if (words < 25 || words > 120) bad(rel, `${words} words, contract says 25-120`);
      const paras = src.trim().split(/\n\s*\n/).filter((p2) => p2.trim());
      if (paras.length > 1) bad(rel, `${paras.length} paragraphs, contract says 1`);
      const sentences = src.trim().split(/[.!?]+(?:\s|$)/).filter((x) => x.trim());
      if (sentences.length < 2 || sentences.length > 4) {
        bad(rel, `${sentences.length} sentences, contract says 2-4`);
      }
      for (const w of BANNED_WORDS) {
        const m = src.match(new RegExp(`\\b${w}\\b`, "i"));
        if (m) bad(rel, `banned word "${m[0]}"`);
      }
    }
  }
}

// --- a quiet day is legitimate, but only if the survey agrees --------------
// This is the failure this whole gate exists for: a day reported as quiet while
// the survey shows work. It is how "I ran out of time looking" gets published as
// "nothing shipped".
if (!NO_SURVEY && entries.length === 0 && surveyChanged.size) {
  // "Nothing happened" and "I ran out of time looking" read identically, which
  // is why this check exists. But "I looked, and it was a coding assistant's
  // config file" is a legitimate quiet day, and failing it threw away a good
  // honest overview. The rule is therefore to account for what was seen, not to
  // forbid the conclusion: name each changed folder and say why it was left out.
  const overviewPath = path.join(DAY, "index.md");
  const overview = fs.existsSync(overviewPath)
    ? fs.readFileSync(overviewPath, "utf8").toLowerCase()
    : "";
  const display = folderDisplayNames();
  const unnamed = [...surveyChanged].filter((folder) => {
    const d = display.get(folder);
    return (
      !overview.includes(folder.toLowerCase()) &&
      !(d && overview.includes(d.toLowerCase()))
    );
  });
  if (unnamed.length) {
    bad(
      "index.md",
      `declares a quiet day without accounting for ${unnamed.length} folder(s) the survey flagged: ` +
        unnamed.slice(0, 5).join(", ") +
        (unnamed.length > 5 ? ", ..." : "") +
        " — name each one and say why it was left out",
    );
  }
}

if (entries.length === 0) {
  if (problems.length) {
    console.log(`FAIL ${date}\n  ` + problems.join("\n  "));
    process.exit(1);
  }
  console.log(`OK ${date}: quiet day, overview only (${surveyChecked ? surveyChecked.size : 0} folders surveyed)`);
  process.exit(0);
}

// --- each project entry -----------------------------------------------------
for (const f of entries) {
  const slug = f.replace(/\.md$/, "");
  if (!/^[a-z0-9-]+$/.test(slug)) bad(f, `slug "${slug}" must be lowercase letters, digits and hyphens`);

  const src = fs.readFileSync(path.join(DAY, f), "utf8");
  scanShared(f, src);
  const { meta, body } = frontmatter(src);

  if (!meta) {
    bad(f, "no frontmatter block");
    continue;
  }
  for (const k of Object.keys(meta)) {
    if (!["project", "summary", "title", "format", "stats", "category"].includes(k)) bad(f, `unexpected frontmatter key "${k}"`);
  }
  // Opt-in long form. It relaxes shape only: length, paragraph count, headings,
  // em dashes and fence length. Every rule about substance still applies - the
  // banned words, the banned constructions, the secret and internal-path scans,
  // the plain-language lead and summary, the concrete-specific requirement.
  // Those are the contract; the shape limits are what makes it a diary.
  if (meta.format !== undefined && meta.format !== "longform") {
    bad(f, `format "${meta.format}" is not a known value (only "longform")`);
  }
  if (meta.stats !== undefined && !/^[^=|]+=[^|]+(\|[^=|]+=[^|]+)*$/.test(meta.stats)) {
    bad(f, `stats "${meta.stats}" is not "Label = value | Label = value"`);
  }
  if (meta.category !== undefined) {
    let known = [];
    try { known = JSON.parse(fs.readFileSync(path.join(ROOT, "categories.json"), "utf8")).categories.map((c) => c.slug); } catch {}
    if (!known.includes(meta.category)) bad(f, `category "${meta.category}" is not in categories.json (${known.join(", ")})`);
  }
  const LONG = meta.format === "longform";
  const STORY = meta.project === DAILY_STORY;
  if (STORY && !LONG) bad(f, `a ${DAILY_STORY} must be format: longform`);
  if (!meta.project) bad(f, "frontmatter is missing project");
  else if (meta.project.length < 2 || meta.project.length > 40) bad(f, `project "${meta.project}" outside 2-40 chars`);

  if (!meta.summary) bad(f, "frontmatter is missing summary");
  else {
    const sMax = LONG ? 240 : 160;
    if (meta.summary.length < 40 || meta.summary.length > sMax) {
      bad(f, `summary is ${meta.summary.length} chars, contract says 40-${sMax}`);
    }
    if (!/[.!?]$/.test(meta.summary)) bad(f, "summary must end in . ! or ?");
  }

  // Body shape.
  const withoutFences = body.replace(/```[\s\S]*?```/g, "");
  const words = withoutFences.trim().split(/\s+/).filter(Boolean).length;
  const wMax = LONG ? 5000 : 450;
  if (words < 80 || words > wMax) bad(f, `body is ${words} words, contract says 80-${wMax}`);

  // A fenced block is not a paragraph, and neither is a markdown table: a
  // table has no prose shape, and its cells trip the em-dash rule below,
  // which is there to stop em-dash-heavy prose, not to police table columns.
  const isBlock = (p) => p.trim().startsWith("```") || /^\s*\|/.test(p);
  const paras = body.trim().split(/\n\s*\n/).filter((p) => p.trim() && !isBlock(p));
  const pMax = LONG ? 200 : 6;
  if (paras.length < 2 || paras.length > pMax) bad(f, `${paras.length} paragraphs, contract says 2-${pMax}`);

  // A long piece needs headings to be navigable; a diary entry does not.
  if (!LONG && /^#{1,6}\s/m.test(body)) bad(f, "contains a heading; the page supplies the heading");

  for (const fence of body.match(/```[\s\S]*?```/g) || []) {
    const n = fence.split("\n").length - 2;
    const fMax = LONG ? 40 : 12;
    if (n > fMax) bad(f, `a code block is ${n} lines, contract caps it at ${fMax}`);
  }

  for (const p of paras) {
    const dashes = (p.match(/—/g) || []).length;
    const dMax = LONG ? 3 : 1;
    if (dashes > dMax) bad(f, `a paragraph uses ${dashes} em dashes, contract allows ${dMax}`);
  }

  // Long form, from 2026-10-17: real screenshots with captions, and sources a reader can
  // check. Earlier long-form days are left alone so they still verify.
  if (LONG && date >= "2026-10-17") {
    const lines = body.split("\n");
    const imgs = lines.filter((l) => /^!\[/.test(l));
    if (imgs.length < 1) bad(f, "long form needs at least one real screenshot (see ENTRY-CONTRACT, Long form)");
    lines.forEach((l, i) => {
      if (!/^!\[/.test(l)) return;
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      if (j >= lines.length || !lines[j].startsWith("*")) bad(f, `image "${l.slice(0, 60)}" needs an italic caption line right after it`);
    });
    const src = body.match(/^##+\s*Sources[^\n]*\n([\s\S]*)$/im);
    if (!src) bad(f, 'long form needs a "Sources" section with links a reader can open');
    else {
      const n = new Set((src[1].match(/\]\((https?:\/\/[^)\s]+)\)/g) || [])).size;
      if (n < 2) bad(f, `"Sources" has ${n} distinct https links; long form needs at least 2`);
    }
  }

  // The nightly story is held to the SEO spec in ENTRY-CONTRACT.md. Later entries only
  // get the cheap checks, so an older day still verifies.
  if (STORY && date >= STORY_FROM) checkStory(f, slug, meta, body, paras, withoutFences, words);
  if (!STORY && date >= SEO_FROM) {
    for (const m of body.matchAll(/!\[([^\]]*)\]\(/g)) {
      if (m[1].trim().split(/\s+/).filter(Boolean).length < 3) bad(f, `image alt text "${m[1]}" needs at least 3 words that describe the picture`);
    }
  }
  // Ordinary nightly entries, from SEO_FROM: a real title (it is the page title in search results, so a date
  // stamp will not do), no commit hashes in running text (that is a changelog, not a story), and no apology for a
  // missing picture (the daily story carries the pictures; an entry either has one or says nothing).
  if (!LONG && !STORY && date >= SEO_FROM) {
    const t = (meta.title || "").trim();
    if (!t) bad(f, "an entry needs a title in the frontmatter (30-62 characters naming the project and what happened)");
    else {
      if (t.length < 30 || t.length > 62) bad(f, `title is ${t.length} chars, the entry spec says 30-62`);
      if (/\d{4}-\d{2}-\d{2}/.test(t) || /^[^:]{1,40} [\u2014-] \d/.test(t)) bad(f, "the title must name what happened, not just the project and a date");
    }
    for (const m of withoutFences.matchAll(/`([0-9a-f]{7,40})`|\b(?:commit|commits|in|at)\s+([0-9a-f]{7,40})\b/g)) {
      if (/[0-9]/.test(m[1] || m[2]) && /[a-f]/.test(m[1] || m[2])) bad(f, `commit hash "${m[1] || m[2]}" in running text; say what the change did and leave the hash in git`);
    }
    const ap = withoutFences.match(/\b(no (picture|screenshot|photo)s?\b[^.]{0,40}(tonight|today|this time)|there is no (picture|screenshot)|could(?: not|n'?t) (?:photograph|capture|screenshot)|screenshot (?:run|tool|capture|script) (?:failed|does not|did not|would not)|no picture (?:tonight|today))/i);
    if (ap) bad(f, `do not apologise for a missing picture ("${ap[0].slice(0, 50)}"); an entry either has a captioned picture or says nothing about one`);
  }
  // From SEO_FROM every screenshot in every post is captioned, not only long form: an italic line right
  // after the image saying what it shows and when it was captured (4+ words). The build does not render
  // alt text as a caption, so without this line the reader gets a bare picture.
  if (date >= SEO_FROM) {
    const lines = body.split("\n");
    lines.forEach((l, i) => {
      if (!/^!\[/.test(l)) return;
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      const cap = j < lines.length ? lines[j].trim() : "";
      if (!/^\*[^*].*\*$/.test(cap)) bad(f, `image "${l.slice(0, 60)}" needs an italic caption line right after it (what it shows and when it was captured)`);
      else if (cap.replace(/\*/g, "").trim().split(/\s+/).length < 4) bad(f, `the caption under "${l.slice(0, 60)}" is too short; say what it shows and when it was captured`);
    });
  }

  // Voice. URLs are exempt: a link's slug is not the writer's word choice.
  const prose = withoutFences
    .replace(/\]\((https?:\/\/|\/)[^)\s]*\)/g, "]")
    .replace(/<https?:\/\/[^>\s]+>/g, " ")
    .replace(/https?:\/\/\S+/g, " ");
  for (const w of BANNED_WORDS) {
    const m = prose.match(new RegExp(`\\b${w}\\b`, "i"));
    if (m) bad(f, `banned word "${m[0]}"`);
  }
  for (const re of BANNED_PHRASES) {
    if (re.test(prose)) bad(f, `banned construction ${re}`);
  }

  // The first paragraph is for a non-technical reader, so it is the one place
  // jargon is a failure rather than a style note. Later paragraphs are free.
  const lead = (paras[0] || "").trim();
  if (lead) {
    const jargon = [
      [/`[^`]+`/, "inline code"],
      [/\b[\w-]+\.(swift|ts|tsx|js|mjs|py|json|yml|yaml|sh|rs|go|h|m|xcodeproj)\b/, "a filename"],
      [/\b[a-z]+[A-Z]\w*\b/, "a camelCase identifier"],
      [/\b\w+\(\)/, "a function call"],
      [/\b[A-Z][a-zA-Z]+\.[a-zA-Z]+\b/, "a dotted type name"],
      [/\b(API|CLI|SDK|JSON|YAML|HTTP|HTTPS|SQL|UUID|SHA|HMAC|OAuth|CRUD|ORM|regex|async|enum|struct|boolean|null|nil)\b/i, "a technical acronym or keyword"],
    ];
    for (const [re, what] of jargon) {
      const m = lead.match(re);
      if (m) {
        bad(f, `the first paragraph must read for a non-technical audience; it contains ${what} ("${m[0]}")`);
        break;
      }
    }
  }

  // The summary sits under the headline on every index page, so it gets the
  // same treatment.
  if (meta.summary) {
    const m = meta.summary.match(/`[^`]+`|\b[a-z]+[A-Z]\w*\b|\b[\w-]+\.(swift|ts|js|py|json|sh)\b/);
    if (m) bad(f, `summary must be plain language; it contains "${m[0]}"`);
  }

  // At least one concrete specific. Deliberately broad: a narrow version of
  // this rejected an entry that said "four victory conditions" and named the
  // Continue and Play Again actions, which would only teach a model to sprinkle
  // backticks. Rejecting good writing is worse here than missing vague writing,
  // which the banned-word list already catches.
  const signals = [
    /`[^`]+`/.test(body),                                    // inline code
    /\d/.test(withoutFences),                                // any digit
    /\b[a-z]+[A-Z]\w*\b/.test(withoutFences),                // camelCase
    /\b[\w-]+\.(swift|ts|tsx|js|mjs|py|md|json|yml|yaml|sh|rs|go|c|h|m)\b/.test(withoutFences),
    /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/i.test(withoutFences),
    /[a-z,]\s[A-Z][a-z]+/.test(withoutFences),                // a named thing mid-sentence
  ];
  if (!signals.some(Boolean)) bad(f, "no concrete specific (a name, number, file or command)");

  // Images must be bare filenames that exist.
  for (const m of body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const src2 = m[1];
    if (src2.includes("/")) bad(f, `image "${src2}" must be a bare filename`);
    else if (!assets.has(src2)) bad(f, `image "${src2}" is not in posts/${date}/assets/`);
  }
}

// --- entries must match the evidence ---------------------------------------
// The rest of this file checks shape. This checks that an entry is about work
// that happened: without it, a model can write a plausible entry for a project
// that did not change that day, and nothing would notice.
{
  const display = folderDisplayNames();
  const changedSlugs = new Set([...surveyChanged].map(slugify));
  // Folders that changed, keyed by the product name they roll up to.
  const changedByProduct = new Set();
  for (const folder of surveyChanged) {
    const name = display.get(folder);
    if (name) changedByProduct.add(slugify(name));
  }

  for (const f of entries) {
    const slug = slugify(f.replace(/\.md$/, ""));
    const { meta } = frontmatter(fs.readFileSync(path.join(DAY, f), "utf8"));
    // The story covers the whole day, so it has no single project for the survey to confirm.
    if (meta && meta.project === DAILY_STORY) continue;
    // Hand-written posts the nightly run held aside were already published and signed. They are
    // written about work the survey need not re-confirm (an article can describe an earlier day's work
    // or a project whose folder name differs), so only their shape and voice are re-checked.
    if (HELD.has(f)) continue;
    const claimed = meta && meta.project ? slugify(meta.project) : "";
    const ok = changedSlugs.has(slug) || changedByProduct.has(slug) ||
      (claimed && (changedSlugs.has(claimed) || changedByProduct.has(claimed)));
    if (!ok && surveyChecked && !NO_SURVEY) {
      bad(
        f,
        `the survey shows no change in "${slug}"${claimed && claimed !== slug ? ` or "${claimed}"` : ""}` +
          ` on ${date} — an entry must describe work the survey saw`,
      );
    }
  }

  // The reverse is a judgement call, not a failure: the agent is told to omit or
  // summarise private material, and to ignore noise.
  const entrySlugs = new Set(
    entries.map((f) => slugify(f.replace(/\.md$/, ""))),
  );
  const unwritten = [...surveyChanged].filter((folder) => {
    const s2 = slugify(folder);
    const d = display.get(folder);
    return !entrySlugs.has(s2) && !(d && entrySlugs.has(slugify(d)));
  });
  if (unwritten.length) {
    console.log(`note ${date}: changed but no entry: ${unwritten.join(", ")}`);
  }
}

// Orphan assets are a smell, not a failure, but say so.
const referenced = new Set();
for (const f of entries) {
  for (const m of fs.readFileSync(path.join(DAY, f), "utf8").matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) referenced.add(m[1]);
}
const orphans = [...assets].filter((a) => !a.startsWith(".") && !referenced.has(a));

if (problems.length) {
  console.log(`FAIL ${date} (${entries.length} entries)\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`OK ${date}: ${entries.length} entries conform, ${surveyChecked ? surveyChecked.size : 0} folders surveyed` + (orphans.length ? `; ${orphans.length} unreferenced asset(s): ${orphans.join(", ")}` : ""));
