import { toPlainText } from "@portabletext/react";
import { MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { marqueeImages, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "text-logo",
  title: "Text Logo",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    ptTitle,
    defineField({
      ...marqueeImages,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Text Logo",
        subtitle: toPlainText(title),
      };
    },
  },
});
