// SPDX-License-Identifier: MIT
// Local zero-dependency static server for StatAtlas (app/) on Node 22.
// Usage: node serve.ts [--port 8080]

import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_ROOT = resolve(fileURLToPath(new URL('./app', import.meta.url)));

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

function parsePort(argv: string[]): number {
  const idx = argv.indexOf('--port');
  if (idx === -1) return 8080;
  const parsed = Number(argv[idx + 1]);
  return Number.isInteger(parsed) && parsed > 0 && parsed < 65536 ? parsed : 8080;
}

const port = parsePort(process.argv.slice(2));

createServer((req, res) => {
  const parsedUrl = new URL(req.url ?? '/', 'http://127.0.0.1');
  let reqPath: string;
  try {
    reqPath = decodeURIComponent(parsedUrl.pathname);
  } catch {
    res.writeHead(400).end('Bad request');
    return;
  }
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  const filePath = resolve(join(APP_ROOT, normalize(reqPath)));
  if (filePath !== APP_ROOT && !filePath.startsWith(APP_ROOT + sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  try {
    const info = statSync(filePath);
    if (!info.isFile()) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, {
      'content-type': CONTENT_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
      'content-length': info.size,
      'cache-control': 'no-store',
    });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`StatAtlas serving app/ at http://127.0.0.1:${port}`);
});
