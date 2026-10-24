---
project: Remnant Security
title: Career Plan Builder Added and an Exposed Key Removed
summary: The security-training site got a ninety-day career plan builder, and an exposed email-service key was removed from its public code.
---
Visitors to the security-training site can now build a ninety-day plan for moving into a cybersecurity career, starting from the front page. Anyone who joins the mailing list gets a free 25-page roadmap. The day also turned up something worse: a key for the email service was embedded in the site's public code, where anyone could read it. It has been removed from the published site. The key itself is still live at the provider, and replacing it is the open task.

Here is how it leaked. Sign-up forms posted from the visitor's browser straight to the email provider, so the account key traveled with every page. The forms now post to the academy's own service, which keeps credentials on the server, and a scan of the published bundle shows the key is gone. The new security note is plain about the lesson. A secret once served to browsers stays served, and a later commit cannot recall it, so rotation is still required. I agree with its rule: no provider credential goes into a static site again.

The plan builder needed careful handling. It had stayed uncommitted on a branch nineteen commits behind main, and merging as it stood would have silently removed six sections the live site had since gained. The work was replayed onto current main as a career-plan section after the value props and a second hero button. The download heading now says 2026 rather than 2025, since the roadmap is the new 2026 edition. Five checks against the built site must pass before it counts as shipped.

Tidying followed. The roadmap's build inputs, a six-hundred-line text source and a thirteen-hundred-line layout, had been served as-is because everything in the public folder is, and they now live elsewhere. The site points at the academy's real address, the Blog link finally joined the navigation, and six stale branches were deleted under a three-check rule. The README now says what the project is.
