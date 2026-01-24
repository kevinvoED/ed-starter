"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { Icon } from "@/components/Icon/Icon";
import { horizontalLoop } from "@/lib/horizontal-loop";
import { cn } from "@/lib/utils";

type InfiniteTextMarqueeProps = {
  items:
    | {
        title: string | null;
      }[]
    | null;
  className?: string;
  variant?: "light" | "dark";
  padding?: "none" | "default" | "large" | "small";
  separator?: "hyphen" | "arrow";
};

export const InfiniteTextMarquee = ({
  className,
  items,
  variant = "light",
  padding = "default",
  separator = "hyphen",
}: InfiniteTextMarqueeProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !wrapperRef.current) {
      return;
    }

    const elements = Array.from(wrapperRef.current.children) as HTMLElement[];

    gsap.set(elements, { clearProps: "all" });

    const loop = horizontalLoop(elements, {
      paused: false,
      repeat: -1,
      speed: 1.5,
    });

    return () => {
      loop.kill();
    };
  }, [items]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative col-span-full flex max-h-30 overflow-hidden",
        className,
      )}
    >
      <div
        ref={wrapperRef}
        className="flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex items-center justify-center space-x-12.5"
          >
            <div className="flex h-35 max-w-fit items-center justify-center">
              <div
                className={cn(
                  "whitespace-nowrap",
                  padding === "small"
                    ? "type-heading-6430"
                    : "type-heading-6430 lg:type-heading-12030",
                )}
              >
                {item.title}
              </div>
            </div>

            <div className="flex h-35 w-20 items-center justify-center text-silver last:mr-12.5">
              {separator === "hyphen" ? (
                <span
                  className={cn(
                    "type-heading-6430 lg:type-heading-12030",
                    variant === "dark" && "text-charcoal",
                  )}
                >
                  —
                </span>
              ) : (
                <Icon
                  variant="arrow-right"
                  className="size-10 text-silver lg:size-20"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
