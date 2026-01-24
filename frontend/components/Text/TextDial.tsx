"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { forwardRef, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type DialSVGProps = {
  className?: string;
  activeBoxIndex: number;
};

type TextDialProps = BlockProps<"text-dial">;

// Essentially controls amount of rotations per second; increase to spin more, decrease to slow down the spin
// If you do change this, make sure the last item is horizontally aligned when the animation is complete
const DEGREES_PER_ITEM = -72;

const TOTAL_LINES_COUNT = 35;
const RADIUS = 180;
const CENTER_X = 200;
const CENTER_Y = 200;
const LINE_LENGTH = 18;
const STROKE_WIDTH = 0.8;

const BOX_WIDTH = 18;
const BOX_HEIGHT = 9;
const BOX_TEXT = ["01", "02", "03"];
const LINES_TO_REPLACE_WITH_BOXES = [0, 7, 14];

export const TextDial = ({ logo, title, items }: TextDialProps) => {
  const wrapperContainerRef = useRef<HTMLDivElement>(null);
  const dialContainerRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<SVGSVGElement>(null);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);

  // useEffect instead of useGSAP when using the pin feature; otherwise causes issues
  useEffect(() => {
    if (
      !wrapperContainerRef.current ||
      !dialContainerRef.current ||
      !dialRef.current
    )
      return;

    // Pinning the left side
    ScrollTrigger.create({
      trigger: wrapperContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: dialContainerRef.current,
      pinSpacing: false,
    });

    // Grab all items in the right side container
    const textItems = gsap.utils.toArray(
      ".text-item",
      wrapperContainerRef.current,
    );

    // Fade as they scroll out of view
    textItems.forEach((item) => {
      const textItem = item as HTMLElement;

      gsap.fromTo(
        textItem,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: textItem,
            start: "bottom 50%",
            end: "bottom 10%",
            scrub: 1,
            markers: false,
          },
        },
      );
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          // Use scroll progress to determine active index
          // This ensures equal distribution regardless of content height
          const progress = self.progress;
          const itemCount = textItems.length;

          // Calculate which item should be active based on progress
          // Each item gets an equal slice of the scroll progress
          const newIndex = Math.min(
            Math.floor(progress * itemCount),
            itemCount - 1,
          );

          setActiveBoxIndex(newIndex);
        },
      },
    });

    // Rotate the dial based on amount of text items
    tl.fromTo(
      dialRef.current,
      { rotation: 0 },
      { rotation: (textItems.length - 1) * DEGREES_PER_ITEM, ease: "none" },
    );

    // Resizing still breaks the dial for some reasonbut it's better than nothing
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <div
      ref={wrapperContainerRef}
      className="grid-custom relative gap-0 py-40-80-160"
    >
      {title && (
        <h2 className="type-mono-1240 col-span-full p-custom uppercase lg:hidden">
          <PortableTextFragment value={title} />
        </h2>
      )}

      {/* Left side - pinned content with rotating dial */}
      <div ref={dialContainerRef} className="col-span-1 h-screen lg:col-span-5">
        <div className="relative flex h-full lg:items-center lg:justify-center lg:px-6 lg:py-20">
          {logo && (
            <SanityImage
              image={logo}
              sizes="56px"
              className="hidden size-14 lg:absolute lg:top-[45%] lg:left-4 lg:block lg:-translate-y-1/2"
            />
          )}
          {title && (
            <h2 className="type-mono-1240 absolute left-44 hidden max-w-[16ch] uppercase lg:top-[45%] lg:block lg:-translate-y-1/2">
              <PortableTextFragment value={title} />
            </h2>
          )}
          <DialSVG
            ref={dialRef}
            activeBoxIndex={activeBoxIndex}
            className="absolute top-14 left-0 4xl:size-300 size-75 translate-x-[-68%] text-charcoal lg:top-[45%] lg:left-4 lg:size-200 lg:-translate-x-1/2 lg:-translate-y-1/2"
          />
        </div>
      </div>

      {/* Right side - scrolling text content */}
      <div className="col-span-3 lg:col-span-7">
        <div className="grid-custom relative pt-48 lg:gap-y-72 lg:pt-80 lg:pb-60">
          {items.map((item) => (
            // A lot of special classes because the PortableText used here behaves differently from the rest of the modules...
            <h2
              key={item._key}
              className="[&_:is(ul,ol)]:type-heading-4030! [&_.dot]:hidden! col-span-full flex flex-col items-center text-item text-left! lg:col-span-8 lg:col-start-3 [&_:is(ul,ol)]:min-w-full! [&_:is(ul,ol)]:pl-0! [&_:is(ul,ol,li)]:list-none! [&_p]:mb-15 [&_p]:min-w-full [&_ul]:mb-0"
            >
              <PortableText
                value={item.description}
                className="lg:type-heading-4030! type-heading-2430!"
              />
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

const DialSVG = forwardRef<SVGSVGElement, DialSVGProps>(
  ({ className, activeBoxIndex }, ref) => {
    return (
      <svg
        ref={ref}
        className={className}
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        {Array.from({ length: TOTAL_LINES_COUNT }).map((_, index) => {
          const angle = (index * 360) / TOTAL_LINES_COUNT;
          const boxIndex = LINES_TO_REPLACE_WITH_BOXES.indexOf(index);
          const isBox = boxIndex !== -1;

          if (isBox) {
            const isActive = boxIndex === activeBoxIndex;
            const boxX =
              CENTER_X +
              (RADIUS - LINE_LENGTH / 2) * Math.cos((angle * Math.PI) / 180);
            const boxY =
              CENTER_Y +
              (RADIUS - LINE_LENGTH / 2) * Math.sin((angle * Math.PI) / 180);

            return (
              <g key={index}>
                {/* Box background */}
                <rect
                  x={boxX - BOX_WIDTH / 2}
                  y={boxY - BOX_HEIGHT / 2}
                  width={BOX_WIDTH}
                  height={BOX_HEIGHT}
                  fill={isActive ? "#CEFF00" : "currentColor"}
                  stroke={isActive ? "#CEFF00" : "currentColor"}
                  strokeWidth={1}
                  transform={`rotate(${angle}, ${boxX}, ${boxY})`}
                  className="transition-colors duration-300 ease-in-out"
                />
                {/* Number text */}
                <text
                  x={boxX}
                  y={boxY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(
                    "type-mono-1040 transition-colors duration-300 ease-in-out",
                    isActive ? "fill-black" : "fill-white",
                  )}
                  transform={`rotate(${angle}, ${boxX}, ${boxY})`}
                >
                  {BOX_TEXT[boxIndex]}
                </text>
              </g>
            );
          }

          // Regular line
          const x1 = CENTER_X + RADIUS * Math.cos((angle * Math.PI) / 180);
          const y1 = CENTER_Y + RADIUS * Math.sin((angle * Math.PI) / 180);

          const x2 =
            CENTER_X +
            (RADIUS - LINE_LENGTH) * Math.cos((angle * Math.PI) / 180);
          const y2 =
            CENTER_Y +
            (RADIUS - LINE_LENGTH) * Math.sin((angle * Math.PI) / 180);

          return (
            <line
              key={index}
              x1={x2}
              y1={y2}
              x2={x1}
              y2={y1}
              stroke="currentColor"
              strokeWidth={STROKE_WIDTH}
            />
          );
        })}
      </svg>
    );
  },
);
