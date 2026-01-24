import { toPlainText } from "@portabletext/react";
import { BlockContentIcon, MasterDetailIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  link,
  logo,
  marqueeImages,
  ptDescription,
  ptTitleHighlight,
  title,
} from "@/schemas/sharedFields";

export default defineType({
  name: "list-cta-3-up",
  title: "List Cta 3-Up",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    ptTitleHighlight,
    ptDescription,
    defineField({
      name: "items",
      title: "Cta Items",
      type: "array",
      validation: (Rule) => Rule.required().max(3),
      of: [
        defineArrayMember({
          name: "item",
          title: "Cta Item",
          type: "object",
          icon: BlockContentIcon,
          fields: [
            logo,
            title,
            defineField({
              ...title,
              name: "subtitle",
              title: "Subtitle",
              description:
                "The subtitle. It is displayed in a lighter text color.",
            }),
            link,
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              logo: "logo",
            },
            prepare({ title, subtitle, logo }) {
              return {
                title: title,
                subtitle: subtitle,
                media: logo,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      ...marqueeImages,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "List Cta 3-Up",
        subtitle: toPlainText(title),
      };
    },
  },
});
