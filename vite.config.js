import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import dns from "dns";
dns.setDefaultResultOrder("verbatim");
export default defineConfig({
  base: "/admin-template/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: false,
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["favicon.png", "pwa-192x192.png", "pwa-512x512.png"],
      manifest: {
        name: "Admin Template",
        short_name: "Admin Template",
        description: "Admin Template",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: [
      "idb",
      "moment",
      "react-cropper",
      "primereact/columngroup",
      "primereact/row",
      "primereact/inputswitch",
    ],
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
});
