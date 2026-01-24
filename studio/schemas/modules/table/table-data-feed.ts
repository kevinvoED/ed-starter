import { toPlainText } from "@portabletext/react";
import {
  CheckmarkIcon,
  EmptyIcon,
  StackCompactIcon,
  TextIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import { eyebrow, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "table-data-feed",
  title: "Table Data Feed",
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
      description: "Add the table columns. Maximum of 4 columns.",
      validation: (Rule) => Rule.required().min(2).max(4),
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
          name: "row",
          title: "Table Row",
          icon: TextIcon,
          fields: [
            {
              name: "label",
              title: "Row Label",
              type: "string",
              description: "The label that this entire table row belongs to.",
              placeholder: "Infrastructure Focus, Update Cadence, etc.",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "styling",
              title: "Row Styling",
              type: "string",
              options: {
                list: [
                  { title: "Default", value: "default" },
                  { title: "Indented", value: "indented" },
                ],
                layout: "radio",
              },
              description:
                "Select the styling for this row. Indented will indent only the row label, otherwise by default it will be left aligned.",
              initialValue: "default",
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
                    defineField({
                      name: "cellType",
                      title: "Cell Type",
                      type: "string",
                      description:
                        "Select what type of content this cell should display.",
                      options: {
                        list: [
                          { title: "Plain Text", value: "plain-text" },
                          { title: "Checkmark", value: "checkmark" },
                          { title: "Empty", value: "empty" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "plain-text",
                      validation: (Rule) => Rule.required(),
                    }),
                    portableTextPlain({
                      name: "content",
                      title: "Content",
                      description: "Rich text content for this cell.",
                      enableBold: true,
                      enableItalic: true,
                      hidden: ({ parent }) => parent?.cellType !== "plain-text",
                      validation: (Rule) =>
                        Rule.custom((value, context) => {
                          const parent = context.parent as {
                            cellType?: string;
                          };
                          if (parent?.cellType === "plain-text" && !value) {
                            return "Content is required when cell type is Plain Text";
                          }
                          return true;
                        }),
                    }),
                  ],
                  preview: {
                    select: {
                      content: "content",
                      cellType: "cellType",
                    },
                    prepare({ content, cellType }) {
                      if (cellType === "checkmark") {
                        return {
                          title: "Checkmark",
                          media: CheckmarkIcon,
                        };
                      }
                      if (cellType === "empty") {
                        return {
                          title: "Empty cell",
                          media: EmptyIcon,
                        };
                      }
                      return {
                        title: toPlainText(content),
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              label: "label",
            },
            prepare({ label }) {
              return {
                title: label,
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
        title: "Table Data Feed",
        subtitle: toPlainText(title),
      };
    },
  },
});
