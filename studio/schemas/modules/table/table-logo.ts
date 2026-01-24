import { toPlainText } from "@portabletext/react";
import { StackCompactIcon, TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import { eyebrow, image, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "table-logo",
  title: "Table Logo",
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
              description:
                "The header text for this column. A Blank/empty will become a square icon",
              initialValue: "",
            },
          ],
          preview: {
            select: {
              title: "label",
            },
            prepare({ title }) {
              return {
                title:
                  String(title).trim().length > 0
                    ? title
                    : "- Unnamed Column -",
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
        "Each item here is 1 row within the table, with each row having its own icon/image",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          name: "row",
          title: "Row",
          icon: TextIcon,
          fields: [
            defineField({
              ...image,
              name: "image",
              title: "Column One",
              description: "The vendor logo/icon.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "invert",
              title: "Invert Image",
              type: "boolean",
              description:
                "Invert the colors of the logo/icon so that it works well on a light background.",
              initialValue: false,
            }),
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              description:
                "Content for each column in this row. Should total the same number of header minus the icon/image",
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
            }),
          ],
          preview: {
            select: {
              cells: "cells",
            },
            prepare({ cells }) {
              console.log({ cells });
              return {
                title: Array.from(cells)
                  .map((cell) =>
                    (cell as Record<string, unknown>)?.content
                      ? toPlainText((cell as Record<string, unknown>).content)
                      : "Unnamed Row",
                  )
                  .join(", "),
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
      rows: "rows",
    },
    prepare({ title, rows }) {
      return {
        title: "Table Logo",
        subtitle: `${toPlainText(title)} (${rows?.length || 0} rows)`,
      };
    },
  },
});
