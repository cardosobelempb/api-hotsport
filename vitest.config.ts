import tsConfigPaths from "vite-tsconfig-paths";
// packages/vitest-config/vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist"],
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["ts", "json", "js"],
    },
  },
});
