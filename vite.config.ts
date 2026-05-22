import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cesium()],
  server: {
    port: 5173,
    open: true,
    hmr: true,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false, // Set to true for debugging production issues
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          'cesium': ['cesium'],
          'react': ['react', 'react-dom'],
          'query': ['@tanstack/react-query'],
          'charts': ['recharts'],
        },
      },
    },
  },
  // Security headers
  preview: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
})
