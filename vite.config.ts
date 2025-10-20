import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // For widget snippet build
        entryFileNames: 'booking-widget.js',
        chunkFileNames: 'booking-widget-[hash].js',
        assetFileNames: 'booking-widget.[ext]'
      }
    }
  },
  define: {
    // Ensure compatibility with older browsers
    global: 'globalThis',
  }
})
