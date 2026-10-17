#!/usr/bin/env python3
"""Suggest earlier blog entries a draft should link to.

usage: related-links.py <draft.md> [--repo ~/projects/product-diary] [--extra other-draft.md ...] [--min 0.08] [--top 6]

Scores every published entry (posts/*/*.md, plus any --extra drafts) against the draft by shared distinctive terms
(product names, tools, model names, numbers weigh more than common words) and prints, best first:
  score  route  title  [shared terms]  and a ready-made markdown link.
Exit status 0 always. Add `--strict` to exit 1 when strong matches exist and the draft links to none of them.
Routes follow the blog's rule: posts/<date>/<slug>.md is served at /<slug>/<date>/.
"""
import argparse, math, os, re, sys, glob

STOP = set("""about above after again against also because been before being between both but could does doing down during each
from further have having here into just like more most much once only other over same should some such than that their them
then there these they this those through under until very what when where which while will with would your you are was were
has had its it's not can did how why who one two three get got our out all any now new use used using make made""".split())

def parse(path):
    t = open(path, encoding="utf-8", errors="replace").read()
    meta, body = {}, t
    m = re.match(r"^---\n(.*?)\n---\n?(.*)$", t, re.S)
    if m:
        for line in m.group(1).split("\n"):
            if ":" in line:
                k, v = line.split(":", 1); meta[k.strip()] = v.strip().strip('"')
        body = m.group(2)
    return meta, body

def terms(text):
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", text)
    text = re.sub(r"\]\([^)]*\)", "]", text)
    words = re.findall(r"[A-Za-z][A-Za-z0-9.+-]{3,}", text)
    out = {}
    for w in words:
        lw = w.lower().strip(".-+")
        if len(lw) < 4 or lw in STOP: continue
        out[lw] = out.get(lw, 0) + 1
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("draft"); ap.add_argument("--repo", default=os.path.expanduser("~/projects/product-diary"))
    ap.add_argument("--extra", nargs="*", default=[]); ap.add_argument("--min", type=float, default=0.08)
    ap.add_argument("--top", type=int, default=6); ap.add_argument("--strict", action="store_true")
    a = ap.parse_args()
    dmeta, dbody = parse(a.draft)
    dterms = terms(dmeta.get("title", "") + " " + dmeta.get("summary", "") + " " + dbody)
    cands = []
    for f in glob.glob(os.path.join(a.repo, "posts", "*", "*.md")):
        if os.path.basename(f) in ("index.md", "weekly-roundup.md") and False: continue
        day, slug = os.path.basename(os.path.dirname(f)), os.path.splitext(os.path.basename(f))[0]
        cands.append((f, f"/{slug}/{day}/" if slug != "index" else f"/{day}/"))
    for e in a.extra:
        day = re.search(r"\d{4}-\d{2}-\d{2}", e)
        slug = os.path.splitext(os.path.basename(e))[0]
        cands.append((e, f"/{slug}/{day.group(0) if day else 'DATE'}/"))
    me = os.path.abspath(a.draft)
    docs = []
    for f, route in cands:
        if os.path.abspath(f) == me: continue
        m, b = parse(f); docs.append((route, m, terms(m.get("title", "") + " " + m.get("summary", "") + " " + b)))
    df = {}
    for _, _, t in docs:
        for w in t: df[w] = df.get(w, 0) + 1
    N = max(len(docs), 1)
    linked = set(re.findall(r"\]\((/[^)\s]+)\)", dbody))
    scored = []
    for route, m, t in docs:
        shared = [w for w in dterms if w in t]
        if not shared: continue
        score = sum(math.log(1 + N / df.get(w, 1)) * min(dterms[w], 3) for w in shared)
        norm = score / (sum(math.log(1 + N / df.get(w, 1)) * min(c, 3) for w, c in dterms.items()) or 1)
        top = sorted(shared, key=lambda w: -math.log(1 + N / df.get(w, 1)))[:6]
        scored.append((norm, route, m.get("title") or route, top))
    scored.sort(reverse=True)
    hits = [s for s in scored if s[0] >= a.min][:a.top]
    if not hits:
        print("no related entries above the threshold"); return 0
    print("Related entries (link the ones that genuinely help the reader; do not force it):")
    for norm, route, title, top in hits:
        mark = "already linked" if route in linked else "NOT linked"
        print(f"  {norm:.2f}  {route}  {title[:70]}  [{', '.join(top)}]  ({mark})\n        [{title[:60]}]({route})")
    if a.strict and not any(h[1] in linked for h in hits):
        print("STRICT: strong matches exist and the draft links to none of them"); return 1
    return 0

sys.exit(main())
