"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { SanityImage } from "@/components/Media/SanityImage";

type FullImageProps = BlockProps<"full-image">;

export const FullImage = ({ image }: FullImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.set(containerRef.current, {
        opacity: 0,
        scale: 1,
        transform: "translateY(100px)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top-=100vh bottom",
        },
      });

      tl.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power2.inOut",
      });

      tl.to(containerRef.current, {
        scale: 1.25,
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <figure
      className="min-h-[calc(110vh)] w-full overflow-hidden bg-black"
      data-nav-theme="dark"
    >
      <div
        ref={containerRef}
        className="grid min-h-[calc(110vh)] w-full"
        style={{ opacity: 0, transform: "translateY(100px)" }}
      >
        <SanityImage image={image} sizes="100vw" className="size-full" />
      </div>
    </figure>
  );
};
