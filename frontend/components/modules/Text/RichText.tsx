import type { ModuleProps } from "@/sanity/lib/fetch";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

export const RichText = ({ content }: ModuleProps<"rich-text">) => {
  if (!content) return null;

  return (
    <article className="mx-auto max-w-200">
      {content && <PortableText value={content} style="article" />}
    </article>
  );
};
