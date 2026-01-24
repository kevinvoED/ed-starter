import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const resolvePresentation: PresentationPluginOptions["resolve"] = {
  locations: {
    // Add more locations for other post types
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
          { title: "Case Studies", href: "/case-studies" },
          { title: "Resources", href: "/resources" },
          {
            title: doc?.title || "Untitled",
            href: `/case-studies/${doc?.slug}`,
          },
          {
            title: doc?.title || "Untitled",
            href: `/resources/${doc?.slug}`,
          },
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
