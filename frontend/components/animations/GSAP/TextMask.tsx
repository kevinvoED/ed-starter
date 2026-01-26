"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/cn";
import { SplitText } from "gsap/all";

type TextMaskProps = {
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  className?: string;
  triggerOnce?: boolean;
  children: React.ReactNode;
};

export const TextMask = ({
  duration = 1,
  stagger = 0.12,
  delay = 0,
  ease = "power2.inOut",
  className,
  triggerOnce = true,
  children,
}: TextMaskProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
          y: 25,
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
    <div
      ref={containerRef}
      style={{ opacity: 0 }}
      className={cn("[&_p]:mb-0", className)}
    >
      {children}
    </div>
  );
};
