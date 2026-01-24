"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { Button, type ResolvedLinkType } from "@/components/Button/Button";
import { cn } from "@/lib/utils";

type FooterLinkProps = {
  className?: string;
  link: ResolvedLinkType;
  onClick?: () => void;
  isLightTheme?: boolean;
};

export const FooterLink = ({
  className,
  link,
  onClick,
  isLightTheme = false,
}: FooterLinkProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !backgroundRef.current || !buttonRef.current) {
      return;
    }

    const textElement = buttonRef.current.querySelector("span");
    if (!textElement) return;
    textRef.current = textElement as HTMLSpanElement;

    gsap.set(textRef.current, { x: 0 });
    gsap.set(backgroundRef.current, { opacity: 0 });

    const handleMouseEnter = () => {
      if (!textRef.current) return;

      // Allow animation to trigger even if you quickly re-hover
      gsap.killTweensOf([textRef.current, backgroundRef.current]);

      gsap.set(textRef.current, {
        x: 24,
        color: isLightTheme ? "#ffffff" : "#000000",
      });
      gsap.set(backgroundRef.current, { opacity: 1 });
    };

    const handleMouseLeave = () => {
      if (!textRef.current) return;

      gsap.killTweensOf([textRef.current, backgroundRef.current]);

      gsap.to(textRef.current, {
        x: 0,
        color: isLightTheme ? "#000000" : "#ffffff",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(backgroundRef.current, {
        opacity: 0,
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
  }, [isLightTheme]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Neon background element */}
      <div
        ref={backgroundRef}
        className={cn(
          "absolute inset-0 bg-neon",
          isLightTheme ? "bg-black" : "bg-neon",
        )}
        aria-hidden="true"
      />

      {/* Button with original children structure */}
      <Button
        link={link}
        variant="footer-link"
        hasArrow={false}
        className="!max-w-none relative z-10 w-full"
        ref={buttonRef}
        onClick={onClick}
      >
        {link.title}
      </Button>
    </div>
  );
};
