"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/cn";
import { CustomEase, SplitText } from "gsap/all";

type TextRevealProps = {
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  className?: string;
  boxColor?: "bg-white" | "bg-black" | "bg-neon";
  triggerOnce?: boolean;
  children: React.ReactNode;
};

gsap.registerPlugin(CustomEase);

export const TextReveal = ({
  duration = 1,
  delay = 0,
  stagger = 0,
  ease = "power4.inOut",
  className,
  boxColor = "bg-neon",
  triggerOnce = true,
  children,
}: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Set container to visible or else you'll see a brief flash on page load
    gsap.set(containerRef.current, { opacity: 1 });

    // Target any nested PortableText elements inside heading tags, otherwise use the container itself
    const textElement =
      containerRef.current?.querySelector(
        "h1 p, h2 p, h3 p, h4 p, h5 p, h6 p",
      ) || containerRef.current;
    if (!textElement) return;

    SplitText.create(textElement, {
      type: "lines",
      linesClass: "line",
      autoSplit: true,
      onSplit: (self) => {
        const lines = self.lines;

        // Wrap each line with a container and add a box element that we can animate
        lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.className = "line-wrapper";
          const box = document.createElement("div");
          box.className = `line-box ${boxColor}`;
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
          wrapper.appendChild(box);
        });

        const boxEase = CustomEase.create("customEase", "1, 0, 0, 1");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            toggleActions: triggerOnce
              ? "play none none none"
              : "play none none reverse",
          },
        });

        // Animate each line's box and text
        lines.forEach((line, index) => {
          const wrapper = line.parentElement;
          const box = wrapper?.querySelector(".line-box");

          if (!box) return;

          // Set initial states
          gsap.set(box, { x: "-102%" });
          gsap.set(line, { opacity: 0 });

          const lineDelay = delay + index * stagger;

          // Start animation: box sliding in from left
          tl.fromTo(
            box,
            { x: "-102%" }, // Do not put 100% or you'll see 1px of the box on page load
            {
              x: "0%",
              duration: duration,
              delay: lineDelay,
              ease: boxEase,
            },
            0, // Start all animations from the same time
          );

          // Exit animation: box sliding out to the right
          tl.to(
            box,
            {
              x: "102%",
              duration: duration,
              ease: boxEase,
            },
            lineDelay + duration,
          );

          // Post-exit animation: text fades in DURING the box transition
          tl.fromTo(
            line,
            { opacity: 0 },
            {
              opacity: 1,
              duration: duration,
              ease: "power2.inOut",
            },
            "-=100%",
          );
        });
      },
    });
  }, [duration, delay, stagger, ease, boxColor, triggerOnce]);

  return (
    <div
      ref={containerRef}
      style={{ opacity: 0 }}
      className={cn(
        "[&_.line-box]:pointer-events-none [&_.line-box]:absolute [&_.line-box]:inset-0 [&_.line-box]:z-20 [&_.line-wrapper:first-of-type]:mt-0 [&_.line-wrapper]:relative [&_.line-wrapper]:-mt-[0.1em] [&_.line-wrapper]:min-h-[1.1em] [&_.line-wrapper]:w-fit [&_.line-wrapper]:overflow-hidden [&_.line]:relative [&_.line]:z-10 [&_.line]:w-fit",
        className,
      )}
    >
      {children}
    </div>
  );
};
