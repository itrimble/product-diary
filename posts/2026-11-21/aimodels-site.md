---
project: AI Models
title: AI Models Catalog Gets a Measured Benchmarks Page
summary: My local AI model catalog now has a page of real speed measurements, each labelled as reading speed or writing speed with its source.
---
My catalog of local AI models now has a benchmarks page, and every number on it comes from someone's published measurement, not from me. Each row says which machine ran the model, how long the conversation was, and where the figure came from. If you have wondered how fast a model feels on a particular computer, this is the first place the catalog can answer that.

I got it wrong once on the way. The first version showed a single speed column, which hides the fact that AI models read your prompt and write their answer at very different speeds. By the evening I had relabelled the columns as prefill (reading the prompt) and decode (generating the reply), moved the numbers in the data file accordingly, and added a note that a blank prefill cell means the source did not report it, not that it is zero.

The page is built from `data/benchmarks.json` by `tools/build_site.py`, which also stamps a count onto the home page and the model pages. The site is static HTML, so the build rewrites about thirty model pages whenever the data changes. I added StrixFold and TensorFold rows, and one entry is a Windows run on a GMKtec box with an AMD chip: 44 tokens per second decoding, 755 per second prefill at a 4K prompt, 0.6 seconds to first token. That is a third-party measurement on similar hardware, not on my own machine, and the row says so.

Earlier in the day I added nine curated models to the catalog and improved mobile layout and accessibility. I did not run the benchmarks myself, and I have not checked each source link beyond the entries I read.

![The AI models catalog home page](aimodels-site.png)
*The AI models catalog home page as rendered on 21 November 2026, after the benchmarks link was added.*
