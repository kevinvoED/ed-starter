// Learn more: https://www.sanity.io/docs/configuration

import { assist } from "@sanity/assist";
import { visionTool } from "@sanity/vision";
import { presentation } from "@/plugins/presentation";
import { structure } from "@/plugins/structure";
import { schemaTypes } from "@/schemas/schema";
import { defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { media } from "sanity-plugin-media";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "your-projectID";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  title: "ED Starter Kit",
  projectId,
  dataset,
  plugins: [
    structure,
    media(),
    presentation,
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
