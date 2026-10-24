---
project: Insider Threat Assessment Tool
title: Insider Threat Tool Compiles Again After a Year
summary: A website for rating how ready an organisation is for insider threats compiles again for the first time in over a year.
---
For more than a year, my Insider Threat Assessment Tool could not even be built, which is why it never went online. The idea is simple: a company answers a questionnaire and receives a report on how exposed it is to its own people. That site now builds cleanly. The repair also surfaced three faults that would have broken both sign-in and sign-up the moment real users arrived.

One bad merge in May 2025 started it all. It left unresolved conflict markers inside the admin benchmarks page, so the file was gibberish to the compiler. With that out of the way, 22 further errors appeared. Most were housekeeping. The three that mattered all involved Clerk, the sign-in service. The app was importing its provider from a second copy of the library, and two copies running side by side break authentication while the site is live. The middleware was written for the wrong shape of Clerk's version 5. And the user type came from a private path inside Clerk that shifts between releases, so I swapped in a small `AppUser` type with just what the app stores: id, name, email, sector and company size.

The housekeeping was dull but real. User-deletion webhooks carry no user fields, so the handlers now check what kind of event they received first. Firebase deliberately exports nothing when unconfigured, which meant three places needed a guard. The user-list call now returns a paged envelope. Two imports pointed at things that are gone.

A full production build is the proof I have: clean types, all 23 pages generated, middleware compiled. Deployment has one trap. The results page creates its OpenAI client as soon as it loads, so without `OPENAI_API_KEY` in the build environment that page cannot be prerendered.
