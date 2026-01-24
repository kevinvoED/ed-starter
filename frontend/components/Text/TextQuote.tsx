"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button/Button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselCounter,
  CarouselItem,
} from "@/components/Carousel/Carousel";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import { useSplitLine } from "@/lib/useSplitLine";

type TextQuoteProps = BlockProps<"text-quote">;

export const TextQuote = ({ image, items, link }: TextQuoteProps) => {
  const quoteRefs = useRef<(HTMLDivElement | null)[]>([]);
  // @ts-expect-error - typescript error unrecognized array
  useSplitLine(quoteRefs);

  const isSingleQuote = items.length === 1;
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const QuoteItem = ({ item }: { item: TextQuoteProps["items"][number] }) => {
    return (
      <div
        className="grid-custom col-span-full gap-y-40-80-160"
        data-nav-theme="light"
      >
        <div className="relative col-span-full space-y-4 p-custom lg:space-y-0">
          {item.eyebrow && (
            <Transition>
              <Eyebrow
                variant="dot-black"
                className="lg:absolute lg:top-2 lg:left-0"
              >
                {item.eyebrow}
              </Eyebrow>
            </Transition>
          )}
          {item.quote && (
            <Transition>
              <h2 className="typef-heading-32-48-64 lg:indent-2col">
                {item.quote}
              </h2>
            </Transition>
          )}
        </div>

        {item.author && (
          <Transition className="mb-10 grid grid-cols-[max-content_max-content] p-custom lg:col-span-3 lg:col-start-7 lg:mb-0 lg:px-0">
            <div className="type-heading-1630 col-span-1 max-w-fit whitespace-nowrap border border-gunmetal border-dashed px-2 py-1">
              {item.author.name}
            </div>
            <div className="type-heading-1630 col-span-1 col-start-2 row-start-2 max-w-fit whitespace-nowrap border border-gunmetal border-dashed px-2 py-1">
              {item.author.title}
            </div>
          </Transition>
        )}
      </div>
    );
  };

  const PageDecorItem = ({ image }: { image: TextQuoteProps["image"] }) => {
    return (
      <SanityImage
        image={image}
        sizes="140px"
        className="hidden h-full max-w-35 object-contain lg:col-span-2 lg:block"
      />
    );
  };

  const ButtonCtaItem = ({ link }: { link: TextQuoteProps["link"] }) => {
    return (
      <>
        {link?.map((link) => (
          <Button
            key={link._key}
            link={link}
            variant="secondary-black"
            className="max-h-fit lg:col-start-7"
          >
            {link.title}
          </Button>
        ))}
      </>
    );
  };

  if (isSingleQuote) {
    return (
      <div className="grid-custom gap-y-10 py-80-140-220 lg:gap-y-16">
        <QuoteItem item={items[0]} />

        <div className="grid-custom col-span-full gap-y-10 p-custom lg:gap-y-16 lg:px-0">
          {image && <PageDecorItem image={image} />}
          {link && <ButtonCtaItem link={link} />}
        </div>
      </div>
    );
  }

  return (
    <div className="py-80-140-220">
      <Carousel
        setApi={setCarouselApi}
        className="grid-custom gap-y-10 lg:gap-y-16"
        opts={{
          breakpoints: {
            "(max-width: 768px)": {
              dragFree: true,
            },
          },
        }}
      >
        <CarouselContent className="col-span-full">
          {items &&
            items.length > 0 &&
            items.map((item) => (
              <CarouselItem key={item._key} className="w-full">
                <QuoteItem item={item} />
              </CarouselItem>
            ))}
        </CarouselContent>

        <div className="grid-custom col-span-full gap-y-10 p-custom lg:gap-y-16 lg:px-0">
          {image && <PageDecorItem image={image} />}
          {link && <ButtonCtaItem link={link} />}
          <div className="col-span-full flex shrink-0 items-center lg:col-span-2 lg:col-start-11 lg:mr-6 lg:justify-end lg:self-end">
            <button
              type="button"
              disabled={!canScrollPrev}
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              className="disabled:!cursor-not-allowed disabled:!pointer-events-auto disabled:!text-silver"
            >
              <ChevronLeft className="size-5" />
            </button>

            <CarouselCounter />

            <button
              type="button"
              disabled={!canScrollNext}
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              className="disabled:!cursor-not-allowed disabled:!pointer-events-auto disabled:!text-silver"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};
