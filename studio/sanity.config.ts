"use client";

import { dashboardTool } from "@sanity/dashboard";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { simplerColorInputOptions } from "@/lib/color-input";
import {
  SINGLETON_DOCUMENT_ACTIONS,
  SINGLETON_DOCUMENT_TYPES,
} from "@/lib/consts";
import { defaultDocumentNode } from "@/lib/default-document-node";
import { deploymentOptions } from "@/lib/deployment";
import {
  SANITY_STUDIO_API_VERSION,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_PROJECT_ID,
} from "@/lib/env";
import { guideTool } from "@/lib/guide-tool";
import { structure } from "@/lib/structure";
import { schema } from "@/schemas/schema";
import { OpenDocumentUrlAction } from "./actions";
import { richTablePlugin } from "sanity-plugin-rich-table";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
import {
  VIEWABLE_TYPES,
  type ViewableTypes,
} from "../frontend/lib/utils/url-mapper";

export default defineConfig({
  title: `ED Starter (${SANITY_STUDIO_DATASET})`,
  projectId: SANITY_STUDIO_PROJECT_ID,
  dataset: SANITY_STUDIO_DATASET,
  schema: {
    types: schema.types,
    // Filter out singleton types from the global "New document" menu options
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !SINGLETON_DOCUMENT_TYPES.has(schemaType),
      ),
  },
  document: {
    // Filter out actions that are not explicitly included in `SINGLETON_DOCUMENT_ACTIONS`
    actions: (previousActions, { schemaType }) => {
      const myActions = previousActions;

      if (VIEWABLE_TYPES.has(schemaType as ViewableTypes)) {
        myActions.push(OpenDocumentUrlAction);
      }

      return SINGLETON_DOCUMENT_TYPES.has(schemaType)
        ? myActions.filter(
            ({ action }) => action && SINGLETON_DOCUMENT_ACTIONS.has(action),
          )
        : myActions;
    },
    comments: {
      enabled: false,
    },
  },
  tools: [guideTool()],
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    // presentationTool(presentationOptions), // Re-enable if needed; update resolved links in presentation.ts
    visionTool({ defaultApiVersion: SANITY_STUDIO_API_VERSION }),
    media(),
    dashboardTool(deploymentOptions),
    simplerColorInput(simplerColorInputOptions),
    richTablePlugin({}),
  ],
  releases: {
    enabled: false,
  },
  scheduledDrafts: {
    enabled: false,
  },
});
