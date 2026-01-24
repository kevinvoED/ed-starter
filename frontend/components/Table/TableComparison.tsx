import type { BlockProps } from "@/sanity/lib/fetch";
import { Dot } from "@/components/Dot/Dot";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { Tabs } from "radix-ui";
import { Fragment } from "react/jsx-runtime";

type TableComparisonProps = BlockProps<"table-comparison">;

export const TableComparison = ({
  eyebrow,
  title,
  description,
  columns,
  rows,
}: TableComparisonProps) => {
  return (
    <div className="py-80-140-220" data-nav-theme="light">
      <div className="p-custom lg:space-y-20">
        <div className="grid-custom col-span-full gap-y-6 lg:gap-y-4">
          {eyebrow && (
            <Transition className="col-span-full">
              <Eyebrow variant="dot-black">{eyebrow}</Eyebrow>
            </Transition>
          )}

          {title && (
            <Transition className="col-span-full text-balance lg:col-span-5">
              <h2 className="typef-heading-32-48-64">
                <PortableTextFragment value={title} />
              </h2>
            </Transition>
          )}

          {description && (
            <Transition className="col-span-full text-balance lg:col-span-4 lg:col-start-7">
              <PortableText value={description} />
            </Transition>
          )}
        </div>

        <div className="grid-custom col-span-full hidden gap-x-0 gap-y-6 lg:grid">
          <div className="grid-custom z-10 col-span-full gap-x-0 bg-platinum lg:sticky lg:top-16">
            {columns?.map((column, index) => (
              <Transition
                delay={0.05 * index}
                key={column._key}
                className="type-mono-1440 col-span-3 border-silver border-b border-dashed py-5 text-left uppercase"
              >
                <h3>{column.label}</h3>
              </Transition>
            ))}
          </div>

          {rows?.map((row, index) => {
            const columnCount = columns?.length ?? 0;
            const cellCount = row?.cells?.length ?? 0;
            const emptyCellsNeeded = Math.max(0, columnCount - cellCount);

            return (
              <Fragment key={row._key}>
                {/* Category heading row */}
                <Transition
                  delay={0.1 * index}
                  key={`${row._key}-category`}
                  className="z-5 col-span-full"
                >
                  <h4 className="typef-heading-20-24-32">{row.category}</h4>
                </Transition>

                {/* Cell content row */}
                <Transition
                  delay={0.1 * index}
                  key={`${row._key}-cells`}
                  className="contents"
                >
                  {row?.cells?.map((cell, index) => {
                    return (
                      <Transition
                        delay={0.1 * index}
                        key={cell._key}
                        className="[&_ul]:!mb-0 [&_*]:type-body-1440 col-span-3 border-silver border-b border-dashed pr-7.5 pb-12 text-left [&_li]:mb-3"
                      >
                        {cell.content && (
                          <PortableText
                            value={cell.content}
                            style="module"
                            dotSize="sm"
                          />
                        )}
                      </Transition>
                    );
                  })}
                  {Array.from({ length: emptyCellsNeeded }).map((_, index) => (
                    <div
                      key={`empty-${row._key}-${index}`}
                      className="col-span-3 border-silver border-b border-dashed pb-12 text-left"
                      aria-hidden="true"
                    />
                  ))}
                </Transition>
              </Fragment>
            );
          })}
        </div>
      </div>

      <Tabs.Root
        defaultValue={rows?.[0]?.category}
        className="col-span-full mt-15 pl-6 lg:hidden"
      >
        <Tabs.List className="flex gap-3 overflow-x-auto">
          {rows?.map((row) => {
            return (
              <Tabs.Trigger
                key={`${row._key}-category`}
                className="flex flex-1 cursor-default select-none items-center justify-center gap-2.5 py-px pr-1 pl-1.5 leading-none outline-none data-[state=active]:bg-neon data-[state=active]:focus:relative"
                value={row.category}
              >
                <Dot color="black" />
                <h4 className="type-heading-2030 whitespace-nowrap">
                  {row.category}
                </h4>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {rows?.map((row) => {
          return (
            <Tabs.Content
              key={row._key}
              value={row.category}
              className="mt-10 space-y-10 pr-6"
            >
              {columns?.map((column, columnIndex) => {
                const cell = row?.cells?.[columnIndex];

                return (
                  <Transition
                    key={column._key}
                    delay={0.1 * columnIndex}
                    className="col-span-3 space-y-4"
                  >
                    <h3 className="type-mono-1440 uppercase">{column.label}</h3>
                    {cell?.content && (
                      <Transition
                        delay={0.15 + 0.05 * columnIndex}
                        className="[&_*]:type-body-1440 col-span-3 [&_li]:mb-3 [&_ul]:mb-0"
                      >
                        <PortableText value={cell.content} />
                      </Transition>
                    )}
                  </Transition>
                );
              })}
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </div>
  );
};
