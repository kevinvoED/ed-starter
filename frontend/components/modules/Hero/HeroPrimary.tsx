import type { ModuleProps } from "@/sanity/lib/fetch";
import { TextScramble } from "@/components/animations/TextScramble";
import { Transition } from "@/components/animations/Transition";
import { Button } from "@/components/primitives/Button/Button";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/primitives/PortableText/PortableText";

type Props = ModuleProps<"hero-primary">;

export const HeroPrimary = ({
  title,
  link,
  image,
  description,
  content,
}: Props) => {
  return (
    <div className="fluid-py-10/20 p-custom">
      <h2 className="ftype type-2040 to-type-3240">Here's some text</h2>

      {title && (
        <Transition>
          <PortableTextFragment value={title} />
        </Transition>
      )}

      {/* {description && (
        <TextScramble chars="lowerCase">
          <PortableText value={description} />
        </TextScramble>
      )}

      {description && (
        <TextScramble chars="lowerCase">
          <PortableText value={title} />
        </TextScramble>
      )} */}
      {image && <SanityImage image={image} />}

      <div className="flex flex-col items-start gap-4">
        <Button
          href="https://www.google.com"
          variant="primary"
          openInNewTab
          hasArrow={false}
          width="fit"
          id="cta"
        >
          Google
        </Button>

        {link?.map((link) => (
          <Button
            key={link._key}
            link={link}
            variant="primary"
            id="nav"
            width="fit"
          >
            {link.label}
          </Button>
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
