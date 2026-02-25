import { toPlainText } from "@portabletext/react";
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { description, image, link, title } from "@/schemas/sharedFields";

export default defineType({
  name: "card-example",
  title: "Card Example",
  type: "object",
  fields: [
    defineField({
      ...title,
    }),
    defineField({
      ...description,
    }),
    defineField({
      ...image,
    }),
    defineField({
      ...link,
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Card Example",
        subtitle: toPlainText(title),
        media: DocumentIcon, // Change to relevant icon!
      };
    },
  },
});
