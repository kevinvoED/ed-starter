import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type DriverCtaProps = BlockProps<"driver-cta">;

export const DriverCta = ({
  eyebrow,
  title,
  description,
  links,
}: DriverCtaProps) => {
  return (
    <div
      className="grid-custom gap-y-40-80-160 bg-neon p-custom py-80-140-220 text-black"
      data-nav-theme="light"
    >
      <div className="relative 3xl:col-span-6 5xl:col-span-4 col-span-full 3xl:col-start-3 5xl:col-start-3 space-y-6 lg:col-span-7 lg:col-start-3 lg:space-y-0">
        {eyebrow && (
          <Transition duration={1.5}>
            <Eyebrow variant="dot-black" className="top-2 left-0 lg:absolute">
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

      {description && (
        <Transition
          delay={0.15}
          className="5xl:col-span-2 col-span-full 5xl:col-start-7 row-start-2 lg:col-span-3 lg:col-start-7"
        >
          <PortableText value={description} className="text-balance" />
        </Transition>
      )}

      {links && (
        <Transition
          delay={0.3}
          className={cn(
            "col-span-full flex gap-5 md:min-w-0 lg:col-span-full lg:col-start-7 lg:gap-[20px]",
            description ? "lg:row-start-3" : "lg:row-start-2",
          )}
        >
          {links.map((link, index) => (
            <Button
              key={link._key}
              link={link}
              variant={index === 0 ? "primary-white-large" : "secondary-black"}
              className="!shrink md:!shrink-0 !min-w-0 md:!min-w-[180px] !max-w-none w-full md:w-auto"
            >
              {link.title}
            </Button>
          ))}
        </Transition>
      )}
    </div>
  );
};
