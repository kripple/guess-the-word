import dns from 'dns';
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

dns.setDefaultResultOrder('verbatim');
const outDir = 'docs' as const;

// https://vitejs.dev/config/
export default defineConfig({
  base: '/guess-the-word/',
  build: {
    chunkSizeWarningLimit: 200,
    copyPublicDir: true,
    emptyOutDir: true,
    outDir,
  },
  clearScreen: false,
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
});
