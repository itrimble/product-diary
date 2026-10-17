# Product

## What this is
Product Diary is Remnant Security's public build log at blog.remnantsecurity.com. A nightly run writes short entries about what changed across the projects, and long-form articles carry the bigger stories: what was built, what broke, what was measured.

## Who reads it
Curious people who do not write software (the first paragraph is written for them) and builders who want the numbers, the commands and the sources. They arrive from a search result or a shared link, usually on a phone, and decide in seconds whether the page is worth reading.

## Register
Editorial, in the family of a tech news site: Thurrott.com's structure (category bar, a lead story, a dense list of latest stories, a sidebar) with a calmer, more modern surface. The reader is here to read, so structure serves comprehension first.

## Voice
Candid, hands-on, specific. First person for the long reads. Notes-to-self for the nightly entries. No marketing language; every claim has a number or a link.

## Anti-references
Marketing landing pages, card grids of identical icon-heading-text blocks, stock hero images, autoplay anything, tracking, popups, third-party requests.

## Constraints
Static site built by `build.mjs` from Markdown. No runtime dependencies in the browser beyond a small script for search, theme and list view. Fonts are self-hosted (Public Sans, SIL OFL). Works without JavaScript. Fast on a phone. Category comes from `categories.json` by project, with an optional `category:` override per entry.
