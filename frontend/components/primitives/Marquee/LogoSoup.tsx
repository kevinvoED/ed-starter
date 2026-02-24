"use client";

import type { ResolvedImageType } from "@/components/primitives/Image/SanityImage";
import { LogoSoup as LogoSoupPrimitive, useLogoSoup } from "react-logo-soup";
import { cn } from "@/lib/utils/cn";

type LogoSoupProps = {
  className?: string;
  images: ResolvedImageType[];
};

// @docs: https://github.com/sanity-labs/react-logo-soup

export const LogoSoup = ({ className, images }: LogoSoupProps) => {
  const { normalizedLogos } = useLogoSoup({
    logos: [
      ...(images?.map((item) => ({
        src: item.asset?.url || "",
        alt: item.alt || "Logo Image",
      })) || []),
    ],
  });

  return (
    <LogoSoupPrimitive
      gap={30}
      baseSize={80}
      logos={[...normalizedLogos, ...normalizedLogos, ...normalizedLogos]}
      className={cn(
        "whitespace-nowrap! logo-soup-container text-left!",
        className,
      )}
    />
  );
};
