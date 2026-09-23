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
  // Every page is a real HTML file, so each URL works on any static host
  // without a rewrite rule: the campaign landing page, the animal-story
  // builder its CTAs lead to, and the checkout with its three outcomes.
  build: {
    rollupOptions: {
      input: {
        main: here('./index.html'),
        create: here('./create/index.html'),
        checkout: here('./checkout/index.html'),
        // Three real URLs rather than one page with a query flag: a payment
        // provider needs a distinct return_url per outcome.
        checkoutSuccess: here('./checkout/success/index.html'),
        checkoutPending: here('./checkout/pending/index.html'),
        checkoutFailed: here('./checkout/failed/index.html'),
      },
    },
  },
})
