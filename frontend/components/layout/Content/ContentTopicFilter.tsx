"use client";

import type { GET_CONTENT_TYPE_INDEX_QUERY_RESULT } from "@/sanity.types";
import { parseAsString, useQueryStates } from "nuqs";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { cn } from "@/lib/utils/cn";
import { getFilterItemCount } from "@/lib/utils/filter";

type ContentTopicFilterProps = {
  className?: string;
  data: NonNullable<
    NonNullable<GET_CONTENT_TYPE_INDEX_QUERY_RESULT>["topicFilter"]
  >;
};

export const ContentTopicFilter = ({
  data,
  className,
}: ContentTopicFilterProps) => {
  // Grab topic param from URL
  const [{ topic }, setQueryStates] = useQueryStates(
    {
      topic: parseAsString.withDefault("none"),
    },
    { shallow: false },
  );

  async function handleClick(item: string) {
    // Set new topic param in URL
    await setQueryStates({
      topic: item,
    });
  }

  return (
    <nav
      aria-label="Topic filter"
      className={cn(
        "flex flex-col gap-3 md:flex-row md:items-center",
        className,
      )}
    >
      <span className="font-bold">Topics:</span>

      <ul className="flex flex-col gap-5 md:flex-row md:flex-wrap">
        <li>
          <button
            type="button"
            onClick={() => handleClick("none")}
            className={topic === "none" ? "underline" : ""}
          >
            All ({data.totalPostCount})
          </button>
        </li>

        {data["content-topics"].map((item) => {
          const { _id, slug, title } = item;

          return (
            <li key={_id}>
              <button
                type="button"
                onClick={() => handleClick(slug.current)}
                className={cn(
                  "flex items-center gap-x-1.5",
                  topic === slug.current && "underline",
                )}
              >
                {title && <PortableText value={title} />}
                <span>
                  ({getFilterItemCount(topic, item, data["content-topics"])})
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
