---
project: Insider Threat Assessment Tool
summary: A website for rating how ready an organisation is for insider threats compiles again for the first time in over a year.
---
The Insider Threat Assessment Tool is a website where an organisation answers questions and gets a report on how exposed it is to people inside the company. It could not be built at all for over a year, so it was never put online. It builds cleanly again. Along the way three real faults came to light that would have broken sign-in and sign-up once it went live.

The cause was a merge in May 2025 that left half-finished conflict markers in the admin benchmarks page, so the file was not even valid code. Fixing that exposed 22 more errors. Three mattered. `pages/_app.tsx` pulled its sign-in provider from a second copy of Clerk, and two copies in one app break authentication at runtime. `middleware.ts` gave Clerk's v5 middleware a callback with the wrong arguments. `AppContext.tsx` described the user with a type taken from a private Clerk path that moves between releases. I replaced it with a small `AppUser` type holding what the app really stores: id, name, email, sector and company size.

The rest was mechanical. The webhook handlers now check the event type before reading user fields, since a deletion event carries none. The Firebase setup deliberately exports nothing when it is not configured, so three call sites now check for that. `getUserList` returns a paged envelope in v5. Two imports pointed at things that no longer exist.

The check was a full production build: types clean, 23 of 23 pages generated, middleware compiled. One catch for deployment: the `/results` page creates its OpenAI client when the module loads, so the build needs `OPENAI_API_KEY` set or that page fails to prerender.

![The assessment tool's landing page](insidrthreat.png)
