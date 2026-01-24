import { toPlainText } from "@portabletext/react";
import { LinkIcon, StackCompactIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { eyebrow, link, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "table-multi-cta",
  title: "Table Multi Cta",
  type: "object",
  icon: StackCompactIcon,
  fields: [
    eyebrow,
    ptTitle,
    defineField({
      name: "tables",
      title: "Table Items",
      type: "array",
      icon: StackCompactIcon,
      description: "List of table items.",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "table",
          title: "Table",
          type: "object",
          icon: StackCompactIcon,
          fields: [
            ptTitle,
            {
              name: "items",
              title: "Table Items",
              type: "array",
              of: [
                {
                  name: "item",
                  title: "Table Item",
                  type: "object",
                  icon: LinkIcon,
                  fields: [eyebrow, ptTitle, link],
                  preview: {
                    select: {
                      eyebrow: "eyebrow",
                      title: "title",
                      link: "link",
                    },
                    prepare({ eyebrow, title }) {
                      return {
                        title: eyebrow,
                        subtitle: toPlainText(title),
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "title",
              items: "items",
            },
            prepare({ title, items }) {
              return {
                title: toPlainText(title),
                subtitle: `${items.length} item${items.length > 1 ? "s" : ""}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Table Multi Cta",
        subtitle: toPlainText(title),
      };
    },
  },
});
