"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";

type CardCollapsibleProps = BlockProps<"card-collapsible">;

type CardsProps = {
  cards: CardCollapsibleProps["cards"];
};

export const Cards = ({ cards }: CardsProps) => {
  if (!cards || cards.length === 0) return null;

  //   set the first card as the default selection
  const [selection, setSelection] = useState<string | null>(
    cards[0]?._key ?? null,
  );

  return (
    <ul className="col-span-full mt-15 flex flex-col gap-y-2 lg:mt-20 lg:flex-row lg:gap-5">
      {cards?.map((card, index) => (
        <li
          key={card._key}
          className='group transform-gpu transition-all lg:data-[state="closed"]:w-[15%] lg:data-[state="open"]:w-[50%] lg:data-[state="closed"]:duration-500 lg:data-[state="open"]:duration-500'
          data-state={selection === card._key ? "open" : "closed"}
          onMouseEnter={() => {
            setSelection(card._key);
          }}
        >
          <Transition
            animation="fadeInUp"
            delay={0.15 + index * 0.15}
            className="group flex flex-col justify-between bg-white p-4 text-black lg:group-data-[state='closed']:h-full"
          >
            <div className="flex justify-between">
              <span className="py type-mono-1240 max-w-fit self-start bg-neon px-[2px] text-black">
                0{index + 1}
              </span>
              {card.image && (
                <SanityImage
                  image={card.image}
                  sizes="200px"
                  className="max-h-34.25 max-w-34.25 transition-width duration-300 lg:max-h-14 lg:max-w-14 lg:group-data-[state='open']:max-h-50 lg:group-data-[state='open']:max-w-50"
                />
              )}
            </div>
            <div className="invisible mt-10 space-y-8 opacity-0 transition-all duration-300 group-data-[state='open']:visible group-data-[state='closed']:h-0 group-data-[state='open']:opacity-100 group-data-[state='closed']:delay-0 group-data-[state='open']:delay-300 lg:mt-0 lg:w-1/2">
              {/* Top title */}
              {card.title && (
                <h3 className="type-heading-2430 lg:type-heading-3230 mb-10 text-balance lg:mb-16">
                  <PortableTextFragment value={card.title} />
                </h3>
              )}
              {card.content?.map((content, cardIndex) => (
                <div key={content._key}>
                  {content.eyebrow && (
                    <Eyebrow
                      className="mb-3 text-balance lg:mb-4"
                      variant={cardIndex === 0 ? "white-sm" : "neon-sm"}
                    >
                      {content.eyebrow}
                    </Eyebrow>
                  )}
                  {content.description && (
                    <PortableText
                      value={content.description}
                      className="text-balance"
                    />
                  )}
                </div>
              ))}
              {card.link && (
                <Button
                  variant="tertiary-black"
                  link={card.link[0]}
                  className="whitespace-normal"
                >
                  {card.link[0].title}
                </Button>
              )}
            </div>
            {/* Bottom title */}
            {card.title && (
              <h3 className="type-heading-1630 invisible h-0 text-balance opacity-0 transition-opacity duration-300 group-data-[state='closed']:visible group-data-[state='closed']:h-auto group-data-[state='closed']:opacity-100 group-data-[state='closed']:delay-300 group-data-[state='open']:delay-0">
                <PortableTextFragment value={card.title} />
              </h3>
            )}
          </Transition>
        </li>
      ))}
    </ul>
  );
};
