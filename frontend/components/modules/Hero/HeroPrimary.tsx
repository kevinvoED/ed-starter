import type { ModuleProps } from "@/sanity/lib/fetch";
import { TextLineReveal } from "@/components/animations/TextLineReveal";
import { Transition } from "@/components/animations/Transition";
import { Badge } from "@/components/primitives/Badge/Badge";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

export const HeroPrimary = ({
  title,
  links,
  image,
  description,
}: ModuleProps<"hero-primary">) => {
  return (
    <div className="md:grid-custom flex flex-col md:h-dvh md:overflow-hidden">
      <div className="f-py-32/60 f-gap-6/12 f-px-12/16 col-span-full flex flex-col p-custom md:col-span-6 md:justify-center">
        <div className="f-gap-y-2/4 flex flex-col">
          <Transition>
            <Badge>ED Starter Kits</Badge>
          </Transition>

          <div className="f-gap-y-3/8 flex flex-col">
            <TextLineReveal animateOnScroll={false} delay={0.3}>
              <PortableText
                value={title}
                as="h1"
                className="ftype type-heading-3240 to-type-heading-8040 text-balance!"
              />
            </TextLineReveal>
            <TextLineReveal animateOnScroll={false} delay={0.7} duration={1.2}>
              <PortableText value={description} className="max-w-prose" />
            </TextLineReveal>
          </div>
        </div>

        <Transition delay={1.65} className="flex flex-wrap gap-4">
          {links.map((link) => (
            <SanityLink key={link._key} link={link} width="fit">
              {link.label}
            </SanityLink>
          ))}
        </Transition>
      </div>

      <div className="relative h-[50dvh] w-full shrink-0 overflow-hidden md:col-span-6 md:h-full md:min-h-0">
        <SanityImage
          image={image}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="size-full"
        />
      </div>
    </div>
  );
};
