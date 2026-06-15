import type { ModuleProps } from "@/sanity/lib/fetch";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

export const CardExample = ({
  title,
  description,
  links,
  cards,
}: ModuleProps<"card-example">) => {
  return (
    <div className="grid-custom f-py-10/20 f-gap-8/12 bg-black p-custom text-white">
      <div className="f-gap-y-2/4 grid-custom col-span-full text-center">
        <div className="md:col-span-8 md:col-start-3">
          <PortableText value={title} slot="h1" className="type-heading-4840" />
        </div>

        <PortableText
          value={description}
          className="md:col-span-4 md:col-start-5"
        />
      </div>

      {cards?.map((card) => (
        <article
          key={card._key}
          className="f-p-2/4 f-gap-2/4 col-span-full flex flex-col rounded-lg bg-white text-black md:col-span-3"
        >
          <PortableText
            value={card.title}
            slot="h1"
            className="type-heading-3240"
          />

          <PortableText value={card.description} />
        </article>
      ))}

      {links?.map((link) => (
        <SanityLink
          key={link._key}
          link={link}
          width="fit"
          className="col-span-full place-self-center"
        >
          {link.label}
        </SanityLink>
      ))}
    </div>
  );
};
