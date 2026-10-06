import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { articles as sourceArticles } from '../src/content/articles.mjs';
import { articlePage } from '../src/templates/site.mjs';
import { homePage } from '../src/templates/home.mjs';

const root = new URL('../', import.meta.url);
// An article shows its illustration only once the image exists (see scripts/generate-illustrations.mjs).
const media = JSON.parse(await readFile(new URL('public/images/sources.json', root), 'utf8'));
const articles = sourceArticles.map(article => {
  const entry = article.image && media.find(item => item.file === `cteni-${article.slug}.webp`);
  return { ...article, image: entry ? { ...article.image, name: `cteni-${article.slug}`, width: entry.width, height: entry.height } : null };
});
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

// Each PDF letter is one continuous line exported as its outline: the contour
// starts at the line's inner end, runs along one side to the outer end and
// returns along the other side. A wide stroke clipped to the original fill
// therefore paints the line itself once it reaches that outer end.
function outlinePoints(d) {
  const tokens = d.match(/[MLCZ]|-?\d*\.?\d+/g);
  const points = [];
  let command, current, i = 0;
  const number = () => Number(tokens[i++]);
  while (i < tokens.length) {
    if (/[MLCZ]/.test(tokens[i])) command = tokens[i++];
    if (command === 'Z') { if (points.length) points.push(points[0]); continue; }
    if (command === 'M' && points.length) break; // later subpaths only repeat a single point
    if (command === 'M' || command === 'L') { current = [number(), number()]; points.push(current); continue; }
    const [c1, c2, end] = [[number(), number()], [number(), number()], [number(), number()]];
    for (let step = 1; step <= 24; step++) {
      const t = step / 24, u = 1 - t;
      points.push([0, 1].map(k => u ** 3 * current[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t ** 3 * end[k]));
    }
    current = end;
  }
  return points;
}
function lineEnd(d) {
  const points = outlinePoints(d);
  const lengths = [0];
  for (let i = 1; i < points.length; i++) lengths.push(lengths[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
  const total = lengths.at(-1);
  const at = s => {
    const i = Math.max(1, lengths.findIndex(length => length >= s));
    const t = (s - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1);
    return [0, 1].map(k => points[i - 1][k] + (points[i][k] - points[i - 1][k]) * t);
  };
  // The outer end cap is where both sides of the line meet: two points 2 units
  // either side of it along the contour lie only one line-width apart.
  let best = { s: total / 2, gap: Infinity };
  for (let s = total * .3; s < total * .7; s += .05) {
    const [a, b] = [at(s - 2), at(s + 2)];
    const gap = Math.hypot(a[0] - b[0], a[1] - b[1]);
    if (gap < best.gap) best = { s, gap };
  }
  return Math.min(1, (best.s + 1.5) / total);
}
const drawEnds = paths.map(d => (1 - lineEnd(d)).toFixed(4));
function drawnLogo(prefix) {
  const use = (i, attributes = '') => `<use href="#${prefix}-${letters[i]}"${attributes}/>`;
  return `<svg class="logo-draw" viewBox="${viewBox}" aria-hidden="true" focusable="false"><defs>${paths.map((d, i) => `<path id="${prefix}-${letters[i]}" pathLength="1" d="${d}"/>`).join('')}<clipPath id="${prefix}-shape">${paths.map((_, i) => use(i)).join('')}</clipPath></defs><g class="logo-traces" clip-path="url(#${prefix}-shape)">${paths.map((_, i) => use(i, ` class="logo-trace" style="--i:${i};--draw-end:${drawEnds[i]}"`)).join('')}</g><g class="logo-fill">${paths.map((_, i) => use(i, ` style="--i:${i}"`)).join('')}</g></svg>`;
}
const signature = drawnLogo('signature');
await writeFile(new URL('index.html', root), homePage(drawnLogo('hero'), articles, signature));
for (const article of articles) {
  const directory = new URL(`cteni/${article.slug}/`, root);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), articlePage(article, articles, signature));
}
await writeFile(new URL('public/sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', ...articles.map(article => `/cteni/${article.slug}/`)].map(path => `<url><loc>https://mrpj.cz${path}</loc></url>`).join('')}</urlset>\n`);
console.log(`Built original vector logo, homepage and ${articles.length} local articles (${articles.filter(article => article.image).length} illustrated).`);
