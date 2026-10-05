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
---
```

No other keys. `title` is allowed but optional; the build derives one otherwise.

## Entry body

- **80-450 words.** Below 80 it is a changelog line, not an entry; above 450 it
  stops being a diary. The floor is deliberately low: a floor set too high is
  itself a cause of padding.
- **2-4 paragraphs**, blank-line separated. No headings — the page supplies the
  heading.
- At least one **concrete specific**: a feature, file, command, bug, number or
  decision. "Various improvements" is a validation failure, not a style note.
- Images referenced by bare filename only (`![alt](shot.png)`), and the file must
  exist under that day's `assets/`.
- No code fences longer than 12 lines. No bare URLs to internal hosts
  (`192.168.*`, `*.local`, `/Volumes/*`).

## Day overview (`index.md`)

No frontmatter. 1-3 sentences framing the day across projects. On a day where
nothing qualified, it says so plainly and is the **only** file written.

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
summary: Fixed the capture path that silently dropped every second frame.
---
The capture path dropped every second frame on retina displays. The scale factor
in `CaptureSession.swift` was applied twice, once when building the pixel buffer
and again when writing it out, so frames arrived at half the expected height and
the encoder discarded them without raising an error.

The fix reads the scale factor once at session start and passes it down. A test
now captures 30 frames at 2x and asserts the count, which is what would have
caught this the first time.
```

Note what it does: names the file, says what was wrong, says what changed, and
says what now prevents it. No adjectives doing the work of facts.
