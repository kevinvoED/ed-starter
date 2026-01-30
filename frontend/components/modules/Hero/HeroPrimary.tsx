import type { ModuleProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/primitives/Button/Button";
import { SanityImage } from "@/components/primitives/Media/SanityImage";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

type HeroPrimaryProps = ModuleProps<"hero-primary">;

export const HeroPrimary = ({
  title,
  link,
  image,
  content,
}: HeroPrimaryProps) => {
  console.log(link);
  return (
    <div>
      {title && <PortableText value={title} />}
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
      {content && <PortableText value={content} />}
    </div>
  );
};
