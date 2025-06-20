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
          $services: path.resolve(__dirname, 'src/services'),
          $hooks: path.resolve(__dirname, 'src/hooks'),
          $utils: path.resolve(__dirname, 'src/utils'),
          $constants: path.resolve(__dirname, 'src/constants'),
        }
        ,
    },
  build: {
    outDir: 'build',
    target: 'esnext', // Ensures latest JS features including WebAssembly
  },
  optimizeDeps: {
    exclude: ['onnxruntime-web'], // Ensures proper handling of WASM
  },
});
