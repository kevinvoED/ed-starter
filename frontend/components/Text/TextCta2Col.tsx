import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { TextMask } from "@/components/GSAP/TextMask";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type TextCta2ColProps = BlockProps<"text-cta-2-col">;

export const TextCta2Col = ({
  eyebrow,
  title,
  links,
  columns,
}: TextCta2ColProps) => {
  return (
    <div
      className="grid-custom gap-y-40-80-160 p-custom py-80-140-220"
      data-nav-theme="light"
    >
      <div className="relative 4xl:col-span-10 5xl:col-span-9 col-span-full row-start-1 space-y-6 lg:space-y-0">
        {eyebrow && (
          <Transition duration={1.5}>
            <Eyebrow variant="dot-black" className="top-2 left-0 lg:absolute">
              {eyebrow}
            </Eyebrow>
          </Transition>
        )}

        {title && (
          <Transition>
            <h2 className="typef-heading-32-48-64 lg:indent-4col">
              <PortableTextFragment value={title} />
            </h2>
          </Transition>
        )}
      </div>

      <div
        className={cn(
          "col-span-full",
          columns?.columnOne && columns?.columnTwo
            ? "4xl:col-span-4 4xl:col-start-4 grid md:grid-cols-2 md:gap-x-5 lg:col-span-6 lg:col-start-4"
            : "3xl:col-span-3 5xl:col-span-2 3xl:col-start-4 5xl:col-start-4 md:col-span-3 lg:col-span-4 lg:col-start-4",
        )}
      >
        {columns?.columnOne && (
          <TextMask>
            <PortableText value={columns.columnOne} />
          </TextMask>
        )}

        {columns?.columnTwo && (
          <TextMask delay={0.5} className="pt-5 md:pt-0">
            <PortableText value={columns.columnTwo} />
          </TextMask>
        )}

        <Transition delay={1} className="pt-15 md:pt-10">
          {links?.map((link) => (
            <Button key={link._key} link={link} variant="secondary-black">
              {link.title}
            </Button>
          ))}
        </Transition>
      </div>
    </div>
  );
};
