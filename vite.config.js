import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: false,
    port: process.env.VITE_PORT || 8001,
    host: process.env.VITE_HOST || 'localhost',
  }
})
