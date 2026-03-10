import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: '/ISS-FreshPick/',
  build: {
    outDir: 'docs',
  },
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['logo-192x192.png', 'logo-512x512.png'],
    manifest: {
      name: 'Harvest Grocery Shopping',
      short_name: 'Harvest',
      description: 'Perishable products management and shopping app',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'logo-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
})
