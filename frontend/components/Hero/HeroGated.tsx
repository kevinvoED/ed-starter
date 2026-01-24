import type {
  EVENTS_SLUG_QUERY_RESULT,
  RESOURCE_SLUG_QUERY_RESULT,
} from "@/sanity.types";
import { Button, type ResolvedLinkType } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { PortableTextFragment } from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type HeroGatedProps = NonNullable<
  NonNullable<RESOURCE_SLUG_QUERY_RESULT | EVENTS_SLUG_QUERY_RESULT>
> & {
  className?: string;
  eyebrow?: string;
};

export const HeroGated = ({
  className,
  eyebrow,
  title,
  description,
  links,
}: HeroGatedProps) => {
  return (
    <header className={cn("grid-custom col-span-full gap-y-0", className)}>
      {eyebrow && (
        <Transition className="col-span-full mb-4 self-start lg:col-span-2 lg:mb-0">
          <Eyebrow variant="dot-neon">{eyebrow}</Eyebrow>
        </Transition>
      )}

      <Transition className="3xl:col-span-7 4xl:col-span-5 5xl:col-span-3 col-span-full mb-10 lg:col-span-9">
        {title && (
          <h1 className="type-heading-4830 lg:type-heading-8030 text-balance">
            <PortableTextFragment value={title} />
          </h1>
        )}
      </Transition>

      {description && (
        <Transition
          delay={0.15}
          className="3xl:col-span-4 col-span-full 3xl:col-start-3 row-start-3 mb-10 lg:col-span-6 lg:col-start-3"
        >
          <p>{description}</p>
        </Transition>
      )}

      {links && links.length > 0 && (
        <Transition
          delay={0.3}
          className="col-span-full row-start-4 mb-10 grid grid-cols-2 gap-5 sm:flex sm:flex-wrap sm:justify-start lg:col-start-3 lg:gap-x-17"
        >
          {links.map((link, index) => (
            <Button
              key={link._key}
              link={link as ResolvedLinkType}
              className="col-span-1 min-w-full md:min-w-44.5"
              variant={index === 0 ? "primary-white-large" : "secondary-white"}
            >
              {link.title}
            </Button>
          ))}
        </Transition>
      )}
    </header>
  );
};
