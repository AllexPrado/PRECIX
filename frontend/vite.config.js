import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // Permite acesso externo na rede local
    port: 5173,
    strictPort: true,
    cors: true,
    proxy: {
      '/admin': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    // Otimizações para produção
    target: 'es2015',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'axios'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // PWA otimizations
    sourcemap: false,
    assetsInlineLimit: 4096
  },
  css: {
    // Otimizações CSS
    devSourcemap: false
  },
  optimizeDeps: {
    include: ['vue', 'axios']
  }
})
