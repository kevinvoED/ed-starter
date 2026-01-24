import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { TextMask } from "@/components/GSAP/TextMask";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";

type HeroQuinaryProps = BlockProps<"hero-quinary">;

export const HeroQuinary = ({
  eyebrow,
  title,
  description,
  links,
}: HeroQuinaryProps) => {
  return (
    <div
      className="grid-custom gap-y-6 p-custom pt-10 pb-20 lg:gap-y-10 lg:pt-25"
      data-nav-theme="light"
    >
      <div className="grid-custom col-span-full gap-y-4 lg:gap-y-0">
        {eyebrow && (
          <Transition className="col-span-full self-start lg:col-span-2">
            <Eyebrow variant="dot-black">{eyebrow}</Eyebrow>
          </Transition>
        )}

        {title && (
          <Transition className="typef-heading-32-64-80 4xl:col-span-6 5xl:col-span-5 col-span-full text-balance lg:col-span-9">
            <h1>
              <PortableTextFragment value={title} />
            </h1>
          </Transition>
        )}
      </div>

      <div className="3xl:col-span-5 4xl:col-span-4 5xl:col-span-3 col-span-full 3xl:col-start-3 4xl:col-start-3 5xl:col-start-3 space-y-10 pt-5 lg:col-span-6 lg:col-start-3 lg:pt-0">
        {description && (
          <TextMask>
            <PortableText value={description} />
          </TextMask>
        )}

        {links && links.length > 0 && (
          <Transition
            delay={0.5}
            className="flex flex-col gap-4 lg:flex-row lg:gap-14"
          >
            {links.map((link, index) => (
              <Button
                key={link._key}
                link={link}
                variant={index === 0 ? "secondary-black" : "tertiary-black"}
                className="self-start"
                hasArrow={index === 0}
              >
                {link.title}
              </Button>
            ))}
          </Transition>
        )}
      </div>
    </div>
  );
};
