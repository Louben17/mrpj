// Generates missing article illustrations with the OpenAI Image API, then imports them.
//   npm run illustrations                 – every article with image.prompt but no .cache/ai/<slug>.png
//   npm run illustrations -- prvni-zapaleni      – only these slugs (regenerates them)
// Needs OPENAI_API_KEY in .env.local (never published). Optional: OPENAI_IMAGE_MODEL (default gpt-image-1-mini),
// OPENAI_IMAGE_QUALITY (default medium; low | medium | high).
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { articles } from '../src/content/articles.mjs';

// One visual series for all reading pages: same linen, light and composition as the first three images.
const STYLE = 'Editorial still life photograph in a calm, minimal series: objects on a warm cream linen tablecloth. Soft diffused morning daylight from the left with gentle window-shadow streaks, warm minimal palette of cream, ivory, beige and soft brown. Objects placed in the left third, generous empty linen space on the right. Shot from about 45 degrees above, 85mm lens, shallow depth of field, natural photographic texture.';
// Project rule: generated images may illustrate articles, but must never show candles or anything that could pass for an MRPJ product.
const RULES = 'Strictly no candles, no candle jars or candle vessels, no flame, no smoke, no text, no letters, no logos, no people, no hands.';

function readKey(name) {
  if (process.env[name]) return process.env[name];
  if (!existsSync('.env.local')) return undefined;
  const line = readFileSync('.env.local', 'utf8').split(/\r?\n/).find(row => row.startsWith(`${name}=`));
  return line?.slice(name.length + 1).trim().replace(/^["']|["']$/g, '');
}

const apiKey = readKey('OPENAI_API_KEY');
if (!apiKey) {
  console.error('Missing OPENAI_API_KEY. Add a line OPENAI_API_KEY=sk-... to .env.local (create a key at https://platform.openai.com/api-keys).');
  process.exit(1);
}
const headers = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' };

async function pickModel() {
  const configured = readKey('OPENAI_IMAGE_MODEL');
  if (configured) return configured;
  const response = await fetch('https://api.openai.com/v1/models', { headers });
  if (!response.ok) throw new Error(`Cannot list models: ${response.status} ${await response.text()}`);
  const ids = (await response.json()).data.map(model => model.id).filter(id => /^gpt-image/.test(id));
  // The mini model is the most economical choice for small editorial illustrations.
  if (ids.includes('gpt-image-1-mini')) return 'gpt-image-1-mini';
  ids.sort().reverse();
  if (!ids.length) throw new Error('No gpt-image model is available for this API key. Set OPENAI_IMAGE_MODEL in .env.local.');
  return ids[0];
}

const only = process.argv.slice(2);
const queue = articles.filter(article => article.image?.prompt && (only.length ? only.includes(article.slug) : !existsSync(`.cache/ai/${article.slug}.png`)));
if (!queue.length) { console.log('All article illustrations exist. Pass slugs to regenerate specific ones.'); process.exit(0); }

const model = await pickModel();
const quality = readKey('OPENAI_IMAGE_QUALITY') || 'medium';
await mkdir('.cache/ai', { recursive: true });
console.log(`Model ${model}, quality ${quality}: generating ${queue.map(article => article.slug).join(', ')}`);
for (const article of queue) {
  const prompt = `${STYLE} Scene: ${article.image.prompt}. ${RULES}`;
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST', headers,
    body: JSON.stringify({ model, prompt, size: '1536x1024', quality, n: 1 }),
  });
  if (!response.ok) { console.error(`${article.slug}: ${response.status} ${await response.text()}`); process.exitCode = 1; continue; }
  const [image] = (await response.json()).data;
  const bytes = image.b64_json ? Buffer.from(image.b64_json, 'base64') : Buffer.from(await (await fetch(image.url)).arrayBuffer());
  await writeFile(`.cache/ai/${article.slug}.png`, bytes);
  await writeFile(`.cache/ai/${article.slug}.json`, JSON.stringify({ model, prompt, created: new Date().toISOString() }, null, 2));
  console.log(`${article.slug}: saved .cache/ai/${article.slug}.png`);
}

execFileSync(process.execPath, ['scripts/prepare-photos.mjs'], { stdio: 'inherit' });
execFileSync(process.execPath, ['scripts/build-pages.mjs'], { stdio: 'inherit' });
