import type { ModuleProps } from "@/sanity/lib/fetch";
import { SanityImage } from "@/components/primitives/Image/SanityImage";

export const FullImage = ({ image }: ModuleProps<"full-image">) => {
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
