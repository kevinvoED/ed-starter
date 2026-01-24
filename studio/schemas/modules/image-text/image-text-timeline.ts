import { toPlainText } from "@portabletext/react";
import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  image,
  link,
  ptDescription,
  ptTitle,
  ptTitleHighlight,
} from "@/schemas/sharedFields";

export default defineType({
  name: "image-text-timeline",
  title: "Image Text Timeline",
  type: "object",
  icon: TiersIcon,
  fields: [
    ptTitleHighlight,
    ptDescription,
    link,
    defineField({
      name: "cards",
      title: "Cards",
      description: "Minimum 2 cards.",
      type: "array",
      of: [
        defineArrayMember({
          name: "card",
          title: "Card",
          type: "object",
          fields: [ptTitle, ptDescription, image],
          preview: {
            select: {
              title: "title",
              image: "image",
            },
            prepare({ title, image }) {
              return {
                title: toPlainText(title),
                media: image,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(2),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Image Text Timeline",
        subtitle: toPlainText(title),
      };
    },
  },
});
