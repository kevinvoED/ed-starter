import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";
import { SANITY_STUDIO_PREVIEW_URL } from "@/lib/env";

// TODO: refactor to programatically use RELATION_SCHEMA_TYPES instead
const resolvePresentation: PresentationPluginOptions["resolve"] = {
  locations: {
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/blog/${doc?.slug}`,
          },
          { title: "Blog", href: "/blog" },
        ],
      }),
    }),
  },
  mainDocuments: defineDocuments([
    {
      route: "/",
      filter: `_type == 'page' && slug.current == 'index'`,
    },
    {
      route: "/:slug",
      filter: `_type == 'page' && slug.current == $slug`,
    },
    {
      route: "/blog", // doesn't work for some reason but slugs do ???
      filter: `_type == 'blog-index'`,
    },
    {
      route: "/blog/:slug",
      filter: `_type == 'blog-post' && slug.current == $slug`,
    },
    {
      route: "/case-studies", // doesn't work for some reason but slugs do ???
      filter: `_type == 'case-studies-index'`,
    },
    {
      route: "/case-studies/:slug",
      filter: `_type == 'case-study' && slug.current == $slug`,
    },
  ]),
};

export const presentationOptions: PresentationPluginOptions = {
  previewUrl: {
    origin: SANITY_STUDIO_PREVIEW_URL,
    draftMode: {
      enable: "/api/draft-mode/enable",
    },
  },
  resolve: resolvePresentation,
};
