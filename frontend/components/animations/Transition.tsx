"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  slot?: React.ElementType;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  triggerOnce?: boolean;
  onComplete?: gsap.CallbackVars["onComplete"];
  children: React.ReactNode;
};

export const Transition = ({
  slot = "div",
  animation = "fadeInUp",
  duration = 0.5,
  delay = 0,
  ease = "power2.inOut",
  className = "",
  triggerOnce = true,
  onComplete,
  children,
}: TransitionProps) => {
  const Component = slot;
  const ref = useRef<HTMLDivElement>(null);
  const config = animationConfig[animation];

  useGSAP(() => {
    if (!ref.current) return;

    gsap.set(ref.current, config.from);

    gsap.to(ref.current, {
      ...config.to,
      duration: Number(duration),
      delay: Number(delay),
      ease: ease,
      onComplete,
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        toggleActions: triggerOnce
          ? "play none none none"
          : "play none none reverse",
        immediateRender: false,
        onRefresh: (self) => {
          if (self.progress > 0 && self.progress < 1) {
            self.animation?.play();
          }
        },
      },
    });

    ScrollTrigger.refresh();
  }, [animation, duration, delay, triggerOnce]);

  const initialTransform = () => {
    if (animation === "slideUp") {
      return "translateY(100px)";
    }
    if (animation === "slideDown") {
      return "translateY(-100px)";
    }
    if (animation === "slideLeft") {
      return "translateX(-100px)";
    }
    if (animation === "slideRight") {
      return "translateX(100px)";
    }
  };

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: animation.includes("fade") ? 0 : 1,
        transform: initialTransform(),
      }}
    >
      {children}
    </Component>
  );
};
