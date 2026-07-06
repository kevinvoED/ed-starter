import type { ContentIndexVariant } from "@/lib/utils/types";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { cn } from "@/lib/utils/cn";

type ContentHeroProps = {
  title: ContentIndexVariant["title"];
  description: ContentIndexVariant["description"];
  className?: string;
};

export const ContentHero = ({
  title,
  description,
  className,
}: ContentHeroProps) => {
  if (!title) return null;

  return (
    <header
      className={cn(
        "grid-custom col-span-full items-center gap-y-5 md:col-span-3 lg:col-span-full",
        className,
      )}
    >
      <PortableText
        value={title}
        as="h1"
        className="ftype type-heading-4840 col-span-full to-type-heading-9640 lg:col-span-6"
      />

      <PortableText
        value={description}
        className="col-span-full lg:col-span-5 lg:col-start-8"
      />
    </header>
  );
};
