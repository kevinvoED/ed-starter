"use client";

import type { RESOURCE_TOPICS_COUNT_QUERYResult } from "@/sanity.types";
import { parseAsString, useQueryStates } from "nuqs";
import { Dot } from "@/components/Dot/Dot";
import { Transition } from "@/components/GSAP/Transition";
import { Icon } from "@/components/Icon/Icon";
import { PostTopicItem } from "@/components/Post/PostTopicItem";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";

type PostTopicFilterProps = {
  className?: string;
  topicCount: RESOURCE_TOPICS_COUNT_QUERYResult;
};

export const PostTopicFilter = ({
  className,
  topicCount,
}: PostTopicFilterProps) => {
  const [{ topic }, setQueryStates] = useQueryStates(
    {
      topic: parseAsString.withDefault("all"),
    },
    { shallow: false },
  );

  async function onSelect(item: string) {
    await setQueryStates({
      topic: item,
    });
  }

  return (
    <>
      <div className="lg:hidden">
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="Topic">
            <Accordion.Trigger className="group grid-custom w-full items-center border-t border-t-alabaster py-3 text-left">
              <Transition className="type-body-1250">Topic</Transition>
              <Transition className="type-mono-1240 col-span-3 flex items-center gap-2.5 whitespace-pre-wrap uppercase">
                <Dot color="black" />
                <span>{topic}</span>
                <span>
                  [
                  {topic === "all" || !topic
                    ? topicCount.totalTopicCount
                    : topicCount.currentTopicPostCount}
                  ]
                </span>
              </Transition>
              <Transition className="col-start-[-1] ml-auto rotate-45 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-0">
                <Icon
                  variant="category-x"
                  strokeWidth={0.2}
                  className="size-2.5 rotate-45 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90"
                />
              </Transition>
            </Accordion.Trigger>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
              <div className="flex flex-col gap-2 pb-10">
                <PostTopicItem
                  _id="all"
                  title="All"
                  slug={null}
                  topicCount={topicCount}
                  logo={null}
                />

                {topicCount.topics?.map((topic) => (
                  <PostTopicItem
                    key={topic._id}
                    {...topic}
                    topicCount={topicCount}
                    logo={null}
                  />
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>

      <aside
        className={cn(
          "col-span-2 row-start-2 hidden space-y-4 lg:block",
          className,
        )}
      >
        <Transition className="flex items-center justify-between">
          <h3 className="type-body-1250">Topic</h3>
          <button type="button" onClick={() => onSelect("all")}>
            <Icon variant="category-x" strokeWidth={0.2} className="size-3" />
          </button>
        </Transition>

        <div className="flex flex-col gap-2">
          <Transition>
            <PostTopicItem
              _id="all"
              title="All"
              slug={null}
              topicCount={topicCount}
              logo={null}
            />
          </Transition>
          {topicCount.topics?.map((topic, index) => (
            <Transition key={topic._id} delay={index * 0.1}>
              <PostTopicItem {...topic} topicCount={topicCount} logo={null} />
            </Transition>
          ))}
        </div>
      </aside>
    </>
  );
};
