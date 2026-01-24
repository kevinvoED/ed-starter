import type {
  BLOG_SLUG_QUERYResult,
  CASE_STUDIES_SLUG_QUERYResult,
  EVENTS_SLUG_QUERYResult,
  RESOURCE_SLUG_QUERYResult,
} from "@/sanity.types";
import { Button, type ResolvedLinkType } from "@/components/Button/Button";
import { CopyLinkButton } from "@/components/Button/CopyLink";
import { Dot } from "@/components/Dot/Dot";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import { PortableTextFragment } from "@/components/PortableText/PortableText";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";

type HeroDetailProps = NonNullable<
  NonNullable<
    | BLOG_SLUG_QUERYResult
    | CASE_STUDIES_SLUG_QUERYResult
    | RESOURCE_SLUG_QUERYResult
    | EVENTS_SLUG_QUERYResult
  >
> & {
  className?: string;
  eyebrow?: string;
};

const getEyebrow = (resourceType: string) => {
  // Add more resource types here as they are added to the site
  if (resourceType === "post") {
    return "Blog";
  }
  if (resourceType === "case-study") {
    return "Case Studies";
  }
  if (resourceType === "resource") {
    return "Resources";
  }
  if (resourceType === "event") {
    return "Events";
  }
  return resourceType;
};

export const HeroDetail = ({
  className,
  title,
  _type,
  author,
  publishedDate,
  _createdAt,
  content,
  estimatedReadingTime,
  image,
  slug,
  // @ts-expect-error - links is only present on resource types
  links,
}: HeroDetailProps) => {
  return (
    <header className={cn("grid-custom col-span-full gap-y-0", className)}>
      {_type && (
        <Transition className="col-span-full mb-4 lg:col-span-2 lg:mb-0">
          <Eyebrow variant="dot-black">{getEyebrow(_type)}</Eyebrow>
        </Transition>
      )}

      <div className="col-span-full mb-20 space-y-10 lg:col-span-8">
        {title && (
          <Transition>
            <h1 className="type-heading-4830 lg:type-heading-8030 text-balance">
              <PortableTextFragment value={title} />
            </h1>
          </Transition>
        )}

        <Transition
          delay={0.15}
          className="type-mono-1240 flex flex-wrap items-center gap-4 uppercase"
        >
          {author && <span>{author.name}</span>}
          {publishedDate && (
            <span>
              {author?.name && <Dot color="black" size="sm" />}
              {formatDate(publishedDate)}
            </span>
          )}

          {_createdAt && !publishedDate && (
            <span className="flex items-center gap-4">
              {author?.name && <Dot color="black" size="sm" />}
              {formatDate(_createdAt)}
            </span>
          )}

          {content &&
          content.length > 0 &&
          estimatedReadingTime &&
          estimatedReadingTime > 0 ? (
            <span className="flex items-center gap-4">
              <Dot color="black" size="sm" />
              {estimatedReadingTime} minute read
            </span>
          ) : null}

          {estimatedReadingTime > 0 && slug ? (
            <span className="flex items-center gap-4">
              <Dot color="black" size="sm" />
              <CopyLinkButton slug={slug} type="post" />
            </span>
          ) : null}
        </Transition>

        {links && links.length > 0 && (
          <Transition
            delay={0.3}
            className="col-span-full row-start-4 grid grid-cols-2 gap-5 sm:flex sm:flex-wrap sm:justify-start lg:col-start-3 lg:gap-x-17"
          >
            {links?.map((link: ResolvedLinkType, index: number) => (
              <Button
                key={link._key}
                link={link}
                className="col-span-1 min-w-full md:min-w-44.5"
                variant={
                  index === 0 ? "primary-black-large" : "secondary-black"
                }
              >
                {link.title}
              </Button>
            ))}
          </Transition>
        )}
      </div>

      {image && (
        <Transition delay={0.3} className="col-span-full lg:col-start-3">
          <SanityImage image={image} sizes="100vw" className="size-57" />
        </Transition>
      )}
    </header>
  );
};
