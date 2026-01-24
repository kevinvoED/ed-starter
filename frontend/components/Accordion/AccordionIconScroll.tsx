"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";
import { ScrollTrigger } from "gsap/all";

type Props = {
  // biome-ignore lint/suspicious/noExplicitAny: items
  items: any[];
  columns?: 5 | 7;
  style?: "light" | "dark";
  onActiveChange?: (activeKey: string) => void;
};

export const AccordionIconScroll = ({
  items,
  columns = 7,
  style = "light",
  onActiveChange,
}: Props) => {
  if (!items || items.length === 0) {
    return null;
  }

  const [activeItem, setActiveItem] = useState<string>(items?.[0]?._key ?? "");

  const accordionContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  const lastItemKey = items[items.length - 1]?._key ?? "";

  const isNarrow = columns === 5;
  const isDark = style === "dark";

  useGSAP(() => {
    if (!accordionContainerRef.current) {
      return;
    }

    items.forEach((item, index) => {
      const itemElement = itemRefs.current.get(item._key);

      if (!itemElement) {
        return;
      }

      const isFirstItem = index === 0;
      const isLastItem = index === items.length - 1;

      ScrollTrigger.create({
        trigger: itemElement,
        start: "top-=600px top",
        end: "bottom-=600px top",
        scrub: 1,
        onEnter: () => {
          setActiveItem(item._key);
          onActiveChange?.(item._key);
        },
        onEnterBack: () => {
          setActiveItem(item._key);
          onActiveChange?.(item._key);
        },
        onLeaveBack: isFirstItem
          ? () => {
              setActiveItem("");
              onActiveChange?.("");
            }
          : undefined,
        onLeave: isLastItem
          ? () => {
              setActiveItem(lastItemKey);
              onActiveChange?.(item._key);
            }
          : undefined,
      });
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [items, lastItemKey]);

  const newLocal =
    "[&_p]:!type-body-1440 col-span-full col-start-3 w-full text-gunmetal lg:col-start-3 [&_p]:mb-0 [&_p]:text-balance py-11";
  return (
    <div
      ref={accordionContainerRef}
      className="sticky top-20 col-span-full self-start lg:col-span-8 lg:col-start-6"
    >
      <Accordion.Root
        type="single"
        value={activeItem}
        onValueChange={setActiveItem}
      >
        {items.map((item, index) => (
          <Accordion.Item
            ref={(el) => {
              if (el) {
                itemRefs.current.set(item._key, el);
              } else {
                itemRefs.current.delete(item._key);
              }
            }}
            data-index={index}
            disabled={true}
            value={item._key}
            key={item._key}
            className="pointer-events-none pb-20-40-60"
          >
            <Accordion.Trigger
              className={cn(
                "pointer-events-none grid w-full items-center gap-x-0 border-t border-t-alabaster pt-5 sm:items-start",
                isNarrow ? "grid-cols-5 gap-x-6" : "grid-cols-7",
                isDark && "border-t-gunmetal",
              )}
            >
              <div className="type-mono-1240 col-span-1 text-left">
                0{index + 1}
              </div>

              {item.logo && (
                <SanityImage
                  image={item.logo}
                  sizes="(max-width: 1024px) 24px, 48px"
                  className="col-span-1 size-6 object-contain lg:size-12"
                />
              )}

              {item.title && (
                <h3
                  className={cn(
                    "typef-heading-20-24-32 text-left",
                    isNarrow ? "col-span-3" : "3xl:col-span-3 col-span-5",
                  )}
                >
                  <PortableTextFragment value={item.title} />
                </h3>
              )}
            </Accordion.Trigger>

            <Accordion.Content
              className={cn(
                "grid w-full gap-x-0 overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
                isNarrow ? "grid-cols-5 gap-x-6" : "grid-cols-7",
              )}
            >
              <div
                className={cn(
                  newLocal,
                  isNarrow ? "lg:col-span-3" : "lg:col-span-4",
                  isDark && "text-white",
                )}
              >
                {item.description && <PortableText value={item.description} />}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};
