import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { Timeline } from "./Timeline";

type ImageTextTimelineProps = BlockProps<"image-text-timeline">;

export const ImageTextTimeline = ({
  title,
  description,
  link,
  cards,
}: ImageTextTimelineProps) => {
  return (
    <div
      className="grid-custom gap-y-15 p-custom py-20 lg:gap-y-20 lg:py-35"
      data-nav-theme="light"
    >
      <div className="grid-custom col-span-full gap-y-8 lg:gap-y-0">
        {title && (
          <Transition className="col-span-full lg:col-span-5">
            <h2 className="typef-heading-32-48-64">
              <PortableTextFragment value={title} />
            </h2>
          </Transition>
        )}

        <div className="col-span-full space-y-4 lg:col-span-4 lg:col-start-7">
          {description && (
            <Transition className="[&_p]:type-body-1440">
              <PortableText value={description} />
            </Transition>
          )}
          {link?.map((link) => (
            <Transition key={link._key}>
              <Button link={link} variant="tertiary-black">
                {link.title}
              </Button>
            </Transition>
          ))}
        </div>
      </div>

      {cards && cards.length > 0 && (
        <Timeline cards={cards} className="col-span-full" />
      )}
    </div>
  );
};
