import { toPlainText } from "@portabletext/react";
import { HighlightIcon } from "@sanity/icons";
import { defineType } from "sanity";
import { ptContentHighlight } from "@/schemas/sharedFields";

export default defineType({
  name: "portable-text-content-highlight",
  title: "Portable Text Content Highlight",
  type: "object",
  icon: HighlightIcon,
  fields: [ptContentHighlight],
  preview: {
    select: {
      content: "content",
    },
    prepare({ content }) {
      return {
        title: "Portable Text Content Highlight",
        subtitle: content ? toPlainText(content) : "",
      };
    },
  },
});
