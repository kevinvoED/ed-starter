"use client";

import { useGSAP } from "@gsap/react";
import { type ElementType, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "cnfast";
import { CustomEase, SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type TextRevealProps = {
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
  as?: ElementType;
  triggerOnce?: boolean;
  x?: string | number;
  y?: string | number;
  onComplete?: gsap.CallbackVars["onComplete"];
  invalidateOnRefresh?: boolean;
  boxColor?: "bg-white" | "bg-black" | "bg-debug-blue";
};

// Check if window is defined to avoid hydration errors
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, SplitText);
}

const extractTypographyClasses = (className: string) =>
  className
    .split(/\s+/)
    .filter(
      (cls) =>
        cls === "ftype" ||
        cls.startsWith("type-") ||
        cls.startsWith("to-type-") ||
        cls.includes("text-balance"),
    )
    .join(" ");

export const TextBoxReveal = ({
  as = "div",
  children,
  animateOnScroll = true,
  delay = 0,
  duration = 1,
  stagger = 0.1,
  scrub = false,
  markers = false,
  start = "top bottom",
  x = "-102%",
  y = "0%",
  end,
  className = "",
  onComplete,
  triggerOnce = true,
  invalidateOnRefresh = true,
  boxColor = "bg-debug-blue",
}: TextRevealProps) => {
  const Component = as;
  const containerRef = useRef<HTMLDivElement | HTMLHeadingElement>(null);
  const splitInstances = useRef<InstanceType<typeof SplitText>[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Set container to visible or else you'll see a brief flash on page load
      gsap.set(containerRef.current, { opacity: 1 });

      splitInstances.current = [];

      // Split each direct child separately (e.g. PortableText wrapper), otherwise use the container
      const elementChildren = Array.from(
        containerRef.current.children as HTMLCollectionOf<HTMLElement>,
      );
      const targets =
        containerRef.current.hasAttribute("data-anim-text-box-reveal") &&
        elementChildren.length > 0
          ? elementChildren
          : [containerRef.current];

      const lineEntries: { line: Element; target: HTMLElement }[] = [];

      targets.forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          linesClass: "line",
          autoSplit: true,
        });

        splitInstances.current.push(split);

        for (const line of split.lines) {
          lineEntries.push({ line, target: el });
        }
      });

      // Wrap each line with a container and add a box element that we can animate
      lineEntries.forEach(({ line, target }) => {
        const wrapper = document.createElement("div");
        const typographyClasses =
          extractTypographyClasses(target.className) ||
          extractTypographyClasses(containerRef.current?.className ?? "");
        wrapper.className = cn("line-wrapper", typographyClasses);
        const box = document.createElement("div");
        box.className = `line-box ${boxColor}`;
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
        wrapper.appendChild(box);
      });

      const boxEase = CustomEase.create("customEase", "1, 0, 0, 1");

      const tl = gsap.timeline({
        ...(animateOnScroll
          ? {
              scrollTrigger: {
                trigger: containerRef.current,
                start,
                ...(end ? { end } : {}),
                scrub,
                markers,
                invalidateOnRefresh,
                ...(scrub
                  ? {}
                  : {
                      toggleActions: triggerOnce
                        ? "play none none none"
                        : "play none none reverse",
                    }),
              },
            }
          : {}),
        onComplete,
      });

      // Animate each line's box and text
      lineEntries.forEach(({ line }, index) => {
        const wrapper = line.parentElement;
        const box = wrapper?.querySelector(".line-box");

        if (!box) return;

        // Set initial states
        gsap.set(box, { x, y });
        gsap.set(line, { opacity: 0 });

        const lineDelay = delay + index * stagger;

        // Start animation: box sliding in from left
        tl.fromTo(
          box,
          { x, y }, // Do not put 100% or you'll see 1px of the box on page load
          {
            x: "0%",
            y: "0%",
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
            y: "0%",
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
            ease: boxEase,
          },
          "-=120%",
        );
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();

        const container = containerRef.current;
        if (container) {
          container.querySelectorAll(".line-wrapper").forEach((wrapper) => {
            const line = wrapper.querySelector(".line");
            if (line) {
              wrapper.parentNode?.insertBefore(line, wrapper);
            }
            wrapper.remove();
          });
        }

        for (const split of splitInstances.current) {
          split.revert();
        }
        splitInstances.current = [];
      };
    },
    {
      scope: containerRef,
      dependencies: [
        animateOnScroll,
        delay,
        duration,
        stagger,
        boxColor,
        triggerOnce,
        start,
        end,
        scrub,
        markers,
        invalidateOnRefresh,
        x,
        y,
        onComplete,
      ],
    },
  );
  return (
    <Component
      ref={containerRef}
      data-anim-text-box-reveal={true}
      style={{ opacity: 0 }}
      className={cn(
        "[&_.line-box]:pointer-events-none [&_.line-box]:absolute [&_.line-box]:inset-0 [&_.line-box]:z-20 [&_.line-wrapper:first-of-type]:mt-0 [&_.line-wrapper]:relative [&_.line-wrapper]:mt-[-0.1em] [&_.line-wrapper]:min-h-[1.1em] [&_.line-wrapper]:w-fit [&_.line-wrapper]:overflow-hidden [&_.line-wrapper]:pb-[0.15em] [&_.line]:relative [&_.line]:z-10 [&_.line]:w-fit",
        className,
      )}
    >
      {children}
    </Component>
  );
};
