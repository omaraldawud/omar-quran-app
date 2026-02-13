import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/qt/", // <-- ensures built CSS/JS have correct paths
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost", // dev proxy for API
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
