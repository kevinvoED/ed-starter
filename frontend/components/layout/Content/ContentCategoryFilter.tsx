"use client";

import type { GET_CONTENT_TYPE_INDEX_QUERY_RESULT } from "@/sanity.types";
import { parseAsString, useQueryStates } from "nuqs";
import { PortableTextFragment } from "@/components/primitives/PortableText/PortableText";
import { cn } from "@/lib/utils/cn";
import { getFilterItemCount } from "@/lib/utils/filter";

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
  const [{ category }, setQueryStates] = useQueryStates(
    {
      category: parseAsString.withDefault("none"),
    },
    { shallow: false },
  );

  async function onSelect(item: string) {
    await setQueryStates({
      category: item,
    });
  }

  return (
    <div className={cn("", className)}>
      <ul className="flex flex-wrap gap-x-10">
        <div>Categories: </div>

        <button type="button" onClick={() => onSelect("none")}>
          All ({data.totalPostCount})
        </button>

        {data.categories.map((categoryItem) => (
          <li key={categoryItem._id}>
            <button
              type="button"
              onClick={() => onSelect(categoryItem.slug.current)}
              className="flex items-center gap-x-1.5"
            >
              <PortableTextFragment value={categoryItem.title} />
              <span>
                {getFilterItemCount(category, categoryItem, data.categories)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
