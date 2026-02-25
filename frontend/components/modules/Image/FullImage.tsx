import type { ModuleProps } from "@/sanity/lib/fetch";
import { SanityImage } from "@/components/primitives/Image/SanityImage";

type FullImageProps = ModuleProps<"full-image">;

export const FullImage = ({ image }: FullImageProps) => {
  if (!image) return null;

  return (
    <figure className="min-h-dvh">
      <SanityImage
        image={image}
        sizes="100vw"
        className="size-full"
        priority={true}
      />
    </figure>
  );
};
