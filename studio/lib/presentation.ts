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
          {
            title: doc?.title || "Untitled",
            href: `/case-studies/${doc?.slug}`,
          },
          { title: "Case Studies", href: "/case-studies" },
          {
            title: doc?.title || "Untitled",
            href: `/resources/${doc?.slug}`,
          },
          { title: "Resources", href: "/resources" },
          {
            title: doc?.title || "Untitled",
            href: `/resources/${doc?.slug}`,
          },
          {
            title: doc?.title || "Untitled",
            href: `/events/${doc?.slug}`,
          },
          { title: "Events", href: "/events" },
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
      route: "/blog/:slug",
      filter: `_type == 'post' && slug.current == $slug`,
    },
    {
      route: "/case-studies/:slug",
      filter: `_type == 'case-study' && slug.current == $slug`,
    },
    {
      route: "/events/:slug",
      filter: `_type == 'event' && slug.current == $slug`,
    },
    {
      route: "/resources/:slug",
      filter: `_type == 'resource' && slug.current == $slug`,
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
