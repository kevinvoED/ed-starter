import { toPlainText } from "@portabletext/react";
import { UserIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";
import { description, link, title } from "@/schemas/sharedFields";

export default defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      ...title,
    }),
    defineField({
      ...description,
    }),
    defineField({
      ...link,
      validation: (Rule) => Rule.max(2),
    }),
    orderRankField({ type: "banner" }),
  ],
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare({ title, image }) {
      return {
        title: "Banner",
        subtitle: toPlainText(title),
        media: image,
      };
    },
  },
});
