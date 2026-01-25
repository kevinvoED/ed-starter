import { UserIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import { image, links } from "@/schemas/sharedFields";

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
    }),
    portableTextPlain({
      title: "Description",
      description:
        "Optional. This is a brief description or bio of the author.",
      validation: false,
    }),
    defineField({
      ...links,
      title: "Social Media",
      description: "Optional.",
      validation: (Rule) => Rule,
    }),
    image,
    orderRankField({ type: "author" }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
