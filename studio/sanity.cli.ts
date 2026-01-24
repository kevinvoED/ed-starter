/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";
import { resolve } from "node:path";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
const sanityStudioHostname = process.env.SANITY_STUDIO_HOSTNAME;

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: sanityStudioHostname,
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
