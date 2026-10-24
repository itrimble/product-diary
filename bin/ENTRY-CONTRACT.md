# Entry contract

The normative shape of a diary entry. `bin/diary-prompt.md` tells the agent to
follow it and `bin/validate-entries.mjs` enforces it, so the blog reads the same
whichever model wrote it — Claude, GLM, DeepSeek or a later fallback. An entry
that fails validation is not published.

## Files for one day

```
posts/YYYY-MM-DD/<project-slug>.md     one per qualifying project (required)
posts/YYYY-MM-DD/<story-slug>.md       the daily story, from 2026-10-21 (see "Daily story")
posts/YYYY-MM-DD/index.md              the day's overview (required)
posts/YYYY-MM-DD/assets/<name>.png     images referenced by those entries
```

`<project-slug>` is lowercase, digits, hyphens only — the folder name, not the
display name.

## Entry frontmatter

```yaml
---
project: Display Name          # required, from PROJECTS.md, 2-40 chars
summary: One plain sentence.   # required, 40-160 chars, ends with . ! or ?
                               # Plain language, same rule as the first
                               # paragraph: no code, no identifiers.
format: longform               # optional; a full article, not a diary entry.
                               # See "Long form" below.
stats: Label = value | ...     # optional; real numbers only, rendered as the
                               # stat bar at the top of the article.
---
```

No other keys beyond `title`, `format`, `stats` and `category`, all optional. `category` is a slug from
`categories.json` and overrides the category the entry's project belongs to (the site files each project under one
category; leave it out unless the story belongs elsewhere). The build derives a
title otherwise, except that **entries from 2026-10-24 need a real `title`**: 30-62 characters naming the project and
what happened ("StatBar 1.7 Can Now Slim Down Phone Simulators"), because it is the page title in search results. A
project-and-date stamp is rejected.

## Entry body

**The first paragraph is for someone who does not write software.** It says what
changed from the point of view of a person using the thing, and why that matters.
It is the only part most readers will read.

In that first paragraph: no code, no filenames, no function or type names, no
camelCase, no acronyms beyond ordinary English. Say "the game could not be won
three of the five ways it promised", not "three victory conditions returned
false". Say "the app forgot your progress when you quit", not "no persistence
layer". If a technical thing has to be named, say what it does instead.

Paragraphs after the first may be as technical as the work deserves. That is
where files, commands, numbers and causes belong. A reader who stops after the
first paragraph should still have learned something true and complete.

- **80-450 words.** Below 80 it is a changelog line, not an entry; above 450 it
  stops being a diary. The floor is deliberately low: a floor set too high is
  itself a cause of padding.
- **2-6 paragraphs**, blank-line separated. No headings — the page supplies the
  heading. The 450-word ceiling is the real limit; this only stops a wall of
  text, and it has rejected good entries twice, so it is deliberately loose.
- At least one **concrete specific**: a feature, file, command, bug, number or
  decision. "Various improvements" is a validation failure, not a style note.
- Images referenced by bare filename only (`![alt](shot.png)`), and the file must
  exist under that day's `assets/`.
- **No commit hashes in running text (entries from 2026-10-24).** Say what the change did for the person using the
  thing. The hash is in git for anyone who wants it.
- **No apology for a missing picture (entries from 2026-10-24).** An entry either has a captioned picture or says
  nothing about one. Pictures live in the daily story.
- **Every image has a caption (days from 2026-10-24, all posts).** An italic line right after the image, at
  least 4 words, saying what it shows and when it was captured. The build does not render alt text as a caption, so
  without the line a reader gets a bare picture. Long form has required this since 2026-10-17.
- **Try for a picture.** Run `bin/shot-project.sh <folder> <date>` for each
  project you write about and include what it returns. It prints a filename on
  success or a one-line reason it could not, and never fails the run. A reason
  is an acceptable outcome; not trying is not.
- No code fences longer than 12 lines. No bare URLs to internal hosts
  (`192.168.*`, `*.local`, `/Volumes/*`).

## Long form

A day folder publishes whatever is in it, so the same pipeline carries a full
article as readily as a diary entry. An article is not a diary entry, and the
shape limits above would reject it, so it opts out of them explicitly:

```yaml
format: longform
```

That raises the shape limits and nothing else:

| | entry | longform |
|---|---|---|
| summary | 40-160 chars | 40-240 |
| body | 80-450 words | 80-5000 |
| paragraphs | 2-6 | 2-200 |
| headings | not allowed | allowed |
| code fence | 12 lines | 40 |
| em dashes per paragraph | 1 | 3 |

Everything about substance still applies: the plain-language first paragraph,
the banned words and constructions, the secret and internal-host scans, the
concrete specific, a real summary. Those are the contract. The limits above are
only what makes an entry a diary rather than an essay.

A markdown table is not counted as a paragraph and is exempt from the em-dash
limit, where a dash is a column rule rather than a choice.

The route comes from the filename, so `posts/2026-10-11/hisense-tv.md` is served
at `/hisense-tv/2026-10-11/`.

**Adding one to a day that is already published re-opens that day.** The
attestation covers every file in the folder, and a night's run only ever signs
its own day, so an article dropped into an older folder leaves that day failing
verification until it is signed again by hand:

```
bash bin/attest-day.sh sign YYYY-MM-DD
```

Writing it into the current day's folder before that night's run needs none of
this: it is signed with everything else.

### Long form requirements (days from 2026-10-17)

Long form is a magazine-style article, so it is held to a reader's standard of proof:

- **Real screenshots.** At least one, three or more where the work allows. Each image is followed by an italic caption
  line that says what it shows and when it was captured. Capture one window, never a whole screen, and look at the
  image before it goes in: no emails, tokens, internal addresses or other people's data. A screenshot of a public
  page cited as evidence is fine with credit in the caption.
- **Sources a reader can open.** A `## Sources` section with at least two distinct https links, grouped if there are
  many. Link claims inline where you make them. Say what you read, when, and what you did not verify. Links that
  block bots (Reddit, eBay, Amazon return 403 to scripts) are allowed, but confirm them in a browser.
- **Related stories.** Run `bin/related-links.py <draft.md>` before finishing. When it lists a strong match, link the
  earlier entry with its route (`/<slug>/<date>/`); the same goes for related stories elsewhere on the web. Do not
  force a link that does not help the reader.
- **URLs are exempt from the word scans.** A link's slug is not a word choice, so the banned-word and construction
  checks ignore URLs. They still apply to everything a reader sees.

The validator enforces the first two for any long-form day dated 2026-10-17 or later. The shared `product-diary-blog`
skill (`~/.agents/skills/product-diary-blog/`) runs the same checks, plus a build and a link check, before anything
is pushed.

## Daily story (days from 2026-10-21)

Every day that has project entries also gets **one long-form story** that tells the whole day as a magazine
piece, in the voice described under "Voice". The per-project entries are the record; the story is what a reader
finds, shares and gets found by. It is a normal long-form post with a reserved project name:

```yaml
---
project: Daily Story
title: Lightfence Goes to Apple Review While SnapDog Learns Linux   # 30-62 chars, names the apps and the event
summary: One plain sentence, 110-160 characters, that works as the search result description.
format: longform
stats: Lightfence build = 1003 | Prism Shift commits = 32          # optional, real numbers only
---
```

The file is `posts/YYYY-MM-DD/<descriptive-slug>.md`. The filename is the page address, so use 3-8 lowercase words that
name the main apps and what happened (`lightfence-app-review-snapdog-linux-gifs.md`), never `story.md`.

- **Evidence.** The story may only describe work the survey saw and the project entries already record. It has no
  single project for the survey to check, so that check is skipped, but its facts are held to the same standard:
  disclose what failed and what was not verified.
- **Length and shape.** 700-2500 words. A plain-language first paragraph of 25-70 words (this becomes the search
  snippet), then at least three `##` sections. Each heading names an app or an event; "Introduction", "Overview",
  "Conclusion" and "Summary" are rejected. Never write a `#` heading; the page title is the only h1.
- **Screenshots.** At least three real ones, each followed by an italic caption (what it shows, when it was captured,
  what to notice). Take them from the project entries' assets, each project's own screenshot folders, and
  `bin/shot-project.sh`. Open every image first and apply the screenshot hygiene rules. Never use art or footage
  that `site-templates/docs/CATALOG.md` marks do-not-publish.
- **Links.** At least three distinct internal links (the day's project entries, project pages, earlier stories), at
  least one of them to a project entry of the same day, and a `## Sources` section with at least two distinct https
  links. Every internal link must point at a page that exists.
- **Failure is not fatal.** The story is written after the project entries have passed. A story that fails
  validation is dropped and the entries still publish; the log says why.

## SEO

These rules apply to the daily story and, where marked, to every entry. The validator enforces what a script can
check; the build supplies the rest.

**You write:**

| | Rule |
|---|---|
| Title | 30-62 characters, names the app and the event, not just a date. Unique across the site. |
| Summary | 110-160 characters, plain language, reads as a complete sentence. It is the meta description and the share-card text. |
| Filename | 3-8 descriptive words, lowercase with hyphens. It is the URL. |
| Headings | At least three `##` headings that name something. No generic headings. One h1, supplied by the page. |
| First paragraph | 25-70 words, says who did what and why it matters, with the main app name in it. |
| Images | Descriptive filenames (`lightfence-title-screen-tv.png`, not `shot1.png`). Alt text of at least 6 words that says what is in the picture (3 for ordinary entries), plus an italic caption. |
| Links | 3+ internal, 2+ external sources. Link text describes the target; never "click here". |
| Words | Write for the reader. Use the app's real name once in the title and naturally in the text. No keyword stuffing, no hidden text, no invented claims. |

**The build supplies (do not hand-write):** a canonical URL; Open Graph and Twitter card tags with the image alt;
`robots` directives; a published and modified date; `BlogPosting` and `BreadcrumbList` structured data; a sitemap
with `lastmod`; an RSS feed; the site-wide card as the fallback image. The Daily Story has no project page of its
own, because a page per story would be near-duplicate content.

## Day overview (`index.md`)

No frontmatter. 1-3 sentences framing the day across projects, or up to 6 when
it has to account for flagged folders. On a day where
nothing qualified, it says so plainly and is the **only** file written.

If the survey flagged folders you decided not to write about — noise, generated
files, private material — the overview must **name each one** and say why. A day
cannot be declared quiet while leaving flagged folders unexplained, because
"nothing happened" and "I ran out of time looking" otherwise read the same. A
folder the survey could not read at all (`error:`) counts as flagged.

## The project page

`projects/<project-slug>/index.md`, written or refreshed whenever that project
gets an entry:

- No frontmatter, no heading.
- One paragraph, 2-4 sentences, 25-120 words.
- Present tense, describing what the project is and where it stands. Not news,
  not a changelog — someone arriving from a search result should learn what they
  are looking at.
- Same banned words and same secret and internal-host rules as an entry.

## Entries must match the evidence

An entry may only describe work the day's survey actually saw. The validator
compares each entry against `logs/surveys/YYYY-MM-DD.tsv`, by folder name or by
the display name PROJECTS.md maps it to, and rejects an entry for a project the
survey shows as unchanged.

A day declared quiet while the survey flagged changes is also rejected. Those two
states — nothing happened, and nobody finished looking — produce identical prose,
and only the survey can tell them apart.

The reverse is allowed: a changed project with no entry is a judgement call, since
noise is meant to be ignored and private material is meant to be left out. It is
reported as a note, not a failure.

## Voice

First person as Ian, candid and hands-on, in the spirit of MacStories and
Thurrott.com. Not marketing. Short sentences next to one precise detail. Name the
thing. Past tense for what happened. Commit hashes and file paths do not belong in
running text unless the file is the cause of something the reader should know.

Banned outright, because they are how a model fills space when it has nothing:
*delve, leverage, robust, seamless, elevate, unlock, empower, game-changing,
cutting-edge, best-in-class, journey, landscape, testament, tapestry, realm,
underscore, pivotal, crucial, vital, notably, moreover, furthermore*, and the
constructions "It's not just X, it's Y", "In today's fast-paced", "stands as a
testament", and any sentence beginning "Overall,".

Em dashes are allowed but at most one per paragraph.

## A conforming entry, in full

```markdown
---
project: SnapDog
summary: Screenshots taken on a high-resolution display were coming out blank.
---
Screenshots taken on a high-resolution display were coming out blank, and the
app gave no sign anything was wrong — it reported success and wrote an empty
file. Anyone on a modern laptop was affected, which is to say nearly everyone.
It now works, and a test will catch it if it ever breaks again.

The cause was a scale factor applied twice in `CaptureSession.swift`, once when
building the pixel buffer and again when writing it out. Frames arrived at half
the expected height and the encoder discarded them without raising an error,
which is why nothing surfaced.

The fix reads the scale factor once at session start and passes it down. A test
captures 30 frames at 2x and asserts the count, which is what would have caught
this the first time.

![The app capturing a window on a high-resolution display](snapdog-home.png)
```

Note the shape: the first paragraph could be read aloud to anyone and would
land. The second and third name the file, the cause and the fix. Nothing in the
first paragraph requires knowing what a pixel buffer is.
