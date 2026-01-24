import { toPlainText } from "@portabletext/react";
import { BlockContentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { eyebrow, logo, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "text-2-col",
  title: "Text 2-Col",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    eyebrow,
    ptTitle,
    logo,
    defineField({
      name: "columns",
      title: "Columns",
      type: "object",
      fields: [
        defineField({
          ...ptDescription,
          name: "columnOne",
          title: "Column One",
        }),
        defineField({
          ...ptDescription,
          name: "columnTwo",
          title: "Column Two",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Text 2-Col",
        subtitle: toPlainText(title),
      };
    },
  },
});
