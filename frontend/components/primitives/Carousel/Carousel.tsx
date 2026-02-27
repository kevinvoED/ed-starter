"use client";

import type { Button } from "@/components/primitives/Button/Button";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils/cn";

/*
 * Embla Carousel
 * @docs: https://www.embla-carousel.com/guides/
 *
 * ---------------------
 * Usage Example
 * ---------------------
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>
 *       <div>
 *         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iste
 *         minima quibusdam pariatur magni similique, corporis odit sequi
 *         tempore quam.
 *       </div>
 *     </CarouselItem>
 *
 *     <CarouselItem>
 *       <div>
 *         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
 *         exercitationem, qui doloribus odio, laboriosam voluptates non
 *         nostrum ea tempore ullam quidem. Omnis eum nesciunt similique ad
 *         libero aspernatur repellat architecto velit expedita accusamus.
 *         Illo, dignissimos! Dolorem id dignissimos ad consectetur. Eius
 *         quidem reiciendis suscipit molestias nemo porro blanditiis beatae
 *         vitae!
 *       </div>
 *     </CarouselItem>
 *   </CarouselContent>
 *
 *   <CarouselControls>
 *     <CarouselPrevious />
 *     <CarouselCounter />
 *     <CarouselNext />
 *   </CarouselControls>
 * </Carousel>
 */

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: "x",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <section
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        data-slot="carousel"
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="max-h-fit overflow-hidden"
      data-slot="carousel-content"
    >
      <div className={cn("-ml-4 flex", className)} {...props} />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="carousel-item"
      className={cn("min-w-0 flex-1 shrink-0 basis-full pl-4", className)}
      {...props}
    />
  );
}

function CarouselControls({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="carousel-controls"
      className={cn("relative flex max-w-fit items-center", className)}
      {...props}
    />
  );
}

function CarouselCounter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setSlideCount(api.scrollSnapList().length);

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });

    return () => {
      api?.off("select", () => {});
    };
  }, [api]);

  return (
    <div
      className={cn(
        "type-mono-1040 flex justify-center whitespace-nowrap px-4",
        className,
      )}
      {...props}
    >
      {selectedIndex + 1}/{slideCount}
    </div>
  );
}

// TODO PROJECT-LAUNCH: replace with your project's Button variant
function CarouselPrevious({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      type="button"
      data-slot="carousel-previous"
      className={cn(
        "disabled:pointer-events-auto! disabled:cursor-not-allowed! disabled:text-silver!",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      {/* TODO PROJECT-LAUNCH: replace with your project's Icon */}
      <ChevronLeft className="size-4" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
}

// TODO PROJECT-LAUNCH: replace with your project's Button variant
function CarouselNext({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      type="button"
      data-slot="carousel-next"
      className={cn(
        "disabled:pointer-events-auto! disabled:cursor-not-allowed! disabled:text-silver!",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      {/* TODO PROJECT-LAUNCH: replace with your project's Icon */}
      <ChevronRight className="size-4" />

      <span className="sr-only">Next slide</span>
    </button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselCounter,
  CarouselControls,
};
