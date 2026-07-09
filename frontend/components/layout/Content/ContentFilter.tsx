"use client";

import type { ContentIndexVariant } from "@/lib/utils/types";
import { Separator } from "@base-ui/react";
import { parseAsString, useQueryStates } from "nuqs";
import { Icon } from "@/components/primitives/Icon/Icon";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { Checkbox } from "@base-ui/react/checkbox";
import { cn } from "cnfast";

type ContentFilterProps = {
  data: ContentIndexVariant["filters"];
  className?: string;
};

export const ContentFilter = ({ data, className }: ContentFilterProps) => {
  return (
    <nav
      aria-label="Category and topic filter"
      className={cn(
        "md:grid-custom col-span-full flex flex-col gap-10 xl:col-span-2 xl:flex xl:flex-col",
        className,
      )}
    >
      {data.categories && data.categories.items.length > 0 && (
        <ContentFilterItem data={data} queryKey="category" />
      )}
      {data.topics && data.topics.items.length > 0 && (
        <ContentFilterItem data={data} queryKey="topic" />
      )}
    </nav>
  );
};

type ContentFilterItemProps = {
  data: ContentIndexVariant["filters"];
  queryKey: "category" | "topic";
  className?: string;
};

/*
 * This component is used to render a list of filter items for a given query key.
 * The query key can either be "category", "topic", or edited to support any other query param keys.
 * Clicking on a filter item will update the query state, which in turn filters content down further.
 * Currently, filtering is 1-dimensional per query key, but you can filter by multiple query keys.
 * Note that some labels are dynamic and can be edited inside GET_CONTENT_TYPE_INDEX_QUERY.
 */
export const ContentFilterItem = ({
  data,
  queryKey,
  className,
}: ContentFilterItemProps) => {
  if (!data) return null;

  const { defaults } = data;
  const filterData = queryKey === "category" ? data.categories : data.topics;

  const [queryState, setQueryStates] = useQueryStates(
    { [queryKey]: parseAsString.withDefault(defaults.label) },
    { shallow: false },
  );

  const activeValue = queryState[queryKey];

  async function handleClick(item: string) {
    await setQueryStates({ [queryKey]: item });
  }

  const allItems = [
    {
      id: "default",
      value: defaults.label,
      count: defaults.count,
      renderLabel: () => <>{defaults.label}</>,
    },
    ...filterData.items.map(({ _id, slug, title, count }) => ({
      id: _id,
      value: slug.current,
      count,
      renderLabel: () => (title ? <PortableText value={title} /> : null),
    })),
  ];

  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:col-span-2 lg:col-span-6",
        className,
      )}
    >
      <h4 className="font-semibold">{filterData.label}</h4>

      <Separator className="h-px bg-black/20" />

      <ul className="flex flex-col gap-2.5">
        {allItems.map(({ id, value, count, renderLabel }) => (
          <li
            key={id}
            onClick={() => handleClick(value)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && handleClick(value)
            }
            className="flex cursor-pointer items-center gap-2.5"
          >
            <Checkbox.Root
              checked={activeValue === value}
              onCheckedChange={() => handleClick(value)}
              onClick={(e) => e.stopPropagation()}
              className="size-4 border border-black/50 bg-transparent focus-visible:outline-2 focus-visible:outline-debug-blue focus-visible:outline-offset-2 data-checked:bg-debug-blue data-checked:text-white"
            >
              <Checkbox.Indicator className="flex data-unchecked:hidden">
                <Icon variant="check" className="text-white" strokeWidth={2} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className="ftype type-body-1440 flex items-center gap-x-1.5 to-type-body-1640">
              {renderLabel()}
              {count && <span>({count})</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
