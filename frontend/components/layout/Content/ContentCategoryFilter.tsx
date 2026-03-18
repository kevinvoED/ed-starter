"use client";

import type { GET_CONTENT_TYPE_INDEX_QUERY_RESULT } from "@/sanity.types";
import { parseAsString, useQueryStates } from "nuqs";
import { Button } from "@/components/primitives/Button/Button";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { cn } from "@/lib/utils/cn";

type ContentCategoryFilterProps = {
  className?: string;
  data: NonNullable<
    NonNullable<GET_CONTENT_TYPE_INDEX_QUERY_RESULT>["filters"]
  >;
};

export const ContentCategoryFilter = ({
  className,
  data,
}: ContentCategoryFilterProps) => {
  if (!data) return null;

  const { defaults, categories } = data;

  const [{ category }, setQueryStates] = useQueryStates(
    {
      category: parseAsString.withDefault(defaults.label),
    },
    { shallow: false },
  );

  async function handleClick(item: string) {
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
      <h4 className="font-bold">{categories.label}</h4>

      <ul className="flex flex-col gap-5 md:flex-row md:flex-wrap">
        <li>
          <Button
            onClick={() => handleClick(defaults.label)}
            className={category === defaults.label ? "underline" : ""}
          >
            {defaults.label} ({defaults.count})
          </Button>
        </li>

        {data.categories.items.map((item) => {
          const { _id, slug, title, count } = item;

          return (
            <li key={_id}>
              <Button
                onClick={() => handleClick(slug.current)}
                className={cn(
                  "flex items-center gap-x-1.5",
                  category === slug.current && "underline",
                )}
              >
                {title && <PortableText value={title} />}
                {count && <span>({count})</span>}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
