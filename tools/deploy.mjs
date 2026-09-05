// `bun run deploy`: build, then upload through the pacing proxy
// (tools/deploy-proxy.mjs — why it exists is explained there). The proxy is
// started for the upload and stopped after, whatever the outcome.
import { spawn, spawnSync } from "node:child_process";
const run = (cmd, args, env = {}) => spawnSync(cmd, args, { stdio: "inherit", env: { ...process.env, ...env } }).status ?? 1;
if (run("npx", ["opennextjs-cloudflare", "build"]) !== 0) process.exit(1);
const proxy = spawn(process.execPath, [new URL("./deploy-proxy.mjs", import.meta.url).pathname, "8899", "400"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 500));
const code = run("npx", ["opennextjs-cloudflare", "deploy"], { HTTPS_PROXY: "http://127.0.0.1:8899", NODE_OPTIONS: "--dns-result-order=ipv4first" });
proxy.kill();
process.exit(code);
