import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],

 /*  server: {
    proxy: {
      "/api": {
        target: "https://localhost/jasomaki/api", // Cambia esto al puerto correcto de tu servidor PHP
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  }, */
  base: "/",
  build: {
    chunkSizeWarningLimit: 1000, // Ajusta el límite (en KB). Por ejemplo, 1000 KB (1 MB)
  },
});
