import { toPlainText } from "@portabletext/react";
import { AsteriskIcon, ListIcon, TextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  eyebrow,
  ptDescription,
  ptSubtitle,
  ptTitle,
} from "@/schemas/sharedFields";

export default defineType({
  name: "infographic-model",
  title: "Infographic Model",
  type: "object",
  icon: AsteriskIcon,
  fields: [
    eyebrow,
    ptTitle,
    ptDescription,
    defineField({
      ...ptTitle,
      name: "listsTitle",
      title: "Lists Title",
      description: "Title for the lists section",
    }),
    defineField({
      name: "lists",
      title: "Lists",
      type: "array",
      description: "Add exactly 2 lists.",
      of: [
        defineArrayMember({
          name: "list",
          title: "List",
          type: "object",
          icon: ListIcon,
          fields: [
            ptTitle,
            ptSubtitle,
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              description: "Add exactly 4 items to this list.",
              of: [
                defineArrayMember({
                  name: "item",
                  title: "Item",
                  type: "object",
                  icon: TextIcon,
                  fields: [
                    defineField({
                      ...ptTitle,
                      description: "",
                    }),
                  ],
                }),
              ],
              validation: (Rule) => Rule.required().min(4).max(4),
            }),
          ],
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
        title: "Infographic Model",
        subtitle: toPlainText(title),
      };
    },
  },
});
