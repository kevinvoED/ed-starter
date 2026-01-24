import { toPlainText } from "@portabletext/react";
import { LinkIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { eyebrow, link, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "driver-list",
  title: "Driver List",
  type: "object",
  icon: LinkIcon,
  fields: [
    eyebrow,
    ptTitle,
    ptDescription,
    defineField({
      name: "items",
      title: "Links",
      type: "array",
      of: [
        defineArrayMember({
          name: "item",
          title: "Link",
          type: "object",
          icon: LinkIcon,
          fields: [eyebrow, link],
          preview: {
            select: {
              eyebrow: "eyebrow",
              link: "link",
            },
            prepare({ eyebrow, link }) {
              return {
                title: eyebrow,
                subtitle: link[0].title,
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
        title: "Driver List",
        subtitle: toPlainText(title),
      };
    },
  },
});
