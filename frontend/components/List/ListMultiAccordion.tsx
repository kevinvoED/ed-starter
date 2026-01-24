import type { BlockProps } from "@/sanity/lib/fetch";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { Icon } from "@/components/Icon/Icon";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import * as Accordion from "@radix-ui/react-accordion";

type ListMultiAccordionProps = BlockProps<"list-multi-accordion">;

export const ListMultiAccordion = ({
  eyebrow,
  title,
  accordions,
  description,
}: ListMultiAccordionProps) => {
  return (
    <div
      className="grid-custom gap-y-15 p-custom py-20 lg:gap-y-20 lg:pt-35 lg:pb-20"
      data-nav-theme="light"
    >
      <div className="grid-custom col-span-full gap-y-6 lg:gap-y-0">
        <div className="col-span-full space-y-4 lg:col-span-6 lg:space-y-0">
          {eyebrow && (
            <Transition>
              <Eyebrow
                variant="dot-black"
                className="lg:absolute lg:top-2 lg:left-0"
              >
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

        {description && (
          <Transition className="col-span-full lg:col-span-3 lg:col-start-9">
            <PortableText value={description} />
          </Transition>
        )}
      </div>

      <div className="col-span-full space-y-14 lg:space-y-18">
        {accordions?.map((accordion, accordionIndex) => (
          <div
            key={accordion._key}
            className="grid-custom w-full gap-y-6 lg:gap-y-0"
          >
            {eyebrow && (
              <Transition
                delay={0.15 + 0.15 * accordionIndex}
                className="col-span-2"
              >
                <Eyebrow>{accordion.eyebrow}</Eyebrow>
              </Transition>
            )}

            <Accordion.Root
              type="single"
              className="col-span-full lg:col-span-10"
              collapsible
            >
              {accordion.accordionItems?.map((item, index) => (
                <Accordion.Item value={item._key} key={item._key}>
                  <Accordion.Trigger className="w-full">
                    <Transition
                      delay={0.15 + 0.15 * index}
                      className="group grid-custom items-start gap-y-4 border-t border-t-alabaster pt-4 pb-6 lg:gap-y-0 lg:py-4"
                    >
                      <div className="type-mono-1240 col-span-full row-start-1 max-w-fit text-left text-black lg:col-span-2">
                        0{index + 1}
                      </div>
                      <h3 className="type-heading-2030 lg:type-heading-2830 col-span-full text-left lg:col-span-9">
                        <PortableTextFragment value={item.title} />
                      </h3>
                      <div className="row-start-1 ml-auto max-w-fit p-2 transition-colors duration-300 ease-in-out group-data-[state=open]:border-black lg:col-start-12 lg:row-start-auto lg:border-[2px] lg:border-alabaster">
                        <Icon
                          variant="category-x"
                          strokeWidth={0.2}
                          className="size-3 rotate-45 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90 lg:size-4"
                        />
                      </div>
                    </Transition>
                  </Accordion.Trigger>
                  <Accordion.Content className="grid-custom w-full overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                    {item.description && (
                      <div className="[&_*]:type-body-1440 col-span-full pt-4 pb-8 lg:col-span-5 lg:col-start-3 lg:py-4">
                        <PortableText
                          value={item.description}
                          className="col-span-full w-full pb-10"
                        />
                      </div>
                    )}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        ))}
      </div>
    </div>
  );
};
