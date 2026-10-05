import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { articles } from '../src/content/articles.mjs';
import { articlePage } from '../src/templates/site.mjs';
import { homePage } from '../src/templates/home.mjs';

const root = new URL('../', import.meta.url);
const system = JSON.parse(await readFile(new URL('docs/design/tokens.json', root), 'utf8'));
const source = await readFile(new URL('src/brand/logo-source.svg', root), 'utf8');
const paths = [...source.matchAll(/<path\b[^>]*\sd="([^"]+)"/g)].map(match => match[1]);
if (paths.length !== 4) throw new Error('The original PDF logo must contain exactly four letter paths.');
const letters = ['m', 'r', 'p', 'j'];
const viewBox = '13 8 97 35';
const svg = (body, box = viewBox) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" fill="#2B2521">${body}</svg>`;
await mkdir(new URL('public/brand/', root), { recursive: true });
await writeFile(new URL('public/brand/logo.svg', root), svg(paths.map(d => `<path d="${d}"/>`).join('')));
const crops = { m: '13 8 31 35', r: '44 8 28 35', p: '72 8 25 35', j: '92 8 18 35' };
for (let i = 0; i < paths.length; i++) await writeFile(new URL(`public/brand/motif-${letters[i]}.svg`, root), svg(`<path d="${paths[i]}"/>`, crops[letters[i]]));
await writeFile(new URL('public/brand/favicon.svg', root), svg(`<path d="${paths[0]}"/>`, '11 6 35 38'));

const defs = paths.map((d, i) => `<path id="hero-letter-${i}" d="${d}" pathLength="1"/><mask id="hero-mask-${i}" maskUnits="userSpaceOnUse" x="0" y="0" width="121" height="49"><use href="#hero-letter-${i}" class="logo-trace" style="--draw-delay:${i * parseFloat(system.tokens['logo-stagger'])}ms" fill="none" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></mask>`).join('');
const logo = `<svg class="logo-draw" viewBox="${viewBox}" role="img" aria-labelledby="hero-logo-title"><title id="hero-logo-title">MRPJ</title><defs>${defs}</defs><g class="logo-ghost">${paths.map((_, i) => `<use href="#hero-letter-${i}"/>`).join('')}</g><g class="logo-ink">${paths.map((_, i) => `<use href="#hero-letter-${i}" mask="url(#hero-mask-${i})"/>`).join('')}</g><g class="logo-complete" style="--finish-delay:${(paths.length - 1) * parseFloat(system.tokens['logo-stagger'])}ms">${paths.map((_, i) => `<use href="#hero-letter-${i}"/>`).join('')}</g></svg>`;
await writeFile(new URL('index.html', root), homePage(logo, articles));
for (const article of articles) {
  const directory = new URL(`cteni/${article.slug}/`, root);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), articlePage(article, articles));
}
await writeFile(new URL('public/sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', ...articles.map(article => `/cteni/${article.slug}/`)].map(path => `<url><loc>https://mrpj.cz${path}</loc></url>`).join('')}</urlset>\n`);
console.log('Built original vector logo, homepage and three local articles.');
