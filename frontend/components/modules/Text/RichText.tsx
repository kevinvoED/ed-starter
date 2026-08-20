import type { ModuleProps } from "@/sanity/lib/fetch";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

export const RichText = ({ content }: ModuleProps<"rich-text">) => {
  if (!content) return null;

  return (
    <article className="container">
      {content && <PortableText value={content} style="article" />}
    </article>
  );
};
