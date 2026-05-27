import type { ModuleProps } from "@/sanity/lib/fetch";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

export const HeroPrimary = ({
  title,
  link,
  image,
  description,
}: ModuleProps<"hero-primary">) => {
  return (
    <div className="grid-custom">
      <SanityImage
        image={image}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="col-span-full size-full md:col-span-6"
      />

      <div className="f-py-6/12 f-gap-6/12 col-span-full flex flex-col p-custom md:col-span-6 md:pl-0">
        <div className="f-gap-y-2/6 flex flex-col">
          <PortableText
            value={title}
            slot="h1"
            className="ftype type-body-1640 to-type-body-3240"
          />

          <PortableText value={description} className="max-w-prose" />
        </div>

        <div className="flex flex-wrap gap-4">
          {link?.map((link) => (
            <SanityLink
              key={link._key}
              link={link}
              width="fit"
              hasArrow={false}
            >
              {link.label}
            </SanityLink>
          ))}
        </div>
      </div>
    </div>
  );
};
