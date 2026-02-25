import type { ImageValue } from "sanity";
import { getImageDimensions } from "@sanity/asset-utils";

type ImageValidationOptions = {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number;
};

/*
 * Custom helper validation function for Sanity image fields to define specific image sizes and aspect ratios.
 *
 * defineField({
 *   ...image,
 *   validation: (Rule) =>
 *     Rule.custom(
 *       validateImage({
 *         minWidth: 900,
 *         minHeight: 600,
 *         maxWidth: 1200,
 *         maxHeight: 800,
 *         aspectRatio: 1.5,
 *       }),
 *     ),
 * })
 *
 */

export const validateImage = ({
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  aspectRatio,
}: ImageValidationOptions) => {
  return (value: ImageValue | undefined) => {
    if (!minWidth && !minHeight && !maxWidth && !maxHeight && !aspectRatio) {
      return true;
    }

    if (!value?.asset?._ref) return true;

    const { width, height } = getImageDimensions(value.asset._ref);

    if (minWidth && width < minWidth) {
      return `Image width must be at least ${minWidth}px (current: ${width}px).`;
    }

    if (minHeight && height < minHeight) {
      return `Image height must be at least ${minHeight}px (current: ${height}px).`;
    }

    if (maxWidth && width > maxWidth) {
      return `Image width must be at most ${maxWidth}px (current: ${width}px).`;
    }

    if (maxHeight && height > maxHeight) {
      return `Image height must be at most ${maxHeight}px (current: ${height}px).`;
    }

    if (aspectRatio) {
      if (height === 0) return "Image height cannot be zero.";
      if (width === 0) return "Image width cannot be zero.";

      const IMAGE_RATIO = width / height;
      const ASPECT_RATIO_TOLERANCE = 0.01;

      if (Math.abs(IMAGE_RATIO - aspectRatio) > ASPECT_RATIO_TOLERANCE) {
        return `Image must have an aspect ratio of ${aspectRatio.toFixed(2)} (current: ${IMAGE_RATIO.toFixed(2)}).`;
      }
    }

    return true;
  };
};
