"use client";

import type { GET_CONTENT_TYPE_INDEX_QUERY_RESULT } from "@/sanity.types";
import { Button } from "@/components/primitives/Button/Button";
import { PortableTextFragment } from "@/components/primitives/PortableText/PortableText";
import { cn } from "@/lib/utils/cn";

type ContentCategoryFilterProps = {
  className?: string;
  data: NonNullable<
    NonNullable<GET_CONTENT_TYPE_INDEX_QUERY_RESULT>["categoryFilter"]
  >;
};

export const ContentCategoryFilter = ({
  data,
  className,
}: ContentCategoryFilterProps) => {
  return (
    <div className={cn("", className)}>
      <ul className="flex flex-wrap gap-x-10">
        {data.categories.map((category) => (
          <li key={category._id}>
            <Button href={`${category.slug}`} variant="ghost" hasArrow={false}>
              <PortableTextFragment value={category.title} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
