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
  const [{ topic }, setQueryStates] = useQueryStates(
    {
      topic: parseAsString.withDefault("none"),
    },
    { shallow: false },
  );

  async function onSelect(item: string) {
    await setQueryStates({
      topic: item,
    });
  }

  return (
    <div className={cn("", className)}>
      <ul className="flex flex-wrap gap-x-10">
        <div>Topics: </div>

        <button type="button" onClick={() => onSelect("none")}>
          All ({data.totalPostCount})
        </button>

        {data["content-topics"].map((topicItem) => (
          <li key={topicItem._id}>
            <button
              type="button"
              onClick={() => onSelect(topicItem.slug.current)}
              className="flex items-center gap-x-1.5"
            >
              <PortableText value={topicItem.title} />
              <span>
                {getFilterItemCount(topic, topicItem, data["content-topics"])}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
