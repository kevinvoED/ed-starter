import { toPlainText } from "@portabletext/react";
import { BlockContentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { eyebrow, links, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "text-cta-2-col",
  title: "Text Cta 2-Col",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    eyebrow,
    ptTitle,
    links,
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
        title: "Text Cta 2-Col",
        subtitle: toPlainText(title),
      };
    },
  },
});
