import type { BlockProps } from "@/sanity/lib/fetch";
import { CheckIcon } from "lucide-react";
import { Dot } from "@/components/Dot/Dot";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { PortableTextFragment } from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type TableDataFeedProps = BlockProps<"table-data-feed">;

export const TableDataFeed = ({
  eyebrow,
  title,
  description,
  columns,
  rows,
}: TableDataFeedProps) => {
  return (
    <div
      className="grid-custom gap-y-15 bg-black p-custom py-60-120-220 text-white lg:gap-y-20"
      data-nav-theme="dark"
    >
      <div className="grid-custom col-span-full gap-y-6 lg:gap-y-0">
        <div className="grid-custom col-span-full gap-y-4 lg:row-start-1">
          {eyebrow && (
            <Transition className="col-span-full">
              <Eyebrow variant="dot-neon">{eyebrow}</Eyebrow>
            </Transition>
          )}
          {title && (
            <Transition className="col-span-full lg:col-span-4 lg:row-start-2">
              <h2 className="typef-heading-32-48-64">
                <PortableTextFragment value={title} />
              </h2>
            </Transition>
          )}
        </div>
        {description && (
          <Transition className="type-body-1440 col-span-full self-end lg:col-span-4 lg:col-start-5 lg:row-start-1">
            <PortableTextFragment value={description} />
          </Transition>
        )}
      </div>

      <div className="col-span-full lg:hidden">
        <div className="grid-custom col-span-full border-gunmetal border-t border-dashed">
          {rows?.map((row) => (
            <Transition
              key={row._key}
              className="grid-custom col-span-full gap-y-6 border-gunmetal border-b py-6"
            >
              {row.label && (
                <h3 className="type-body-1450 col-span-full">{row.label}</h3>
              )}

              {columns?.length >= 2 && (
                <div className="col-span-full space-y-2">
                  {columns.map((column, index) => {
                    const cellTypeIsPlainText =
                      row.cells?.[index]?.cellType === "plain-text";
                    const cellTypeIsCheckmark =
                      row.cells?.[index]?.cellType === "checkmark";
                    const cellTypeIsEmpty =
                      row.cells?.[index]?.cellType === "empty";

                    return (
                      <div
                        key={column._key}
                        className="col-span-full grid grid-cols-4 gap-x-5"
                      >
                        {column.label && (
                          <h3 className="type-mono-1240 col-span-2 uppercase">
                            {column.label}
                          </h3>
                        )}
                        <div className="col-span-2 ml-auto text-right">
                          {cellTypeIsPlainText &&
                            row.cells?.[index].content && (
                              <p className="type-body-1440">
                                <PortableTextFragment
                                  value={row.cells[index].content}
                                />
                              </p>
                            )}
                          {cellTypeIsCheckmark && (
                            <CheckIcon className="h-5 w-5 text-neon" />
                          )}
                          {cellTypeIsEmpty && null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Transition>
          ))}
        </div>
      </div>

      <div className="col-span-full hidden lg:block">
        <div className="grid-custom lg:gap-y-0">
          <Transition className="grid-custom col-span-full border-gunmetal border-b border-dashed lg:pb-6.5">
            <Dot color="neon" className="col-span-4" />
            {columns?.map((column) => (
              <h3
                key={column._key}
                className="type-mono-1240 col-span-2 uppercase"
              >
                {column.label}
              </h3>
            ))}
          </Transition>

          {rows?.map((row, index) => (
            <Transition
              delay={0.1 * index + 0.1}
              key={row._key}
              className="grid-custom col-span-full border-gunmetal border-b lg:pt-6 lg:pb-4"
            >
              {row.label && (
                <div
                  className={cn(
                    "col-span-4",
                    row.styling === "indented" && "pl-8",
                  )}
                >
                  <h3 className="type-body-1450">{row.label}</h3>
                </div>
              )}

              {row.cells?.map((cell) => {
                const cellTypeIsPlainText = cell.cellType === "plain-text";
                const cellTypeIsCheckmark = cell.cellType === "checkmark";
                const cellTypeIsEmpty = cell.cellType === "empty";

                return (
                  <div key={cell._key} className="col-span-2">
                    {cellTypeIsPlainText && cell.content && (
                      <p className="type-body-1440">
                        <PortableTextFragment value={cell.content} />
                      </p>
                    )}
                    {cellTypeIsCheckmark && (
                      <CheckIcon className="h-5 w-5 text-neon" />
                    )}
                    {cellTypeIsEmpty && null}
                  </div>
                );
              })}
            </Transition>
          ))}
        </div>
      </div>
    </div>
  );
};
