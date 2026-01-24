import type { BlockProps } from "@/sanity/lib/fetch";
import { DriverListItem } from "@/components/Driver/DriverListItem";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type DriverListProps = BlockProps<"driver-list">;

export const DriverList = ({
  eyebrow,
  title,
  description,
  items,
}: DriverListProps) => {
  return (
    <div
      className="grid-custom gap-y-10 bg-white p-custom py-80-140-220 text-black lg:gap-y-0"
      data-nav-theme="light"
    >
      <div
        className={cn(
          "col-span-full",
          description ? "lg:col-span-5" : "lg:col-span-3",
        )}
      >
        {eyebrow && (
          <Transition className="lg:mb-4">
            <Eyebrow variant="dot-black">{eyebrow}</Eyebrow>
          </Transition>
        )}
        <Transition>
          {title && (
            <h2 className="typef-heading-32-48-64 text-balance">
              <PortableTextFragment value={title} />
            </h2>
          )}
        </Transition>
        {description && (
          <Transition>
            <PortableText
              value={description}
              className="lg:mt-10 lg:max-w-[50ch] lg:text-balance"
            />
          </Transition>
        )}
      </div>

      <ul
        className={cn(
          "col-span-full",
          description
            ? "lg:col-span-6 lg:col-start-7"
            : "lg:-col-span-8 lg:col-start-5",
        )}
      >
        {items?.map((item, index) => (
          <li key={item._key} className="group">
            {item.link && (
              <DriverListItem
                link={item.link}
                eyebrow={item.eyebrow}
                size={description ? "sm" : "lg"}
                className={`border-alabaster border-b ${index === items.length - 1 ? "border-b-0" : ""}`}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
