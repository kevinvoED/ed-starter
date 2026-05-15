import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
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
  preview: {
    prepare() {
      return {
        title: "Rich Text",
        media: DocumentIcon,
      };
    },
  },
});
