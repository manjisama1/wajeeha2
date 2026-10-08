import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    svgr({
      svgrOptions: {
        typescript: false,
      },
    }),
    react(),
  ],
  base: './',
  build: {
    minify: false,
    cssMinify: false,
    sourcemap: false,
    target: 'esnext',
    rollupOptions: {
      treeshake: false,
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 10000,
  },
  esbuild: {
    target: 'esnext',
    minify: false,
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom'],
  },
})