import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { articles } from './src/content/articles.mjs';

// Every generated page is an entry, so a new article in articles.mjs is built automatically.
const pages = ['index.html', ...articles.map(article => `cteni/${article.slug}/index.html`)];

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map(path => [path, fileURLToPath(new URL(path, import.meta.url))])),
    },
  },
});
