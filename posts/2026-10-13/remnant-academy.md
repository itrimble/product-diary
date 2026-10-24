---
project: Remnant Security Academy
title: Remnant Academy Software Goes Under Private Version Control
summary: The paid training service's software and two private business documents were placed under private version control for the first time.
---
A paid service that learners depend on had no safety net until 13 October. The software behind Career Jumpstart and the bootcamp products is now tracked in version control, and it is kept private. Two private business documents moved at the same time, out of a public project's working folder and into this one. They had been a single careless command away from publication. Learners will notice nothing, and I am happy with that.

The service is a Next.js app with magic-link sign-in. Supabase manages the catalog, entitlements, progress and question pools, Stripe takes payment, and video playback is signed. Before anything was committed, the ignore rules were set: environment files, keys and certificates never enter the history, and an example file shows what they should look like. July's browser-session captures were swept in so the snapshot matches what the folder held.

The moved documents are an investor-facing business plan and an equipment inventory. They had been lying untracked in a public repository's working tree, where an add-everything command would have staged them. I name them and go no further.

The same afternoon, the public site lost an exposed email key and its PDF sources were pulled off the web root. Looking at the whole day, the common thread is relocating sensitive material to places where publishing it by accident can no longer happen.
