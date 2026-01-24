"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/all";

type ClickTextScrambleProps = {
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  className?: string;
  children: React.ReactNode;
};

// GSAP ScrambleTextPlugin: https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/
gsap.registerPlugin(ScrambleTextPlugin);

export const ClickTextScramble = ({
  duration = 1.75,
  delay = 0,
  stagger = 0.05,
  ease = "power4.inOut",
  className,
  children,
}: ClickTextScrambleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const originalTextsRef = useRef<Map<Element, string>>(new Map());
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    // Set container to visible immediately
    gsap.set(containerRef.current, { opacity: 1 });

    const handleClick = () => {
      if (!containerRef.current) return;

      // Kill any existing animation
      if (tweenRef.current) {
        tweenRef.current.kill();
      }

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
        textElements.length > 0 ? textElements : [containerRef.current];

      // Store original text on first encounter, restore it before animating
      for (const el of targets) {
        if (originalTextsRef.current.has(el)) {
          el.textContent = originalTextsRef.current.get(el) || "";
        } else {
          originalTextsRef.current.set(el, el.textContent || "");
        }
      }

      tweenRef.current = gsap.to(targets, {
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
    element?.addEventListener("click", handleClick);

    return () => {
      element?.removeEventListener("click", handleClick);
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [duration, delay, stagger, ease]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
