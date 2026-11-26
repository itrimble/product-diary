---
project: AI Models
title: AI Models Site Drafts an Agent Benchmarks Section
summary: My AI model catalog site got a list of the new agent test tasks and a way to save a test receipt without the model's answer, on a branch not yet published.
---
My AI model catalog site got the start of a section for the new agent tests on Wednesday. The benchmarks page now lists the test tasks, and there is a way to save a short receipt for a test that records which machine and which model answered and a fingerprint of the question, while leaving out the answer itself. It is on a separate branch, so nothing has changed on the live site.

The change at 14:17 added `data/agent-benchmarks.json` with the suite's tasks and a 293-line `tools/agent_benchmarks.py` that writes the receipts. The receipt keeps the host, the model ids and the prompt hash and drops the reply, the same rule the benchmark suite's own smoke test follows, so a public page never carries model output I have not read.

The site build picks the new data up, and pushing `main` is what publishes it. The branch has not been merged, so none of this is public yet.
