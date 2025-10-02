import { Suspense } from "react";

import { PortableText, type PortableTextBlock } from "next-sanity";

import { Button } from "@/components/Button/Button";
import { ArrowRightIcon } from "@/components/Icons/ArrowRightIcon";
import type { CallToAction } from "@/sanity.types";

export default function CTA({ heading, text, cta, content }: CallToAction) {
  console.log(content);
  return (
    <div className="container my-12">
      <div className="max-w-3xl rounded-2xl border border-gray-100 bg-gray-50">
        <div className="flex flex-col gap-6 px-12 py-12">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="font-bold text-3xl text-black tracking-tight sm:text-4xl">
              {heading}
            </h2>
            <p className="text-gray-600 text-lg leading-8">{text}</p>
          </div>

          <Suspense fallback={null}>
            <div className="flex max-w-fit flex-col gap-6 lg:mt-0 lg:shrink-0">
              {cta?.label && (
                <Button cta={cta} variant="secondary" hasArrow>
                  {cta.label}
                </Button>
              )}

              {cta?.label && (
                <Button cta={cta} variant="tertiary" hasArrow>
                  {cta.label}
                </Button>
              )}

              <Button cta={cta} variant="icon" hasArrow={false} size="icon">
                <ArrowRightIcon />
              </Button>

              {content?.length && (
                <PortableText value={content as PortableTextBlock[]} />
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
