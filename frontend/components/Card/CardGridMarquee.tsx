"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button/Button";
import { Transition } from "@/components/GSAP/Transition";
import { Icon } from "@/components/Icon/Icon";
import { InfiniteTextMarquee } from "@/components/Marquee/InfiniteTextMarquee";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";
import { SplitText } from "gsap/all";

type CardGridMarqueeProps = BlockProps<"card-grid-marquee">;

export const CardGridMarquee = ({
  title,
  marquee,
  cards,
  link,
}: CardGridMarqueeProps) => {
  const pathname = usePathname();
  const [lineCounts, setLineCounts] = useState<Record<string, number>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const LINE_OFFSET_MULTIPLIER = 25;
  const INITIAL_OFFSET = 60;

  // TODO: fix maximum update depth error when previewing in sanity studio
  useEffect(() => {
    if (!cards?.length) {
      return;
    }

    const calculateLineCounts = () => {
      const newLineCounts: Record<string, number> = {};

      cards.forEach((card) => {
        const container = cardRefs.current[card._key];
        if (!container) {
          return;
        }

        const textElement = container;

        const split = new SplitText(textElement, {
          type: "lines",
          linesClass: "line",
          autoSplit: true,
        });

        newLineCounts[card._key] = split.lines.length;

        // Don't actually split the text, we just want the line count
        split.revert();
      });

      setLineCounts(newLineCounts);
    };

    calculateLineCounts();

    const handleResize = () => {
      calculateLineCounts();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cards]);

  const getCardColClasses = ({
    index,
    length,
    hasLink,
  }: {
    index: number;
    length: number;
    hasLink: boolean;
  }) => {
    if (hasLink && length === 2) {
      return "lg:col-span-4";
    }
    if (!hasLink && length === 2) {
      return "lg:col-span-6";
    }
    if (!hasLink && length === 3) {
      return "lg:col-span-4";
    }
    if (hasLink && length === 4) {
      return `lg:col-span-4 ${index === 3 ? "lg:col-start-3" : ""}`;
    }
    if (hasLink && length === 5) {
      return `lg:col-span-3 ${index === 3 ? "lg:col-start-4" : ""}`;
    }
    if (!hasLink && length === 5) {
      return `lg:col-span-4 ${index === 3 ? "lg:col-start-3" : ""}`;
    }
    if (hasLink && length === 6) {
      return `lg:col-span-3 ${index === 4 ? "lg:col-start-1" : ""} ${index === 4 || index === 5 || index === 6 ? "lg:col-span-4" : ""}`;
    }
    if (!hasLink && length === 6) {
      return `lg:col-span-3 ${index === 3 ? "lg:col-start-4" : ""}`;
    }
    if (!hasLink && length === 7) {
      return `lg:col-span-3 ${index === 4 ? "lg:col-start-1" : ""} ${index === 4 || index === 5 || index === 6 ? "lg:col-span-4" : ""}`;
    }
    return "lg:col-span-3";
  };

  return (
    <div
      className="overflow-hidden py-80-140-220 lg:space-y-40-80-160"
      data-nav-theme="light"
    >
      {marquee && marquee.length > 0 && (
        <div className="col-span-full hidden py-20 lg:block">
          <InfiniteTextMarquee items={marquee} />
        </div>
      )}

      <div className="grid-custom gap-y-40-80-160 p-custom">
        <Transition className="4xl:col-span-2 5xl:col-span-1 col-span-full 4xl:col-start-4 5xl:col-start-4 sm:col-span-2 lg:col-span-3 lg:col-start-4 lg:space-y-6">
          {title && (
            <h2 className="type-heading-2430 text-balance">
              <PortableTextFragment value={title} />
            </h2>
          )}

          {link &&
            link.length > 0 &&
            cards.length >= 8 &&
            link.map((link) => (
              <Button key={link._key} variant="tertiary-black" link={link}>
                {link.title}
              </Button>
            ))}
        </Transition>

        <div className="grid-custom col-span-full gap-2 lg:gap-5">
          {cards?.map((card, index) => {
            return (
              <Transition
                delay={index * 0.1}
                key={card._key}
                className={cn(
                  "col-span-2 lg:col-span-full",
                  pathname === card.link?.href
                    ? "pointer-events-none border border-alabaster"
                    : "group relative h-[215px] w-full overflow-hidden bg-white transition-colors duration-500 ease-(--button-bezier) hover:bg-neon lg:h-90",
                  getCardColClasses({
                    index,
                    length: cards.length,
                    hasLink: !!(link && link.length > 0),
                  }),
                )}
              >
                <Button
                  variant="card"
                  link={card.link ?? undefined}
                  className={cn(
                    "h-[215px] max-w-none flex-col items-start p-3 lg:h-90 lg:p-6 [&]:w-full [&]:whitespace-normal",
                    card.link ? "" : "pointer-events-none",
                    pathname === card.link?.href
                      ? "md:justify-between"
                      : "justify-between",
                  )}
                >
                  <div
                    className={cn(
                      "flex w-full items-center justify-between",
                      pathname !== card.link?.href && "max-h-5 lg:max-h-none",
                    )}
                  >
                    <div
                      className={cn(
                        "py type-mono-1040 lg:type-mono-1240 max-w-fit self-start px-[2px]",
                        pathname === card.link?.href
                          ? "text-charcoal"
                          : "bg-neon text-black transition-colors duration-500 ease-(--button-bezier) group-hover:bg-black group-hover:text-white",
                      )}
                    >
                      0{index + 1}
                    </div>

                    {card.image && (
                      <div className="origin-top-right scale-0 transition-transform duration-1000 ease-(--button-bezier) group-hover:scale-100">
                        <SanityImage
                          image={card.image}
                          height={80}
                          width={80}
                          sizes="80px"
                          className="max-h-15 max-w-15 lg:max-h-20 lg:max-w-20"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    {card.title && (
                      <h3
                        className={cn(
                          "type-1640 lg:type-heading-2430 transition-transform duration-1000 ease-(--button-bezier) group-hover:[transform:var(--title-transform)]",
                          pathname === card.link?.href ? "text-charcoal" : "",
                        )}
                        style={{
                          ["--title-transform" as string]: lineCounts[card._key]
                            ? `translateY(-${lineCounts[card._key] * LINE_OFFSET_MULTIPLIER + INITIAL_OFFSET}px)`
                            : `translateY(-${INITIAL_OFFSET}px)`,
                        }}
                      >
                        <PortableTextFragment value={card.title} />
                      </h3>
                    )}

                    <div className="absolute right-6 bottom-6 left-6 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-hover:delay-500">
                      {card.description && (
                        <div
                          className="[&_p]:lg:type-body-1440 [&_p]:xl:type-body-1640 [&_p]:mb-4"
                          ref={(el) => {
                            cardRefs.current[card._key] = el;
                          }}
                        >
                          <PortableText value={card.description} />
                        </div>
                      )}

                      {card?.link?.title && (
                        <div className="type-mono-1240 flex items-center gap-1 uppercase">
                          [{card.link.title}
                          <Icon variant="arrow-right" />]
                        </div>
                      )}
                    </div>
                  </div>

                  {pathname !== card.link?.href && (
                    <div className="flex items-center gap-2.5 md:hidden">
                      [ <Icon variant="arrow-right" />]
                    </div>
                  )}
                </Button>
              </Transition>
            );
          })}

          {cards &&
            cards.length >= 2 &&
            cards.length <= 7 &&
            link &&
            link.length > 0 &&
            link.map((link, index) => (
              <Transition
                key={link._key}
                delay={cards.length * 0.1}
                className={cn(
                  "group relative col-span-2 h-[215px] w-full overflow-hidden border border-gunmetal border-dashed transition-colors duration-500 ease-(--button-bezier) hover:bg-neon lg:col-span-full lg:h-90",
                  getCardColClasses({
                    index: cards.length - index,
                    length: cards.length,
                    hasLink: true,
                  }),
                )}
              >
                {link && (
                  <Button
                    variant="card"
                    link={link}
                    className="h-[215px] min-w-full flex-col items-start justify-between p-3 lg:h-90 lg:p-6"
                  >
                    <h3 className="type-heading-1640 lg:type-heading-2430 whitespace-pre-wrap">
                      {link.title}
                    </h3>

                    <button
                      type="button"
                      className="self-end bg-black p-3.5 text-neon"
                    >
                      <Icon variant="arrow-right" />
                    </button>
                  </Button>
                )}
              </Transition>
            ))}
        </div>
      </div>
    </div>
  );
};
