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
    const m = line.match(/^\|\s*(?:nas|ext)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/);
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
    if (!["project", "summary", "title"].includes(k)) bad(f, `unexpected frontmatter key "${k}"`);
  }
  if (!meta.project) bad(f, "frontmatter is missing project");
  else if (meta.project.length < 2 || meta.project.length > 40) bad(f, `project "${meta.project}" outside 2-40 chars`);

  if (!meta.summary) bad(f, "frontmatter is missing summary");
  else {
    if (meta.summary.length < 40 || meta.summary.length > 160) {
      bad(f, `summary is ${meta.summary.length} chars, contract says 40-160`);
    }
    if (!/[.!?]$/.test(meta.summary)) bad(f, "summary must end in . ! or ?");
  }

  // Body shape.
  const withoutFences = body.replace(/```[\s\S]*?```/g, "");
  const words = withoutFences.trim().split(/\s+/).filter(Boolean).length;
  if (words < 80 || words > 450) bad(f, `body is ${words} words, contract says 80-450`);

  const paras = body.trim().split(/\n\s*\n/).filter((p) => p.trim() && !p.trim().startsWith("```"));
  if (paras.length < 2 || paras.length > 5) bad(f, `${paras.length} paragraphs, contract says 2-5`);

  if (/^#{1,6}\s/m.test(body)) bad(f, "contains a heading; the page supplies the heading");

  for (const fence of body.match(/```[\s\S]*?```/g) || []) {
    const n = fence.split("\n").length - 2;
    if (n > 12) bad(f, `a code block is ${n} lines, contract caps it at 12`);
  }

  for (const p of paras) {
    const dashes = (p.match(/—/g) || []).length;
    if (dashes > 1) bad(f, `a paragraph uses ${dashes} em dashes, contract allows 1`);
  }

  // Voice.
  for (const w of BANNED_WORDS) {
    const m = withoutFences.match(new RegExp(`\\b${w}\\b`, "i"));
    if (m) bad(f, `banned word "${m[0]}"`);
  }
  for (const re of BANNED_PHRASES) {
    if (re.test(withoutFences)) bad(f, `banned construction ${re}`);
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
