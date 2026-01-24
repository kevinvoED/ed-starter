"use client";

import type { RESOURCE_CATEGORY_COUNT_QUERYResult } from "@/sanity.types";
import { parseAsString, useQueryStates } from "nuqs";
import { Dot } from "@/components/Dot/Dot";
import { Transition } from "@/components/GSAP/Transition";
import { Icon } from "@/components/Icon/Icon";
import { PostCategoryItem } from "@/components/Post/PostCategoryItem";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";

type PostCategoryFilterProps = {
  className?: string;
  route: "blog" | "case-studies" | "resources";
  categoriesCount: RESOURCE_CATEGORY_COUNT_QUERYResult;
};

export const PostCategoryFilter = ({
  className,
  route,
  categoriesCount,
}: PostCategoryFilterProps) => {
  const [{ category }, setQueryStates] = useQueryStates(
    {
      category: parseAsString.withDefault("all"),
    },
    { shallow: false },
  );

  async function onSelect(item: string) {
    await setQueryStates({
      category: item,
    });
  }

  const getCategoryTitle = (route: "blog" | "case-studies" | "resources") => {
    if (route === "case-studies") {
      return "Industry";
    }
    if (route === "resources") {
      return "Type";
    }
    return "Topic";
  };

  return (
    <>
      <div className="lg:hidden">
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value={getCategoryTitle(route)}>
            <Accordion.Trigger className="group grid-custom w-full items-center border-t border-t-alabaster py-3 text-left">
              <Transition className="type-body-1250">
                {getCategoryTitle(route)}
              </Transition>
              <Transition className="type-mono-1240 col-span-3 flex items-center gap-2.5 whitespace-pre-wrap uppercase">
                <Dot color="black" />
                <span>{category}</span>
                <span>
                  [
                  {category === "all" || !category
                    ? categoriesCount.totalPostCount
                    : categoriesCount.currentCategoryPostCount}
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
                <PostCategoryItem
                  _id="all"
                  title="All"
                  slug={null}
                  categoriesCount={categoriesCount}
                  logo={null}
                />

                {categoriesCount.categories?.map((category) => (
                  <PostCategoryItem
                    key={category._id}
                    {...category}
                    categoriesCount={categoriesCount}
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
          <h3 className="type-body-1250">{getCategoryTitle(route)}</h3>
          <button type="button" onClick={() => onSelect("all")}>
            <Icon variant="category-x" strokeWidth={0.2} className="size-3" />
          </button>
        </Transition>

        <div className="flex flex-col gap-2">
          <Transition>
            <PostCategoryItem
              _id="all"
              title="All"
              slug={null}
              categoriesCount={categoriesCount}
              logo={null}
            />
          </Transition>
          {categoriesCount.categories?.map((category, index) => (
            <Transition key={category._id} delay={index * 0.05}>
              <PostCategoryItem
                {...category}
                categoriesCount={categoriesCount}
                logo={null}
              />
            </Transition>
          ))}
        </div>
      </aside>
    </>
  );
};
