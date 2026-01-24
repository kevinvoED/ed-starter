import { toPlainText } from "@portabletext/react";
import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  image,
  link,
  marquee,
  ptDescription,
  ptTitle,
} from "@/schemas/sharedFields";

export default defineType({
  name: "card-grid-marquee",
  title: "Card Grid Marquee",
  type: "object",
  icon: TiersIcon,
  fields: [
    marquee,
    ptTitle,
    link,
    defineField({
      name: "cards",
      title: "Cards",
      description: "Minimum 2 cards, maximum 8 cards.",
      type: "array",
      validation: (Rule) => Rule.required().min(2).max(8),
      of: [
        defineArrayMember({
          name: "card",
          title: "Card",
          type: "object",
          fields: [image, ptTitle, ptDescription, link],
          preview: {
            select: {
              title: "title",
              description: "description",
              image: "image",
            },
            prepare({ title, description, image }) {
              return {
                title: toPlainText(title),
                subtitle: description ? toPlainText(description) : "",
                media: image,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Card Grid Marquee",
        subtitle: toPlainText(title),
      };
    },
  },
});
