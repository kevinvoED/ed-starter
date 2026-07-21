"use client";

import { useGSAP } from "@gsap/react";
import { type ElementType, useRef } from "react";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

/*
 * Text Scramble GSAP Animation
 * @docs: https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *  <TextScramble>
 *    Placeholder Text
 *  </TextScramble>
 *
 * ---------------------
 * Usage Example: Component is above the fold (typically Hero sections)
 * ---------------------
 *  <TextScramble animateOnScroll={false}>
 *    Placeholder Text
 *  </TextScramble>
 */

// Check if window is defined to avoid hydration errors
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrambleTextPlugin, SplitText, ScrollTrigger);
}

type TextScrambleProps = {
  as?: ElementType;
  children?: React.ReactNode;
  randomChars?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  speed?: number;
  ease?: string;
  onComplete?: gsap.CallbackVars["onComplete"];
  animateOnScroll?: boolean;
  triggerOnce?: boolean;
  invalidateOnRefresh?: boolean;
};

export const TextScramble = ({
  as = "div",
  children,
  randomChars = "#@$%^&*()w+-=[]{}|;:,.<>?`~",
  delay = 0,
  stagger = 0.01,
  duration = 1,
  speed = 1,
  ease = "expo.out",
  onComplete,
  animateOnScroll = true,
  triggerOnce = true,
  invalidateOnRefresh = true,
}: TextScrambleProps) => {
  const Component = as;
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(container, { opacity: 1 });
        onComplete?.();
        return;
      }

      let split: InstanceType<typeof SplitText> | undefined;
      let scrollTriggerInstance: ScrollTrigger | undefined;

      const tl = gsap.timeline({
        delay,
        paused: animateOnScroll,
        onComplete,
      });

      split = SplitText.create(container, {
        type: "chars",
        autoSplit: true,
      });

      tl.set(split.chars, { opacity: 0 });
      tl.set(container, { opacity: 1 });

      split.chars.forEach((char, index) => {
        const originalText = char.textContent || "";
        const randomChar =
          randomChars[Math.floor(Math.random() * randomChars.length)];
        const startTime = index * stagger;

        tl.set(char, { textContent: randomChar, opacity: 1 }, startTime);

        tl.to(
          char,
          {
            scrambleText: {
              text: originalText,
              chars: randomChars,
              speed: speed,
            },
            duration,
            ease,
          },
          startTime,
        );
      });

      if (animateOnScroll) {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: container,
          start: "top bottom",
          once: triggerOnce,
          invalidateOnRefresh,
          onEnter: () => tl.restart(),
        });

        if (scrollTriggerInstance.isActive) {
          tl.restart();
        }
      }

      return () => {
        scrollTriggerInstance?.kill();
        tl.kill();
        split?.revert();
        gsap.killTweensOf(container);
      };
    },
    {
      scope: containerRef,
      dependencies: [
        randomChars,
        delay,
        duration,
        stagger,
        ease,
        speed,
        onComplete,
        animateOnScroll,
        triggerOnce,
        invalidateOnRefresh,
      ],
    },
  );

  return (
    <Component ref={containerRef} className="opacity-0">
      {children}
    </Component>
  );
};
