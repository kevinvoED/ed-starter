"use client";

import type { ModuleProps } from "@/sanity/lib/fetch";
import { toPlainText } from "@portabletext/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { horizontalLoop } from "@/lib/styles/animations";
import { cn } from "@/lib/utils/cn";
import { Observer } from "gsap/all";

// @see https://codepen.io/GreenSock/pen/zYaxEKV

type TextMarqueeProps = {
  items: ModuleProps<"marquee">["items"];
  className?: string;
  enableVelocity: boolean;
  direction?: "left" | "right";
  gap: number;
};

gsap.registerPlugin(Observer);

export const TextMarquee = ({
  items,
  className,
  enableVelocity,
  direction = "right",
  gap,
}: TextMarqueeProps) => {
  if (!items || items.length === 0) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const observerRef = useRef<Observer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollingText = gsap.utils.toArray<Element>(
      containerRef.current.querySelectorAll(".marquee-item"),
    );

    const tl = horizontalLoop(scrollingText as HTMLElement[], {
      repeat: -1,
      paddingRight: "0px",
      reversed: direction === "right",
    });

    timelineRef.current = tl;

    if (enableVelocity) {
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
            .to(tl, {
              timeScale: factor * 2.5,
              duration: 0.2,
              overwrite: true,
            })
            .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0");
        },
      });
    }
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (observerRef.current) {
        observerRef.current.kill();
      }
    };
  }, [enableVelocity, direction]);

  return (
    <div
      ref={containerRef}
      role="marquee"
      className={cn("flex items-center overflow-hidden", className)}
    >
      {[...items, ...items, ...items].map((item, index) => (
        <div key={`${item.title}-${index}`} className="marquee-item">
          <div
            className="max-w-fit whitespace-nowrap"
            style={{ marginRight: `${gap}px` }}
          >
            {item.title && toPlainText(item.title)}
          </div>
        </div>
      ))}
    </div>
  );
};
