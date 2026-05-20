import type { fetchContentTypeIndexPageData } from "@/sanity/lib/fetch";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { cn } from "@/lib/utils/cn";

type IndexPageDataType = NonNullable<
  Awaited<ReturnType<typeof fetchContentTypeIndexPageData>>
>;

type ContentHeroProps = {
  title: IndexPageDataType["title"];
  description: IndexPageDataType["description"];
  className?: string;
};

export const ContentHero = ({
  title,
  description,
  className,
}: ContentHeroProps) => {
  return (
    <header
      className={cn(
        "grid-custom col-span-full items-center gap-y-5 md:col-span-3 lg:col-span-full",
        className,
      )}
    >
      {title && (
        <PortableText
          value={title}
          slot="h1"
          className="ftype type-heading-4840 col-span-full to-type-heading-9640 lg:col-span-6"
        />
      )}
      {description && (
        <PortableText
          value={description}
          className="col-span-full lg:col-span-5 lg:col-start-8"
        />
      )}
    </header>
  );
};
