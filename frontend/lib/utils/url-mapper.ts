import type { Slug } from "@/sanity.types";

export type ViewableTypes =
  | "page"
  | "platform-index"
  | "platform-child"
  | "blog-index"
  | "blog-post"
  | "case-studies-index"
  | "case-study";

/** Keep in sync with the linkMapper and link queries */
export const VIEWABLE_TYPES = new Set<ViewableTypes>([
  "page",
  "platform-index",
  "platform-child",
  "blog-index",
  "blog-post",
  "case-studies-index",
  "case-study",
]);

// recreate frontend/sanity/queries/shared/link.ts hrefQuery
export const linkMapper = (type: string, slug: Slug) => {
  return (
    /** Keep in sync with the VIEWABLE_TYPES and link queries */
    {
      page: slug.current === "index" ? "" : `/${slug.current}`,
      "platform-index": "/platform",
      "platform-child": `/platform/${slug.current}`,
      "blog-index": "/blog",
      "blog-post": `/blog/${slug.current}`,
      "case-studies-index": "/case-studies",
      "case-study": `/case-studies/${slug.current}`,
    }[type] || `/${slug.current}`
  );
};
