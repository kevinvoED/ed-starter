import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { portableText } from "@/schemas/sharedFields";

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
