import { toPlainText } from "@portabletext/react";
import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { image, ptDescription, ptTitle, title } from "@/schemas/sharedFields";

export default defineType({
  name: "image-text-tab",
  title: "Image Text Tab",
  type: "object",
  icon: TiersIcon,
  fields: [
    ptTitle,
    ptDescription,
    defineField({
      ...title,
      name: "menuTitle",
      title: "Menu Title",
      description:
        "The title displayed in the tabs menu. Shown if 2 or more cards are present. Optional.",
      validation: (Rule) => Rule,
    }),
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
        title: "Image Text Tab",
        subtitle: toPlainText(title),
      };
    },
  },
});
