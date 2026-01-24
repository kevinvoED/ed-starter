"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import { SplitText } from "gsap/all";

export const useSplitLine = <T extends HTMLElement>(
  elementRef: RefObject<T | null>,
): number => {
  const splitInstanceRef = useRef<SplitText | undefined>(undefined);
  const [lineCount, setLineCount] = useState<number>(0);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const split = () => {
      const textElement = elementRef.current;
      if (!textElement) {
        return;
      }

      // Revert previous split if it exists
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert();
      }

      // Split the text into lines
      const split = new SplitText(textElement, {
        type: "lines",
        linesClass: "line",
        autoSplit: true,
      });

      splitInstanceRef.current = split;
      setLineCount(split.lines.length);
    };

    split();

    const handleResize = () => {
      split();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      splitInstanceRef.current?.revert();
    };
  }, [elementRef]);

  return lineCount;
};
