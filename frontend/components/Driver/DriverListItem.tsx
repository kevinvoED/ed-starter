"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { Button, type ResolvedLinkType } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Icon } from "@/components/Icon/Icon";
import { cn } from "@/lib/utils";

type DriverListItemProps = {
  className?: string;
  link: ResolvedLinkType;
  eyebrow?: string | null;
  size?: "sm" | "lg";
};

export const DriverListItem = ({
  className,
  link,
  eyebrow,
  size = "lg",
}: DriverListItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !backgroundRef.current || !buttonRef.current) {
      return;
    }

    gsap.set(backgroundRef.current, { width: "0" });

    let expandComplete = true;
    let shouldCollapse = false;

    const handleMouseEnter = () => {
      // Only run hover effect on desktop (1024px and above)
      if (window.innerWidth < 1024) return;

      shouldCollapse = false;
      expandComplete = false;

      gsap.killTweensOf([backgroundRef.current]);

      gsap.to(backgroundRef.current, {
        width: "auto",
        duration: 0.5,
        ease: "power4.out",
        onComplete: () => {
          expandComplete = true;
          if (shouldCollapse) {
            gsap.to(backgroundRef.current, {
              width: 0,
              duration: 0.5,
              ease: "power4.out",
            });
          }
        },
      });
    };

    const handleMouseLeave = () => {
      // Only run hover effect on desktop (1024px and above)
      if (window.innerWidth < 1024) return;

      if (expandComplete) {
        gsap.to(backgroundRef.current, {
          width: 0,
          duration: 0.5,
          ease: "power4.out",
        });
      } else {
        shouldCollapse = true;
      }
    };

    const container = containerRef.current;
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative grid items-center gap-x-5 gap-y-3 py-6 lg:gap-y-0",
        size === "lg" ? "grid-cols-8" : "grid-cols-6",
        className,
      )}
    >
      <div
        ref={backgroundRef}
        id="neon-bg"
        className="absolute inset-0 col-span-full bg-neon"
        aria-hidden="true"
      />

      {eyebrow && (
        <Eyebrow
          variant="dot-black"
          className="z-10 col-span-full lg:col-span-2"
        >
          {eyebrow}
        </Eyebrow>
      )}

      <Button
        link={link}
        variant="card"
        hasArrow={false}
        className={cn(
          "type-body-1650 z-10 w-full whitespace-pre-wrap",
          size === "lg" ? "col-span-7 lg:col-span-5" : "col-span-3",
        )}
        ref={buttonRef}
      >
        {link.title}
      </Button>

      <Icon
        variant="arrow-right"
        className={cn(
          "z-10 size-4 justify-self-end transition-transform duration-700 ease-(--button-bezier) group-hover:-rotate-45 lg:mr-6",
          size === "lg" ? "col-start-8" : "col-start-6",
        )}
      />
    </div>
  );
};
