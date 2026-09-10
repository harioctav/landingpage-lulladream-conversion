import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

const here = (path) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': here('./src'),
      '@assets': here('./assets'),
    },
  },
  // Two pages: the campaign landing page and the animal-story builder its
  // CTAs lead to. Each is a real HTML file, so /create/ works on any static
  // host without a rewrite rule.
  build: {
    rollupOptions: {
      input: {
        main: here('./index.html'),
        create: here('./create/index.html'),
      },
    },
  },
})
