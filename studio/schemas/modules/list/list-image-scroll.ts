import { toPlainText } from "@portabletext/react";
import { LinkIcon, MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  eyebrow,
  image,
  link,
  ptDescription,
  title,
} from "@/schemas/sharedFields";

export default defineType({
  name: "list-image-scroll",
  title: "List Image Scroll",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    eyebrow,
    defineField({
      name: "tabs",
      title: "Tabs",
      description: "Each tab is a set of accordion items.",
      type: "array",
      of: [
        {
          name: "tab",
          title: "Tab",
          type: "object",
          icon: LinkIcon,
          fields: [
            {
              name: "title",
              title: "Tab Title",
              description: "The title of this tab.",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "items",
              title: "List Items",
              type: "array",
              description: "Minimum 2 items, maximum 6 items.",
              validation: (Rule) => Rule.required().min(2).max(6),
              icon: LinkIcon,
              of: [
                {
                  name: "item",
                  title: "List Item",
                  type: "object",
                  icon: LinkIcon,
                  fields: [
                    defineField({
                      ...title,
                      title: "Label",
                      validation: (Rule) => Rule.required(),
                    }),
                    ptDescription,
                    defineField({
                      ...link,
                      description: "Select an internal page.",
                      validation: (Rule) => Rule.required(),
                    }),
                    image,
                  ],
                  preview: {
                    select: {
                      title: "title",
                      description: "description",
                    },
                    prepare({ title, description }) {
                      return {
                        title: title,
                        subtitle: toPlainText(description),
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
            },
            prepare({ title }) {
              return {
                title: title,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "eyebrow",
    },
    prepare({ title }) {
      return {
        title: "List Image Scroll",
        subtitle: title,
      };
    },
  },
});
