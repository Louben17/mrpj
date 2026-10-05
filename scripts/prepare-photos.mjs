import sharp from 'sharp';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';

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
const retired = ['mrpj-pastel.webp'];
// Generativní ilustrace jsou povolené jen pro články a doplňky webu, nikdy ne jako svíčky nebo výrobky.
const illustrations = [
  { from: '.cache/ai/sojovy-vosk.png', name: 'cteni-sojovy-vosk', sizes: [800, 1448], description: 'Keramická miska s voskovými vločkami na lněném ubrusu. Ilustrace k článku o sójovém vosku.' },
  { from: '.cache/ai/dreveny-knot.png', name: 'cteni-dreveny-knot', sizes: [800, 1448], description: 'Nůžky na knoty, dřevěné knoty a růžová keramická miska na lněném ubrusu. Ilustrace k článku o dřevěném knotu.' },
  { from: '.cache/ai/bezpecne-horeni.png', name: 'cteni-bezpecne-horeni', sizes: [800, 1448], description: 'Mosazné zhášedlo, zápalky a kamenná podložka na lněném ubrusu. Ilustrace k článku o bezpečném hoření.' },
];

await mkdir('public/images', { recursive: true });
const previous = JSON.parse(await readFile('public/images/sources.json', 'utf8'));
const names = new Set([...selection, ...illustrations].map(item => `${item.name}.webp`));
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
  sources.push({ file: `${item.name}.webp`, variants: [`${item.name}-${small}.webp`], source: 'Generated with AI and supplied by the user', description: item.description, retrieved: '2026-10-05', width: info.width, height: info.height, kind: 'AI-generated article illustration (no MRPJ product shown)' });
}
for (const file of retired) await rm(`public/images/${file}`, { force: true });
await writeFile('public/images/sources.json', `${JSON.stringify(sources, null, 2)}\n`);
console.log(sources.map(entry => `${entry.file} ${entry.width}×${entry.height}`).join('\n'));
