import { toPlainText } from "@portabletext/react";
import { DashboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  description,
  image,
  link,
  portableText,
  title,
} from "@/schemas/sharedFields";

export default defineType({
  name: "hero-primary",
  title: "Hero Primary",
  type: "object",
  fields: [
    title,
    description,
    defineField({
      ...link,
      validation: (Rule) => Rule.max(2),
    }),
    image,
    portableText,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero Primary",
        subtitle: toPlainText(title),
        media: DashboardIcon,
      };
    },
  },
});
