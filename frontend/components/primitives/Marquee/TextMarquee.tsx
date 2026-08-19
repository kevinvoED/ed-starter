"use client";

import type { ModuleProps } from "@/sanity/lib/fetch";
import { useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { toPlainText } from "@portabletext/react";
import { cn } from "cnfast";
import { gsap } from "gsap";
import { Observer } from "gsap/all";
import { horizontalLoop } from "@/lib/utils/horizontal-loop";

// @see https://codepen.io/GreenSock/pen/zYaxEKV

type TextMarqueeProps = {
  items: ModuleProps<"marquee">["items"];
  className?: string;
  enableVelocity: boolean;
  direction?: "left" | "right";
  gap: number;
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

export const TextMarquee = ({
  items,
  className,
  enableVelocity,
  direction = "right",
  gap,
}: TextMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountId = useId();

  useGSAP(
    () => {
      if (!items?.length || !containerRef.current) return;

      const scrollingText = gsap.utils.toArray<HTMLElement>(
        containerRef.current.querySelectorAll(".marquee-item"),
      );

      if (scrollingText.length === 0) return;

      const tl = horizontalLoop(scrollingText, {
        repeat: -1,
        paddingRight: "0px",
        reversed: direction === "right",
      });

      let observer: Observer | undefined;

      if (enableVelocity) {
        observer = Observer.create({
          onChangeY(self) {
            let factor = 2;
            if (self.deltaY > 0) {
              factor *= -1;
            }
            gsap
              .timeline({ defaults: { ease: "none" } })
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
        observer?.kill();
        tl.kill();
        gsap.set(scrollingText, { clearProps: "all" });
      };
    },
    {
      scope: containerRef,
      dependencies: [items, mountId, enableVelocity, direction],
    },
  );

  if (!items || items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      role="marquee"
      className={cn("flex items-center overflow-hidden", className)}
    >
      <div key={mountId} className="flex">
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
    </div>
  );
};
