"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";

type TextMaskProps = {
  slot?: React.ElementType;
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  className?: string;
  triggerOnce?: boolean;
  children: React.ReactNode;
};

export const TextMask = ({
  slot = "div",
  y = 25,
  x = 0,
  duration = 1,
  stagger = 0.12,
  delay = 0,
  ease = "power2.inOut",
  className,
  triggerOnce = true,
  children,
}: TextMaskProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const Component = slot;

  useGSAP(() => {
    // Set container to visible or else you'll see a brief flash on page load
    gsap.set(containerRef.current, { opacity: 1 });

    SplitText.create(containerRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
      onSplit: (self) => {
        gsap.from(self.lines, {
          y: y,
          x: x,
          opacity: 0,
          stagger: stagger,
          duration: duration,
          delay: delay,
          ease: ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            toggleActions: triggerOnce
              ? "play none none none"
              : "play none none reverse",
          },
        });
      },
    });
  }, [duration, delay, stagger, ease, triggerOnce]);

  return (
    <Component ref={containerRef} style={{ opacity: 0 }} className={className}>
      {children}
    </Component>
  );
};
