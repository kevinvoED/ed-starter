import type { BlockProps } from "@/sanity/lib/fetch";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { TextMask } from "@/components/GSAP/TextMask";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type Text2ColProps = BlockProps<"text-2-col">;

export const Text2Col = ({ eyebrow, logo, title, columns }: Text2ColProps) => {
  return (
    <div
      className="grid-custom gap-y-40-80-160 bg-black p-custom py-80-140-220 text-white"
      data-nav-theme="dark"
    >
      {logo && (
        <Transition
          animation="fadeIn"
          className="col-span-full col-start-1 row-start-1"
        >
          <SanityImage
            image={logo}
            sizes="(max-width: 1024px) 48px, 60px"
            className="aspect-square size-12 lg:size-15"
          />
        </Transition>
      )}

      <div className="relative 4xl:col-span-6 5xl:col-span-5 col-span-full 4xl:col-start-5 5xl:col-start-5 lg:col-span-7 lg:col-start-5 lg:row-start-1">
        {eyebrow && (
          <Transition duration={1}>
            <Eyebrow
              variant="dot-neon"
              className="lg:absolute lg:top-2 lg:left-0"
            >
              {eyebrow}
            </Eyebrow>
          </Transition>
        )}
        {title && (
          <Transition>
            <h2 className="typef-heading-32-48-64 lg:indent-2col">
              <PortableTextFragment value={title} />
            </h2>
          </Transition>
        )}
      </div>

      <div
        className={cn(
          "col-span-full",
          columns?.columnOne && columns?.columnTwo
            ? "5xl:col-span-4 5xl:col-start-7 gap-x-5 space-y-5 md:col-start-2 md:grid md:grid-cols-2 md:space-y-0 lg:col-start-7"
            : "5xl:col-span-2 3xl:col-start-10 5xl:col-start-9 5xl:row-start-2 md:col-start-3 lg:col-start-7 xl:col-start-9",
        )}
      >
        {columns?.columnOne && (
          <TextMask>
            <PortableText value={columns.columnOne} />
          </TextMask>
        )}

        {columns?.columnTwo && (
          <TextMask delay={0.5}>
            <PortableText value={columns.columnTwo} />
          </TextMask>
        )}
      </div>
    </div>
  );
};

/** A version of the Text2Col without a title or eyebrow and with no wrapping grid */
export const Text2ColNude: React.FC<
  Text2ColProps & Omit<React.HTMLAttributes<HTMLDivElement>, "title">
> = ({ eyebrow, logo, title, columns, ...rest }) => {
  return (
    <div {...rest}>
      {logo && (
        <Transition
          animation="fadeIn"
          className="col-span-full col-start-1 row-start-1"
        >
          <SanityImage
            image={logo}
            sizes="(max-width: 1024px) 48px, 60px"
            className="aspect-square size-12 lg:size-15"
          />
        </Transition>
      )}

      <div className="col-span-full grid grid-cols-1 gap-x-5 space-y-5 sm:grid-cols-2">
        {columns?.columnOne && (
          <TextMask>
            <PortableText value={columns.columnOne} />
          </TextMask>
        )}

        {columns?.columnTwo && (
          <TextMask delay={0.5}>
            <PortableText value={columns.columnTwo} />
          </TextMask>
        )}
      </div>
    </div>
  );
};
