import sharp from 'sharp';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { articles } from '../src/content/articles.mjs';

// Import pouze vlastních fotografií MRPJ z veřejné galerie stránky MRPJ na Facebooku,
// stažených v plné velikosti do .cache/facebook/ (nepublikuje se).
// Mění se jen formát a velikost (dvě šířky pro srcset). Obsah fotografií se neupravuje.
const gallery = 'https://www.facebook.com/profile.php?id=61563282029068&sk=photos';
const downloaded = JSON.parse(await readFile('.cache/facebook/photos.json', 'utf8'));
const selection = [
  { fbid: '122207306666442734', name: 'mrpj-mramor', sizes: [800, 1600], description: 'Mramorovaná nádoba MRPJ v černé a broskvové na oválném podnosu.' },
  { fbid: '122144766494442734', name: 'mrpj-zelena', sizes: [800, 1536], description: 'Dvě zelené nádoby MRPJ na podnosu s vizitkou MRPJ.' },
  { fbid: '122160108698442734', name: 'mrpj-barvy', sizes: [800, 1440], description: 'Barevné nádoby MRPJ ve dvou řadách.' },
  { fbid: '122127206456442734', name: 'mrpj-dilna', sizes: [1200, 2048], description: 'Svíčky MRPJ s dřevěnými knoty vyfocené shora.' },
];
const retired = ['mrpj-pastel.webp', 'mrpj-vyroba.webp'];
// Vlastní reely MRPJ z Instagramu (staženo do .cache/reels/). Bez zvuku, zmenšené, s úvodním snímkem. Vyžaduje ffmpeg.
const reels = [
  { id: 'DMU-wGoML9d', name: 'mrpj-reel-vyroba', posterAt: 1.2, description: 'Reel z výroby: nalévání barevné směsi do forem, odformování a hotové nádoby MRPJ.' },
];
// Generativní ilustrace jsou povolené jen pro články a doplňky webu, nikdy ne jako svíčky nebo výrobky.
// Zdrojem je pole `image` u článku; originál leží v .cache/ai/<slug>.png (viz scripts/generate-illustrations.mjs).
const illustrations = articles.filter(article => article.image && existsSync(`.cache/ai/${article.slug}.png`)).map(article => ({ from: `.cache/ai/${article.slug}.png`, name: `cteni-${article.slug}`, sizes: [800, 1536], description: `${article.image.alt}. Ilustrace k článku ${article.title}.`, meta: existsSync(`.cache/ai/${article.slug}.json`) ? JSON.parse(readFileSync(`.cache/ai/${article.slug}.json`, 'utf8')) : null }));

await mkdir('public/images', { recursive: true });
const previous = JSON.parse(await readFile('public/images/sources.json', 'utf8'));
const names = new Set([...selection, ...illustrations].map(item => `${item.name}.webp`).concat(reels.map(item => `${item.name}.mp4`)));
const sources = previous.filter(entry => !names.has(entry.file) && !retired.includes(entry.file));
for (const item of selection) {
  const photo = downloaded.find(entry => entry.fbid === item.fbid);
  if (!photo) throw new Error(`Missing downloaded Facebook photo ${item.fbid}`);
  const [small, large] = item.sizes;
  await sharp(photo.file).rotate().resize({ width: small, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/images/${item.name}-${small}.webp`);
  const info = await sharp(photo.file).rotate().resize({ width: large, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/images/${item.name}.webp`);
  sources.push({ file: `${item.name}.webp`, variants: [`${item.name}-${small}.webp`], source: photo.permalink, gallery, description: item.description, retrieved: '2026-10-05', width: info.width, height: info.height, kind: 'original MRPJ Facebook page photo' });
}
for (const item of illustrations) {
  const [small, large] = item.sizes;
  await sharp(item.from).resize({ width: small, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/images/${item.name}-${small}.webp`);
  const info = await sharp(item.from).resize({ width: large, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/images/${item.name}.webp`);
  sources.push({ file: `${item.name}.webp`, variants: [`${item.name}-${small}.webp`], source: item.meta ? `Generated with ${item.meta.model} via scripts/generate-illustrations.mjs` : 'Generated with AI (ChatGPT) and supplied by the user', ...(item.meta ? { prompt: item.meta.prompt, generated: item.meta.created } : {}), description: item.description, retrieved: '2026-10-05', width: info.width, height: info.height, kind: 'AI-generated article illustration (no MRPJ product shown)' });
}
for (const item of reels) {
  const input = `.cache/reels/${item.id}.mp4`;
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', input, '-an', '-vf', 'scale=540:-2,fps=30', '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-crf', '25', '-preset', 'slow', '-movflags', '+faststart', `public/images/${item.name}.mp4`]);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(item.posterAt), '-i', input, '-frames:v', '1', '-vf', 'scale=540:-2', `.cache/reels/${item.name}-poster.png`]);
  const info = await sharp(`.cache/reels/${item.name}-poster.png`).webp({ quality: 80 }).toFile(`public/images/${item.name}.webp`);
  sources.push({ file: `${item.name}.mp4`, variants: [`${item.name}.webp`], source: `https://www.instagram.com/mrpjcz/reel/${item.id}/`, description: item.description, retrieved: '2026-10-05', width: info.width, height: info.height, kind: 'original MRPJ Instagram reel (muted, resized) with poster frame' });
}
for (const file of retired) await rm(`public/images/${file}`, { force: true });
await writeFile('public/images/sources.json', `${JSON.stringify(sources, null, 2)}\n`);
console.log(sources.map(entry => `${entry.file} ${entry.width}×${entry.height}`).join('\n'));
