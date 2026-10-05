#!/usr/bin/env node
// launchd entry point for the nightly diary on the Mac mini.
//
// Why Node launches a bash script: macOS gates network volumes behind TCC
// (`kTCCServiceSystemPolicyNetworkVolumes`), and the grant is per binary. Apple's
// platform binaries — /bin/bash, /bin/ls, /bin/cat, /usr/bin/tee — have no grant,
// so a LaunchAgent that runs /bin/bash gets "Operation not permitted" on every
// path under /Volumes/nas. Homebrew's node *is* granted, and children inherit the
// responsible process's grant, so running node as the job's program gives the whole
// subtree (bash, the agent, git, npm) access to the NAS.
//
// The grant is recorded against node's versioned Cellar path, so `brew upgrade
// node` can silently revoke it. The wrapper verifies a real read before doing any
// work and says so loudly rather than reporting a quiet day.
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const home = process.env.HOME;
const logDir = path.join(home, "Library/Logs/product-diary");
fs.mkdirSync(logDir, { recursive: true });
const log = fs.openSync(path.join(logDir, "launch.log"), "a");
fs.writeSync(log, `=== launch ${new Date().toISOString()} via ${process.execPath} ===\n`);

const child = spawn("/bin/bash", [path.join(home, "bin/product-diary-run.sh"), ...process.argv.slice(2)], {
  stdio: ["ignore", log, log],
});
child.on("exit", (code, signal) => {
  fs.writeSync(log, `=== exit ${code ?? signal} ===\n`);
  process.exit(code ?? 1);
});
