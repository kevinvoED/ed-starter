"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useRef, useState } from "react";
import { Button } from "@/components/Button/Button";
import MyErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { TextReveal } from "@/components/GSAP/TextReveal";
import { Transition } from "@/components/GSAP/Transition";
import LottieAnimation from "@/components/LottieAnimation/LottieAnimation";
import { Pattern } from "@/components/Media/Pattern";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import SimpleModuleBuilder, {
  type SimpleModuleBuilderProps,
} from "@/components/SimpleModuleBuilder";

type HeroTertiaryProps = BlockProps<"hero-tertiary">;

const DescriptionCtaBlock = ({
  description,
  links,
  className = "",
}: Pick<HeroTertiaryProps, "description" | "links"> & {
  className: string;
}) => (
  <Transition
    delay={1.5}
    className={`col-span-full md:col-span-7 md:col-start-2 ${className}`}
  >
    <div
      className="parallax-item grid-custom grid-cols-4"
      data-gsap-parallax-offset="120"
    >
      <div className="col-span-full md:col-span-2">
        {description && <PortableText value={description} />}
      </div>
    </div>
    <div className="mt-15 md:mt-27">
      <div
        className="parallax-item flex flex-wrap justify-start gap-x-17 gap-y-10"
        data-gsap-parallax-offset="100"
      >
        {links?.map((link, index) => (
          <Button
            key={link._key}
            link={link}
            variant={index === 0 ? "secondary-white" : "tertiary-neon"}
            hasArrow={index === 0}
          >
            {link.title}
          </Button>
        ))}
      </div>
    </div>
  </Transition>
);

export const HeroTertiary = ({
  lottieAnimation,
  eyebrow,
  title,
  description,
  links,
  contentTitle,
  contentBlocks,
}: HeroTertiaryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);

  return (
    <MyErrorBoundary>
      <div
        className="bg-black p-custom pb-60-140-220 text-white"
        data-nav-theme="dark"
      >
        <div ref={containerRef}>
          <div className="flex flex-col justify-between pt-80-160-220 md:pb-40-60-100">
            <div className="grid-custom-md min-h-screen md:h-auto">
              <div className="relative col-span-full row-start-1 md:col-span-7 md:row-start-auto">
                {eyebrow && (
                  <Transition
                    delay={1.5}
                    className="mb-4 md:absolute md:top-0 md:left-0 md:mb-0"
                  >
                    <Eyebrow variant="dot-neon">{eyebrow}</Eyebrow>
                  </Transition>
                )}
                {title && (
                  <TextReveal className="[&_p]:typef-heading-32-64-80 text-charcoal [&_.line-wrapper:first-of-type]:md:indent-text-reveal-2col [&_p]:leading-none">
                    <PortableText value={title} />
                  </TextReveal>
                )}
              </div>
              {lottieAnimation && (
                <div className="col-span-full row-start-2 mt-10 md:sticky md:top-30 md:col-span-4 md:col-start-9 md:row-start-auto md:mt-0">
                  <Transition
                    delay={2}
                    onComplete={() => setIsPlayingAnimation(true)}
                  >
                    <LottieAnimation
                      play={isPlayingAnimation}
                      animation={lottieAnimation}
                    />
                  </Transition>
                </div>
              )}
              <DescriptionCtaBlock
                description={description}
                links={links}
                className="row-start-3 mt-10 md:row-start-auto md:mt-34"
              />
              {contentTitle && (
                <Transition className="col-span-full row-start-4 mt-24 md:col-span-7 md:row-start-auto md:mt-60 md:text-pretty">
                  <h2 className="type-heading-2430 md:type-heading-4830 text-charcoal">
                    <PortableTextFragment value={contentTitle} />
                  </h2>
                </Transition>
              )}
              <div className="grid-custom-md col-span-full mt-10 md:mt-12 md:h-auto lg:col-span-7">
                {contentBlocks && (
                  <SimpleModuleBuilder
                    className="col-span-full bg-black text-white"
                    data-nav-theme="dark"
                    // force these content blocks that are defined in the simple module builder
                    blocks={
                      contentBlocks as unknown as SimpleModuleBuilderProps["blocks"]
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pattern variant="black-white" _type="pattern" _key="" />
    </MyErrorBoundary>
  );
};
