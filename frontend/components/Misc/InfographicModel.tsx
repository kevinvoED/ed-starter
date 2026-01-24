"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import IllustrationCircle from "@/components/Icon/static/IllustrationCircle";
import IllustrationLinesLeft from "@/components/Icon/static/IllustrationLinesLeft";
import IllustrationLinesRight from "@/components/Icon/static/IllustrationLinesRight";
import IllustrationLogo from "@/components/Icon/static/IllustrationLogo";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type InfographicModelProps = BlockProps<"infographic-model">;

type ListType = InfographicModelProps["lists"][0];

interface ListBlockProps {
  list: InfographicModelProps["lists"][0];
  orientation: "left" | "right";
  className?: string;
}

const ContentBlock = ({ list }: { list: ListType }) => (
  <>
    {list.title && (
      <h2 className="type-mono-1440 text-alabaster uppercase">
        <PortableTextFragment value={list.title} />
      </h2>
    )}
    {list.subtitle && (
      <p className="type-mono-1040 mt-1 text-charcoal uppercase">
        &#91;
        <PortableTextFragment value={list.subtitle} />
        &#93;
      </p>
    )}
  </>
);

export const ListBlock = ({ list, orientation, className }: ListBlockProps) => {
  if (!list) return null;

  return (
    <div className={cn("col-span-full md:col-span-5", className)}>
      <div className="relative list-container opacity-0">
        <div
          className={cn(
            "absolute inset-0 origin-right list-overlay bg-black",
            orientation === "left" ? "md:origin-left" : "md:origin-right",
          )}
        ></div>
        <div className="text-white md:hidden">
          <ContentBlock list={list} />
        </div>
        <hr className="my-5 border-alabaster md:hidden" />
        {list.items && list.items.length > 0 && (
          <div className={cn("flex w-full items-stretch gap-x-5")}>
            <ul
              className={cn(
                "w-fit space-y-4 md:space-y-16",
                orientation === "left" ? "order-1 md:text-right" : "order-2",
              )}
            >
              {list.items.map((item) => (
                <li
                  className="type-heading-2030 whitespace-nowrap text-white"
                  key={item._key}
                >
                  <Eyebrow
                    variant="dot-neon"
                    className="type-mono-1440"
                    inverted={orientation === "left"}
                  >
                    <PortableTextFragment value={item.title} />
                  </Eyebrow>
                </li>
              ))}
            </ul>
            <div
              className={cn(
                "-z-1 hidden flex-1 overflow-hidden py-3.5 md:block",
                orientation === "left" ? "order-2 pr-6" : "order-1 pl-6",
              )}
            >
              <div className="relative h-full">
                {orientation === "left" ? (
                  <IllustrationLinesLeft className="absolute inset-y-0 left-0 h-full w-auto max-w-none" />
                ) : (
                  <IllustrationLinesRight className="absolute inset-y-0 right-0 h-full w-auto max-w-none" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Bracket = () => (
  <div className="h-4 w-full border-alabaster border-r border-b border-l"></div>
);

const childClasses =
  "inner-child absolute inset-0 scale-x-75 md:scale-x-25 scale-y-50 bg-black";

const offsets = [
  "translate-x-[-7%] translate-y-[-6%]",
  "translate-x-[3%] translate-y-[-10%]",
  "translate-x-[-5%] translate-y-[6%]",
  "translate-x-[5%] translate-y-[2%]",
];

export const InfographicModel = ({
  eyebrow,
  title,
  description,
  listsTitle,
  lists,
}: InfographicModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".inner-child");
      // Check for mobile (standard 768px breakpoint)
      const isMobile = window.innerWidth <= 768;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 25%",
          toggleActions: "play none none none",
        },
      });

      // --- Initial states ---
      // scaleX is 0.75 for mobile, 0.25 for desktop
      tl.set(items, { scaleX: isMobile ? 0.75 : 0.25, scaleY: 0.5 });
      tl.set(".inner-overlay", { scale: 0.1 });
      tl.set(".logo", { scale: 0 });
      tl.set(".list-title", { opacity: 0 });
      tl.set(".circle", { opacity: 0 });

      // --- Animations ---
      // 1. Tiles
      tl.to(items, { scaleX: isMobile ? 0.9 : 0.45, duration: 0.75 });

      if (!isMobile) {
        tl.to(".circle", { opacity: 1, duration: 0.75 }, "<");
      }

      // 2. Inner overlay
      tl.to(
        ".inner-overlay",
        { scale: 1, duration: 1, ease: "power4.out" },
        "+=0.3",
      );

      if (isMobile) {
        tl.to(".circle", { opacity: 1, duration: 0.75 }, ">");
        tl.to(".list-title", { opacity: 1, duration: 0.75 }, "<");
      }

      tl.to(".logo", { scale: 1, duration: 1, ease: "power4.out" }, "<");

      if (isMobile) {
        tl.to(
          ".list-container",
          { opacity: 1, duration: 1, ease: "power4.in" },
          ">",
        );
        tl.to(
          ".list-overlay",
          {
            scaleX: 0,
            duration: 0,
          },
          "-=0.5",
        );
      } else {
        tl.set(".list-container", { opacity: 1 }, ">");
        tl.to(".list-overlay", {
          scaleX: 0,
          duration: 0.75,
          ease: "power4.in",
        });
        tl.to(
          ".bracket-container",
          { opacity: 1, y: 0, duration: 0.75, ease: "power4.in" },
          "<",
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <>
      <div className="grid-custom-md p-custom pt-40-80-160 pb-2">
        <div className="col-span-full md:col-span-7">
          <div className="relative">
            {eyebrow && (
              <Transition className="mb-4 md:absolute md:top-0 md:left-0 md:mb-0">
                <Eyebrow variant="dot-black">{eyebrow}</Eyebrow>
              </Transition>
            )}
            {title && (
              <Transition>
                <h2 className="typef-heading-32-48-64 lg:indent-2col">
                  <PortableTextFragment value={title} />
                </h2>
              </Transition>
            )}
          </div>
        </div>
        {description && (
          <Transition className="col-span-full lg:col-span-4 lg:col-start-9 lg:mt-6">
            <PortableText value={description} className="text-balance" />
          </Transition>
        )}
      </div>
      <div className="mt-18 p-2 md:mt-25">
        <div
          ref={containerRef}
          className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden"
        >
          <div className="inner-overlay absolute inset-0 scale-10 overflow-hidden bg-black"></div>
          <div className="absolute inset-0 scale-70 overflow-hidden">
            {offsets.map((offset, i) => (
              <div key={i} className={`${childClasses} ${offset}`} />
            ))}
          </div>
          <div className="z-10 mx-auto w-full max-w-378 md:pt-40">
            <div className="grid-custom-md relative items-center px-3 pb-16 md:pb-0">
              {lists?.[0] && (
                <ListBlock
                  list={lists[0]}
                  orientation="left"
                  className="order-2 md:order-1 md:pr-8"
                />
              )}
              <div className="order-1 col-span-full px-16 py-14 md:col-span-2 md:px-0 md:py-0">
                <div className="relative md:scale-[1.3]">
                  <IllustrationCircle className="circle w-full opacity-0" />
                  <IllustrationLogo className="logo absolute top-1/2 left-1/2 w-11.25 -translate-x-1/2 -translate-y-1/2 scale-0 md:w-12.5" />
                </div>
                {listsTitle && (
                  <p className="type-mono-1040 mt-8 list-title text-center text-alabaster uppercase opacity-0 md:hidden">
                    <PortableTextFragment value={listsTitle} />
                  </p>
                )}
              </div>
              {lists?.[1] && (
                <ListBlock
                  list={lists[1]}
                  orientation="right"
                  className="order-2 mt-14 md:order-1 md:mt-0 md:pl-8"
                />
              )}
            </div>
            <div className="bracket-container md:grid-custom-md mt-20 hidden translate-y-10 px-3 text-center opacity-0">
              <div className="col-span-5 md:pr-8">
                <Bracket />
                <div className="mt-6">
                  <ContentBlock list={lists?.[0]} />
                </div>
              </div>
              <div className="col-span-2">
                {listsTitle && (
                  <p className="type-mono-1440 mb-10 text-alabaster uppercase">
                    <PortableTextFragment value={listsTitle} />
                  </p>
                )}
              </div>
              <div className="col-span-5 md:pl-8">
                <Bracket />
                <div className="mt-6">
                  <ContentBlock list={lists?.[1]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
