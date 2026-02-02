"use client";

import type { BlogPost } from "@/sanity.types";
import { cn } from "@/lib/utils/cn";

type ContentTopicFilterProps = {
  className?: string;
  posts: BlogPost[];
};

export const ContentTopicFilter = ({ className }: ContentTopicFilterProps) => {
  return <div className={cn("", className)}></div>;
};
