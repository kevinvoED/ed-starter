"use client";

// This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route

import { codeInput } from "@sanity/code-input";
import { dashboardTool } from "@sanity/dashboard";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
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
import { presentationOptions } from "@/lib/presentation";
import { structure } from "@/lib/structure";
import { schema } from "@/schemas/schema";
import { OpenDocumentUrlAction } from "./actions";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
import { VIEWABLE_TYPES, type ViewableTypes } from "../frontend/lib/utils";

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
    presentationTool(presentationOptions),
    visionTool({ defaultApiVersion: SANITY_STUDIO_API_VERSION }),
    codeInput(),
    media(),
    table(),
    dashboardTool(deploymentOptions),
    simplerColorInput(simplerColorInputOptions),
  ],
});
