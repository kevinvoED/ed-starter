import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";
import { toPlainText } from "@portabletext/react";
import { capitalize } from "es-toolkit/string";
import { description } from "@/schemas/common";

export default defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "banners",
      title: "Banners",
      type: "array",
      of: [
        defineField({
          name: "banner",
          title: "Banner",
          type: "object",
          fields: [
            defineField({
              name: "state",
              title: "State",
              type: "string",
              options: {
                list: ["default", "positive", "alert"],
                layout: "radio",
              },
              initialValue: "default",
            }),
            defineField({
              ...description,
            }),
          ],
          preview: {
            select: {
              title: "description",
              state: "state",
            },
            prepare({ title, state }) {
              return {
                title: title ? toPlainText(title) : "No title",
                subtitle: `Banner: ${capitalize(state)}`,
                media: InfoOutlineIcon,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
    orderRankField({ type: "banner" }),
  ],
  preview: {
    prepare() {
      return { title: "Banner" };
    },
  },
});
