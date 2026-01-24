import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { Dot } from "@/components/Dot/Dot";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { PortableTextFragment } from "@/components/PortableText/PortableText";

type ListTextProps = BlockProps<"list-text">;

export const ListText = ({
  eyebrow,
  title,
  description,
  link,
  items,
}: ListTextProps) => {
  return (
    <div
      className="grid-custom-md gap-y-15 bg-black p-custom py-20 text-white md:gap-y-25"
      data-nav-theme="dark"
    >
      <div className="grid-custom-md col-span-full gap-y-4">
        {eyebrow && (
          <Transition className="col-span-full">
            <Eyebrow variant="dot-neon">{eyebrow}</Eyebrow>
          </Transition>
        )}

        {title && (
          <Transition className="4xl:col-span-4 5xl:col-span-3 col-span-full text-balance md:col-span-6">
            <h2 className="typef-heading-32-48-64">
              <PortableTextFragment value={title} />
            </h2>
          </Transition>
        )}

        <Transition className="col-span-full mt-2 space-y-4 text-balance md:col-span-4 md:col-start-9">
          {description && (
            <p className="type-body-1440">
              <PortableTextFragment value={description} />
            </p>
          )}

          {link?.map((link) => (
            <Button
              key={link._key}
              link={link}
              variant="tertiary-neon"
              hasArrow={false}
            >
              {link.title}
            </Button>
          ))}
        </Transition>
      </div>

      <ul className="col-span-full">
        {items.map((item) => (
          <li key={item._key} className="border-gunmetal border-b py-6 md:py-5">
            <Transition className="grid-custom-md items-center">
              <div className="col-span-full flex items-center gap-x-3 md:hidden">
                <Dot color="neon" />

                {item.eyebrow && (
                  <h3 className="type-mono-1240 uppercase">{item.eyebrow}</h3>
                )}
              </div>

              <Dot color="neon" className="hidden! md:block! md:col-span-1" />

              {item.eyebrow && (
                <h3 className="md:type-mono-1240 hidden uppercase md:col-span-2 md:col-start-2 md:block">
                  {item.eyebrow}
                </h3>
              )}

              {item.title && (
                <h3 className="type-body-1660 col-span-full md:col-start-5">
                  <PortableTextFragment value={item.title} />
                </h3>
              )}
            </Transition>
          </li>
        ))}
      </ul>
    </div>
  );
};
