import { toPlainText } from "@portabletext/react";
import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  eyebrow,
  link,
  logo,
  ptDescription,
  ptTitle,
  ptTitleHighlight,
} from "@/schemas/sharedFields";

export default defineType({
  name: "card-3-up",
  title: "Card 3-Up",
  type: "object",
  icon: TiersIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      description:
        "Select the theme of this module between light and dark mode.",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ],
        layout: "radio",
      },
      initialValue: "Light",
      validation: (Rule) => Rule.required(),
    }),
    eyebrow,
    ptTitleHighlight,
    ptDescription,
    link,
    defineField({
      name: "cards",
      title: "Cards",
      description: "Minimum 2 cards, maximum 3 cards.",
      type: "array",
      of: [
        defineArrayMember({
          name: "card",
          title: "Card",
          type: "object",
          fields: [logo, ptTitle, ptDescription, link],
          preview: {
            select: {
              title: "title",
              description: "description",
              logo: "logo",
            },
            prepare({ title, description, logo }) {
              return {
                title: toPlainText(title),
                subtitle: toPlainText(description),
                media: logo,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(3),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Card 3-Up",
        subtitle: toPlainText(title),
      };
    },
  },
});
