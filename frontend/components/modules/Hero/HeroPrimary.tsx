import type { ModuleProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/primitives/button";
import { SanityImage } from "@/components/primitives/Media/SanityImage";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

type HeroPrimaryProps = ModuleProps<"hero-primary">;

export const HeroPrimary = ({ title, link, image }: HeroPrimaryProps) => {
  console.log(link);
  return (
    <div>
      {title && <PortableText value={title} />}
      {image && <SanityImage image={image} />}
      {link?.map((link) => (
        <Button key={link._key} link={link}>
          {link.label}
        </Button>
      ))}
    </div>
  );
};
