---
project: Meshy
title: Meshy's 3D Pipeline Gets a Manual and a Real Audit
category: ai-local-models
summary: The toolbox that turns text into three-dimensional models got a single manual for every coding assistant, plus an audit that verified what it can really do.
---
The service I use for turning written descriptions into three-dimensional game models has a proper manual now. One handover document tells any of my coding assistants what is configured, how to ask for models that come out usable, and what each request costs in credits. An independent audit went with it, and the audit is refreshingly specific about what was checked and what was not.

The audit verified the live credit balance through the helper script, 3,000 monthly credits with zero permanent ones and the next reset showing late November, and it ran the helper's eight unit tests, which pass after repairs. It is equally plain about the limits: mocked tests do not prove that paid generation, real downloads or rendering work. Repairs landed in `meshy_helper.py`, and the older research notes now carry the audit's qualifications rather than standing uncorrected beside them.

The handover names its owner and its date, which sounds like paperwork until you have watched two assistants disagree about which of three near-identical reference documents is the current one. Now there is one document, and it says so itself.
