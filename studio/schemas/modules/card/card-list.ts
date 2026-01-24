import { toPlainText } from "@portabletext/react";
import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  eyebrow,
  image,
  link,
  ptDescription,
  ptTitle,
  title,
} from "@/schemas/sharedFields";

export default defineType({
  name: "card-list",
  title: "Card List",
  type: "object",
  icon: TiersIcon,
  fields: [
    eyebrow,
    ptTitle,
    ptDescription,
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          name: "card",
          title: "Card",
          type: "object",
          fields: [
            defineField({
              ...image,
              validation: (Rule) => Rule.required(),
            }),
            title,
            defineField({
              ...title,
              name: "subtitle",
              title: "Subtitle",
              description:
                "The subtitle. It is displayed in a lighter text color. Optional.",
              validation: (Rule) => Rule,
            }),
            ptDescription,
            link,
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
              image: "image",
            },
            prepare({ title, description, image }) {
              return {
                title: toPlainText(title),
                subtitle: toPlainText(description),
                media: image,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Card List",
        subtitle: toPlainText(title),
      };
    },
  },
});
