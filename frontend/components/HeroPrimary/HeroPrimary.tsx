import type { PortableTextBlock } from "next-sanity";
import type { HeroPrimary as HeroPrimaryProps } from "@/sanity.types";
import { Button } from "@/components/Button/Button";
import { PortableText } from "@/components/Sanity/PortableText";
import { SanityImage } from "@/components/Sanity/SanityImage";
import { Transition } from "@/components/Transition/Transition";

export const HeroPrimary = ({
  title,
  description,
  image,
  ctas,
  content,
}: HeroPrimaryProps) => {
  return (
    <div className="relative overflow-hidden py-12 lg:py-25">
      <div className="grid-custom container gap-y-6">
        <div className="col-span-full flex flex-col flex-wrap gap-10 bg-[#CEFF00] p-10">
          <Button variant="spur" cta={ctas?.[0]} size="none">
            Request a demo
          </Button>

          <Button variant="animation" cta={ctas?.[0]} size="none">
            Request a demo
          </Button>
        </div>

        <Transition className="col-span-full lg:col-span-5">
          <h2>{title}</h2>
        </Transition>

        <Transition
          delay={0.5}
          className="col-span-full lg:col-span-5 lg:col-start-1"
        >
          <p>{description}</p>
        </Transition>

        <Transition
          delay={1}
          className="col-span-full lg:col-span-5 lg:col-start-1"
        >
          <div>{image && <SanityImage image={image} sizes="100vw" />}</div>
        </Transition>

        <div className="col-span-full space-x-2 lg:col-span-5 lg:col-start-1">
          <div className="flex gap-2">
            {ctas?.map((cta, index) => (
              <Transition delay={1.2 + index * 0.25} key={cta._key}>
                <Button cta={cta}>{cta.label}</Button>
              </Transition>
            ))}
          </div>
        </div>

        {content && (
          <Transition
            delay={1.5}
            className="col-span-full space-x-2 lg:col-span-5 lg:col-start-1"
          >
            <PortableText value={content as PortableTextBlock[]} />
          </Transition>
        )}
      </div>
    </div>
  );
};
