"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(ScrollTrigger);

type TextScrambleProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  triggerOnce?: boolean;
  playOnHover?: boolean;
  chars?: "upperCase" | "lowerCase" | "upperAndLowerCase";
};

export const TextScramble = ({
  children,
  className,
  duration = 1.75,
  delay = 0,
  stagger = 0.05,
  ease = "power4.inOut",
  triggerOnce = true,
  playOnHover = false,
  chars = "upperCase",
}: TextScrambleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scramble text
    const tween = gsap.to(containerRef.current, {
      duration: duration,
      delay: delay,
      stagger: stagger,
      ease: ease,
      paused: true,
      scrambleText: {
        text: "{original}",
        chars: chars,
      },
    });

    // When it enters viewport, restart the scramble animation
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      once: !!triggerOnce,
      onEnter: () => tween.restart(),
    });

    // If visible on page load, play the animation
    if (st.isActive) {
      tween.play();
    }

    const element = containerRef.current;

    if (element && playOnHover) {
      // Restart scramble animation when user hovers the element
      element.addEventListener("mouseenter", () => tween.restart());
    }

    return () => {
      st.kill();
      if (element && playOnHover) {
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
