"use client";

import { useGSAP } from "@gsap/react";
import { type ElementType, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/*
 * TextLineReveal GSAP Animation
 * @docs: https://gsap.com/docs/v3/Plugins/SplitText/
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *  <TextLineReveal>
 *    Placeholder Text
 *  </TextLineReveal>
 *
 * ---------------------
 * Usage Example: using Slots to change component tag
 * ---------------------
 *  <TextLineReveal as="h1">
 *    Placeholder Text
 *  </TextLineReveal>
 *
 * ---------------------
 * Usage Example: Classic Options
 * ---------------------
 *  <TextLineReveal
 *    duration={1.5}
 *    stagger={0.12}
 *    delay={0}
 *    ease="power2.inOut"
 *  >
 *    Placeholder Text
 *  </TextLineReveal>
 */

// Check if window is defined to avoid hydration errors
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

type TextLineRevealProps = {
  className?: string;
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
  scrub?: boolean;
  markers?: boolean;
  start?: string;
  end?: string;
  ease?: string;
  as?: ElementType;
  triggerOnce?: boolean;
  x?: string | number;
  y?: string | number;
  onComplete?: gsap.CallbackVars["onComplete"];
  invalidateOnRefresh?: boolean;
};

export const TextLineReveal = ({
  as = "div",
  children,
  animateOnScroll = true,
  delay = 0,
  duration = 0.8,
  stagger = 0.15,
  scrub = false,
  markers = false,
  ease = "expo.out",
  start = "top 75%",
  x = 0,
  y = "115%",
  end,
  className = "",
  onComplete,
  triggerOnce = true,
  invalidateOnRefresh = true,
}: TextLineRevealProps) => {
  const Component = as;
  const containerRef = useRef<HTMLDivElement>(null);
  const splitInstances = useRef<InstanceType<typeof SplitText>[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Skip animation for users who prefer reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      splitInstances.current = [];

      // Target each child separately if the container has multiple children or target single child
      const targets = containerRef.current.hasAttribute(
        "data-anim-text-line-reveal",
      )
        ? Array.from(
            containerRef.current.children as HTMLCollectionOf<HTMLElement>,
          )
        : [containerRef.current];

      const allLines: Element[] = [];

      // Create split instances for each target
      targets.forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
        });

        splitInstances.current.push(split);

        // Prevent SplitText double-indenting on the first line if it exists
        const textIndent = window.getComputedStyle(el).textIndent;
        if (textIndent && textIndent !== "0px" && split.lines.length > 0) {
          (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
          el.style.textIndent = "0";
        }

        allLines.push(...split.lines);
      });

      gsap.set(allLines, { y: y });

      const animationProps: gsap.TweenVars = {
        x,
        y: "0%",
        ease,
        duration,
        stagger,
        delay,
        clearProps: "transform",
        overwrite: "auto",
      };

      // Activate scroll trigger if animateOnScroll is true, otherwise animate instantly
      if (animateOnScroll) {
        gsap.to(allLines, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: start,
            end: end,
            scrub: scrub,
            markers: markers,
            once: triggerOnce,
            invalidateOnRefresh: invalidateOnRefresh,
          },
          onComplete: onComplete,
        });
      } else {
        gsap.to(allLines, animationProps);
      }

      return () => {
        for (const split of splitInstances.current) {
          split.revert();
        }
      };
    },
    {
      scope: containerRef,
      dependencies: [
        animateOnScroll,
        delay,
        start,
        end,
        scrub,
        duration,
        stagger,
        ease,
        markers,
      ],
    },
  );

  return (
    <Component
      ref={containerRef}
      data-anim-text-line-reveal={true}
      className={className}
    >
      {children}
    </Component>
  );
};
