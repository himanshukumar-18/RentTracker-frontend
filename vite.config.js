import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/rent-tracker": {
        target: process.env.VITE_API_PROXY,
        changeOrigin: true,
        secure: true
      }
    }
  },
  plugins: [react(),],
})
