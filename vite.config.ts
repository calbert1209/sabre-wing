import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [preact()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };

  if (command === "serve") {
    return baseConfig;
  }

  return {
    ...baseConfig,
    base: "/sabre-wing/",
  };
});
