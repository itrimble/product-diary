---
project: Learning to Sell
title: "Learning to Sell: A Parts Site With $0 in Affiliate Links"
summary: I want a home computer with 128 GB of video memory, two video creators show cheap ways to get there, and prices have moved. So I am building a parts-picker site, and this is the day-one log, with the money still at zero.
stats: Affiliate earnings = $0 | Affiliate programs active = 0 | User stories written = 40
format: longform
category: learning-to-sell
---
I want to run a smart AI assistant on a computer at home, with no monthly bill and nothing leaving the house. The catch is memory. The good models want somewhere around 128 gigabytes of fast memory on graphics cards, and a new card with that much costs thousands of dollars. Two video creators have shown used server cards that cost a fraction of that. So I had my coding assistant build a website that starts from the computer you already own and tells you, with dates and sources, what to add and what it will cost. It earns nothing yet. My affiliate accounts expired, so every shopping link on it is a plain link, and this post will say so every time it matters.

I am writing this as part of the Learning to Sell series, where I try to make back what my AI helpers cost, in public. [Part 1](/learning-to-sell/2026-10-18/) was a bad scoreboard. This one starts at zero on purpose, because the site is not live and no program is switched on. The first entry about a new experiment should not have invented numbers in it.

## The video, and what changed since

The video that started this is [Country Boy Computers' "64gb Home Ai-Server for under $1000"](https://www.youtube.com/watch?v=8zHUvixZAtg). He builds an HP Z4 G4 workstation with two AMD Radeon PRO V620 cards, 32 GB each, and runs it on Ubuntu 26.04. I read the video's description page and his blog, and I am still partway through the video itself, so I am not summarizing what he says on camera.

What I can say is that the price tag has moved. On Nov 3, 2026 I looked at eBay listing pages for the cards people talk about. These are asking prices from listing pages, not quotes and not sold prices.

| Card | Memory | Asking price, Nov 3, 2026 | Per GB | What you give up |
|---|---|---|---|---|
| [Tesla P40](https://www.ebay.com/sch/i.html?_nkw=Tesla+P40+24GB) | 24 GB | about $240 to $315 | $10 to $13 | Old design, slow on image and video work, needs forced airflow |
| [Instinct MI50](https://www.ebay.com/sch/i.html?_nkw=AMD+Instinct+MI50+32GB) | 32 GB | about $690 to $880 | $22 to $28 | AMD's main software stack no longer officially supports it. Country Boy runs it through HIP with a self-built llama.cpp |
| [Radeon PRO V620](https://www.ebay.com/sch/i.html?_nkw=AMD+Radeon+PRO+V620+32GB) | 32 GB | about $730 to $1,000 | $23 to $31 | Passive cooling, needs a fan shroud |
| [Tesla V100, SXM2 form with adapter board](https://www.ebay.com/sch/i.html?_nkw=Tesla+V100+32GB+SXM2) | 32 GB | about $335 to $475 (card plus adapter, my sum) | $10 to $15 | Loud stock fan, older driver needed |
| [GeForce RTX 3090](https://www.ebay.com/sch/i.html?_nkw=GeForce+RTX+3090+24GB) | 24 GB | about $1,199 and up | $50 to $75 | Not cheap, but the best software support |

So 128 GB is no longer a thousand-dollar project. Four V620s is roughly $2,900 or more. Four V100s on adapters is roughly $1,300 to $1,900 for the cards and adapters alone, by my arithmetic, if the adapters behave. That leaves out the power supply: four of them draw about 1,200 watts by themselves, so a 1,600-watt supply is not enough once you allow headroom, and a real build needs a bigger one. (When I first wrote this, my list had a 1,600-watt placeholder supply. It now has real supplies up to 1,650 watts, and what that does and does not fix is in [day two](/learning-to-sell/2026-11-04/).) I did not verify the eBay pages one by one in a browser. I read the search results and listing excerpts, which is why the table says "about".

## Why I cannot just copy him

My own board is an MSI MAG X570 Tomahawk WiFi in the machine I call omarchy. I read MSI's own manual. It has one full-speed card slot, one more slot that is the right size but only wired for a quarter of the speed, two tiny slots, and two slots for flash drives (the small M.2 kind). The manual lists no way to split the main slot in two. Four big server cards will not fit on that board without an open frame, extension cables, and adapters that eat the flash-drive slots I also want for a 2 TB drive.

That is the real lesson. The idea works on any board, because the software splits a model across cards. The slots, the power supply and the cooling are what stop you. A workstation like his has more slots and an engineered airflow path. I also looked at a stranger route earlier, clustering cheap console-chip boards over the network, in [Could Eight Used PS5s Make a 128 GB Local AI Machine?](/ps5-ai-cluster/2026-10-17/). It can fit a big model across boxes, but it does not make it fast.

My four memory sticks also failed Memtest86+ in October. I wrote that up in [the omarchy post](/omarchy-ai-node/2026-10-17/). I never finished the pair-by-pair tests, so I do not know whether the sticks, a slot or the processor is at fault. A new kit only helps if it was the sticks. The site tells you to test the new kit when it arrives and keep the old ones as a control. (I planned to buy single-rank sticks. That plan was wrong, and [day two](/learning-to-sell/2026-11-04/) says why.)

## The V100 detour

Lon Seidman's video, ["The Cheapest 32GB Nvidia GPU You Can Buy for Local AI (Tesla V100)"](https://www.youtube.com/watch?v=3P6m_QBIgAo), sent me down the V100 road. I read [his blog write-up](https://blog.lon.tv/2026/09/08/the-cheapest-32gb-nvidia-gpu-you-can-buy-for-local-ai-tesla-v100/), not the video. His numbers on one 32 GB card:

| Test (Lon Seidman, one V100 32GB) | Prompt speed | Writing speed |
|---|---|---|
| Qwen 3.8 27B, dense model | about 50 tokens per second | about 45 per second, 24 to 30 when the context was 80 percent full |
| Gemma 4 26B-A4B, mixture of experts | about 1,100 per second | over 90 per second |

He reports about 270 watts of draw while it ran. Pictures and video were slow: about a minute for one 1024 by 1024 image and three and a half minutes for a five-second clip. These are his numbers on his machine. I have not reproduced any of them.

A second owner, Oscar Molnar, [wrote about a 16 GB V100](https://blog.tymscar.com/posts/v100localllm/) next to an RTX 4080. He measured about 32 tokens per second on a 27-billion-parameter model. His stock adapter fan measured 82 decibels on his watch, so he wired it to a motherboard fan header and ran it at 10 percent. He also reports that newer NVIDIA drivers dropped this chip family, so you pin an older one.

I also tried to read the [Tom's Hardware story](https://www.tomshardware.com/pc-components/gpus/ai-enthusiast-adds-nvidia-tesla-v100-as-loud-as-a-lawnmower-to-gaming-pc-for-usd266-32gb-of-vram-rig-can-run-27-billion-parameter-model-at-32-tokens-per-second) about that build. Only the headline loaded, so I cite it for nothing but the headline.

On the V620 and MI50, Country Boy Computers publishes [a spreadsheet of his own results](https://countryboycomputersbg.com/instinct-mi50-32gb-vs-radeon-pro-v620-32gb/). In it the V620 reads about 59 to 62 tokens per second on Qwen3-Coder-Next, an 80-billion-parameter model, and the MI50 about 55 through AMD's HIP backend, but only about 38 through Vulkan. His page does not say how many cards each row used, and that model is far too big for one 32 GB card, so I record the card count as unknown.

## Forty people who do not exist yet

Before writing code I had the assistant write 40 user stories, in five groups: people who own a PC and want to add AI to it, people buying new, people who want to know what they can run, people afraid of getting burned, and people who want to save or share. They are guesses, not interviews, and the file says so. After launch, the first job is to check them against what visitors actually do.

They changed the site in one big way. The first question is now "what do you have?", with a button for each kind of machine: my omarchy box, a gamer with a 12 GB card, a small-form-factor PC, an old workstation, or nothing yet.

![The AI Budget Build page in light mode, with the omarchy box selected: 8 GB total memory, one card placed in the main slot, and two checks listed](builder-omarchy.png)

*The builder as it opened on Nov 3, 2026, 7:53 PM Central, from a local build. Note the disclosure box at the top: it says no affiliate links are active, because none are.*

## My tool lied to me, and I almost published it

The second question on the page is "what do you want to run?" You pick a model, and the site says whether your memory fits and what the cheapest fix is. I tried it as the gamer: 12 GB of video memory, a typical ATX board, a 650-watt power supply. I asked for Qwen3-Coder-Next, which my research notes put at about 52 GB at a four-bit setting. That figure is the research assistant's arithmetic, not a measurement.

The site proposed two Tesla P40s for $480 to $630 and said the 60 GB total would fit.

![The same page after adding two Tesla P40 cards for a gamer's PC: a green message says the model fits, while the checks list shows three errors about case space, power draw and power connectors](gamer-checks-before-fix.png)

*Captured Nov 3, 2026, 7:53 PM Central, before the fix. The headline says the model fits. The checks underneath say the build needs an open frame, that its estimated 820 W is more than the 650 W supply can carry once you allow headroom, and that it needs three 8-pin power connectors where the supply has two.*

It was technically right about memory and useless as advice. Two of those cards on that supply is not a build. I fixed three things in the same sitting:

1. Each suggestion now runs the full set of checks and lists what it needs on top, such as a bigger power supply, an open frame and a riser.
2. The "fits" message now says when the build has errors to fix first.
3. The Pascal warning printed once per card. It now prints once per model, and a test locks that in.

![The goal picker after the fix: the three cheapest ways to reach 52 GB are each listed with "plus a bigger PSU, an open frame, a riser"](gamer-goal-after-fix.png)

*Captured Nov 3, 2026, 7:53 PM Central, after the fix. Each of the three suggestions now says what it needs besides the cards.*

I would rather show you the bug than the polished page. A parts site that says "this fits" is worth nothing if it is wrong, and the whole thing runs on trust.

## Models by task

The third page filters what people run locally by what your memory can hold. The research assistant listed 16 task groups, from coding to speech, music, images, video and translation. It built them from Hugging Face model pages, so the sizes come from those pages and the memory figures are its arithmetic, labelled as such on every card. It did not read Reddit, and it says so.

![The Models by task page for 12 GB of memory, showing two coding and chat models that fit, each with its size, licence and a note on how the memory figure was worked out](models-12gb.png)

*The models page for the 12 GB gamer, captured Nov 3, 2026, 7:54 PM Central. The task headings read "Coding autocomplete fim" in this capture. That was a bug, and I fixed it on Nov 4; the screenshot is the old page.*

## Pictures, and why I did not scrape them

A parts site needs pictures. I did not copy product photos from eBay or from retailers, because those belong to the photographers and sellers. Here is what I did instead.

- **Free-licence photos.** A script asks Wikimedia Commons for each part, one call each, and keeps only Creative Commons or public-domain files whose title contains the model number. It found real photos for 3 of the 15 parts I asked about (7 cards and 8 boards): the P40, the RTX 3090 and the RX 6600 XT. The first run matched two wrong images, a generic connector and a frame from a video, so I tightened the matcher.
- **Icons.** Parts without a photo show a small icon tile and the maker's logo, labelled "no photo yet". The icons come from open sets served through [Iconify](https://iconify.design/), Material Design Icons (Apache-2.0) and Bootstrap Icons (MIT). The maker logos come from the Simple Icons set.
- **My own photos.** A folder takes my pictures of parts I own and uses them first.
- **draw.io's shape libraries.** I checked the [draw.io repository](https://github.com/jgraph/drawio) properly: every file in its tree, all ten icon sets, the shape names in all 70 sidebar files. It has Dell and HP rack gear, cloud icons and clip art, and nothing for a graphics card, a motherboard or a memory stick. I could not read the compressed shape files themselves.

## Where the money would come from

The plan is affiliate links. A link to eBay or Amazon carries my ID, and if you buy, the store pays me a small commission at no cost to you. My accounts for both programs lapsed. I have to sign up again.

The site is built as if they were already approved. Every shopping link goes through one function. With no ID filled in, it makes a plain link and the page says no affiliate links are active. Once an ID goes into one file, the links get tagged and marked as paid links, and the note at the top changes to say so. Amazon requires one particular sentence, "As an Amazon Associate I earn from qualifying purchases", and it appears only when Amazon is switched on. Three tests cover the inactive state: plain links, no paid-link marking, and no commission claim.

I am also writing a rule down in the design file: affiliate status never changes the order, wording or ranking of a recommendation. If it did, you could not trust the page, and neither could I.

For this post, each product name above links to a plain eBay search. When the accounts come back, I will update those links and add a line at the top, and I will log the date.

## Making the site hard to catch out

My goal for this site is simple to state and hard to keep: it must never say something untrue. You cannot build trust on a page that is wrong about small things. So I wrote the rules down in a file, a methodology, and made the rules run as code. I will link the public version when the site is live. For now it is a file in the project, and these are the parts that matter.

- **Every number has a source and a date.** A card's spec must come from the maker, a price from a listing, a speed from a named person's measurements. A forum comment can be a lead, never a fact.
- **Thirty-six checks run on every test run.** They catch things like a price range that runs backwards, a button that says "128 GB" for cards that add up to 144, a model whose memory figure does not match its size, and a disclosure that claims a commission nobody pays. Each check is itself tested against bad data, so I know it fires.
- **The methodology rewrites itself.** A script regenerates the counts, the open warnings, the rule table and a rule history from the live data. If I reword a rule and forget to regenerate, the check fails. I tested that on purpose: it failed, then passed after regenerating.

The first run of the checks caught something. My research assistant had listed DeepSeek-V4.1-Flash at 237 GB for 763 billion parameters, which looked impossibly small. The record was right: it stated a 2.4-bit squeeze. My rule was too blunt, so it now reads the stated bit width instead of guessing.

Then I checked the card specs against the makers' own pages, and this is where I nearly shipped two lies. All eight cards had been entered from memory and listings. I pulled NVIDIA's datasheets for the P40 and V100, NVIDIA's pages for the RTX 3090 and 3060, and AMD's pages for the V620, MI50 and RX 6600 XT. AMD's old MI50 page returned a 404, so I used AMD's accelerator table. For the RX 6600 XT, AMD's address quietly redirected to a page about the RX 9000 series, and the extraction came back with 16 GB and 250 W. Those figures belong to a different card. My own box has an RX 6600 XT with 8 GB and 160 W. I threw the result out and found the right page.

The result, counted from the data on Nov 3, 2026: 26 spec fields confirmed against a maker, 14 not confirmed. Each card on the site now lists which is which, so you can see "not verified" on the same line as the claim. The 14 include things like the P40's power connector, which the datasheet extraction did not state.

I also made a counting mistake of my own while writing the methodology's change log. I wrote 29 confirmed and 12 unconfirmed, and the data says 26 and 14. I caught it by recounting, fixed it, and noted the correction in the log. The status section now computes those counts from the data so I cannot mistype them again.

## Budgets and other currencies

Two requests came in after the first version: support different budget levels, and show prices in other currencies. Both are easy to do badly.

For budgets, the site has five tiers and a box for your own number. It picks the best build it can for your setup inside that number, and it compares against the top of every price range, so the result still fits if you pay the highest asking price. It only counts cards, adapters and a power supply when yours is too small. It does not count the board, processor, memory, 2 TB drive or case, and says so beside every result. For my own board, with the RX 6600 XT already in it, the best results on Nov 3 were: about $1,270 to $1,570 for 104 GB with four Tesla P40s, and about $2,900 to $3,900 for 136 GB with four V100 PCIe cards. My board holds about five cards at most, which is why 128 GB gets expensive there. Those Nov 3 prices included placeholder numbers for adapters and the power supply, and the site said so on each result. On Nov 4 I replaced every placeholder with a real product and a dated price: an MSI 1600 W power supply ($623, read from a retailer, specs from MSI's datasheet), a Corsair 1000 W unit, and ADT-Link risers and an M.2 adapter priced from the maker's own page at their longest cable. The same two builds now come to about $1,656 to $1,956 and $3,296 to $4,256. The honest lesson is that my first numbers were too low, and the placeholders were the reason. The screenshot below is from the Nov 3 run.

For currencies, every price is stored in US dollars, because that is what the listings I read use. The site converts for display at the European Central Bank's published rate, which I store as a dated snapshot, so the pages never call another service. On Nov 3 the rate was 1.1179 dollars to the euro. So $2,000 shows as €1,789. Next to every converted figure the original dollars stay visible, and the page says the conversion leaves out sales tax, import duty and shipping, and that many sellers will not ship abroad. A converted price is an estimate, never a listing price.

![The budget section set to the Hobby tier in euros: two options listed, each with a euro range, the original dollar range, what it needs, and a note about placeholder prices](budget-hobby-eur.png)

*The budget section with the currency set to euros and the Hobby tier chosen, captured Nov 3, 2026, 8:28 PM Central. For my board and the card already in it, the site offers two Tesla P40s or one V100. Each line keeps the original dollars next to the euros.*

I also did not write what each budget level buys. My first draft said the middle tier would "reach 100+ GB with older server cards". That is true for my board and false for a small PC, so I removed it. The numbers come from the checks, not from my head.

## What I would tell you

If you own a gaming PC and want to run a good coding model at home, do not buy cards first. Check your slots and your power supply, because they decide more than the card does. The cheapest memory per dollar is a used Tesla P40 or a V100 on an adapter, and both cost you in noise, cooling and driver pain. The V620 and MI50 cost about twice as much per gigabyte and are easier on the software side, on Linux. That ranking is from Nov 3. When I refreshed prices on Nov 5, the P40 asking prices I could find ranged from $280 to $450, so the gap to the V620 and MI50 is smaller than the table above says, and the V620 itself now shows $1,099 to $1,239. Prices on these cards move in days.

If you want to build a site like this, build the checks before the prices. A tool that confidently tells you something wrong is worse than no tool, and I nearly shipped that.

Next I want a version that is live, an approved affiliate account, and one number I can point to. Until then the earnings line says $0. The next day went worse for my assumptions than this one did, and [it is its own post](/learning-to-sell/2026-11-04/).

## Sources

Read Nov 3, 2026. I did not open every link again after writing this post. Sources for the later work are in [day two](/learning-to-sell/2026-11-04/).

Hardware and prices:

- MSI MAG X570 Tomahawk WiFi manual, [the PDF MSI publishes](https://download-2.msi.com/archive/mnu_exe/mb/E7C84v1.1.pdf). I read my local copy of the same document.
- eBay listing pages for the [Tesla P40](https://www.ebay.com/shop/tesla-p40-24gb?_nkw=tesla+p40+24gb), [MI50](https://www.ebay.com/shop/amd-mi50?_nkw=amd+mi50), [V620](https://www.ebay.com/shop/amd-v620?_nkw=amd+v620) and [V100 SXM2](https://www.ebay.com/shop/v100-sxm2-32gb?_nkw=v100+sxm2+32gb). I read the search excerpts. eBay blocks scripts, so confirm these in a browser.
- RTX 3090 used-price history, [Best Value GPU](https://bestvaluegpu.com/history/new-and-used-rtx-3090-price-history-and-specs/). Search excerpt only.

Speeds and builds:

- [Country Boy Computers: MI50 vs V620](https://countryboycomputersbg.com/instinct-mi50-32gb-vs-radeon-pro-v620-32gb/), read in full.
- [Lon Seidman's V100 write-up](https://blog.lon.tv/2026/09/08/the-cheapest-32gb-nvidia-gpu-you-can-buy-for-local-ai-tesla-v100/), read in full. I did not watch his video.
- [Oscar Molnar: a datacenter GPU in a gaming PC](https://blog.tymscar.com/posts/v100localllm/), read in full.
- [Tom's Hardware V100 story](https://www.tomshardware.com/pc-components/gpus/ai-enthusiast-adds-nvidia-tesla-v100-as-loud-as-a-lawnmower-to-gaming-pc-for-usd266-32gb-of-vram-rig-can-run-27-billion-parameter-model-at-32-tokens-per-second), headline only.

Maker pages used to verify specs (read Nov 3, 2026, through an extraction tool, not by eye).

- NVIDIA: [Tesla P40 datasheet](https://images.nvidia.com/content/pdf/tesla/184427-Tesla-P40-Datasheet-NV-Final-Letter-Web.pdf), [Tesla V100 datasheet](https://images.nvidia.com/content/technologies/volta/pdf/tesla-volta-v100-datasheet-letter-fnl-web.pdf), [GeForce RTX 3090](https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3090-3090ti/), [GeForce RTX 3060](https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3060-3060ti/).
- AMD: [Radeon PRO V620](https://www.amd.com/en/products/accelerators/radeon-pro/amd-radeon-pro-v620.html), [accelerator specifications table (MI50)](https://www.amd.com/en/products/specifications/accelerators.html), [Radeon RX 6600 XT](https://www.amd.com/en/products/graphics/desktops/radeon/6000-series/amd-radeon-rx-6600-xt.html).

Exchange rates:

- [European Central Bank euro reference rates](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml), read Nov 3, 2026. Published rate dated Nov 3, 2026: 1 euro = 1.1179 US dollars.

Images and icons:

- [draw.io repository](https://github.com/jgraph/drawio), file tree and sidebar files, read through GitHub's API.
- [Iconify](https://iconify.design/) for the open icon sets, and [Wikimedia Commons](https://commons.wikimedia.org/) for the three free photos, each credited on the site.
