import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(['index.html', 'cteni/sojovy-vosk/index.html', 'cteni/dreveny-knot/index.html', 'cteni/bezpecne-horeni/index.html'].map(path => [path, fileURLToPath(new URL(path, import.meta.url))])),
    },
  },
});
