"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { debounce } from "es-toolkit/function";
import { ScrambleTextPlugin, ScrollTrigger } from "gsap/all";

type TextScrambleProps = {
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  className?: string;
  triggerOnce?: boolean;
  children: React.ReactNode;
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
}: TextScrambleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Set container to visible or else you'll see a brief flash on page load
    gsap.set(containerRef.current, { opacity: 1 });

    gsap.to(containerRef.current, {
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
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        toggleActions: triggerOnce
          ? "play none none none"
          : "play none none reverse",
      },
    });

    const onResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 1500);

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [duration, delay, stagger, ease, triggerOnce]);

  return (
    <div ref={containerRef} style={{ opacity: 0 }} className={className}>
      {children}
    </div>
  );
};
