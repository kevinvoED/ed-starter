import type { BlockProps } from "@/sanity/lib/fetch";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { Cards } from "./Cards";

type CardCollapsibleProps = BlockProps<"card-collapsible">;

export const CardCollapsible = ({
  eyebrow,
  title,
  description,
  cards,
}: CardCollapsibleProps) => {
  return (
    <div className="grid-custom gap-y-0 p-custom py-25" data-nav-theme="light">
      <div className="relative col-span-full lg:col-span-6">
        {eyebrow && (
          <Transition duration={1.5}>
            <Eyebrow variant="dot-black" className="top-2">
              {eyebrow}
            </Eyebrow>
          </Transition>
        )}
        {title && (
          <Transition>
            <h2 className="typef-heading-32-48-64 mt-4">
              <PortableTextFragment value={title} />
            </h2>
          </Transition>
        )}
      </div>

      {description && (
        <Transition
          delay={0.15}
          className="col-span-full mt-15 lg:col-span-7 lg:col-start-1 lg:mt-20 [&>p]:mb-4"
        >
          <PortableText
            value={description}
            className="lg:columns-2 lg:gap-26.25"
          />
        </Transition>
      )}
      <Cards cards={cards} />
    </div>
  );
};
