import { UserIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";
import { image, link } from "@/schemas/sharedFields";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "The full name of the author.",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      description: "A short bio of the author.",
      rows: 4,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      ...link,
      title: "Social Media",
      description:
        "Optional. Add links to this author's social media profiles.",
      validation: (Rule) => Rule,
    }),
    defineField({
      ...image,
      title: "Avatar Image",
    }),
    orderRankField({ type: "author" }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
