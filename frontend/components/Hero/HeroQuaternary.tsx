import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { CodeSnippet } from "@/components/Code/CodeSnippet";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { TextMask } from "@/components/GSAP/TextMask";
import { TextReveal } from "@/components/GSAP/TextReveal";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";

type HeroQuaternaryProps = BlockProps<"hero-quaternary">;

export const HeroQuaternary = ({
  eyebrow,
  title,
  description,
  links,
  codeSnippet,
}: HeroQuaternaryProps) => {
  return (
    <div
      className="grid-custom gap-y-60-140-220 overflow-hidden bg-black p-custom pt-80-140-220 pb-60-100-220 text-white"
      data-nav-theme="dark"
    >
      <div className="4xl:col-span-4 col-span-full space-y-3 lg:col-span-6 lg:space-y-4">
        {eyebrow && (
          <TextReveal>
            <Eyebrow variant="dot-neon" delay={1.5}>
              {eyebrow}
            </Eyebrow>
          </TextReveal>
        )}

        {title && (
          <TextReveal>
            <h1 className="typef-heading-32-64-80">
              <PortableTextFragment value={title} />
            </h1>
          </TextReveal>
        )}
      </div>

      {codeSnippet?.code && (
        <div className="hidden md:col-span-4 md:row-start-2 md:flex md:items-end lg:col-span-4">
          <CodeSnippet codeBlock={codeSnippet?.code} delay={1} />
        </div>
      )}

      <div className="4xl:col-span-2 col-span-4 4xl:col-start-10 space-y-8 pt-[156px] md:pt-0 lg:col-start-9 lg:row-start-2">
        {description && (
          <TextMask delay={1}>
            <PortableText value={description} />
          </TextMask>
        )}

        <Transition delay={1} className="flex flex-wrap gap-10">
          {links?.map((link, index) => (
            <Button
              key={link._key}
              link={link}
              variant={index === 0 ? "secondary-white" : "tertiary-neon"}
              hasArrow={index === 0}
              className={index === 1 ? "!hidden md:!inline-flex" : undefined}
            >
              {link.title}
            </Button>
          ))}
        </Transition>
      </div>
    </div>
  );
};
