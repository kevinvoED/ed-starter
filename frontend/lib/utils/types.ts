import type { GET_CONTENT_TYPE_INDEX_QUERY_RESULT, Link } from "@/sanity.types";

export type NextParams = Promise<{ slug: string }>;

export type NextCatchAllParams = Promise<{ slug: string[] }>;

export type ContentType = "blog-index" | "case-studies-index";

export type ResolvedSanityLinkType = Omit<Link, "href"> & {
  href: string | null;
  _key: string;
};

export type ContentIndexVariant = Extract<
  GET_CONTENT_TYPE_INDEX_QUERY_RESULT,
  { _type: "blog-index" | "case-studies-index" }
>;
