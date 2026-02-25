import type { ModuleProps } from "@/sanity/lib/fetch";
import { Transition } from "@/components/animations/Transition";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

type DriverExampleProps = ModuleProps<"driver-example">;

export const DriverExample = ({
  title,
  description,
  image,
  link,
}: DriverExampleProps) => {
  return (
    <div className="fluid-py-10/20 p-custom">
      {title && (
        <Transition>
          <PortableText
            value={title}
            slot="h2"
            className="ftype type-heading-3250 to-type-heading-4850"
          />
        </Transition>
      )}
      {description && (
        <Transition>
          <PortableText value={description} className="type-body-1640" />
        </Transition>
      )}

      {image && (
        <SanityImage image={image} sizes="(max-width: 768px) 75vw, 200px" />
      )}

      {link && (
        <div className="flex flex-col gap-4">
          {link.map((link) => (
            <SanityLink
              key={link._key}
              link={link}
              variant="primary"
              id="cta"
              width="fit"
            >
              {link.label}
            </SanityLink>
          ))}
        </div>
      )}
    </div>
  );
};
