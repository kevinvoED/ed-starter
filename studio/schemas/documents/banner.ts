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
      description:
        "Add multiple banners to be displayed at the top of every page. Max 3 banners.",
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
              description:
                "The state of the banner. This will determine the background color of the banner.",
              options: {
                list: ["default", "positive", "alert"],
                layout: "radio",
              },
              initialValue: "default",
              validation: (Rule) => Rule.required(),
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
                subtitle: `${capitalize(state)}`,
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
