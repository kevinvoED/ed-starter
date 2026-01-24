"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { Dot } from "@/components/Dot/Dot";

type TabItemProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

export const TabItem = ({ title, isActive, onClick }: TabItemProps) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      !containerRef.current ||
      !backgroundRef.current ||
      !textRef.current ||
      !dotRef.current
    ) {
      return;
    }

    gsap.set(textRef.current, { x: 0 });
    gsap.set(backgroundRef.current, { opacity: 0 });

    const handleMouseEnter = () => {
      if (!textRef.current || isActive) return;

      gsap.killTweensOf([
        textRef.current,
        backgroundRef.current,
        dotRef.current,
      ]);

      gsap.set(textRef.current, { x: 20, color: "#000000" });
      gsap.set(backgroundRef.current, {
        opacity: 1,
        width: "calc(100% + 20px)",
      });
      gsap.set(dotRef.current, { opacity: 1, x: -4 });
      gsap.to(dotRef.current, { x: 7, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      if (!textRef.current || isActive) return;

      gsap.killTweensOf([
        textRef.current,
        backgroundRef.current,
        dotRef.current,
      ]);

      gsap.to(textRef.current, {
        x: 0,
        color: "#ffffff",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(backgroundRef.current, {
        opacity: 0,
        width: "100%",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        opacity: 0,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const container = containerRef.current;
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isActive]);

  if (isActive) {
    return (
      <button
        type="button"
        disabled
        className="type-mono-1240 pointer-events-none relative inline-flex w-fit shrink-0 items-center bg-neon px-1 py-px pr-[calc(0.25rem+20px)] text-left text-black uppercase"
      >
        <Dot color="black" className="absolute top-1.5 left-1 translate-x-1" />
        <span className="relative z-10 translate-x-[20px]">{title}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      ref={containerRef}
      className="relative inline-flex w-fit shrink-0 items-center px-1 py-px"
      onClick={onClick}
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-neon"
        aria-hidden="true"
      />
      <Dot
        color="black"
        className="absolute top-1.5 left-1 translate-x-[-4px] opacity-0 will-change-transform"
        ref={dotRef}
      />
      <div
        className="type-mono-1240 relative z-10 text-left uppercase"
        ref={textRef}
      >
        {title}
      </div>
    </button>
  );
};
