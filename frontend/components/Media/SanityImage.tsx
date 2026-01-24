import type { HTMLAttributes } from "react";
import type {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

export type ResolvedImageType = {
  asset: {
    _id: string;
    url: string | null;
    mimeType: string | null;
    metadata: {
      lqip: string | null;
      dimensions: {
        width: number | null;
        height: number | null;
      } | null;
    } | null;
  } | null;
  media?: unknown;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt?: string;
  _type: "image";
};

type ReferenceImageType = {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  media?: unknown;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt?: string;
  _type: "image";
};

// Union type supporting both formats
export type ImageType = ResolvedImageType | ReferenceImageType;

interface SanityImageProps extends HTMLAttributes<"img"> {
  image: ImageType | null;
  width?: number;
  height?: number;
  sizes?: string;
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
  className,
  width = 200,
  height = 200,
  sizes,
  priority = false,
}: SanityImageProps) => {
  if (!image) return null;

  // Handle both reference and expanded asset formats
  const imageWidth = hasExpandedAsset(image)
    ? image?.asset?.metadata?.dimensions?.width || width
    : width;

  const imageHeight = hasExpandedAsset(image)
    ? image?.asset?.metadata?.dimensions?.height || height
    : height;

  const blurDataURL = hasExpandedAsset(image)
    ? image?.asset?.metadata?.lqip || ""
    : "";

  const placeholder =
    imageWidth > 40 &&
    imageHeight > 40 &&
    hasExpandedAsset(image) &&
    image?.asset?.metadata?.lqip
      ? "blur"
      : undefined;

  return (
    <Image
      src={urlFor(image).url()}
      alt={image?.alt || ""}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      className={cn("object-cover", className)}
      sizes={sizes || ""}
      width={imageWidth}
      height={imageHeight}
      quality={priority ? 100 : 75}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
    />
  );
};
