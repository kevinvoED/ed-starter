"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";
import { PatternBg } from "./PatternBg";
import { PatternImage } from "./PatternImage";
import { PatternTimeline } from "./PatternTimeline";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ImageTextTimelineProps = BlockProps<"image-text-timeline">;

type TimelineProps = {
  cards: ImageTextTimelineProps["cards"];
  className?: string;
};

export const Timeline = ({ cards, className }: TimelineProps) => {
  if (!cards || cards.length === 0) return null;

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const eyebrowRefs = useRef<HTMLDivElement[]>([]);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      eyebrowRefs.current.forEach((eyebrow) => {
        if (!eyebrow) return;

        gsap.set(eyebrow, {
          backgroundColor: "transparent",
          color: "#D9D9D9",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: eyebrow,
            start: "top 80%",
            end: "bottom top+=50px",
            scrub: true,
          },
        });

        tl.to(eyebrow, {
          backgroundColor: "#CEFF00",
          color: "#141414",
          duration: 0.5,
          ease: "none",
        }).to(eyebrow, {
          backgroundColor: "transparent",
          color: "#D9D9D9",
          duration: 0.5,
          ease: "none",
        });
      });

      titleRefs.current.forEach((title, index) => {
        if (!title) return;

        gsap.set(title, {
          color: "#D9D9D9",
          scale: 0.7,
          transformOrigin: "left center",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "bottom top+=50px",
            scrub: true,
            onUpdate: (self) => {
              if (self.progress > 0.3 && self.progress < 0.7) {
                setActiveCardIndex(index);
              }
            },
          },
        });

        tl.to(title, {
          color: "#141414",
          scale: 1,
          duration: 1,
          ease: "none",
        })
          .to(title, { duration: 0.8 })
          .to(title, {
            color: "#D9D9D9",
            scale: 0.7,
            duration: 1,
            ease: "none",
          });
      });

      return () => {
        ScrollTrigger.refresh();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div
      className={cn(
        "grid-custom grid-rows relative gap-0 lg:grid-rows-4",
        className,
      )}
    >
      {/* Empty space */}
      <Transition className="col-span-6 col-start-1 hidden lg:block">
        <PatternTimeline />
      </Transition>

      {/* Cards */}
      {cards?.map((card, index) => (
        <Transition
          animation="fadeIn"
          key={card._key}
          className="card relative col-span-6 col-start-1 grid grid-cols-4 gap-x-5 lg:grid-cols-6"
        >
          <PatternTimeline
            className="absolute top-0 left-0"
            hideFirstLine={index > 0}
            hideLastLine={index === cards.length - 1}
          />

          <div
            ref={(el) => {
              if (el) eyebrowRefs.current[index] = el;
            }}
            className="type-mono-1040 absolute -top-1.5 left-8 bg-neon px-[3px] lg:-top-1.75 lg:left-12 lg:bg-transparent"
          >
            0{index + 1}
          </div>

          <div
            className={cn(
              "col-span-3 col-start-2 row-start-1 max-h-fit space-y-5 lg:col-span-4 lg:col-start-2 lg:row-start-1",
              "-translate-y-[2.5vw] 3xl:-translate-y-[2vw] 4xl:-translate-y-[1.5vw] 5xl:-translate-y-[1vw]",
            )}
          >
            {card.title && (
              <h3
                className="type-heading-3230 lg:type-heading-8030"
                ref={(el) => {
                  if (el) titleRefs.current[index] = el;
                }}
              >
                <PortableTextFragment value={card.title} />
              </h3>
            )}

            {card.description && (
              <div className="[&_p]:type-body-1440 text-balance lg:mx-[8.25vw]">
                <PortableText value={card.description} />
              </div>
            )}

            {cards[index].image && (
              <div className="my-11.5 h-[174px] w-[218px] lg:hidden">
                <div
                  ref={(el) => {
                    if (el) imageRefs.current[index] = el;
                  }}
                >
                  <SanityImage
                    image={cards[index].image}
                    sizes="218px"
                    className="z-20 object-cover"
                  />
                </div>
                <PatternImage className="z-5 w-full translate-x-px -translate-y-2.5" />
              </div>
            )}
          </div>
        </Transition>
      ))}

      <Transition
        animation="fadeIn"
        className="empty-space col-span-6 col-start-1 hidden lg:block"
      >
        <PatternTimeline hideFirstLine trimHalf />
      </Transition>

      {/* Right side content */}
      <div className="hidden lg:sticky lg:top-20 lg:col-span-6 lg:col-start-7 lg:row-span-full lg:row-start-1 lg:block lg:self-start">
        <Transition
          animation="fadeIn"
          className="relative grid h-screen place-items-center"
        >
          <PatternBg className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="-translate-y-[4vw] 3xl:-translate-y-[3vw]">
            {cards[activeCardIndex]?.image && (
              <div className="h-[174px] w-[218px] lg:h-102 lg:w-127.5">
                <SanityImage
                  image={cards[activeCardIndex].image}
                  sizes="510px"
                  className="object-cover"
                />
                <PatternImage className="w-full translate-x-px -translate-y-px" />
              </div>
            )}
          </div>
        </Transition>
      </div>
    </div>
  );
};
