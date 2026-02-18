import type { ModuleProps } from "@/sanity/lib/fetch";
import { TextReveal } from "@/components/animations/TextReveal";
import { TextScramble } from "@/components/animations/TextScramble";
import { Transition } from "@/components/animations/Transition";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/primitives/PortableText/PortableText";

type HeroPrimaryProps = ModuleProps<"hero-primary">;

export const HeroPrimary = ({
  title,
  link,
  image,
  description,
  content,
}: HeroPrimaryProps) => {
  console.log(link);
  return (
    <div className="fluid-py-10/20 p-custom">
      <h2 className="ftype type-2040 to-type-3240">Here's some text</h2>

      {title && (
        <TextReveal slot="h2">
          <PortableTextFragment value={title} />
        </TextReveal>
      )}

      {description && <PortableText value={description} />}

      {description && <PortableText value={title} />}
      {image && <SanityImage image={image} />}

      <article className="fluid-p-4/12 fluid-gap-10/20 relative flex flex-col bg-black text-white">
        <h2>Placeholder title</h2>

        <div className="flex flex-col gap-4">
          <Transition>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            tempore suscipit ipsam, optio porro pariatur impedit beatae, hic
            totam adipisci debitis laborum, voluptate praesentium. Eaque nobis,
            provident excepturi laborum voluptatibus architecto animi eos vel at
            aut nemo sed esse eum voluptates laboriosam, officiis itaque
            nesciunt ut asperiores dicta dignissimos. Dolore?
          </Transition>

          {link?.slice(0, 1).map((link) => (
            <SanityLink
              key={link._key}
              link={link}
              card={true}
              variant="secondary"
              id="nav"
              width="fit"
            >
              {link.label}
            </SanityLink>
          ))}
        </div>
      </article>

      <div className="flex flex-col items-start gap-4">
        <SanityLink
          variant="primary"
          openInNewTab
          hasArrow={false}
          width="fit"
          id="cta"
        >
          Nothing
        </SanityLink>

        <SanityLink
          href="https://www.google.com"
          variant="primary"
          openInNewTab
          hasArrow={false}
          width="fit"
          id="cta"
        >
          Google
        </SanityLink>

        {link?.map((link) => (
          <SanityLink key={link._key} link={link} variant="primary" width="fit">
            {link.label}
          </SanityLink>
        ))}
      </div>

      {content && (
        <div className="fluid-py-4/12">
          <PortableText value={content} style="article" />
        </div>
      )}

      {description && (
        <TextScramble>
          <PortableTextFragment value={title} />
        </TextScramble>
      )}
    </div>
  );
};
