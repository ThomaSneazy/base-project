import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';
import { resolve } from 'path'

export default defineConfig({
  plugins: [glsl()],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        error404: resolve(__dirname, 'src/error404.js'),
        blog: resolve(__dirname, 'src/blog.js'),
        campagne: resolve(__dirname, 'src/campagne.js'),
        contact: resolve(__dirname, 'src/contact.js'),
        loader: resolve(__dirname, 'src/loader.js'),
        offre: resolve(__dirname, 'src/offre.js'),
        projet: resolve(__dirname, 'src/projet.js'),
        transition: resolve(__dirname, 'src/transition.js')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
      external: ['jquery'],
    },
  },
})