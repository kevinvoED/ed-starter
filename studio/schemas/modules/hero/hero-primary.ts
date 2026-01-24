import { DashboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { eyebrow, image, links, title } from "@/schemas/sharedFields";

export default defineType({
  name: "hero-primary",
  title: "Hero Primary",
  type: "object",
  icon: DashboardIcon,
  fields: [
    eyebrow,
    title,
    defineField({ ...links, validation: (Rule) => Rule }),
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
