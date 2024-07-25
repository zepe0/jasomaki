import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost", // El puerto en el que está corriendo tu servidor PHP
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Ajusta si es necesario
      },
    },
  },
});
