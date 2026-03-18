/*
 * GridGuideline aims to mimic the Grid layout guide functionality from Figma
 * Toggle this on and off using Shift + G on the website itself
 * This is only shown on the development environment. This doesn't appear on production.
 * Useful for debugging and visualizing the grid layout when working with modules.
 */

"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import { cn } from "@/lib/utils/cn";

export const GridGuideline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore key repeats when holding down
      if (event.repeat) return;

      if (event.shiftKey && event.key.toLowerCase() === "g") {
        event.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      id="grid-guideline"
      className={cn(
        "grid-custom pointer-events-none fixed top-0 left-0 z-9999 min-h-dvh min-w-full select-none p-custom",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      {Array.from({ length: isMobile ? 4 : 12 }).map((_, index) => (
        <div
          aria-hidden="true"
          key={index}
          className="select-none bg-debug-red/15"
        />
      ))}
    </div>
  );
};
