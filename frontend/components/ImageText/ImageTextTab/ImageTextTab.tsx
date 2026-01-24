import type { BlockProps } from "@/sanity/lib/fetch";
import { Suspense } from "react";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { Tabs } from "./Tabs";

type ImageTextTabProps = BlockProps<"image-text-tab">;

export const ImageTextTab = ({
  title,
  description,
  menuTitle,
  cards,
}: ImageTextTabProps) => {
  return (
    <div
      className="grid-custom gap-y-40-80-160 bg-black p-custom py-80-140-220 text-white"
      data-nav-theme="dark"
    >
      <div className="grid-custom col-span-full gap-y-8 lg:gap-y-0">
        {title && (
          <Transition className="col-span-full indent-2col lg:col-span-5">
            <h2 className="typef-heading-32-48-64">
              <PortableTextFragment value={title} />
            </h2>
          </Transition>
        )}

        <div className="col-span-full lg:col-span-3 lg:col-start-9">
          {description && (
            <Transition className="[&_p]:type-body-1440">
              <PortableText value={description} />
            </Transition>
          )}
        </div>
      </div>

      {cards && cards.length > 0 && (
        <Suspense>
          <Tabs title={menuTitle} cards={cards} />
        </Suspense>
      )}
    </div>
  );
};
