import type { Link } from "@/sanity.types";

export type SanityLinkType = Omit<Link, "href"> & {
  href: string | null;
  _key: string;
};
