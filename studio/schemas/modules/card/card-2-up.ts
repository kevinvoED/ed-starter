import { toPlainText } from "@portabletext/react";
import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  image,
  ptDescription,
  ptTitle,
  ptTitleHighlight,
} from "@/schemas/sharedFields";

export default defineType({
  name: "card-2-up",
  title: "Card 2-Up",
  type: "object",
  icon: TiersIcon,
  fields: [
    ptTitleHighlight,
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          name: "card",
          title: "Card",
          type: "object",
          fields: [image, ptTitle, ptDescription],
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
      validation: (Rule) => Rule.required().min(2).max(2),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Card 2-Up",
        subtitle: toPlainText(title),
      };
    },
  },
});
