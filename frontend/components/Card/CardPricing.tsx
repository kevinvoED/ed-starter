"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type CardPricingProps = BlockProps<"card-pricing">;

export const CardPricing = ({ eyebrow, title, cards }: CardPricingProps) => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <div className="grid-custom gap-y-0 p-custom py-25" data-nav-theme="light">
      <div className="relative col-span-full lg:col-span-6">
        {eyebrow && (
          <Transition duration={1.5}>
            <Eyebrow variant="dot-black" className="top-2 left-0 lg:absolute">
              {eyebrow}
            </Eyebrow>
          </Transition>
        )}
        {title && (
          <Transition>
            <h2 className="type-heading-2430 lg:typef-heading-32-48-64 lg:indent-2col">
              <PortableTextFragment value={title} />
            </h2>
          </Transition>
        )}
      </div>
      <Transition delay={0.15} className="col-span-full mt-6 lg:mt-20">
        <div className="flex w-fit items-center gap-1 rounded-[3px] bg-alabaster p-1">
          <Button
            variant={isMonthly ? "switch-active" : "switch"}
            onClick={() => setIsMonthly(true)}
          >
            Monthly
          </Button>
          <Button
            variant={isMonthly ? "switch" : "switch-active"}
            onClick={() => setIsMonthly(false)}
          >
            Annualy
          </Button>
        </div>
      </Transition>

      <ul className="grid-custom col-span-full mt-10">
        {cards?.map((card, index) => {
          const hasMonthlyPrice = card.price?.monthly;
          const showYearlyFallback = isMonthly && !hasMonthlyPrice;

          let displayPrice = card.price?.yearly;
          if (isMonthly && hasMonthlyPrice) {
            displayPrice = card.price?.monthly;
          }

          let billingText = "Billed annually";
          if (showYearlyFallback) {
            billingText = "Annually only";
          } else if (isMonthly) {
            billingText = "Billed monthly";
          }

          let periodText = "/yr";
          if (isMonthly && hasMonthlyPrice) {
            periodText = "/mo";
          }

          return (
            <li key={card._key} className="col-span-full lg:col-span-3">
              <Transition
                animation="fadeInUp"
                delay={0.15 + index * 0.15}
                className={cn(
                  "group flex h-full flex-col justify-between gap-y-10 border border-transparent px-4 py-6 lg:p-6",
                  showYearlyFallback
                    ? "border-alabaster bg-transparent text-charcoal"
                    : "bg-white",
                )}
              >
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    {card.title && (
                      <h3 className="type-heading-2430 lg:type-heading-3230 text-balance">
                        <PortableTextFragment value={card.title} />
                      </h3>
                    )}
                    {card.eyebrow && (
                      <Eyebrow variant="neon-sm" className="h-3.75">
                        {card.eyebrow}
                      </Eyebrow>
                    )}
                  </div>
                  {card.description && (
                    <PortableText
                      value={card.description}
                      className="text-balance"
                    />
                  )}
                </div>
                <div>
                  <p className="type-body-1040 mb-3 text-charcoal uppercase">
                    Starting from
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="type-heading-3230 lg:type-heading-4830">
                      ${displayPrice}
                    </span>
                    <span className="type-body-1440 lg:type-body-1640">
                      {periodText}
                    </span>
                  </div>
                  <p className="type-body-1440 mt-2">{billingText}</p>
                  <hr className="my-6 border-alabaster" />
                  {card.content && (
                    <>
                      <p className="type-body-1040 mb-3 text-charcoal uppercase lg:mb-4">
                        Monthly volume
                      </p>
                      <div className="[&_p]:type-body-1440 [&_ul]:type-body-1440 [&_li>div]:h-[3px] [&_li>div]:w-[3px] [&_li]:mb-2">
                        <PortableText value={card.content} />
                      </div>
                    </>
                  )}
                </div>
                {card.link && (
                  <Button
                    variant="secondary-black"
                    link={card.link[0]}
                    className={cn(
                      "whitespace-normal",
                      showYearlyFallback && "pointer-events-none opacity-50",
                    )}
                    disabled={showYearlyFallback}
                  >
                    {card.link[0].title}
                  </Button>
                )}
              </Transition>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
