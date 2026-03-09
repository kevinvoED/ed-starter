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
      validation: (Rule) => Rule,
    }),
    defineField({
      ...description,
      validation: (Rule) => Rule,
    }),
    defineField({
      ...link,
      validation: (Rule) => Rule.max(2),
    }),
    orderRankField({ type: "banner" }),
  ],
  preview: {
    prepare() {
      return { title: "Banner" };
    },
  },
});
