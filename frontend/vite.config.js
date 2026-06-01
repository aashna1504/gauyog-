import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
    },
  },
  build: {
    // Keep individual chunk size warnings at 500 kB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          // React runtime — tiny and changes rarely, long cache life
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library — large, cache separately
          'vendor-motion': ['framer-motion'],
          // Icon library — tree-shaken per page but still worth splitting
          'vendor-icons': ['lucide-react'],
          // State / auth
          'vendor-store': ['zustand', '@react-oauth/google'],
        },
      },
    },
  },
})
