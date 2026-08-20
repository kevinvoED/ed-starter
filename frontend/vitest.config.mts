import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next"],
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
    },
    env: {
      NEXT_PUBLIC_SANITY_DATASET: "test",
      NEXT_PUBLIC_SANITY_PROJECT_ID: "test_id",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
      SANITY_STUDIO_API_READ_TOKEN: "test_token",
      SANITY_STUDIO_REVALIDATE_SECRET: "test_secret",
      NEXT_PUBLIC_APP_ENV: "development",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
    },
  },
});
