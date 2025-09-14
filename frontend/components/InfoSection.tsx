import { type PortableTextBlock } from 'next-sanity';

import { PortableText } from '@/components/PortableText/PortableText';
import type { InfoSection } from '@/sanity.types';

export default function CTA({ heading, subheading, content }: InfoSection) {
  return (
    <section className="container my-12">
      <div className="max-w-3xl">
        {heading && (
          <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            {heading}
          </h2>
        )}
        {subheading && (
          <span className="mt-4 mb-8 block font-light text-gray-900/70 text-lg uppercase">
            {subheading}
          </span>
        )}
        <div className="mt-4">
          {content?.length && (
            <PortableText className="" value={content as PortableTextBlock[]} />
          )}
        </div>
      </div>
    </section>
  );
}
