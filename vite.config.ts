import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@zip.js/zip.js'],
  },
  resolve: {
    alias: [
      // Cesium expects a subpath that some versions of @zip.js do not export.
      // Redirect the import used by Cesium to the dist file that exists in node_modules.
      {
        find: '@zip.js/zip.js/lib/zip-no-worker.js',
        // map to the bundled dist file which provides a no-worker entry
        replacement: path.resolve(__dirname, 'node_modules/@zip.js/zip.js/dist/zip.js'),
      },
      {
        find: '@zip.js/zip.js',
        // main entry (index.js) is at package root
        replacement: path.resolve(__dirname, 'node_modules/@zip.js/zip.js/index.js'),
      },
    ],
  },
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
