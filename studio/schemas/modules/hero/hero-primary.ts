import { DashboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { eyebrow, image, link, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "hero-primary",
  title: "Hero Primary",
  type: "object",
  icon: DashboardIcon,
  fields: [
    eyebrow,
    ptTitle,
    defineField({
      ...link,
      validation: (Rule) => Rule.max(2),
    }),
    image,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero Primary",
        subtitle: title,
      };
    },
  },
});
