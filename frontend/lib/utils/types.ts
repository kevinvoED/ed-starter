import type { Link } from "@/sanity.types";

export type NextParams = Promise<{ slug: string }>;

export type ResolvedSanityLinkType = Omit<Link, "href"> & {
  href: string | null;
  _key: string;
};
