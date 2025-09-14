import {
  getImageDimensions,
  type SanityImageSource,
} from '@sanity/asset-utils';
import { stegaClean } from '@sanity/client/stega';
import { Image } from 'next-sanity/image';

import type { SanityImageType } from '@/lib/utils/type';
import { urlForImage } from '@/sanity/lib/utils';

interface CoverImageProps {
  image: SanityImageType;
  priority?: boolean;
}

export const SanityImage = (props: CoverImageProps) => {
  const { image: source, priority } = props;
  const image = source?.asset?._ref ? (
    <Image
      className="object-cover"
      width={getImageDimensions(source as SanityImageSource).width}
      height={getImageDimensions(source as SanityImageSource).height}
      alt={stegaClean(source?.alt) || ''}
      src={urlForImage(source)?.url() as string}
      priority={priority}
    />
  ) : null;

  return <div className="relative">{image}</div>;
};
