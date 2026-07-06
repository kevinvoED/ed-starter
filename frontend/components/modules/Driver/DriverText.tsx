import type { ModuleProps } from "@/sanity/lib/fetch";
import { Transition } from "@/components/animations/Transition";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

export const DriverText = ({
  title,
  description,
  links,
}: ModuleProps<"driver-text">) => {
  return (
    <div className="grid-custom f-py-12/24 p-custom">
      <div className="grid-custom col-span-full place-items-center">
        <Transition className="col-span-full md:col-span-6 md:col-start-4">
          <PortableText
            value={title}
            as="h2"
            className="ftype type-heading-3240 to-type-heading-4840"
          />
        </Transition>

        <Transition
          delay={0.25}
          className="col-span-full md:col-span-4 md:col-start-5"
        >
          <PortableText value={description} />
        </Transition>
      </div>

      {links && (
        <div className="col-span-full flex flex-wrap justify-center gap-4 md:col-span-4 md:col-start-5">
          {links.map((link, index) => (
            <Transition key={link._key} delay={0.25 * index + 0.25}>
              <SanityLink link={link} variant="primary">
                {link.label}
              </SanityLink>
            </Transition>
          ))}
        </div>
      )}
    </div>
  );
};
