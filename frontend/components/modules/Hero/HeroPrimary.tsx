import type { BlockProps } from "@/sanity/lib/fetch";
import { SanityImage } from "@/components/primitives/Media/SanityImage";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

type HeroPrimaryProps = BlockProps<"hero-primary">;

export const HeroPrimary = ({ title, image }: HeroPrimaryProps) => {
  console.log(image);
  return (
    <div>
      {title && <PortableText value={title} />}
      {image && <SanityImage image={image} />}
    </div>
  );
};
