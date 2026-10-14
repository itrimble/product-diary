---
project: Remnant Security Academy
summary: The paid training service's software and two private business documents were placed under private version control for the first time.
---
The training business's paid course service, the site behind the Career Jumpstart and bootcamp products, was placed under proper version control for the first time today. Two private business documents were also moved out of a public project's working folder, where one careless command could have published them to the world, and into the private one. Nothing changed for learners; this was insurance.

The academy app is a Next.js build with magic-link sign-in, a Supabase backend handling the catalog, entitlements, progress tracking and question pools, Stripe checkout, and signed video playback. Commit `6fc21fa` is its initial history, and the ignore rules were written before anything was committed: environment files, keys and certificates stay out from day one, with an `.env.example` committed for shape. July's browser-session captures were swept in too, so the snapshot is honest about what the folder held.

The second commit, `793b5c0`, moves an investor-facing business plan and an equipment inventory into `docs/business/`. They had been sitting untracked in a public repository's working tree, one `git add -A` away from being committed and pushed. They stay private by design; this diary names them and quotes nothing from them.

Taken with the afternoon's cleanup on the public site, the exposed email key removed there and the PDF sources pulled off the web root, the shape of the day is clear: everything sensitive got moved to where publishing it by accident stops being possible.

There is no picture for this one: the screenshot tool found nothing it could render, and a private service's screens are not for a public diary anyway.
