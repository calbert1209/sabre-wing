import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "node:path";
import { qrcode } from "vite-plugin-qrcode";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), qrcode()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  base: `/${process.env.VITE_URL_BASE ?? ""}`,
});
