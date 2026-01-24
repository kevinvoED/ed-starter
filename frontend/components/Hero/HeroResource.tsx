"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { TextMask } from "@/components/GSAP/TextMask";
import { cn } from "@/lib/utils";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);

type HeroResourceProps = {
  title: string | null;
  description: string | null;
  className?: string;
};

export const HeroResource = ({
  title,
  description,
  className,
}: HeroResourceProps) => {
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const middleBoxRef = useRef<HTMLDivElement>(null);
  const titleBoxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const boxEase = CustomEase.create("customEase", "1, 0, 0, 1");

    gsap.set([leftBoxRef.current, middleBoxRef.current, titleBoxRef.current], {
      width: 0,
    });

    gsap.to(leftBoxRef.current, {
      width: "auto",
      duration: 0.75,
      delay: 0.25,
      ease: boxEase,
    });
    gsap.to(middleBoxRef.current, {
      width: "auto",
      duration: 0.5,
      delay: 0.25,
      ease: boxEase,
    });
    gsap.to(titleBoxRef.current, {
      width: "auto",
      duration: 0.75,
      delay: 0.25,
      ease: boxEase,
    });
  });
  return (
    <header
      className={cn(
        "grid-custom-md gap-y-6 pr-4 md:gap-y-14 md:pr-6",
        className,
      )}
    >
      <div className="col-span-full md:col-span-10">
        <div className="grid grid-cols-[7px_17px_1fr] sm:grid-cols-[44px_100px_1fr]">
          <div
            ref={leftBoxRef}
            className="col-span-1 row-start-1 h-2 self-end bg-black sm:h-7.5"
            style={{ width: 0 }}
          />
          <div
            ref={middleBoxRef}
            className="col-span-1 col-start-2 row-start-2 h-3.5 bg-black sm:h-11"
            style={{ width: 0 }}
          />
          {title && (
            <h1
              ref={titleBoxRef}
              className="typef-heading-64-80-120 col-start-3 row-start-1 max-w-fit overflow-hidden bg-black pb-1.5 text-white lg:whitespace-nowrap"
              style={{ width: 0 }}
            >
              {title}
            </h1>
          )}
        </div>
      </div>

      {/* Remove the number for now as per Chris's request since they don't have many posts yet */}
      {/* {number && number >= 1 ? (
        <Transition className="type-heading-12030 col-span-2 col-start-4 row-start-1 hidden text-right sm:col-start-11 sm:inline">
          {number}
        </Transition>
      ) : null} */}

      {description && (
        <TextMask className="col-span-full row-start-2 md:col-span-6 lg:col-span-3 lg:col-start-3">
          <p className="type-body-1440 md:type-body-1640 pl-5 md:pl-6">
            {description}
          </p>
        </TextMask>
      )}
    </header>
  );
};
