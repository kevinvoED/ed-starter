import { toPlainText } from "@portabletext/react";
import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import {
  eyebrow,
  image,
  link,
  ptDescription,
  ptTitle,
  ptTitleHighlight,
} from "@/schemas/sharedFields";

export default defineType({
  name: "card-collapsible",
  title: "Card Collapsible",
  type: "object",
  icon: TiersIcon,
  fields: [
    eyebrow,
    ptTitleHighlight,
    ptDescription,
    defineField({
      name: "cards",
      title: "Cards",
      description: "Minimum 3 cards, maximum 5 cards.",
      type: "array",
      of: [
        defineArrayMember({
          name: "card",
          title: "Card",
          type: "object",
          fields: [
            image,
            ptTitle,
            {
              name: "content",
              type: "array",
              of: [
                defineArrayMember({
                  name: "item",
                  title: "Item",
                  type: "object",
                  fields: [
                    eyebrow,
                    portableTextPlain({
                      name: "description",
                      title: "Description",
                      enableBold: true,
                      enableItalic: true,
                      enableLink: true,
                    }),
                  ],
                }),
              ],
              validation: (Rule) => Rule.max(2),
            },
            link,
          ],
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
      validation: (Rule) => Rule.required().min(3).max(5),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Card Collapsible",
        subtitle: toPlainText(title),
      };
    },
  },
});
