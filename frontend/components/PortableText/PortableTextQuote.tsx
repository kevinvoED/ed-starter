import type { PortableText as PortableTextType } from "@/sanity.types";
import { Dot } from "@/components/Dot/Dot";
import { PortableTextFragment } from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type PortableTextQuoteProps = {
  className?: string;
  title?: PortableTextType;
  author?: string;
};

export const PortableTextQuote = ({
  className,
  title,
  author,
}: PortableTextQuoteProps) => {
  if (!title) {
    return null;
  }

  return (
    <blockquote
      className={cn(
        "typef-heading-32-48-64 mb-20 flex flex-col gap-y-6 lg:gap-y-10",
        className,
      )}
    >
      {title && (
        <q>
          <PortableTextFragment value={title} />
        </q>
      )}
      {author && (
        <cite className="type-body-1440 flex items-center gap-x-3">
          <Dot color="black" />
          {author}
        </cite>
      )}
    </blockquote>
  );
};
