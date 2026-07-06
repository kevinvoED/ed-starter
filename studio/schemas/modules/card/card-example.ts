import { toPlainText } from "@portabletext/react";
import { InlineIcon } from "@sanity/icons/Inline";
import { defineField, defineType } from "sanity";
import { ModulePreview } from "@/components/module-preview";
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
  components: { preview: ModulePreview },
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: toPlainText(title ?? []),
        subtitle: "Card Example",
        media: InlineIcon,
      };
    },
  },
});
