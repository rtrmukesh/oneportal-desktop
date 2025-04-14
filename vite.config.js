import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: false,  // Disable auto-open (set true if you want to auto-open)
    port: process.env.VITE_PORT || 8001,  // Use port from .env or fallback to 8001
    host: process.env.VITE_HOST || 'localhost',  // Use host from .env or fallback to localhost
  },
  define: {
    'process.env': process.env,  // Expose environment variables to the app
  },
})
