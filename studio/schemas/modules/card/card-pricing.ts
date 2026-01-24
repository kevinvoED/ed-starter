import { toPlainText } from "@portabletext/react";
import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import { eyebrow, link, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "card-pricing",
  title: "Card Pricing",
  type: "object",
  icon: TiersIcon,
  fields: [
    eyebrow,
    defineField({
      ...ptTitle,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Cards",
      description: "Minimum and maximum 4 cards.",
      type: "array",
      of: [
        defineArrayMember({
          name: "card",
          title: "Card",
          type: "object",
          fields: [
            defineField({
              ...ptTitle,
              description: "The title of the pricing card.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              ...eyebrow,
              description:
                "The eyebrow used to hightlight the label of the card (e.g. 'Most Popular').",
            }),
            defineField({
              ...ptDescription,
              description: "The description of the pricing card.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "object",
              fields: [
                defineField({
                  name: "monthly",
                  title: "Monthly",
                  type: "string",
                  description: "Leave blank to default to yearly price.",
                }),
                defineField({
                  name: "yearly",
                  title: "Yearly",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
            portableTextPlain({
              name: "content",
              title: "Content",
              description: "The content of the pricing card.",
              enableBulletList: true,
              enableNumberList: true,
              enableBold: true,
            }),
            link,
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
            },
            prepare({ title, description }) {
              return {
                title: toPlainText(title),
                subtitle: toPlainText(description),
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(4).max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Card Pricing",
        subtitle: toPlainText(title),
      };
    },
  },
});
