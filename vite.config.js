import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    allowedHosts: ['2yf876-5173.csb.app'] // ✅ allow your sandbox host
  }
})
