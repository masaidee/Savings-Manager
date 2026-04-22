import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
   plugins: [react()],
   server: {
      allowedHosts: ['7339-223-205-183-147.ngrok-free.app'],
      host: true,
      port: 5173,
      open: true,
   },
})
