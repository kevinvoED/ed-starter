import type { ModuleProps } from "@/sanity/lib/fetch";
import { HoverTextScramble } from "@/components/animations/HoverTextScramble";
import { TextMask } from "@/components/animations/TextMask";
import { TextScramble } from "@/components/animations/TextScramble";
import { Transition } from "@/components/animations/Transition";
import { Button } from "@/components/primitives/Button/Button";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
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
  return (
    <div className="fluid-py-10/20 p-custom">
      <h2 className="ftype type-2040 to-type-3240">Here's some text</h2>

      {title && (
        <Transition>
          <PortableTextFragment value={title} />
        </Transition>
      )}

      {description && (
        <TextMask>
          <PortableText value={description} />
        </TextMask>
      )}

      {description && (
        <TextScramble>
          <PortableTextFragment value={title} />
        </TextScramble>
      )}
      {image && <SanityImage image={image} />}

      <Button
        href="https://www.google.com"
        variant="primary"
        openInNewTab
        hasArrow={false}
      >
        Google
      </Button>

      {link?.map((link) => (
        <Button key={link._key} link={link} variant="primary">
          {link.label}
        </Button>
      ))}

      {content && (
        <div className="fluid-py-4/12">
          <PortableText value={content} style="article" />
        </div>
      )}
    </div>
  );
};
