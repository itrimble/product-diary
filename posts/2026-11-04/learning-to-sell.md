---
project: Learning to Sell
title: "Learning to Sell, Day Two: 55 Cards and Two Mistakes"
summary: I tried my parts-picker site on my own computer and found it wrong about power and memory. Then I added more parts, showed what I could not prove, and kept the money at zero.
stats: Affiliate earnings = $0 | Affiliate programs active = 0 | Cards priced = 55 | Automated tests passing = 83
format: longform
category: learning-to-sell
---
Yesterday I started a website that plans a cheap home computer for running AI models, and it was already telling people what to buy. Today I tried it on my own machine, with my own parts, and found it wrong in two places. It also grew from a handful of graphics cards to 55, and it started showing everything I researched but could not yet prove. This post is the log of that day, with the money still at zero and the site still not live.

[Day one](/learning-to-sell/2026-11-03/) covers why I wanted 128 gigabytes of video memory, the cards I looked at and the checks I wrote.

## Day two: what does 192 GB of RAM buy?

I asked the obvious next question. If I have a small card and 192 GB of ordinary RAM, what can I run? The answer depends on a trick. A mixture-of-experts model stores a huge number of "experts" but reads only a few for each word it writes. So the experts can sit in system RAM while the card holds the busy parts. It works. It is also slower than keeping everything on the card, and I have not measured how much slower.

That is why the new page says nothing about speed. It checks one thing: does it fit. It sorts 33 mixture-of-experts models into four buckets: fits on the cards, fits with the experts in RAM, a normal model that would spill into RAM and crawl, and does not fit. The sizes are the real file sizes from Hugging Face, not my arithmetic. I re-read two against the live listing and they matched.

![The What can I run page with 8 GB of card memory and 192 GB of RAM at 4-bit: the biggest model that fits is a 300-billion-parameter ERNIE at 180 GB, and 21 of 33 listed models fit in some form](what-can-i-run-8gb-192gb.png)

*The page for my own box (one 8 GB card, 192 GB of RAM), captured Nov 4, 2026, 10:58 AM Central. The summary box is the point: nothing fits on the card alone, the biggest model that fits with experts in RAM is 180 GB, and 21 of the 33 fit in some form.*

With 128 GB of card memory and the same 192 GB of RAM, the biggest model that fits entirely on the cards is dots.llm1 at about 94 GB. The biggest that fits with its experts in RAM is Qwen3-Coder-480B at about 290 GB. Kimi K2, DeepSeek and Mistral Large 3 stay out of reach, at over 400 GB each. Those are 4-bit file sizes and they leave out the working memory for long conversations, so I add a flat 4 GB, and I say on the page that it is a guess.

The same page has a game-development stack: one model each for vision, sound effects, voice, 3D, sprites and music, with its download size and its licence. This is the part I would not skip. Several of the best-known ones are non-commercial: FLUX.1 dev, MusicGen, AudioGen, MMAudio, F5-TTS and XTTS-v2. A few 3D and video models have a licence that excludes the EU, the UK and South Korea. My first version picked FLUX.1 dev for sprites by default. A solo developer shipping a game on that would have a problem, so the default now prefers a model cleared for commercial use, and the non-commercial ones carry a loud badge.

Not verified: the 4 GB context allowance, the 8 GB I hold back for the operating system, and the 1.5 GB per card. The "released" dates are when the repository was created on Hugging Face, which is not always the launch date. Active-parameter counts are missing for a few models and show as "not stated".

## A build you can send someone

Two user stories were plain plumbing, so I did them: a link to your build, and an export. The link holds only part ids and small numbers, never a price or a sentence, so a link cannot carry a claim, and anyone who opens it sees today's prices. If a link names a part the site does not know, or a count out of range, the site ignores the whole link instead of loading half a build. The export is a CSV and a plain-text summary, with each part's price date and source beside it.

![The builder summary for a five-card build of 112 GB, with the 2 TB drive price, a running-cost panel showing $27.20 a month, and the share and export buttons](builder-share-running-cost.png)

*A build loaded from a link, captured Nov 4, 2026, 11:25 AM Central. I typed 4 hours a day and 15 cents a kilowatt-hour: 1,360 W at the board is about 1,511 W at the wall, so 181 kWh and $27.20 a month. The 2 TB drive sits outside the total, on purpose.*

I also added a running-cost panel. You type your hours a day and your price per kilowatt-hour, and it gives a monthly figure. It shows nothing until you have typed both, because I did not want to guess your electricity price. It uses the build's full-load draw at the wall, so it is a ceiling, and the panel says so. While adding it I found the page footer still claiming the power supply and adapter prices were placeholders, a day after I had replaced them. The footer now reads that from the data.

Not verified: the copy button in a normal browser window. In the automated browser I tested with, the first try was blocked because the page did not have focus, and the page fell back to showing the text in a box to copy by hand. On a later try, with the page focused, the copy went through. I have not tried it by hand in a regular browser.

## Videos are a snapshot

Videos can be a source of benchmarks and build ideas too, and I should use them. I pulled the captions of one Country Boy Computers video, the V620 against the MI50 on Linux, uploaded June 10, 2026. Two more came back with a rate-limit error from YouTube. I did not push past it, and they are listed on the page as not read.

![The Community reports page: a table of written benchmarks for the V620, MI50 and V100, with the caveats listed under it](community-reports.png)

*The new Community reports page, captured Nov 4, 2026, 10:58 AM Central. Every number on it is someone else's. The page says so at the top, and again under the table.*

The video gave me software findings I could use. Flash attention works on the V620 through Vulkan and crashes through ROCm on that card. It works on the MI50 through ROCm. Linux gave much better prompt speed than Windows on the same cards. It also gave me a price problem. He says he paid $210 each for MI50s in October and offered $350 each for two V620s, and the seller accepted. My dated listing prices are $690 to $880 for the MI50 and $730 to $1,000 for the V620.

Both can be true. An accepted offer and an import are not an asking price on a listing, and a video is five months old. I expect today's price to be at or above his, not below, and I will not put his price on the site as if it were current. So the page shows it as history: the number, the upload date, what kind of price it was, and our own dated price beside it. A new check in the audit rejects a video claim that has no timestamp, and lists every video price as historical.

Not verified: all of it. The captions are automatic and got model names and one speed figure wrong. One run's card could not be told from the captions at all, so I recorded it as unclear, and I did not reproduce any number.

## Two things I got wrong on Nov 4

**The memory plan.** I had written down "two 32 GB single-rank sticks". I went looking for a kit and could not find one. Silicon Power's table lists 32 GB desktop DDR4 only as dual rank. An Advantech datasheet gives a 32 GB stick as 2Rx8. A third table agrees. The one "1Rx8" listing I found was 16 GB sticks. MSI's manual for my board rates one stick per channel at 3866 MHz when it is dual rank and 4600 MHz when it is single, and two per channel dual rank at 3600. So two 32 GB sticks, one per channel, are still the lightest load the board allows. They are not single rank. My failed set was four dual-rank sticks, two per channel. Whether this fixes the errors, I do not know yet.

The site now shows what that costs, and I am glad I checked. The one priced 64 GB kit was Corsair's own list price, $274. The same class of kit was asking $459 (NEMIX, 2Rx8), $499.89 (a Micron-made kit, part CT2K32G4DFD832A) and $569.95 (the 2Rx8 Pro kit from the same maker, part CP2K32G4DFRA32A) at US stores. The 2 TB drive had the same gap: a $135 list price against a WD_BLACK SN850X at $349.99 to $556.92 depending on the store. The summary box now shows both lines, labelled, and keeps them out of the total. These came through search-result excerpts, not the retailer pages, so treat them as floors.

**The "fixed" presets.** I swapped the three 128 GB presets onto a 1,650 W supply and told myself the power errors were gone. Then I clicked "4x V620" in the browser on my own box and got "Estimated 1510 W x 1.2 headroom exceeds the 1650 W PSU." The check had left out the RX 6600 XT already in the machine, which adds 160 W. I fixed the audit so it checks presets with the card you own, and added a tick box: "Keep the card already in your PC". Untick it and the error goes. The box also warns that if that card is your only video output, pulling it leaves you without a screen. I have not tried pulling it on the real machine.

![The Cards section with a tick box to keep the card already in the PC, four V620 cards selected, and a summary showing 136 GB, two lines for a 2 TB drive and two for 64 GB of memory](keep-card-and-ram.png)

*The builder with the 4x V620 preset on my omarchy box, captured Nov 4, 2026, about 3:15 PM Central. Because the RX 6600 XT is kept, the total is 136 GB and the page still shows a power error; unticking the box gives 128 GB and clears it.*

## Fifty-four cards is too many cards

Once the picker passed fifty cards, the list ran to about 40,000 pixels on my phone, with $100-a-gigabyte datacenter cards sitting between the $10 ones. The card list is now sorted by lowest price per GB, with a name search and a price-per-GB limit. Cards you have already picked always stay in the list, so a filter cannot hide your own build. Checking it on a phone also showed me the card names squeezed into a 140-pixel column beside the picture and the stepper, so the stepper now wraps underneath. And my own RX 6600 XT, which has no price, sorted first until I told it to sort last.

![The Cards section filtered to cards up to $30 per GB, showing 17 of 54, with the Tesla P40 first, then a V100 32 GB and a GTX 1080 Ti](card-list-under-30-per-gb.jpg)

*The builder with the limit set to $30 per GB, captured Nov 4, 2026, 4:57 PM Central in a regular Chrome window at 1,398 pixels wide. Seventeen of 54 cards pass, and the cheapest per GB come first.*

Not verified: the search box and the limit on a real phone. I checked the layout at 390 pixels wide in an automated browser and did not type into the box there.

## What changed in the data on Nov 4

Most of Nov 4 was spent turning held-back parts into usable ones. A part goes into the picker only when every field the compatibility checks need is read from the maker and it has a dated price. That rule moved the card list from 25 to 55 cards, added real power supplies, a board with 16 memory slots, RAM kits and case prices, and left 5 cards, 5 boards and 16 power supplies out. Rather than hide those, the page now has a collapsed section, "Researched, not selectable yet", listing each one with exactly what is missing.

Two honest limits. First, most of the new prices came through search-result excerpts from dealers and price trackers, not from opening retailer pages, and several are single dealer listings. Second, a few fields are derived rather than stated: the power-supply cable count for NVIDIA's 16-pin workstation cards comes from NVIDIA's adapter description, and "no external power" for the T4, L4 and A2 is inferred from their 70 W or lower board power. Each such field is listed as not verified on the card.

## The numbers so far

| Item | Value | Notes |
|---|---|---|
| Affiliate earnings | $0 | No program is active |
| Money spent on this experiment | not tallied | I do not have a bill for the assistant's usage or the search credits yet |
| Cards priced | 55 for sale, 2 owned examples | Asking prices, each dated Nov 3 or Nov 4, 2026 |
| Boards in the picker | 26 | 24 real, 2 generic. Five more are held back: no US non-eBay price, or no lane map read from the maker |
| User stories | 40 | Invented, not interviewed |
| Automated tests | 83 passing | Slot, power, cooling, affiliate and data-accuracy rules |
| Free photos found | 3 of 15 searched | The 15 were cards and boards I searched for on Nov 3. Most of the 55 cards in the picker were never searched for; every card without a photo shows an icon tile |
| Card spec fields checked against the maker | 259 of 327 | 68 shown as not verified on cards. Five fields (memory, power, slot width, connectors, cooling) plus architecture, on 55 cards, counted from the data on Nov 4 |
| Speeds measured by me | 0 | Everything on the site is from other people, and labelled |

Not verified: the BIOS settings the big 32 GB cards need on my board (on Nov 4 I did confirm in MSI's manual that the board has an "Above 4G memory" switch for more than four GPUs, and does not say a GPU slot can be split in two), how a riser behaves in practice (the adapter prices and specs now come from the maker, but I have not tried one), the memory figures for models, and every community speed number. One more caveat from the build itself. My shared build system dropped my job three times on Nov 3, so I ran this small build on my own machine under the exception my setup allows. The final test run passed there.

## What I would tell you

Two things I learned the hard way today: count the card already in your machine when you check the power supply, and look up the rank of memory before you assume it. Both looked fine until I clicked through them on the real build.

A site that says "this fits" has to be right about the parts you already own. Mine was not, for a few hours, and I only found out by using it the way a visitor would.

Next is still the same: a live version, an approved affiliate account, and one number I can point to. Until then the earnings line says $0.

## Sources

Read Nov 4, 2026, mostly through search excerpts and plain downloads of PDFs, not by eye. I did not open every link again after writing this post.

- [Country Boy Computers on YouTube: V620 vs MI50 on Linux](https://www.youtube.com/watch?v=s4ndArnAz30), automatic captions read Nov 4, 2026. I did not watch the video.

Maker documents and prices (search excerpts or a plain download of the PDF, not by eye):

- NVIDIA: [Power Guidelines for Workstation Products](https://images.nvidia.com/aem-dam/en-zz/Solutions/design-visualization/quadro-product-literature/DA-07261-001_v15.pdf), the [RTX PRO Blackwell quick start guide](https://images.nvidia.com/aem-dam/Solutions/design-visualization/quadro-product-literature/rtx-pro-blackwell-online-qsg-210x148mm-20260317-r18.pdf), the [10 Series specifications page](https://www.nvidia.com/en-us/geforce/10-series/10-series-specs/), and the product briefs for the [Tesla P100 PCIe](https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/tesla-product-literature/NV-tesla-p100-pcie-PB-08248-001-v01.pdf), [Tesla V100 PCIe](https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/tesla-product-literature/Tesla-V100-PCIe-Product-Brief.pdf), [A30](https://www.nvidia.com/content/dam/en-zz/Solutions/data-center/products/a30-gpu/pdf/a30-product-brief.pdf) and [A100 80GB](https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/a100/pdf/PB-10577-001_v02.pdf).
- AMD: [Instinct MI210 brochure](https://www.amd.com/content/dam/amd/en/documents/instinct-business-docs/product-briefs/instinct-mi210-brochure.pdf). Intel: [how to connect power to an Arc Alchemist card](https://www.intel.com/content/www/us/en/support/articles/000092523.html). Gigabyte: [MZ32-AR0 page](https://www.gigabyte.com/Enterprise/Server-Motherboard/MZ32-AR0-rev-10).
- Memory rank: a [Silicon Power DDR4 datasheet](https://media.distrelec.com/Web/Downloads/_t/ds/SP032GBLFU320X02_eng_tds.pdf) and an [Advantech 32 GB UDIMM datasheet](https://resources.ampheo.com/static/datasheets/advantech/sqr-ud4n32g3k2snab.pdf).
- Prices (asking prices read from search excerpts, not the pages): Newegg, Amazon, CDW, B&H and Micro Center pages, plus dealers including CompSource, BuyDirect, Electronics Wholesale, Serversupply, Core 4 Solutions and Nexus Compute, and trackers such as vga.live and NowInStock. Treat every one as a floor to check, not a quote.

Model sizes:

- [Hugging Face](https://huggingface.co/) model pages and file listings through its API, read Nov 4, 2026, for the file sizes of 33 mixture-of-experts models and the licences of 39 game-development models. Llama 4's own pages are gated, so those sizes come from mirror repositories.

