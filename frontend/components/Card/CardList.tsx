"use client";
import type { BlockProps } from "@/sanity/lib/fetch";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CardListProps = BlockProps<"card-list">;

// Logic borrowed from BMG
export const CardList = ({
  eyebrow,
  title,
  description,
  cards,
}: CardListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1024;
  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : 768;
  const isMobile = viewportWidth < 768;

  const TOTAL_CARDS = cards?.length || 0;
  const OVERLAP_OFFSET = isMobile ? 10 : 45;
  const PARALLAX_VALUE = OVERLAP_OFFSET * (TOTAL_CARDS - 1) + 100;

  const calcOffset = () => {
    const lastCardHeight =
      cardsRef.current[cardsRef.current.length - 1].offsetHeight;
    const finalHeight =
      (TOTAL_CARDS - 1) * OVERLAP_OFFSET + lastCardHeight - PARALLAX_VALUE;
    return Math.max(10, (viewportHeight - finalHeight) / 2);
  };

  useLayoutEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: isMobile });
  }, [isMobile]);

  useGSAP(
    () => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: () => `top-=${index * OVERLAP_OFFSET} top+=${calcOffset()}`,
          endTrigger: containerRef.current,
          end: () => `bottom bottom-=${calcOffset()}`,
          pin: true,
          anticipatePin: isMobile ? 1 : 0,
          pinSpacing: false,
          animation: gsap.to(card, {
            y: -PARALLAX_VALUE,
            z: (index + 1) * 10,
            ease: "none",
            immediateRender: !isMobile,
            overwrite: "auto",
          }),
          scrub: 0,
          invalidateOnRefresh: true,
        });
      });
    },
    {
      scope: containerRef,
      dependencies: [cards, viewportWidth, viewportHeight],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      className="grid-custom gap-y-60-120-220 p-custom py-40-80-160"
      data-nav-theme="light"
    >
      <div className="grid-custom col-span-full gap-y-6 lg:gap-y-12">
        <div className="grid-custom col-span-full gap-y-4 lg:gap-y-0">
          {eyebrow && (
            <Transition className="col-span-full lg:col-span-2">
              <Eyebrow variant="dot-black">{eyebrow}</Eyebrow>
            </Transition>
          )}

          {title && (
            <Transition className="col-span-full text-balance lg:col-span-6 lg:col-start-3">
              <h2 className="typef-heading-32-48-64 text-balance">
                <PortableTextFragment value={title} />
              </h2>
            </Transition>
          )}
        </div>

        {description && (
          <Transition className="col-span-full lg:col-span-4 lg:col-start-3">
            <PortableText value={description} className="text-balance" />
          </Transition>
        )}
      </div>
      <div
        ref={containerRef}
        className="relative col-span-full min-h-[120svh] lg:min-h-[100svh]"
      >
        {cards?.map((card, index) => {
          return (
            <div
              key={card._key}
              ref={(el) => {
                // @ts-expect-error - type error for cardsRef.current
                cardsRef.current[index] = el;
              }}
              className=""
            >
              <div
                className={cn(
                  "group grid-custom gap-y-0 border-platinum border-t bg-white p-6",
                  card.link &&
                    card.link.length > 0 &&
                    "transition-colors duration-500 ease-(--button-bezier) hover:bg-neon",
                )}
              >
                <span
                  className={cn(
                    "py type-mono-1240 max-w-fit self-start bg-neon px-0.5 text-black",
                    card.link &&
                      card.link.length > 0 &&
                      "transition-colors duration-500 ease-(--button-bezier) group-hover:bg-black group-hover:text-white",
                  )}
                >
                  0{index + 1}
                </span>

                {card.image && (
                  <div className="card-image col-span-2 col-start-3 row-start-1 ml-auto max-h-fit max-w-fit origin-top-right transition-transform duration-700 ease-(--button-bezier) lg:col-span-1 lg:col-start-[-1]">
                    <SanityImage
                      image={card.image}
                      height={80}
                      width={80}
                      sizes="80px"
                      className="h-[98px] w-[98px] lg:h-20 lg:w-20"
                    />
                  </div>
                )}

                <div className="col-span-full mt-8 lg:col-span-6 lg:col-start-3 lg:mt-0">
                  <h2 className="type-heading-3230 flex flex-col">
                    {card.title && <span>{card.title}</span>}
                    {card.subtitle && (
                      <span className="text-silver">{card.subtitle}</span>
                    )}
                  </h2>
                </div>

                {card.description && (
                  <PortableText
                    value={card.description}
                    className="type-body-1440 col-span-full mt-6 lg:col-span-3 lg:col-start-3 lg:mt-8"
                  />
                )}

                {card.link &&
                  card.link.length > 0 &&
                  card.link.map((link) => (
                    <Button
                      variant="tertiary-black"
                      key={link._key}
                      link={link}
                      className="col-span-full mt-9 self-end whitespace-normal after:absolute after:inset-0 after:z-20 after:content-[''] lg:col-span-3 lg:col-start-3 lg:mt-19"
                    >
                      {link.title}
                    </Button>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
