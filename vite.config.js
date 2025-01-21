import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: '/', // Asegúrate de que la base sea '/'
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Ajusta según lo que necesites
  },
  server: {
    historyApiFallback: {
      disableDotRule: true,
    },
  },
});
