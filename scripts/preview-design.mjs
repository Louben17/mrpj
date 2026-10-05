import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, relative, extname } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const designRoot = resolve(root, 'docs/design');
const publicRoot = resolve(root, 'public');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

const server = createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405).end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const isPublicAsset = pathname.startsWith('/images/') || pathname.startsWith('/fonts/');
    const directory = isPublicAsset ? publicRoot : designRoot;
    const filename = resolve(directory, `.${pathname === '/' ? '/index.html' : pathname}`);
    const pathWithinRoot = relative(directory, filename);
    if (pathWithinRoot.startsWith('..') || pathname.includes('\0') || !types[extname(filename)]) {
      response.writeHead(404).end('Not found');
      return;
    }
    const body = await readFile(filename);
    response.writeHead(200, { 'Content-Type': types[extname(filename)], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404).end('Not found');
  }
});

server.on('error', error => {
  console.error(`Design preview could not start: ${error.message}`);
  process.exitCode = 1;
});
server.listen(4174, '127.0.0.1', () => console.log('MRPJ design manual: http://127.0.0.1:4174/'));
