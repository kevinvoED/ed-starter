import { Suspense } from 'react';

import { Button } from '@/components/Button/Button';
import { ArrowRightIcon } from '@/components/Icons/ArrowRightIcon';
import type { CallToAction } from '@/sanity.types';

type CtaProps = {
  block: CallToAction;
};

export default function CTA({ block }: CtaProps) {
  return (
    <div className="container my-12">
      <div className="max-w-3xl rounded-2xl border border-gray-100 bg-gray-50">
        <div className="flex flex-col gap-6 px-12 py-12">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="font-bold text-3xl text-black tracking-tight sm:text-4xl">
              {block.heading}
            </h2>
            <p className="text-gray-600 text-lg leading-8">{block.text}</p>
          </div>

          <Suspense fallback={null}>
            <div className="flex max-w-fit flex-col gap-6 lg:mt-0 lg:shrink-0">
              <Button link={block.link}>{block.buttonText}</Button>

              <Button link={block.link} variant="tertiary" hasArrow>
                {block.buttonText}
              </Button>

              <Button link={block.link} variant="icon" size="icon">
                <ArrowRightIcon />
              </Button>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
