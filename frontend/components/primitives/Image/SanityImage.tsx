import type { HTMLAttributes } from "react";
import type { ModuleProps } from "@/sanity/lib/fetch";
import type { MetaImage } from "@/sanity.types";
import Image from "next/image";
import { imageLoader } from "next-sanity/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";

export type ResolvedImageType = NonNullable<ModuleProps<"media-file">["image"]>;

export type ImageType = ResolvedImageType | MetaImage;

interface SanityImageProps extends HTMLAttributes<"img"> {
  image: ImageType | null;
  width?: number;
  height?: number;
  sizes: string;
  priority?: boolean;
}

// Type guard to check if image has expanded asset format
const hasExpandedAsset = (image: ImageType): image is ResolvedImageType => {
  return (
    image.asset !== null && image.asset !== undefined && "_id" in image.asset
  );
};

export const SanityImage = ({
  image,
  sizes,
  className,
  width = 200,
  height = 200,
  priority = false,
}: SanityImageProps) => {
  if (!image) return null;

  // Handle both reference and expanded asset formats
  const imageWidth = hasExpandedAsset(image)
    ? image.asset?.metadata?.dimensions?.width || width
    : width;

  const imageHeight = hasExpandedAsset(image)
    ? image.asset?.metadata?.dimensions?.height || height
    : height;

  const blurDataURL = hasExpandedAsset(image)
    ? image.asset?.metadata?.lqip || ""
    : "";

  const placeholder =
    imageWidth > 40 &&
    imageHeight > 40 &&
    hasExpandedAsset(image) &&
    image.asset?.metadata?.lqip
      ? "blur"
      : "empty";

  return (
    <Image
      loader={imageLoader}
      src={urlFor(image).url()}
      alt={hasExpandedAsset(image) ? image?.alt || "" : ""}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      className={cn("object-cover", className)}
      sizes={sizes}
      width={imageWidth}
      height={imageHeight}
      priority={priority}
      quality={priority ? 100 : 75}
      loading={priority ? "eager" : "lazy"}
    />
  );
};
