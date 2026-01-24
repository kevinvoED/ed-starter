import { toPlainText } from "@portabletext/react";
import { StackCompactIcon, TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import { eyebrow, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "table-comparison",
  title: "Table Comparison",
  type: "object",
  icon: StackCompactIcon,
  fields: [
    eyebrow,
    ptTitle,
    ptDescription,
    defineField({
      name: "columns",
      title: "Columns",
      type: "array",
      icon: TextIcon,
      description: "Add the table columns.",
      validation: (Rule) => Rule.required().min(2).max(5),
      of: [
        {
          type: "object",
          name: "columnHeader",
          title: "Column Header",
          icon: TextIcon,
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              description: "The header text for this column.",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
            },
            prepare({ title }) {
              return {
                title: title || "Unnamed Column",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      icon: TextIcon,
      description:
        "Each item here is 1 row within the table, with each row having its own category label. You can additionally add row cells. ",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          name: "comparisonRow",
          title: "Comparison Row",
          icon: TextIcon,
          fields: [
            {
              name: "category",
              title: "Category",
              type: "string",
              description:
                "The category that this entire table row belongs to.",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "cells",
              title: "Cells",
              type: "array",
              description: "Content for each column in this row.",
              of: [
                {
                  type: "object",
                  name: "cell",
                  title: "Cell",
                  icon: TextIcon,
                  fields: [
                    portableTextPlain({
                      name: "content",
                      title: "Content",
                      description: "Rich text content for this cell.",
                      enableBold: true,
                      enableTypeStyle: true,
                      enableNumberList: true,
                      enableItalic: true,
                      enableBulletList: true,
                      enableLink: true,
                      validation: false,
                    }),
                  ],
                  preview: {
                    select: {
                      content: "content",
                    },
                    prepare({ content }) {
                      return {
                        title: content ? toPlainText(content) : "Empty cell",
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              category: "category",
            },
            prepare({ category }) {
              return {
                title: category || "Unnamed Row",
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
        title: "Table Comparison",
        subtitle: toPlainText(title),
      };
    },
  },
});
