"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/all";

type TextScrambleProps = {
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  className?: string;
  triggerOnce?: boolean;
  children: React.ReactNode;
  hover?: boolean;
  chars?: "upperCase" | "lowerCase" | "upperAndLowerCase" | string;
};

// GSAP ScrambleTextPlugin: https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/
gsap.registerPlugin(ScrambleTextPlugin);

export const TextScramble = ({
  duration = 1.75,
  delay = 0,
  stagger = 0.05,
  ease = "power4.inOut",
  className,
  triggerOnce = true,
  children,
  chars = "upperCase",
}: TextScrambleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tween = gsap.to(containerRef.current, {
      ease: ease,
      duration: duration,
      delay: delay,
      stagger: stagger,
      scrambleText: {
        text: "{original}",
        chars: chars,
      },
    });

    const element = containerRef.current;

    if (element) {
      element.addEventListener("mouseenter", () => tween.restart());
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", () => tween.restart());
      }
    };
  }, [duration, delay, stagger, ease, triggerOnce]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
