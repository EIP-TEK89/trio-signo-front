import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [
    react(),
  ],
  server: {
    open: true, // automatically open the app in the browser
    port: 4000,
  },
    resolve: {
        alias: {
          $components: path.resolve(__dirname, 'src/components'),
          $pages: path.resolve(__dirname, 'src/pages'),
          $store: path.resolve(__dirname, 'src/Store'),
          $styles: path.resolve(__dirname, 'src/styles'),
          $assets: path.resolve(__dirname, 'src/Assets'),
          $utils: path.resolve(__dirname, 'src/utils'),
        }
        ,
    },
  build: {
    outDir: 'build',
  },
});
