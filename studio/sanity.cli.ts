/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";
import {
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_HOSTNAME,
  SANITY_STUDIO_PROJECT_ID,
} from "./lib/env";
import { resolve } from "node:path";

export default defineCliConfig({
  api: { projectId: SANITY_STUDIO_PROJECT_ID, dataset: SANITY_STUDIO_DATASET },
  studioHost: SANITY_STUDIO_HOSTNAME,
  typegen: {
    path: "../frontend/sanity/queries/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "../frontend/sanity.types.ts",
    overloadClientMethods: true,
  },
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./"),
        "@/schemas": resolve(__dirname, "./schemas"),
        "@/plugins": resolve(__dirname, "./plugins"),
        "@/lib": resolve(__dirname, "./lib"),
      },
    },
  },
});
