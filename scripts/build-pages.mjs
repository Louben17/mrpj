import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { articles } from '../src/content/articles.mjs';
import { articlePage } from '../src/templates/site.mjs';
import { homePage } from '../src/templates/home.mjs';

const root = new URL('../', import.meta.url);
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

// A soft reveal of the original fills avoids racing along closed PDF outlines.
const logo = `<svg class="logo-draw" viewBox="${viewBox}" aria-hidden="true" focusable="false"><g>${paths.map(d => `<path d="${d}"/>`).join('')}</g></svg>`;
await writeFile(new URL('index.html', root), homePage(logo, articles));
for (const article of articles) {
  const directory = new URL(`cteni/${article.slug}/`, root);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), articlePage(article, articles));
}
await writeFile(new URL('public/sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', ...articles.map(article => `/cteni/${article.slug}/`)].map(path => `<url><loc>https://mrpj.cz${path}</loc></url>`).join('')}</urlset>\n`);
console.log('Built original vector logo, homepage and three local articles.');
