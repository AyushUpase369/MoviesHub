import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true,               // ✅ listen on all addresses
    allowedHosts: ['*'],      // ✅ allow all hosts
    cors: true                // ✅ enable CORS (sometimes needed in sandbox)
  }
})
