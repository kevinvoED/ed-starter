import type { Slug } from "@/sanity.types";
import { isValidElement, type ReactElement, type ReactNode } from "react";
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

export function getResourcePostSize(index: number) {
  const FULL_WIDTH_INDICES = [6, 12];
  const LARGE_INDICES = [4, 5, 10, 11];

  if (FULL_WIDTH_INDICES.includes(index)) {
    return { variant: "full" as const, className: "col-span-full" };
  }
  if (LARGE_INDICES.includes(index)) {
    return {
      variant: "large" as const,
      className: "col-span-full lg:col-span-3",
    };
  }
  return {
    variant: "small" as const,
    className: "col-span-full lg:col-span-2",
  };
}

export const createPageUrl = ({
  route,
  pageNum,
  category,
  topic,
}: {
  route: "blog" | "case-studies" | "resources" | "events";
  pageNum: number;
  category?: string;
  topic?: string;
}) => {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (topic) params.set("topic", topic);
  if (pageNum > 1) params.set("page", pageNum.toString());
  return `/${route}${params.toString() ? `?${params.toString()}` : ""}`;
};

export const getHref = (
  route: "blog" | "case-studies" | "resources" | "events",
) => {
  switch (route) {
    case "blog":
      return "/blog";
    case "case-studies":
      return "/case-studies";
    case "resources":
      return "/resources";
    case "events":
      return "/events";
  }
};

export const getTextFromChildren = (children: ReactNode): string => {
  if (children == null) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);

  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).filter(Boolean).join(" ");
  }

  if (isValidElement(children)) {
    const element = children as ReactElement<{ children?: ReactNode }>;
    if (element.props?.children) {
      return getTextFromChildren(element.props.children);
    }
  }

  return "";
};
