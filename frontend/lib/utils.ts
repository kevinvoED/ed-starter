import type { Slug } from "@/sanity.types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ViewableTypes =
  | "page"
  | "platform-index"
  | "platform-child"
  | "post-index"
  | "post";

/** Keep in sync with the linkMapper and link queries */
export const VIEWABLE_TYPES = new Set<ViewableTypes>([
  "page",
  "platform-index",
  "platform-child",
  "post-index",
  "post",
]);

// recreate frontend/sanity/queries/shared/link.ts hrefQuery
export const linkMapper = (type: string, slug: Slug) => {
  return (
    /** Keep in sync with the VIEWABLE_TYPES and link queries */
    {
      page: slug.current === "index" ? "" : `/${slug.current}`,
      "platform-index": "/platform",
      "platform-child": `/platform/${slug.current}`,
      "post-index": "/blog",
      post: `/blog/${slug.current}`,
    }[type] || `/${slug.current}`
  );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
