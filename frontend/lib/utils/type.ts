import type {
  internalGroqTypeReferenceTo,
  Post,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";

export type ImageType = Extract<
  NonNullable<NonNullable<Post>["coverImage"]>,
  { _type: "image" }
>;

export type SanityImageType = {
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
