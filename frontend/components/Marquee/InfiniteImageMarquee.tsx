"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  type ResolvedImageType,
  SanityImage,
} from "@/components/Media/SanityImage";
import { cn } from "@/lib/utils";
import { debounce } from "es-toolkit/function";

type InfiniteImageMarqueeProps = {
  className?: string;
  items:
    | {
        _key: string;
        image: ResolvedImageType | null;
      }[]
    | null;
};

// https://codepen.io/mark_sottek/pen/pvoaXRv

export const InfiniteImageMarquee = ({
  className,
  items,
}: InfiniteImageMarqueeProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const savedProgressRef = useRef<number>(0);
  const isPausedByVisibilityRef = useRef<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState(1920);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
  }, []);

  // Clone marqueeItems until we have enough width (at least 2x viewport)
  const clonedItems = useMemo(() => {
    if (!items || items.length === 0) {
      return [];
    }

    const marqueeItems: typeof items = [];
    let totalWidth = 0;

    // Add original marqueeItems
    marqueeItems.push(...items);
    totalWidth += items.reduce((sum) => sum + 150, 0); // Approximate width

    // Clone until we have at least 2x viewport width
    while (totalWidth < viewportWidth * 2) {
      items.forEach((item) => {
        marqueeItems.push({
          ...item,
          _key: `${item._key}-clone-${marqueeItems.length}`,
        });
      });
      totalWidth += items.reduce((sum) => sum + 150, 0);
    }

    return marqueeItems;
  }, [items, viewportWidth]);

  useGSAP(() => {
    if (!rowRef.current || clonedItems.length === 0) {
      return;
    }

    const row = rowRef.current;
    const rowItems = Array.from(row.children) as HTMLElement[];

    if (rowItems.length === 0) {
      return;
    }

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    // Reset row position
    gsap.set(row, { x: 0 });

    const rowWidth = row.scrollWidth;
    const containerWidth = window.innerWidth;

    // Calculate speed dynamically to maintain consistency
    const BASE_SPEED = 10;
    let duration = (rowWidth / containerWidth) * BASE_SPEED;

    if (window.innerWidth < 768) {
      duration *= 1.5; // Slow it down for mobile
    }

    // GSAP Infinite Scrolling
    const tl = gsap.timeline({ repeat: -1, ease: "none" });

    tl.to(row, {
      x: `-${rowWidth / 2}px`, // Move by half the total width
      duration: duration,
      ease: "none",
      onComplete: () => {
        gsap.set(row, { x: 0 }); // Reset position to loop seamlessly
      },
    });

    // Restore saved progress if available
    if (savedProgressRef.current > 0) {
      tl.progress(savedProgressRef.current);
      savedProgressRef.current = 0;
    }

    // Store the timeline for cleanup
    animationRef.current = tl;

    // Pause and resume handlers for hover/touch
    const handleMouseEnter = () => {
      if (!isPausedByVisibilityRef.current) {
        tl.pause();
      }
    };
    const handleMouseLeave = () => {
      if (!isPausedByVisibilityRef.current) {
        tl.resume();
      }
    };
    const handleTouchStart = () => {
      if (!isPausedByVisibilityRef.current) {
        tl.pause();
      }
    };
    const handleTouchEnd = () => {
      if (!isPausedByVisibilityRef.current) {
        tl.resume();
      }
    };

    // Visibility change handler - debounced to prevent rapid toggling
    const handleVisibilityChange = debounce(() => {
      if (document.hidden) {
        // Tab became hidden - save progress and pause
        if (animationRef.current && !isPausedByVisibilityRef.current) {
          savedProgressRef.current = animationRef.current.progress();
          animationRef.current.pause();
          isPausedByVisibilityRef.current = true;
        }
      } else if (isPausedByVisibilityRef.current && animationRef.current) {
        if (isPausedByVisibilityRef.current && animationRef.current) {
          savedProgressRef.current = animationRef.current.progress();
          animationRef.current.progress(savedProgressRef.current);
          animationRef.current.resume();
          isPausedByVisibilityRef.current = false;
        }
      }
    }, 500);

    // Resize handler - debounced but doesn't change speed
    const handleResize = debounce(() => {
      // Don't recalculate speed, just let the animation continue
      // The animation will adapt naturally to the new container width
    }, 300);

    row.addEventListener("mouseenter", handleMouseEnter);
    row.addEventListener("mouseleave", handleMouseLeave);
    row.addEventListener("touchstart", handleTouchStart);
    row.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      row.removeEventListener("mouseenter", handleMouseEnter);
      row.removeEventListener("mouseleave", handleMouseLeave);
      row.removeEventListener("touchstart", handleTouchStart);
      row.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [clonedItems]);

  return (
    <section className={cn("relative block max-h-fit w-full", className)}>
      <div className="overflow-hidden" role="marquee">
        <div
          ref={rowRef}
          className="relative flex items-center justify-around gap-10 whitespace-nowrap"
        >
          {clonedItems.map((item) => (
            <div
              className="relative flex min-w-[150px] flex-1 items-center justify-center text-center"
              key={item._key}
            >
              <span className="relative z-1 inline-block">
                <SanityImage
                  image={item.image}
                  className="block max-h-full max-w-full object-contain"
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
