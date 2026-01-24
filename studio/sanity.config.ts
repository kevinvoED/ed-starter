"use client";

// This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route

import { codeInput } from "@sanity/code-input";
import { dashboardTool } from "@sanity/dashboard";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { media } from "sanity-plugin-media";
import { defaultDocumentNode } from "@/lib/defaultDocumentNode";
import {
  SANITY_STUDIO_API_VERSION,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_PREVIEW_URL,
  SANITY_STUDIO_PROJECT_ID,
} from "@/lib/env";
import { resolvePresentation } from "@/lib/presentation";
import { structure } from "@/lib/structure";
import { schema } from "@/schemas/schema";
import { guideTool } from "@/tools/guide";
import { OpenDocumentUrlAction } from "./actions";
import { VIEWABLE_TYPES, type ViewableTypes } from "../frontend/lib/utils";

// Define the actions that should be available for singleton documents
const singletonActions = new Set([
  "publish",
  "discardChanges",
  "restore",
  "unpublish",
]);

// Define the singleton document types
const singletonTypes = new Set([
  "post-index",
  "case-study-index",
  "events-index",
  "platform-index",
  "navbar",
  "footer",
  "configuration",
  "organization",
]);

export default defineConfig({
  title: `ED Starter (${SANITY_STUDIO_DATASET})`,
  projectId: SANITY_STUDIO_PROJECT_ID,
  dataset: SANITY_STUDIO_DATASET,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    types: schema.types,
    // Filter out singleton types from the global "New document" menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (previousActions, { schemaType }) => {
      const myActions = previousActions;

      if (VIEWABLE_TYPES.has(schemaType as ViewableTypes)) {
        myActions.push(OpenDocumentUrlAction);
      }

      return singletonTypes.has(schemaType)
        ? myActions.filter(
            ({ action }) => action && singletonActions.has(action),
          )
        : myActions;
    },
    // Disable comments as the popover for adding comments conflicts with PortableText annotations
    comments: {
      enabled: false,
    },
  },
  tools: [guideTool()],
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: resolvePresentation,
    }),
    visionTool({ defaultApiVersion: SANITY_STUDIO_API_VERSION }),
    codeInput(),
    media(),
    table(),
    dashboardTool({
      widgets: [vercelWidget()],
      name: "deployment",
      title: "Deployment",
    }),
  ],
});
