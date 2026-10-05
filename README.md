# Product Diary

Nightly diary of project changes under `/Volumes/nas/projects`, published at
**https://blog.remnantsecurity.com**.

It runs on its own, on the Mac mini, just after midnight: an agent reads the
day's changes, writes the Markdown, and the runner commits, pushes and deploys.

## Layout

Day-first, so a day's entries and its images stay together:

- `posts/YYYY-MM-DD/<project-slug>.md` — one entry per project per day.
  Optional frontmatter: `project` (canonical display name from `PROJECTS.md`),
  `summary`, `title`.
- `posts/YYYY-MM-DD/index.md` — optional overview of that day.
- `posts/YYYY-MM-DD/assets/*.png` — that day's images. Reference them by bare
  filename (`![home](snapdog-home.png)`); the build rewrites the path to
  `/assets/YYYY-MM-DD/`.
- `projects/<project-slug>/index.md` — optional rolling blurb for a project page.
- `index.md` — optional home page intro.

Routes: `/`, `/YYYY-MM-DD/`, `/<project>/`, `/<project>/YYYY-MM-DD/`.

## Running it

```sh
bin/nightly-diary.sh              # last night's entry, start to finish
bin/nightly-diary.sh 2026-10-03   # a specific day
DIARY_SKIP_AGENT=1 bin/nightly-diary.sh   # plumbing only, writes no post
```

The agent's instructions live in `bin/diary-prompt.md` — edit that file to change
what the diary writes or what it keeps out. `DIARY_DATE` in it is substituted at
run time.

Logs land in `logs/YYYY-MM-DD.log`.

## Installing on the Mac mini

From any Mac that can reach the mini:

```sh
bin/install-on-mini.sh                # over Tailscale (100.120.153.82)
bin/install-on-mini.sh aimacmini      # over the LAN
```

It checks prerequisites, then installs `bin/mini-launch.js` and
`bin/mini-wrapper.sh` into `~/bin` on the mini and loads
`com.ian.product-diary` as a user LaunchAgent firing at **00:12 Central**.

### Two macOS constraints, both learned the hard way

**launchd cannot touch the SMB mount when setting a job up.** A job whose
program, stdout or working directory is under `/Volumes/nas` fails with exit 78
(`EX_CONFIG`) before it runs. So everything launchd itself references lives on
the internal disk, and the wrapper hands off to the NAS copy.

**macOS gates network volumes behind TCC, per binary.** Apple's platform
binaries — `/bin/bash`, `/bin/ls`, `/usr/bin/tee` — have no
`kTCCServiceSystemPolicyNetworkVolumes` grant, so a LaunchAgent running
`/bin/bash` gets "Operation not permitted" on every path under `/Volumes/nas`.
Homebrew's `node` **is** granted, and children inherit the responsible process's
grant, so the job's program is node (`bin/mini-launch.js`) and the whole subtree
— bash, the agent, git, npm — inherits access.

That grant is recorded against node's *versioned* Cellar path, so
`brew upgrade node` can silently revoke it. The wrapper verifies a real read
before doing any work and aborts loudly, because a denied read otherwise looks
exactly like a quiet day. To check:

```sh
sqlite3 ~/Library/Application\ Support/com.apple.TCC/TCC.db   'select client from access where service="kTCCServiceSystemPolicyNetworkVolumes";'
```

### The headless token

launchd cannot reach the login keychain, so `claude -p` fails there with
"OAuth session expired and could not be refreshed" even while the same command
works over SSH. Run this **once on the mini**:

```sh
claude setup-token
mkdir -p ~/.config/product-diary
printf 'CLAUDE_CODE_OAUTH_TOKEN=%s\n' '<token>' > ~/.config/product-diary/env
chmod 600 ~/.config/product-diary/env
```

The wrapper sources that file and refuses to read it unless it is mode 600.
`ANTHROPIC_API_KEY` works there too, but bills the API rather than the
subscription. The file is outside the repo; never commit a token.

A *user* agent, not a daemon, because the NAS is mounted in the login session.
The mini therefore needs to be logged in; the runner aborts loudly rather than
publishing "nothing shipped" if `/Volumes/nas` is missing.

```sh
ssh ian@100.120.153.82 'launchctl kickstart -p gui/$(id -u)/com.ian.product-diary'   # run now
ssh ian@100.120.153.82 'launchctl print gui/$(id -u)/com.ian.product-diary'          # status
```

## Publishing by hand

```sh
npm run build    # -> dist/
npm run deploy   # builds, then force-pushes dist/ to gh-pages
```

The build swaps `dist/` aside by rename instead of deleting it: on the SMB mount
a recursive delete leaves `.smbdelete*` tombstones behind and every later build
fails with `ENOTEMPTY`.

## The repo is public

GitHub Pages requires it on this plan, so `main` is as public as the site. Never
commit secrets or `.env` contents, `remnant-academy` answer material, unpublished
manuscript text, or learner data. `bin/diary-prompt.md` tells the agent the same
thing, but the rule is on whoever commits.
