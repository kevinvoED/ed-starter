"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/all";

type HoverTextScrambleProps = {
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  className?: string;
  children: React.ReactNode;
};

// GSAP ScrambleTextPlugin: https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/
gsap.registerPlugin(ScrambleTextPlugin);

export const HoverTextScramble = ({
  duration = 1.75,
  delay = 0,
  stagger = 0.05,
  ease = "power4.inOut",
  className,
  children,
}: HoverTextScrambleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useGSAP(() => {
    // Set container to visible immediately
    gsap.set(containerRef.current, { opacity: 1 });

    const handleMouseEnter = () => {
      if (!containerRef.current || hasAnimatedRef.current) return;

      hasAnimatedRef.current = true;

      // Find all text elements, excluding SVGs and their children
      const textElements = Array.from(
        containerRef.current.querySelectorAll("*"),
      ).filter((el) => {
        // Exclude SVG elements and their descendants
        if (el.tagName === "svg" || el.closest("svg")) return false;
        // Only target elements that have direct text content
        return (
          el.childNodes.length > 0 &&
          Array.from(el.childNodes).some(
            (node) => node.nodeType === Node.TEXT_NODE,
          )
        );
      });

      // If no text elements found, fallback to container (but only if it has text)
      const targets =
        textElements.length > 0 ? textElements : containerRef.current;

      gsap.to(targets, {
        ease: ease,
        duration: duration,
        delay: delay,
        stagger: stagger,
        scrambleText: {
          text: "{original}",
          chars: "upperCase",
          revealDelay: 0.2,
          speed: 1,
        },
      });
    };

    const element = containerRef.current;
    element?.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      element?.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [duration, delay, stagger, ease]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
