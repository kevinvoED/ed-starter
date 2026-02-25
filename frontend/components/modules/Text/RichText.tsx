import type { ModuleProps } from "@/sanity/lib/fetch";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

type RichTextProps = ModuleProps<"rich-text">;

// TODO PROJECT-START: style this rich text module
export const RichText = ({ content }: RichTextProps) => {
  return (
    <article className="mx-auto max-w-200">
      {content && <PortableText value={content} style="article" />}
    </article>
  );
};
