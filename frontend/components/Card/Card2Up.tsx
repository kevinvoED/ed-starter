import type { BlockProps } from "@/sanity/lib/fetch";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";

type Card2UpProps = BlockProps<"card-2-up">;

export const Card2Up = ({ title, cards }: Card2UpProps) => {
  return (
    <div
      className="grid-custom gap-y-60-80-160 p-custom py-80-120-160"
      data-nav-theme="light"
    >
      {title && (
        <Transition className="col-span-full lg:col-span-5">
          <h2 className="typef-heading-32-48-64 text-balance">
            <PortableTextFragment value={title} />
          </h2>
        </Transition>
      )}

      <ul className="grid-custom col-span-full gap-y-2 lg:gap-y-0">
        {cards?.map((card, index) => (
          <li key={card._key} className="col-span-full flex lg:col-span-6">
            <Transition className="flex flex-1 flex-col space-y-6 bg-white p-4 lg:space-y-24.5">
              <div className="flex justify-between">
                <div
                  className="lg:type-mono-1240 max-h-fit max-w-fit bg-neon text-black"
                  aria-hidden="true"
                >
                  0{index + 1}
                </div>
                {card.image && (
                  <SanityImage
                    image={card.image}
                    sizes="(max-width: 1024px) 100px, 164px"
                    className="size-25 lg:size-41"
                  />
                )}
              </div>

              <div className="grid flex-1 grid-cols-4 gap-y-6 pr-5 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-12 lg:pr-0">
                {card.title && (
                  <h3 className="typef-heading-24-32-48 col-span-full">
                    <PortableTextFragment value={card.title} />
                  </h3>
                )}
                {card.description && (
                  <PortableText
                    value={card.description}
                    className="type-body-1440! col-span-full self-end lg:col-span-3"
                  />
                )}
              </div>
            </Transition>
          </li>
        ))}
      </ul>
    </div>
  );
};
