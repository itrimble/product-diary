---
project: Remnant Security Academy
title: Remnant Academy Becomes Findable by Search Engines
summary: The paid training site can now be found by search engines and shows a proper preview card when its pages are shared.
---
The academy's public pages can now be found. Until today it was the only one of the company's sites with no search map and no preview image, so a shared link to a course showed a bare grey card and search engines had no list of its public pages. Now the shop-window pages carry titles, descriptions and a social card, while sign-in, checkout and lesson pages stay out of search. Pages that name a learner stay out too.

The commit is `ee8978f`. It adds `robots.txt`, a sitemap and per-page canonical addresses. The home page, course list, both course pages, six role paths, the lab portfolio and the waitlist are indexed. Certificate pages are blocked because they name a learner, and a verification link is for handing to an employer, not for turning up in a search result. The `/portfolio/` rule has a trailing slash on purpose: robots rules match on prefix, and a bare one would have hidden `/portfolio-labs` as well.

Two bugs were fixed on the way. A fallback address pointed at localhost, which would have put localhost in every canonical on a production build. And canonicals set in the root layout would have made every page claim to be a copy of the home page. All 12 sitemap URLs were checked against a production build.

The deploy then exposed a trap (`e88ae08`). The project has no Git connection, so pushing never deployed anything and the last upload was from 2 August. A 80-day-old setting still named the old hosting address and overrode the fix, so it was removed. Connecting Git needs a login only Ian can grant.

There is no picture: a private paid service is not shown in a public diary.
