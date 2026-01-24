import { toPlainText } from "@portabletext/react";
import { BlockContentIcon, MasterDetailIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import { eyebrow, link, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "list-accordion",
  title: "List Accordion",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    eyebrow,
    ptTitle,
    link,
    defineField({
      name: "enableFaqSchema",
      type: "boolean",
      title: "Enable FAQ Schema",
      description:
        "Enable structured data (JSON-LD) for search engines to display rich FAQ snippets",
      initialValue: true,
    }),
    defineField({
      name: "items",
      title: "Accordion Items",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        defineArrayMember({
          name: "item",
          title: "Accordion Item",
          type: "object",
          icon: BlockContentIcon,
          fields: [
            ptTitle,
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
        title: "List Accordion",
        subtitle: toPlainText(title),
      };
    },
  },
});
