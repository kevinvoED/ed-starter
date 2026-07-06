import { toPlainText } from "@portabletext/react";
import { TextIcon } from "@sanity/icons/Text";
import { defineField, defineType } from "sanity";
import { ModulePreview } from "@/components/module-preview";
import { portableText } from "@/schemas/common";

export default defineType({
  name: "rich-text",
  title: "Rich Text",
  type: "object",
  fields: [
    defineField({
      ...portableText,
    }),
  ],
  components: { preview: ModulePreview },
  preview: {
    select: {
      content: "content",
    },
    prepare({ content }) {
      return {
        title: toPlainText(content ?? []),
        subtitle: "Rich Text",
        media: TextIcon,
      };
    },
  },
});
