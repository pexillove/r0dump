import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static site for r0dump-fusion. Relative base so it can be hosted from any subpath
// (GitHub Pages project sites, plain file host, etc.).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 8192,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          motion: ['framer-motion'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
  },
})
