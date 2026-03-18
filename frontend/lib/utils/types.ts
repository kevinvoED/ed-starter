import type { Link } from "@/sanity.types";

export type NextParams = Promise<{ slug: string }>;

export type ContentType = "blog-index" | "case-studies-index";

export type ResolvedSanityLinkType = Omit<Link, "href"> & {
  href: string | null;
  _key: string;
};
