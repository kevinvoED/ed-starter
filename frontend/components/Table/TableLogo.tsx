import type { BlockProps } from "@/sanity/lib/fetch";
import { Dot } from "@/components/Dot/Dot";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

type TableLogoProps = BlockProps<"table-logo">;

type TableLogoCellProps = {
  row: TableLogoProps["rows"][0];
  index: number;
  emptyCellsNeeded: number;
};

const TableLogoCell: React.FC<
  TableLogoCellProps & React.HTMLAttributes<HTMLDivElement>
> = ({ index, row, emptyCellsNeeded }) => {
  const ratio = row.image.asset?.metadata?.dimensions
    ? row.image.asset?.metadata?.dimensions?.width /
      row.image.asset?.metadata?.dimensions?.height
    : 3;

  return (
    <Fragment>
      <Transition
        delay={0.1 * index + 1}
        key={`${row._key}-cells`}
        className="contents *:border-alabaster *:border-b *:border-solid [&>:not(:first-child)]:pl-3"
      >
        <Transition
          delay={0}
          key={`${row._key}-logo`}
          className="col-span-full bg-platinum lg:col-span-2"
        >
          {row.image?.asset && (
            <SanityImage
              image={row.image}
              sizes="96px"
              className={cn(
                "w-full object-scale-down mix-blend-multiply grayscale-100",
                ratio > 3.5 ? "max-w-32 lg:max-w-3/5" : "max-w-24 lg:max-w-2/5",
                row.invert && "invert",
              )}
            />
          )}
        </Transition>
        {row?.cells?.map((cell, index) => {
          return (
            <Transition
              delay={0.1 * index}
              key={cell._key}
              className="[&_ul]:!mb-0 col-span-full pb-12 text-left lg:col-span-3 lg:last-of-type:col-span-4"
            >
              {cell.content && (
                <p className="type-body-1440">
                  <PortableText
                    value={cell.content}
                    style="fragment"
                    dotSize="sm"
                  />
                </p>
              )}
            </Transition>
          );
        })}
        {Array.from({ length: emptyCellsNeeded }).map((_, index) => (
          <div
            key={`empty-${row._key}-${index}`}
            className="col-span-3 pb-12 text-left"
            aria-hidden="true"
          />
        ))}
      </Transition>
    </Fragment>
  );
};

export const TableLogo = ({
  eyebrow,
  title,
  description,
  columns,
  rows,
}: TableLogoProps) => {
  return (
    <div
      className="grid-custom gap-y-15 p-custom py-80-140-220 lg:gap-y-25"
      data-nav-theme="light"
    >
      <div className="grid-custom col-span-full gap-y-6 lg:gap-y-0">
        <div className="grid-custom col-span-full gap-y-4 lg:row-start-1">
          {eyebrow && (
            <Transition className="col-span-full">
              <Eyebrow variant="dot-black">{eyebrow}</Eyebrow>
            </Transition>
          )}

          {title && (
            <Transition className="col-span-full lg:col-span-6">
              <h2 className="typef-heading-32-48-64">
                <PortableTextFragment value={title} />
              </h2>
            </Transition>
          )}
        </div>

        {description && (
          <Transition className="col-span-full lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-end">
            <PortableText value={description} />
          </Transition>
        )}
      </div>

      <div className="grid-custom col-span-full gap-x-0 gap-y-6 *:border-alabaster *:border-b *:border-solid [&>:not(:first-child)]:pl-3">
        {columns?.map((column, index) => (
          <Transition
            delay={0.05 * index + 1}
            key={column._key}
            // the "last" column is the one that is before an element that is the first row cell (.contents)
            className="type-mono-1440 peer col-span-3 pb-5 text-left uppercase lg:first:col-span-2 lg:[&:has(+.contents)]:col-span-4 [&>:not(:first-child)]:pl-3"
          >
            <h3>
              {String(column.label).trim() ? (
                String(column.label).trim()
              ) : (
                <Dot color={"black"} />
              )}
            </h3>
          </Transition>
        ))}

        {rows?.map((row, index) => {
          const columnCount = columns?.length ?? 0;
          const cellCount = (row?.cells?.length ?? 0) + 1;
          const emptyCellsNeeded = Math.max(0, columnCount - cellCount);

          return (
            <TableLogoCell
              key={row._key}
              row={row}
              index={index}
              emptyCellsNeeded={emptyCellsNeeded}
            />
          );
        })}
      </div>
    </div>
  );
};
