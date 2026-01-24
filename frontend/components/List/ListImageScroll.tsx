"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { SanityImage } from "@/components/Media/SanityImage";
import { PortableText } from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";
import { Progress } from "radix-ui";

type ListImageScrollProps = BlockProps<"list-image-scroll">;

export const ListImageScroll = ({ tabs, eyebrow }: ListImageScrollProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabs?.[0]?.title ?? "");
  const [activeItem, setActiveItem] = useState<string>(
    tabs?.[0]?.items?.[0]?._key ?? "",
  );
  const progressIndicatorRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const currentTabItems =
    tabs?.find((tab) => tab.title === activeTab)?.items ?? [];

  // Initialize image opacity when tab changes
  useEffect(() => {
    const currentItemKeys = new Set(currentTabItems.map((item) => item._key));

    imageRefs.current.forEach((_, key) => {
      if (!currentItemKeys.has(key)) {
        imageRefs.current.delete(key);
      }
    });

    currentTabItems.forEach((item, index) => {
      const imageElement = imageRefs.current.get(item._key);
      if (imageElement) {
        gsap.set(imageElement, {
          opacity: index === 0 ? 1 : 0,
        });
      }
    });
  }, [currentTabItems]);

  // Animate progress indicator based on active item
  useEffect(() => {
    if (!progressIndicatorRef.current || currentTabItems.length === 0) return;

    const activeIndex = currentTabItems.findIndex(
      (item) => item._key === activeItem,
    );

    if (activeIndex === -1) return;
    const progress = ((activeIndex + 1) / currentTabItems.length) * 100;
    const translateY = -(100 - progress);

    const tween = gsap.to(progressIndicatorRef.current, {
      y: `${translateY}%`,
      duration: 0.6,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
  }, [activeItem, currentTabItems]);

  // Animate image transitions based on active item
  useEffect(() => {
    if (imageRefs.current.size === 0) return;

    const tweens: gsap.core.Tween[] = [];

    currentTabItems.forEach((item) => {
      const imageElement = imageRefs.current.get(item._key);
      if (imageElement) {
        const tween = gsap.to(imageElement, {
          opacity: item._key === activeItem ? 1 : 0,
          duration: 0.5,
          ease: "power4.inOut",
        });
        tweens.push(tween);
      }
    });

    return () => {
      tweens.forEach((tween) => {
        tween.kill();
      });
    };
  }, [activeItem, currentTabItems]);

  return (
    <div className="grid-custom bg-black text-white" data-nav-theme="dark">
      <div className="col-span-6 grid auto-rows-max grid-cols-4 gap-x-5 gap-y-15 py-80-120-160 pl-5 lg:grid-cols-6 lg:gap-y-20 lg:pl-6">
        <div className="col-span-full space-y-6 lg:col-start-2">
          {eyebrow && <Eyebrow variant="dot-neon">{eyebrow}</Eyebrow>}

          {tabs && tabs.length > 1 && (
            <div className="flex max-w-fit items-center gap-x-1 rounded-sm bg-gunmetal p-1">
              {tabs?.map((tab) => (
                <button
                  key={tab._key}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.title);
                    const firstItem = tab.items?.[0]?._key ?? "";
                    setActiveItem(firstItem);
                  }}
                  className={cn(
                    "type-mono-1240 !cursor-pointer grid place-items-center rounded-[1px] px-4 py-[2px] uppercase",
                    activeTab === tab.title && "bg-neon text-black",
                  )}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-full grid grid-cols-4 gap-x-5 lg:col-span-6 lg:col-start-2 lg:grid-cols-6">
          <div className="col-span-1 col-start-1 max-h-138 max-w-fit">
            <div className="h-full">
              <Progress.Root
                className="relative h-full w-px overflow-hidden bg-gunmetal"
                style={{
                  transform: "translateZ(0)",
                }}
                value={100}
              >
                <Progress.Indicator
                  ref={progressIndicatorRef}
                  className="size-full bg-neon will-change-transform"
                  style={{ transform: "translateY(0%)" }}
                />
              </Progress.Root>
            </div>
          </div>

          <div className="col-span-full col-start-2 -translate-x-15 lg:col-span-5 lg:col-start-2">
            {tabs
              ?.filter((tab) => tab.title === activeTab)
              .map((tab) => (
                <Accordion.Root
                  key={tab._key}
                  type="single"
                  value={activeItem}
                  onValueChange={setActiveItem}
                  className="item-group space-y-8"
                >
                  {tab?.items?.map((item, index) => (
                    <Accordion.Item
                      data-index={index}
                      value={item._key}
                      key={item._key}
                      className="item"
                    >
                      <Accordion.Trigger>
                        <h3
                          className={cn(
                            "typef-heading-32-48-64 text-left",
                            activeItem !== item._key && "text-charcoal",
                          )}
                        >
                          {item.title}
                        </h3>
                      </Accordion.Trigger>
                      <Accordion.Content className="space-y-4 overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                        {item.description && (
                          <PortableText
                            value={item.description}
                            className="mt-4 3xl:pr-20 lg:text-balance"
                          />
                        )}
                        {item.link && (
                          <Button
                            link={item.link}
                            variant="tertiary-neon"
                            className="pointer-events-auto"
                          >
                            {item.link.title}
                          </Button>
                        )}
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              ))}
          </div>
        </div>
      </div>
      <div className="relative col-span-full hidden h-dvh overflow-hidden lg:col-span-6 lg:block">
        {currentTabItems.map((item) => (
          <div
            key={item._key}
            ref={(el) => {
              if (el) {
                imageRefs.current.set(item._key, el);
              } else {
                imageRefs.current.delete(item._key);
              }
            }}
            className="absolute inset-0 size-full will-change-[opacity]"
          >
            {item.image && (
              <SanityImage
                image={item.image}
                className="size-full object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
