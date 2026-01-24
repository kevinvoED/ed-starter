import type { BlockProps } from "@/sanity/lib/fetch";
import { Transition } from "@/components/GSAP/Transition";
import { InfiniteImageMarquee } from "@/components/Marquee/InfiniteImageMarquee";
import { PortableTextFragment } from "@/components/PortableText/PortableText";

type TextLogoProps = BlockProps<"text-logo">;

export const TextLogo = ({ title, marqueeImages }: TextLogoProps) => {
  return (
    <div className="pt-10 pb-20 lg:pt-15 lg:pb-25" data-nav-theme="light">
      <div className="grid-custom gap-y-0 p-custom lg:gap-y-28">
        {title && (
          <Transition className="type-heading-2030 lg:type-heading-2430 col-span-full text-balance lg:col-span-8">
            <PortableTextFragment value={title} />
          </Transition>
        )}
      </div>

      {marqueeImages && marqueeImages.length > 0 && (
        <Transition className="mt-18 lg:mt-28">
          <InfiniteImageMarquee items={marqueeImages} />
        </Transition>
      )}
    </div>
  );
};
