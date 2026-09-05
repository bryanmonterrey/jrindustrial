// A pacing CONNECT proxy for deploys. This Mac's uplink drops bursty uploads
// to Cloudflare's edge after ~1–3 MB (measured 2026-08-27: a 10 MB POST to
// api.cloudflare.com or podbot.fun dies at full speed, completes at 300 KB/s;
// the same POST to a non-Cloudflare host completes at full speed). Wrangler
// honours HTTPS_PROXY, so `bun run deploy` tunnels through this and the
// upstream bytes are paced. Downstream is untouched.
//   node tools/deploy-proxy.mjs [port=8899] [KBps=400]
import { createServer } from "node:http";
import { connect } from "node:net";
const port = Number(process.argv[2] || 8899), rate = Number(process.argv[3] || 400) * 1024;
const srv = createServer((_, res) => { res.writeHead(405); res.end(); });
srv.on("connect", (req, client, head) => {
  const [host, p] = req.url.split(":");
  const up = connect(Number(p || 443), host, () => {
    client.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    if (head.length) up.write(head);
    // Pace client→upstream: forward at most `rate` bytes per second in 50 ms slices.
    const slice = Math.max(1024, Math.floor(rate / 20)); let queue = [];
    client.on("data", (c) => { queue.push(c); client.pause(); });
    const tick = () => {
      if (!queue.length) { client.resume(); return; }
      let buf = Buffer.concat(queue); queue = [];
      const send = buf.subarray(0, slice); const rest = buf.subarray(slice);
      if (rest.length) queue.push(rest);
      up.write(send, () => { if (queue.length) setTimeout(tick, 50); else client.resume(); });
    };
    client.on("pause", () => setTimeout(tick, 0));
    up.pipe(client);
  });
  const done = () => { client.destroy(); up.destroy(); };
  up.on("error", done); client.on("error", done); up.on("close", done); client.on("close", done);
});
srv.listen(port, "127.0.0.1", () => console.log(`deploy proxy on 127.0.0.1:${port}, pacing uploads at ${rate / 1024} KB/s`));
