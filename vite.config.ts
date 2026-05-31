import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      // Don't watch the (gitignored) raw source-content folder. It holds tens of
      // MB of originals and locked files, which crashes the dev watcher (EBUSY).
      ignored: ['**/Bart van de Steeg Website 2026 Content/**'],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
});
