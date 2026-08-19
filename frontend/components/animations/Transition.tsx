"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/*
 * Transition (Fade & Slide) GSAP Animation
 * @docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *  <Transition>
 *    Placeholder Text
 *  </Transition>
 *
 * ---------------------
 * Usage Example: Component is above the fold (typically Hero sections)
 * ---------------------
 *  <Transition animateOnScroll={false}>
 *    Placeholder Text
 *  </Transition>
 *
 * ---------------------
 * Usage Example: Classic Options
 * ---------------------
 *  <Transition
 *    animation="slideUp"
 *    duration={1.5}
 *    delay={0.05 * index}
 *    ease="power2.inOut"
 *    triggerOnce={true}
 *    onComplete={() => {
 *      console.log("Animation completed");
 *    }}
 *  >
 *    Placeholder Text
 *  </Transition>
 */

const FADE_SLIDE_DISTANCE = 10;
const SLIDE_DISTANCE = 100;

const animationConfig = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeInUp: {
    from: { opacity: 0, y: FADE_SLIDE_DISTANCE },
    to: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    from: { opacity: 0, y: -FADE_SLIDE_DISTANCE },
    to: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    from: { opacity: 0, x: -FADE_SLIDE_DISTANCE },
    to: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    from: { opacity: 0, x: FADE_SLIDE_DISTANCE },
    to: { opacity: 1, x: 0 },
  },
  slideUp: {
    from: { y: SLIDE_DISTANCE },
    to: { y: 0 },
  },
  slideDown: {
    from: { y: -SLIDE_DISTANCE },
    to: { y: 0 },
  },
  slideLeft: {
    from: { x: -SLIDE_DISTANCE },
    to: { x: 0 },
  },
  slideRight: {
    from: { x: SLIDE_DISTANCE },
    to: { x: 0 },
  },
};

type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight";

type TransitionProps = {
  as?: React.ElementType;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  triggerOnce?: boolean;
  onComplete?: gsap.CallbackVars["onComplete"];
  children: React.ReactNode;
  animateOnScroll?: boolean;
  invalidateOnRefresh?: boolean;
};

export const Transition = ({
  as = "div",
  animation = "fadeInUp",
  duration = 0.5,
  delay = 0,
  ease = "power2.inOut",
  className = "",
  triggerOnce = true,
  animateOnScroll = true,
  invalidateOnRefresh = true,
  onComplete,
  children,
}: TransitionProps) => {
  const Component = as;
  const ref = useRef<HTMLDivElement>(null);
  const config = animationConfig[animation];

  useGSAP(() => {
    if (!ref.current) return;

    gsap.set(ref.current, config.from);

    gsap.to(ref.current, {
      ...config.to,
      duration: duration,
      delay: delay,
      ease: ease,
      onComplete,
      ...(animateOnScroll
        ? {
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              toggleActions: triggerOnce
                ? "play none none none"
                : "play none none reverse",
              invalidateOnRefresh,
              immediateRender: false,
              onRefresh: (self) => {
                if (self.progress > 0 && self.progress < 1) {
                  self.animation?.play();
                }
              },
            },
          }
        : {}),
    });

    if (animateOnScroll) {
      ScrollTrigger.refresh();
    }
  }, [
    animation,
    duration,
    delay,
    ease,
    triggerOnce,
    animateOnScroll,
    invalidateOnRefresh,
  ]);

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: animation.includes("fade") ? 0 : 1,
      }}
    >
      {children}
    </Component>
  );
};
