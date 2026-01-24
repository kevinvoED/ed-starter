import { toPlainText } from "@portabletext/react";
import { MasterDetailIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { eyebrow, logo, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "list-icon-scroll",
  title: "List Icon Scroll",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    eyebrow,
    ptTitle,
    ptDescription,
    defineField({
      name: "items",
      title: "List Items",
      type: "array",
      of: [
        defineArrayMember({
          name: "item",
          title: "List Item",
          type: "object",
          fields: [
            defineField({ ...logo, validation: (Rule) => Rule.required() }),
            ptTitle,
            ptDescription,
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
              logo: "logo",
            },
            prepare({ title, description, logo }) {
              return {
                title: toPlainText(title),
                subtitle: toPlainText(description),
                media: logo,
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
        title: "List Icon Scroll",
        subtitle: toPlainText(title),
      };
    },
  },
});
