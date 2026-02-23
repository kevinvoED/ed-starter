"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";

export const GridGuideline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Mimic Shift + G from Figma to toggle grid guidelines
      if (event.shiftKey && event.key.toLowerCase() === "g") {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      id="grid-guideline"
      className={`grid-custom pointer-events-none fixed top-0 left-0 z-9999 min-h-dvh min-w-full p-custom ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {Array.from({ length: isMobile ? 4 : 12 }).map((_, index) => (
        <div key={index} className="bg-debug-red/15" />
      ))}
    </div>
  );
};
