"use client";

import type { ModuleProps } from "@/sanity/lib/fetch";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import { horizontalLoop } from "@/lib/styles/animations";
import { cn } from "@/lib/utils/cn";
import { LogoSoup, useLogoSoup } from "@sanity-labs/logo-soup/react";
import { Observer } from "gsap/all";

type ImageMarqueeProps = {
  items: ModuleProps<"marquee">["images"];
  className?: string;
  enableVelocity: boolean;
  direction?: "left" | "right";
  imageType?: "regular" | "logo" | null;
  mobileBaseSize: number;
  desktopBaseSize: number;
  gap: number;
};

// https://codepen.io/mark_sottek/pen/pvoaXRv
// https://github.com/sanity-labs/logo-soup#readme

export const ImageMarquee = ({
  className,
  items,
  enableVelocity,
  direction = "right",
  imageType = "regular",
  mobileBaseSize,
  desktopBaseSize,
  gap,
}: ImageMarqueeProps) => {
  if (!items || items.length === 0) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const observerRef = useRef<Observer | null>(null);

  const { isMobile } = useIsMobile();

  const { normalizedLogos } = useLogoSoup({
    logos: [
      ...(items?.map((item) => ({
        src: item?.asset?.url || "",
        alt: item?.alt || "Logo Image",
      })) || []),
    ],
  });

  useEffect(() => {
    if (!containerRef.current || normalizedLogos.length === 0) return;

    let animationFrameId: number;
    let isMounted = true;

    const initializeAnimation = () => {
      if (!containerRef.current || !isMounted) return;

      const scrollingText = gsap.utils.toArray<Element>(
        containerRef.current.querySelectorAll(".logo-soup-container span"),
      );

      if (scrollingText.length === 0) {
        animationFrameId = requestAnimationFrame(initializeAnimation);
        return;
      }

      const tl = horizontalLoop(scrollingText as HTMLElement[], {
        repeat: -1,
        paddingRight: `${gap}px`,
        reversed: direction === "right",
      });

      timelineRef.current = tl;

      if (enableVelocity) {
        observerRef.current = Observer.create({
          onChangeY(self) {
            let factor = 2;
            if (self.deltaY > 0) {
              factor *= -1;
            }
            gsap
              .timeline({
                defaults: {
                  ease: "none",
                },
              })
              .to(tl, {
                timeScale: factor * 2.5,
                duration: 0.2,
                overwrite: true,
              })
              .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0");
          },
        });
      }
    };

    initializeAnimation();

    return () => {
      isMounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (observerRef.current) {
        observerRef.current.kill();
      }
    };
  }, [normalizedLogos, direction, enableVelocity, gap]);

  if (imageType === "logo" && normalizedLogos && normalizedLogos.length >= 0)
    return (
      <div
        ref={containerRef}
        role="marquee"
        className={cn("overflow-hidden whitespace-nowrap", className)}
      >
        <LogoSoup
          gap={gap}
          baseSize={isMobile ? mobileBaseSize : desktopBaseSize}
          logos={[...normalizedLogos, ...normalizedLogos, ...normalizedLogos]}
          className="whitespace-nowrap! logo-soup-container"
        />
      </div>
    );

  if (imageType === "regular" && items && items.length >= 0)
    return (
      <div
        ref={containerRef}
        role="marquee"
        className={cn(
          "logo-soup-container relative flex items-center justify-around overflow-hidden whitespace-nowrap",
          className,
        )}
      >
        {[...items, ...items, ...items].map((image, index) => {
          if (!image) return null;

          return (
            <span
              className="relative z-1 size-full min-w-80"
              key={`${image._key}-${index}`}
              style={{ marginRight: `${gap}px` }}
            >
              <SanityImage image={image} sizes="100vw" />
            </span>
          );
        })}
      </div>
    );

  return null;
};
