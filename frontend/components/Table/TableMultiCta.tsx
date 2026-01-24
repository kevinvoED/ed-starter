import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { Dot } from "@/components/Dot/Dot";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { Tabs } from "radix-ui";

type TableMultiCtaProps = BlockProps<"table-multi-cta">;

export const TableMultiCta = ({
  eyebrow,
  title,
  tables,
}: TableMultiCtaProps) => {
  return (
    <div
      className="grid-custom gap-y-15 bg-black p-custom py-60-180-220 text-white lg:gap-y-20"
      data-nav-theme="dark"
    >
      <div className="col-span-full space-y-4">
        {eyebrow && (
          <Transition className="col-span-full">
            <Eyebrow variant="dot-neon">{eyebrow}</Eyebrow>
          </Transition>
        )}

        {title && (
          <Transition className="col-span-full lg:col-span-6">
            <h2 className="typef-heading-32-48-64">
              <PortableTextFragment value={title} />
            </h2>
          </Transition>
        )}
      </div>

      {/* Mobile Tabs */}
      {tables && (
        <Tabs.Root
          defaultValue={tables?.[0]?._key}
          className="col-span-full lg:mt-15 lg:hidden lg:pl-6"
        >
          <Tabs.List className="flex gap-3 overflow-x-auto">
            {tables.map((table) => (
              <Tabs.Trigger
                key={table._key}
                className="group data-[state=active]:!text-black flex flex-1 cursor-default select-none items-center justify-center gap-2.5 py-px pr-1 pl-1.5 leading-none outline-none data-[state=active]:bg-neon data-[state=active]:focus:relative"
                value={table._key}
              >
                {table.title && (
                  <Transition key={table._key} className="col-span-full">
                    <h3 className="type-heading-2030 lg:type-heading-2430 flex items-center gap-x-2.5 whitespace-nowrap border-charcoal border-b border-dashed lg:pb-6">
                      <Dot
                        color="neon"
                        className="group-data-[state=active]:!bg-black"
                      />
                      <PortableTextFragment value={table.title} />
                    </h3>
                  </Transition>
                )}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {tables?.map((table) => {
            return (
              <Tabs.Content
                key={table._key}
                value={table._key}
                className="mt-10 lg:space-y-10 lg:pr-6"
              >
                {table.items?.map((item, itemIndex) => {
                  return (
                    <Transition
                      key={item._key}
                      delay={0.1 * itemIndex}
                      className="col-span-3 space-y-8 py-5"
                    >
                      <div className="space-y-2">
                        {item.eyebrow && (
                          <p className="type-mono-1240 uppercase">
                            {item.eyebrow}
                          </p>
                        )}
                        {item.title && (
                          <h3 className="[&_*]:type-body-1450 col-span-3 [&_li]:mb-3 [&_ul]:mb-0">
                            <PortableText value={item.title} />
                          </h3>
                        )}
                      </div>
                      {item?.link?.map((link) => (
                        <div
                          className="col-span-full lg:col-span-2 lg:text-right"
                          key={link._key}
                        >
                          <Button variant="tertiary-neon" link={link}>
                            {link.title}
                          </Button>
                        </div>
                      ))}
                    </Transition>
                  );
                })}
              </Tabs.Content>
            );
          })}
        </Tabs.Root>
      )}

      {/* Desktop Table */}
      {tables && (
        <Transition className="col-span-full hidden lg:block">
          <div className="space-y-20">
            {tables.map((table) => (
              <div key={table._key} className="grid-custom gap-y-6">
                {table.title && (
                  <Transition key={table._key} className="col-span-full">
                    <h3 className="type-heading-2430 flex items-center gap-x-2.5 border-charcoal border-b border-dashed lg:pb-6">
                      <Dot color="neon" />
                      <PortableTextFragment value={table.title} />
                    </h3>
                  </Transition>
                )}

                <ul className="col-span-full lg:col-start-4">
                  {table.items?.map((item, index) => (
                    <li key={item._key}>
                      <Transition
                        delay={0.05 * index}
                        className="grid grid-cols-9 gap-x-5 border-gunmetal border-b py-5"
                      >
                        {item.eyebrow && (
                          <p className="type-mono-1240 col-span-full uppercase lg:col-span-3">
                            {item.eyebrow}
                          </p>
                        )}
                        {item.title && (
                          <h3 className="type-body-1660 col-span-full lg:col-span-4">
                            <PortableTextFragment value={item.title} />
                          </h3>
                        )}
                        {item?.link?.map((link) => (
                          <div
                            className="col-span-full lg:col-span-2 lg:text-right"
                            key={link._key}
                          >
                            <Button variant="tertiary-neon" link={link}>
                              {link.title}
                            </Button>
                          </div>
                        ))}
                      </Transition>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Transition>
      )}
    </div>
  );
};
