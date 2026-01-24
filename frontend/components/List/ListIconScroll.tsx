"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useRef } from "react";
import { AccordionIconScroll } from "@/components/Accordion/AccordionIconScroll";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";

type ListIconScrollProps = BlockProps<"list-icon-scroll">;

export const ListIconScroll = ({
  eyebrow,
  title,
  description,
  items,
}: ListIconScrollProps) => {
  if (!items || items.length === 0) {
    return null;
  }
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="grid-custom relative gap-y-15 p-custom pt-80-140-220 pb-60-100-220 lg:gap-y-0"
      data-nav-theme="light"
    >
      <div className="4xl:col-span-3 col-span-full space-y-6 self-start lg:sticky lg:top-20 lg:col-span-4 lg:space-y-8">
        <div className="space-y-4">
          {eyebrow && <Eyebrow variant="dot-black">{eyebrow}</Eyebrow>}
          {title && (
            <h2 className="typef-heading-32-48-64 text-balance">
              <PortableTextFragment value={title} />
            </h2>
          )}
        </div>
        {description && (
          <PortableText
            value={description}
            className="lg:text-balance lg:pr-[6vw]"
          />
        )}
      </div>
      <AccordionIconScroll items={items} />
    </div>
  );
};
