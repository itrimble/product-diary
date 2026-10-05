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
---
```

No other keys. `title` is allowed but optional; the build derives one otherwise.

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
- **2-4 paragraphs**, blank-line separated. No headings — the page supplies the
  heading.
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

## Day overview (`index.md`)

No frontmatter. 1-3 sentences framing the day across projects. On a day where
nothing qualified, it says so plainly and is the **only** file written.

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
