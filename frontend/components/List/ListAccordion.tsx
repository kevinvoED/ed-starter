import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { Icon } from "@/components/Icon/Icon";
import { FaqJSONLDScript } from "@/components/Metadata/Jsonld";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import * as Accordion from "@radix-ui/react-accordion";

type ListAccordionProps = BlockProps<"list-accordion">;

export const ListAccordion = ({
  eyebrow,
  title,
  link,
  enableFaqSchema,
  items,
}: ListAccordionProps) => {
  return (
    <div
      className="grid-custom gap-y-60-120-220 p-custom py-60-100-220"
      data-nav-theme="light"
    >
      <div className="relative col-span-full row-start-1 space-y-4 lg:col-span-6 lg:space-y-0">
        {eyebrow && (
          <Transition>
            <Eyebrow variant="dot-black" className="top-2 left-0 lg:absolute">
              {eyebrow}
            </Eyebrow>
          </Transition>
        )}
        {title && (
          <Transition>
            <h2 className="typef-heading-32-48-64 lg:indent-2col">
              <PortableTextFragment value={title} />
            </h2>
          </Transition>
        )}
      </div>

      {enableFaqSchema && <FaqJSONLDScript items={items} />}
      {items && items.length > 0 && (
        <div className="col-span-full space-y-15 lg:space-y-16">
          <Accordion.Root type="single" collapsible>
            {items?.map((item, index) => (
              <Accordion.Item value={item._key} key={item._key}>
                <Accordion.Trigger className="group grid-custom w-full items-start gap-y-4 border-t border-t-alabaster pt-4 pb-6 lg:gap-y-0 lg:py-4">
                  <Transition
                    delay={0.15 * index}
                    className="type-mono-1240 col-span-full row-start-1 max-w-fit bg-neon text-left text-black lg:col-span-2 lg:row-start-auto"
                  >
                    0{index + 1}
                  </Transition>
                  <Transition
                    delay={0.15 * index}
                    className="col-span-full text-left lg:col-span-9 lg:pb-4"
                  >
                    {item.title && (
                      <h3 className="typef-heading-20-28-32">
                        <PortableTextFragment value={item.title} />
                      </h3>
                    )}
                  </Transition>
                  <Transition
                    delay={0.15 * index}
                    className="row-start-1 ml-auto max-w-fit transition-colors duration-300 ease-in-out lg:col-start-12 lg:row-start-auto lg:border-[2px] lg:border-alabaster lg:p-3 group-data-[state=open]:lg:border-black"
                  >
                    <Icon
                      variant="category-x"
                      strokeWidth={0.1}
                      className="size-3 rotate-45 text-gunmetal transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90 lg:size-5"
                    />
                  </Transition>
                </Accordion.Trigger>
                <Accordion.Content className="grid-custom w-full overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                  {item.description && (
                    <PortableText
                      value={item.description}
                      className="col-span-full w-full text-balance pb-14 sm:col-span-2 lg:col-span-4 lg:col-start-3"
                    />
                  )}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          {link && (
            <div className="flex w-full justify-end">
              {link.map((link) => (
                <Button key={link._key} link={link} variant="tertiary-black">
                  {link.title}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
