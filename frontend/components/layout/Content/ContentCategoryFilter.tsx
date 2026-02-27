"use client";

import type { GET_CONTENT_TYPE_INDEX_QUERY_RESULT } from "@/sanity.types";
import { parseAsString, useQueryStates } from "nuqs";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { cn } from "@/lib/utils/cn";
import { getFilterItemCount } from "@/lib/utils/filter";

type ContentCategoryFilterProps = {
  className?: string;
  data: NonNullable<
    NonNullable<GET_CONTENT_TYPE_INDEX_QUERY_RESULT>["categoryFilter"]
  >;
};

export const ContentCategoryFilter = ({
  className,
  data,
}: ContentCategoryFilterProps) => {
  // Grab category param from URL
  const [{ category }, setQueryStates] = useQueryStates(
    {
      category: parseAsString.withDefault("none"),
    },
    { shallow: false },
  );

  async function handleClick(item: string) {
    // Set new category param in URL
    await setQueryStates({
      category: item,
    });
  }

  return (
    <nav
      aria-label="Category filter"
      className={cn(
        "flex flex-col gap-3 md:flex-row md:items-center",
        className,
      )}
    >
      <span className="font-bold">Categories:</span>

      <ul className="flex flex-col gap-5 md:flex-row md:flex-wrap">
        <li>
          <button
            type="button"
            onClick={() => handleClick("none")}
            className={category === "none" ? "underline" : ""}
          >
            All ({data.totalPostCount})
          </button>
        </li>

        {data.categories.map((categoryItem) => {
          const { _id, slug, title } = categoryItem;

          return (
            <li key={_id}>
              <button
                type="button"
                onClick={() => handleClick(slug.current)}
                className={cn(
                  "flex items-center gap-x-1.5",
                  category === slug.current && "underline",
                )}
              >
                {title && <PortableText value={title} />}
                <span>
                  ({getFilterItemCount(category, categoryItem, data.categories)}
                  )
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
