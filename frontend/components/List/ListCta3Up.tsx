import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { Transition } from "@/components/GSAP/Transition";
import { InfiniteImageMarquee } from "@/components/Marquee/InfiniteImageMarquee";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type ListCta3UpProps = BlockProps<"list-cta-3-up">;

export const ListCta3Up = ({
  title,
  description,
  items,
  marqueeImages,
}: ListCta3UpProps) => {
  return (
    <div className="py-40-80-160" data-nav-theme="light">
      <div className="grid-custom gap-y-60-120-220 p-custom">
        <div className="grid-custom col-span-full gap-y-6 lg:gap-y-0">
          {title && (
            <Transition className="typef-heading-32-48-64 col-span-full text-balance lg:col-span-8">
              <PortableTextFragment value={title} />
            </Transition>
          )}

          {description && (
            <Transition delay={0.15} className="col-span-full lg:col-span-4">
              <PortableText value={description} />
            </Transition>
          )}
        </div>

        <ul className="grid-custom col-span-full gap-y-15 lg:gap-y-0">
          {items?.map((item, index) => (
            <li
              key={item._key}
              className={cn(
                "col-span-full lg:col-span-3",
                index === 1 && "lg:col-start-5",
                index === 2 && "lg:col-start-9",
              )}
            >
              <Transition
                delay={0.15 + index * 0.15}
                className="space-y-12 lg:space-y-18"
              >
                {item.logo && (
                  <SanityImage
                    image={item.logo}
                    sizes="48px"
                    className="h-12 w-12"
                  />
                )}

                <div className="space-y-6 lg:space-y-14.5">
                  <h3 className="type-heading-2030 lg:type-heading-2430 flex flex-col text-balance">
                    <span>{item.title}</span>
                    <span className="text-silver">{item.subtitle}</span>
                  </h3>

                  {item.link &&
                    item.link.length > 0 &&
                    item.link.map((link) => (
                      <Button
                        variant="secondary-black"
                        key={link._key}
                        link={link}
                      >
                        {link.title}
                      </Button>
                    ))}
                </div>
              </Transition>
            </li>
          ))}
        </ul>
      </div>

      {marqueeImages && marqueeImages.length > 0 && (
        <Transition className="mt-18">
          <InfiniteImageMarquee items={marqueeImages} className="" />
        </Transition>
      )}
    </div>
  );
};
