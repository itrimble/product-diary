#!/bin/bash
# <xbar.title>Product Diary</xbar.title>
# <xbar.version>2.0</xbar.version>
# <xbar.author>ian</xbar.author>
# <xbar.desc>Nightly diary health: latest published day, last run outcome, agent state.</xbar.desc>
#
# SwiftBar plugin. Refreshes every 30 minutes (the .30m. in the filename).
#
# Source of truth is ~/projects/product-diary -- the checkout on the Mac mini,
# mirrored to the other Macs as a real git checkout of origin/main. Reading the
# local checkout rather than the NAS share means this never depends on a network
# mount, so a dropped share cannot make the diary look broken.
#
# Note the asymmetry: posts/ is git-tracked and therefore accurate on every
# machine, but logs/ is gitignored, so "last run" is only truthful on the Mac
# that actually ran the diary. We therefore source the log separately and always
# label where it came from.
#
# Everything must be fast and absolute-pathed: SwiftBar runs plugins with a
# minimal environment and no login shell.
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin"

BLOG="https://blog.remnantsecurity.com"
AGENT="com.ian.product-diary"

/usr/bin/python3 - "$BLOG" "$AGENT" "$HOME" <<'PY'
import datetime as dt
import os
import re
import subprocess
import sys

blog, agent, home = sys.argv[1:4]
GREEN, AMBER, RED, DIM = "#3ddc84", "#ffb020", "#ff5c5c", "#8b93a7"
DOT = {GREEN: "\U0001F7E2", AMBER: "\U0001F7E1", RED: "\U0001F534"}


def run(*cmd, cwd=None, timeout=6):
    try:
        r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout)
        return r.stdout.strip() if r.returncode == 0 else ""
    except Exception:
        return ""


# Repo: the local checkout first; the shares are only a fallback for a Mac that
# has no checkout of its own.
REPOS = [
    (os.path.join(home, "projects", "product-diary"), "local checkout"),
    ("/Volumes/ian/projects/product-diary", "mini share"),
    ("/Volumes/nas/projects/product-diary", "NAS share"),
]
diary = source = None
for path, label in REPOS:
    try:
        if os.path.isdir(os.path.join(path, "posts")):
            diary, source = path, label
            break
    except OSError:
        continue

if not diary:
    print("\U0001F534 diary | font=Menlo size=12")
    print("---")
    print(f"No product-diary checkout found. | font=Menlo size=11 color={DIM}")
    print(f"Expected {home}/projects/product-diary | font=Menlo size=11 color={DIM}")
    print("---")
    print("Refresh | refresh=true")
    raise SystemExit(0)

posts = os.path.join(diary, "posts")
DAY = re.compile(r"^\d{4}-\d{2}-\d{2}$")
days = sorted(d for d in os.listdir(posts) if DAY.match(d))
today = dt.date.today()
latest = days[-1] if days else None
lag = (today - dt.date.fromisoformat(latest)).days if latest else None

# The diary writes YESTERDAY's entry just after midnight, so lag 1 is healthy,
# 2 means last night produced nothing, 3+ is stale.
if lag is None:
    colour, head = RED, "no posts"
elif lag <= 1:
    colour, head = GREEN, latest
elif lag == 2:
    colour, head = AMBER, latest
else:
    colour, head = RED, latest

# --- git freshness of this checkout (no fetch: too slow for a menu bar) ---
branch = run("git", "rev-parse", "--abbrev-ref", "HEAD", cwd=diary)
counts = run("git", "rev-list", "--left-right", "--count", "HEAD...@{u}", cwd=diary)
ahead = behind = None
if counts and len(counts.split()) == 2:
    ahead, behind = (int(x) for x in counts.split())
dirty = len([l for l in run("git", "status", "--porcelain", cwd=diary).splitlines() if l])

# --- last run: logs/ is gitignored, so find the most authoritative copy ---
agent_loaded = bool(run("/bin/launchctl", "print", f"gui/{os.getuid()}/{agent}"))
log_sources = []
if agent_loaded:
    log_sources.append((os.path.join(diary, "logs"), "this Mac"))
log_sources += [("/Volumes/ian/projects/product-diary/logs", "mini share"),
                ("/Volumes/nas/projects/product-diary/logs", "NAS share"),
                (os.path.join(diary, "logs"), "this Mac (stale?)")]

run_when = run_line = log_from = None
outcome_colour = DIM
for ldir, label in log_sources:
    try:
        cands = [os.path.join(ldir, f) for f in os.listdir(ldir) if f.endswith(".log")]
    except OSError:
        continue
    if not cands:
        continue
    newest = max(cands, key=lambda p: os.path.getmtime(p))
    run_when = dt.datetime.fromtimestamp(os.path.getmtime(newest))
    log_from = label
    try:
        with open(newest, encoding="utf-8", errors="replace") as fh:
            tail = fh.read()[-4000:].splitlines()
    except OSError:
        tail = []
    for line in reversed(tail):
        s = line.strip()
        if s.startswith(("=== finished", "ABORT:", "ERROR", "FAIL")) or "nothing to do" in s:
            run_line = s[:90]
            if s.startswith(("ABORT:", "ERROR", "FAIL")):
                outcome_colour = AMBER
            else:
                outcome_colour = GREEN
            break
    break

entries = []
if latest:
    d = os.path.join(posts, latest)
    entries = sorted(f[:-3] for f in os.listdir(d) if f.endswith(".md") and f != "index.md")

# --- menu bar ---
print(f"{DOT[colour]} ✎ {head} | font=Menlo size=12")
print("---")
print(f"Product Diary · checked {dt.datetime.now():%H:%M} | size=11 color={DIM}")
print(f"source: {source} · {diary.replace(home, '~')} | font=Menlo size=11 color={DIM}")
print("---")

if latest:
    word = "today" if lag == 0 else ("yesterday" if lag == 1 else f"{lag} days ago")
    print(f"Latest published: {latest} ({word}) | font=Menlo size=12 color={colour}")
    if entries:
        print(f"{len(entries)} project entr{'y' if len(entries)==1 else 'ies'} | font=Menlo size=11 color={DIM}")
        for e in entries[:8]:
            print(f"-- {e} | font=Menlo size=11 color={DIM}")
    else:
        print(f"no project entries that day | font=Menlo size=11 color={AMBER}")
print(f"{len(days)} day{'s' if len(days)!=1 else ''} published in total | font=Menlo size=11 color={DIM}")

# --- checkout state ---
print("---")
bits = [f"branch {branch or '?'}"]
if dirty:
    bits.append(f"{dirty} uncommitted")
state_colour = DIM
if behind:
    bits.append(f"{behind} behind origin")
    state_colour = AMBER
if ahead:
    bits.append(f"{ahead} ahead")
print(f"Checkout: {' · '.join(bits)} | font=Menlo size=11 color={state_colour}")
if behind:
    print(f"-- posts here may lag the mini; git pull to refresh | font=Menlo size=11 color={DIM}")

# --- last run ---
print("---")
if run_when:
    print(f"Last run: {run_when:%a %d %b %H:%M} · log from {log_from} | font=Menlo size=11 color={DIM}")
    if run_line:
        print(f"{run_line} | font=Menlo size=11 color={outcome_colour}")
else:
    print(f"Last run: not visible from this Mac | font=Menlo size=11 color={DIM}")
    print(f"-- logs/ is gitignored, so only the runner has them | font=Menlo size=11 color={DIM}")

if agent_loaded:
    out = run("/bin/launchctl", "print", f"gui/{os.getuid()}/{agent}")
    runs = re.search(r"runs = (\d+)", out)
    code = re.search(r"last exit code = (\S+)", out)
    c = code.group(1) if code else "?"
    col = GREEN if c == "0" else (AMBER if c != "?" else DIM)
    print("---")
    print(f"Agent on this Mac: loaded | font=Menlo size=11 color={DIM}")
    print(f"runs {runs.group(1) if runs else '?'} · last exit {c} | font=Menlo size=11 color={col}")

print("---")
print(f"Open blog | bash=/usr/bin/open param1={blog} terminal=false")
print(f"Open posts | bash=/usr/bin/open param1={posts} terminal=false")
print(f"Open repo | bash=/usr/bin/open param1={diary} terminal=false")
nightly = os.path.join(diary, "bin", "nightly-diary.sh")
if os.path.isfile(nightly):
    print(f"Run diary now (last night) | bash={nightly} terminal=true refresh=true")
print(f"git pull | bash=/usr/bin/git param1=-C param2={diary} param3=pull terminal=true refresh=true")
print("Refresh | refresh=true")
PY
