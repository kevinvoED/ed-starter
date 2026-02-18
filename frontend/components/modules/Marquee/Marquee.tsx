"use client";

import type { ModuleProps } from "@/sanity/lib/fetch";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { horizontalLoop } from "@/lib/styles/animations";
import { Observer } from "gsap/all";

gsap.registerPlugin(Observer);

type MarqueeProps = ModuleProps<"marquee">;

export const Marquee = ({ variant, items, images }: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const observerRef = useRef<Observer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollingText = gsap.utils.toArray<HTMLElement>(
      containerRef.current.querySelectorAll(".marquee-item"),
    );

    // @see https://codepen.io/GreenSock/pen/zYaxEKV
    const tl = horizontalLoop(scrollingText, {
      repeat: -1,
      paddingRight: "0px",
      reversed: true,
    });

    timelineRef.current = tl;

    // This controls the marquee speed velocity as we scroll, comment out if not needed
    observerRef.current = Observer.create({
      onChangeY(self) {
        let factor = 2;
        if (self.deltaY > 0) {
          factor *= -1;
        }
        gsap
          .timeline({
            defaults: {
              ease: "none",
            },
          })
          .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true })
          .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0");
      },
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      // This controls the marquee speed velocity as we scroll, comment out if not needed
      if (observerRef.current) {
        observerRef.current.kill();
      }
    };
  }, []);

  if (variant === "image" && images && images.length > 0) {
    return (
      <div ref={containerRef} className="w-full overflow-hidden">
        <div className="flex">
          {[...images, ...images, ...images, ...images, ...images].map(
            (image) => (
              <figure
                key={image._key}
                className="marquee-item flex items-center justify-center gap-x-12"
              >
                <SanityImage image={image} className="mr-12 h-35 w-50" />
              </figure>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div className="flex">
        {items &&
          items.length > 0 &&
          [...items, ...items, ...items, ...items, ...items].map((item) => (
            <div
              key={item._key}
              className="marquee-item flex items-center justify-center gap-x-12"
            >
              <div className="type-4860 flex h-35 max-w-fit items-center justify-center whitespace-nowrap">
                <PortableText value={item.title} />
              </div>

              <div className="type-4860 mr-12 flex h-35 w-20 items-center justify-center text-silver">
                —
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
