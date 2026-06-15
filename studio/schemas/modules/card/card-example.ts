import { toPlainText } from "@portabletext/react";
import { InlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { cards, description, links, title } from "@/schemas/common";

export default defineType({
  name: "card-example",
  title: "Card Example",
  type: "object",
  fields: [
    title,
    description,
    links,
    defineField({
      ...cards,
      description:
        "Display up to 4 cards. Order is respected. Minimum 2 cards required.", // Over-ride description if needed
      validation: (Rule) => Rule.min(2).max(4), // Over-ride validation if needed
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
        media: InlineIcon,
      };
    },
  },
});
