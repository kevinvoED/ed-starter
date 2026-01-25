import type { ModuleProps } from "@/sanity/lib/fetch";
import { SanityImage } from "@/components/primitives/Media/SanityImage";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

type HeroPrimaryProps = ModuleProps<"hero-primary">;

export const HeroPrimary = ({ title, image }: HeroPrimaryProps) => {
  console.log(image);
  return (
    <div>
      {title && <PortableText value={title} />}
      {image && <SanityImage image={image} />}
    </div>
  );
};
