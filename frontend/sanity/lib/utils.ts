import { getImageDimensions } from '@sanity/asset-utils';
import createImageUrlBuilder from '@sanity/image-url';

import { dataset, projectId } from '@/sanity/lib/api';
import type { Cta } from '@/sanity.types';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

type SanityImageType = {
  asset?: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
  };
  crop?: {
    _type: 'sanity.imageCrop';
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
  _type: 'image';
};

export const urlForImage = (source: SanityImageType) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  const imageRef = source?.asset?._ref;
  const crop = source.crop;

  // get the image's og dimensions
  const { width, height } = getImageDimensions(imageRef);

  if (crop) {
    // compute the cropped image's area
    const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));

    const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

    // compute the cropped image's position
    const left = Math.floor(width * crop.left);
    const top = Math.floor(height * crop.top);

    // gather into a url
    return imageBuilder
      ?.image(source)
      .rect(left, top, croppedWidth, croppedHeight)
      .auto('format');
  }

  return imageBuilder?.image(source).auto('format');
};

export function resolveOpenGraphImage(
  image: SanityImageType,
  width = 1200,
  height = 627,
) {
  if (!image) {
    return;
  }
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url();
  if (!url) {
    return;
  }
  return { url, alt: image?.alt as string, width, height };
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function handleResolveCta(cta: Cta | undefined) {
  if (!cta) {
    return null;
  }

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!cta.type && cta.href) {
    cta.type = 'href';
  }

  switch (cta.type) {
    case 'href':
      return cta.href || null;
    case 'page':
      if (cta?.page && typeof cta.page === 'string') {
        return `/${cta.page}`;
      }
      break;
    case 'post':
      if (cta?.post && typeof cta.post === 'string') {
        return `/posts/${cta.post}`;
      }
      break;
    default:
      return null;
  }
}
