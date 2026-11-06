---
project: AI Budget Build
title: AI Budget Build Goes Live With Mac, Linux and eGPU Advice
summary: AI Budget Build, my parts-picker for running AI models at home, went public on Thursday and now covers Windows, Linux, Mac and external graphics cards.
---
AI Budget Build is now public. On [Wednesday](/aibudgetbuild/2026-11-04/) it only ran on my machine; on Thursday it went live at its own address under my security company's domain, and by evening it had grown into something a stranger can use. You say what computer you have and what you want to run, and it shows which used graphics cards fit, what they cost and what they would draw. It now covers Windows, Linux and Mac, and it has a section on plugging a graphics card in from outside the computer.

The first publish was a single-page version around lunchtime. Later the source moved into its own repository, with a daily job that refreshes exchange rates and model links. After that came three build phases in one afternoon: a table of cards with a sticky summary bar, a searchable model picker that shows which models fit, a "Full build" mode, an alternatives panel and four tabs. Then sourced memory-bandwidth figures, a quantization selector, a labelled speed ceiling, a rent-versus-buy comparison, Markdown export and price history.

I also added routes for Macs, small boxes and odd hardware, and an external-card section built on Joshua Warren's article, with link speeds, docks and others' measurements. I corrected the PlayStation 5 firmware and BC-250 results. One conflict on Apple Silicon is left unresolved on the page, on purpose.

Checks moved into GitHub Actions: tests on every pull request and a weekly link and layout audit. The first audit run found real problems. Long strings overflowed on narrow screens and scrolling tables could not be reached by keyboard. Both are fixed in the last commit of the day. It also found a dead PS5 source and a moved domain.

Not verified: only one real-phone check, from a screenshot I was sent, and prices remain asking prices that go stale.
