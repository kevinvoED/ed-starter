import { toPlainText } from "@portabletext/react";
import { BlockContentIcon, MasterDetailIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { eyebrow, link, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "list-text",
  title: "List Text",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    eyebrow,
    ptTitle,
    ptDescription,
    link,
    defineField({
      name: "items",
      title: "List Items",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        defineArrayMember({
          name: "item",
          title: "List Item",
          type: "object",
          icon: BlockContentIcon,
          fields: [eyebrow, ptTitle],
          preview: {
            select: {
              title: "title",
              eyebrow: "eyebrow",
            },
            prepare({ title, eyebrow }) {
              return {
                title: toPlainText(title),
                subtitle: eyebrow,
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
        title: "List Text",
        subtitle: toPlainText(title),
      };
    },
  },
});
