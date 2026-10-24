---
project: Remnant Security Academy
title: Remnant Academy Becomes Findable by Search Engines
summary: The paid training site can now be found by search engines and shows a proper preview card when its pages are shared.
---
Until 15 October, the academy was invisible. It was the one company site that offered search engines no map and offered link previews no image, so a shared course link appeared as a bare grey card. Its public shop-window pages now come with titles, descriptions and a social card. Sign-in, checkout and lesson pages are deliberately kept out of search results, and so is every page that names a learner.

Twelve pages are open to search: home, the course list, each of the two course pages, six role paths, the lab portfolio and the waitlist. Certificates are the exception. A verification link is something a graduate hands to an employer, and I do not think it belongs in a search result. One rule ends in a slash on purpose, because crawler rules match by prefix and a bare version would also have buried the separate labs page. Behind it all are a robots file, a sitemap and one canonical address for each page.

Two bugs would have caused quiet damage. A fallback address pointed at localhost, so a production build would have stamped localhost on every canonical. And canonicals declared once in the root layout would have told search engines that every page duplicated the home page. A production build was used to check all 12 sitemap URLs.

Deploying was the real surprise. The project is not connected to Git, so pushing code had never published anything. The newest upload on record was from 2 August. A setting 80 days old kept naming the previous hosting address and overrode my fix. I deleted it. Wiring up Git needs a login only I can grant, and that is still to do.
