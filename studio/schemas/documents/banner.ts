import { UserIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";
import { description, links, title } from "@/schemas/common";

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
      ...links,
    }),
    orderRankField({ type: "banner" }),
  ],
  preview: {
    prepare() {
      return { title: "Banner" };
    },
  },
});
