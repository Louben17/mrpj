import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Import pouze vlastních fotografií MRPJ, získaných z veřejného profilu @mrpjcz.
// Mění se jen formát a velikost. Obsah fotografií se neupravuje.
const posts = JSON.parse((await readFile('artifacts/instagram/posts.json', 'utf8')).replace(/^\uFEFF/, ''));
const selection = [
  { index: 5, name: 'mrpj-pastel', description: 'Pastelové zelené a růžové nádoby MRPJ.' },
  { index: 2, name: 'mrpj-mramor', description: 'Mramorovaná nádoba s hořící svíčkou MRPJ.' },
  { index: 6, name: 'mrpj-barvy', description: 'Barevné svíčky a nádoby MRPJ.' },
  { index: 10, name: 'mrpj-vyroba', description: 'Nalévání vosku při výrobě svíčky MRPJ.' },
];
await mkdir('public/images', { recursive: true });
const sources = [];
for (const item of selection) {
  const post = posts[item.index];
  const output = `public/images/${item.name}.webp`;
  const info = await sharp(post.localFile).rotate().webp({ quality: 88 }).toFile(output);
  sources.push({ file: `${item.name}.webp`, source: post.permalink, description: item.description, retrieved: '2026-10-05', width: info.width, height: info.height, kind: 'original MRPJ Instagram photo or reel cover' });
}
await writeFile('public/images/sources.json', `${JSON.stringify(sources, null, 2)}\n`);
console.log(JSON.stringify(sources, null, 2));
