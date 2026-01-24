import { toPlainText } from "@portabletext/react";
import { BlockContentIcon, MasterDetailIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { logo, ptTitleHighlight } from "@/schemas/sharedFields";

export default defineType({
  name: "list-grid-logo",
  title: "List Grid Logo",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    ptTitleHighlight,
    defineField({
      name: "logos",
      title: "Logo Items",
      type: "array",
      validation: (Rule) => Rule.required().min(4),
      of: [
        defineArrayMember({
          name: "logo",
          title: "Logo Item",
          type: "object",
          icon: BlockContentIcon,
          fields: [logo],
          preview: {
            select: {
              logo: "logo",
            },
            prepare({ logo }) {
              return {
                title: "Logo Item",
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
        title: "List Grid Logo",
        subtitle: toPlainText(title),
      };
    },
  },
});
