"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { toPlainText } from "@portabletext/react";
import { parseAsString, useQueryState } from "nuqs";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import { PortableTextFragment } from "@/components/PortableText/PortableText";
import { TabItem } from "./TabItem";
import { kebabCase } from "es-toolkit/string";

type ImageTextTabProps = BlockProps<"image-text-tab">;
type Card = NonNullable<ImageTextTabProps["cards"]>[number];

const getSlug = (card: Card) =>
  card.title ? kebabCase(toPlainText(card.title)) : "";

type TabsProps = {
  title: string | null;
  cards: ImageTextTabProps["cards"];
};

export const Tabs = ({ title, cards }: TabsProps) => {
  const defaultSlug = cards?.[0] ? getSlug(cards[0]) : "";

  const [activeSlug, setActiveSlug] = useQueryState(
    "tab",
    parseAsString.withDefault(defaultSlug).withOptions({ shallow: false }),
  );

  const activeCard = cards?.find((card) => getSlug(card) === activeSlug);

  return (
    <>
      <div className="col-span-full lg:col-span-4">
        {title && (
          <Transition className="mb-6 lg:mb-8">
            <p className="type-body-1640">{title}</p>
          </Transition>
        )}
        <Transition delay={0.1}>
          <div className="flex gap-4 overflow-x-scroll pb-10 lg:flex-col lg:overflow-x-hidden">
            {cards?.map((card) => {
              const slug = getSlug(card);
              return (
                <TabItem
                  key={card._key}
                  title={card.title ? toPlainText(card.title) : ""}
                  isActive={slug === activeSlug}
                  onClick={() => setActiveSlug(slug)}
                />
              );
            })}
          </div>
        </Transition>
      </div>

      {activeCard && (
        <div
          key={activeCard._key}
          className="col-span-full md:flex md:justify-between md:gap-x-10 lg:col-span-8"
        >
          <div className="border-gunmetal border-l border-dashed pl-5 md:flex md:max-w-88 md:flex-col md:justify-between md:gap-y-10">
            <Transition>
              <h3 className="type-heading-2430 lg:type-heading-4830">
                <PortableTextFragment value={activeCard.title} />
              </h3>
            </Transition>
            {activeCard.description && (
              <Transition delay={0.1}>
                <p className="type-body-1440 lg:type-body-1440 mt-10 md:mt-0">
                  <PortableTextFragment value={activeCard.description} />
                </p>
              </Transition>
            )}
          </div>
          {activeCard.image && (
            <Transition delay={0.2}>
              <SanityImage
                image={activeCard.image}
                sizes="(max-width: 768px) 100vw, 370px"
                className="mt-10 w-full md:mt-0 md:max-w-92.5"
              />
            </Transition>
          )}
        </div>
      )}
    </>
  );
};
