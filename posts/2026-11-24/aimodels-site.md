---
project: AI Models
title: AI Models Catalog Swaps Six Results for 32 Measured Ones
summary: The benchmarks page in my local AI model catalog now shows 32 speed results from my own machine, replacing the six it had the day before.
---
My catalog of local AI models now shows speeds I measured myself. The benchmarks page had six rows from my new mini computer on Monday. It now has 32, covering eight models, each run on two different graphics paths, with a short prompt and a long one. If you want to know whether a model feels fast or slow on this kind of hardware, the page can now answer from first-hand numbers.

The new rows come from a single receipt file that lists the machine, the software build, the file fingerprints of each model and every command used. Each figure is the median of three runs, with the spread beside it, and each model's reply speed is measured twice: from an empty conversation and with 8,192 tokens already in it. The home page line now reads 26.0 tokens a second on one path and 30.4 on the other.

The site is static pages generated from one data file, so a data change rewrites a handful of model pages and the home page counts. This commit touched 13 files, mostly that data file, which grew by about 530 lines, and the build script. I changed the build script slightly to handle the extra columns.

I also marked the older receipt from 23 November as superseded. It had used an average, not a median, and had no figures for a long conversation. The new receipt says what it leaves out: one 27B model needs a chip I do not have, the speech and image models are not language models, and room temperature and wall power were not recorded. Power is what the chip reports about itself.

I checked that the benchmarks page and the receipt both load. I did not check each source link beyond the ones I used.

![The AI models catalog home page](aimodels-site.png)
*The AI models catalog home page as rendered on 24 November 2026, after the new results were published.*
