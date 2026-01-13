import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const target = process.env.TARGET ?? 'chrome';
const manifestSrc = target === 'firefox' ? 'manifest.firefox.json' : 'manifest.json';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: manifestSrc,
          dest: '.',
          rename: 'manifest.json'
        },
        {
          src: 'prompts',
          dest: '.'
        },
        {
          src: 'icon.svg',
          dest: '.'
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'src/background.ts'),
        popup: resolve(__dirname, 'popup.html')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
