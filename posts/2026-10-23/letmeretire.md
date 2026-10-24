---
project: Let Me Retire
title: Let Me Retire Publishes One Dream, One Button and No Payments
summary: I published a one-page joke site called Let Me Retire: one dream, one million dollars, one button, and a checkout that honestly reports it is not configured.
category: web
---
I published a joke. Let Me Retire is a single page declaring that I have a dream and it costs a million dollars, with one button standing between me and the beach, a Wall of Believers for anyone who wants on it, and a footer admitting the site is a joke, not financial advice, with results not guaranteed and vibes non-refundable. The whole thing went live at its own address today.

![The Let Me Retire homepage with its headline and call to action](letmeretire.png)
*The Let Me Retire homepage as rendered on 24 October 2026, headline, dream and disclaimer included.*

The button is real, in the sense that real payment machinery sits behind it: a small cloud worker creates checkout sessions and hands them to the page. It was deployed and then smoke-checked, and the smoke check came back with exactly what an unfinished payment setup should say, which is that checkout is not configured, because no payment secret has been stored. No payment can occur, and for a joke site that is arguably the finished state.

The page carries proper privacy, terms and cookies sections, because even a gag should answer a lawyer's questions. The checkout worker lives in its own repository with its own instructions, so if the dream ever comes true the money end can grow up without the joke getting less funny.
