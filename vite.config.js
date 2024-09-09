import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'android-chrome-192x192.png', 'android-chrome-512x512.png'],
      manifest: {
        name: 'Trendit³',
        short_name: 'Trendit³',
        description: 'Get paid for your engagements',
        display: "standalone",
        theme_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      }
    }),
    createHtmlPlugin({
      inject: {
        data: {
          favicons: `
            <link rel="icon" type="image/png" href="/favicon.ico" />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="icon" type="image/png" sizes="16x16"href="/favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="apple-touch-icon" sizes="180x180"  href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.webmanifest" />
          `,
        },
      },
    }),
  ],
})
