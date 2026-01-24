import { toPlainText } from "@portabletext/react";
import { BlockContentIcon, MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import { eyebrow, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "list-multi-accordion",
  title: "List Multi Accordion",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    eyebrow,
    ptTitle,
    ptDescription,
    defineField({
      name: "accordions",
      title: "Accordions",
      type: "array",
      of: [
        {
          name: "accordion",
          title: "Accordion",
          type: "object",
          icon: MasterDetailIcon,
          fields: [
            {
              ...eyebrow,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "accordionItems",
              title: "Accordion Items",
              type: "array",
              icon: BlockContentIcon,
              of: [
                {
                  name: "accordionItem",
                  title: "Accordion Item",
                  type: "object",
                  icon: BlockContentIcon,
                  fields: [
                    defineField({
                      ...ptTitle,
                      title: "Accordion Item Title",
                      validation: (Rule) => Rule.required(),
                    }),
                    portableTextPlain({
                      name: "description",
                      title: "Description",
                      validation: true,
                      enableBulletList: true,
                      enableNumberList: true,
                      enableBold: true,
                      enableItalic: true,
                      enableLink: true,
                    }),
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
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "eyebrow",
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
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "List Multi Accordion",
        subtitle: toPlainText(title),
      };
    },
  },
});
