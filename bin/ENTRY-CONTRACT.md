# Entry contract

The normative shape of a diary entry. `bin/diary-prompt.md` tells the agent to
follow it and `bin/validate-entries.mjs` enforces it, so the blog reads the same
whichever model wrote it — Claude, GLM, DeepSeek or a later fallback. An entry
that fails validation is not published.

## Files for one day

```
posts/YYYY-MM-DD/<project-slug>.md     one per qualifying project (required)
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
title otherwise.

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

Notes-to-self, not marketing. Short sentences. Name the thing. Past tense for
what happened.

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
