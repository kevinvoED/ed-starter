import type { Link } from "@/sanity.types";

export type ResolvedSanityLinkType = Omit<Link, "href"> & {
  href: string | null;
  _key: string;
};
