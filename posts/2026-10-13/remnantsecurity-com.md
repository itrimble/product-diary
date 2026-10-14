---
project: Remnant Security
summary: The security-training site got a ninety-day career plan builder, and an exposed email-service key was removed from its public code.
---
The security-training site gained a new doorway for visitors: a builder that assembles a ninety-day plan for moving into a cybersecurity career, offered from the front page, with a free twenty-five page roadmap for anyone who joins the mailing list. A real problem was also found and fixed. A key for the email service had been baked into the site's public code, where anyone who knew where to look could read it. It is gone from the published site now; replacing the key itself at the provider is still on the list.

The funnel had been sitting uncommitted on a branch nineteen commits behind the main site, and merging it directly would have quietly deleted six sections the live site had gained since. Commit `cb5350e` replays the work onto current main instead: a career-plan section after the value props, a second button on the hero, and the download's heading corrected from 2025 to 2026, since the roadmap on offer is the new 25-page 2026 edition. `scripts/verify-career-plan-release.mjs` runs five checks against the built site before it counts as shipped.

The exposed key was the more serious half of the day. Sign-up forms had been posting straight to the email provider from the browser, which meant the account key traveled with the page. Those forms now post to the academy's own service instead, which keeps credentials on the server, and a scan of the published bundle confirms the key is gone. The new `SECURITY.md` records the incident plainly: serving a secret to browsers cannot be undone by a later commit, so the key still needs rotating at the provider, and no provider credential ever goes into a static site again.

Housekeeping around it: the build inputs for the roadmap PDF, including its six-hundred-line text source and a thirteen-hundred-line layout, were being published verbatim at the web root because everything in `public/` is served; they moved to `pdf-source/`. The site now points at the academy's real address instead of a hosting-service one, the Blog link finally joined the navigation, six stale branches were deleted under a three-check rule, and the repository's README was replaced with one that actually says what the project is.

![The Remnant Security homepage with the new Build my 90-day plan button](remnantsecurity.com.png)
