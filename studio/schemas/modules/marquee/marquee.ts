import { DashboardIcon, MasterDetailIcon } from "@sanity/icons";
import { upperFirst } from "es-toolkit";
import { defineField, defineType } from "sanity";
import { images, title } from "@/schemas/sharedFields";

export default defineType({
  name: "marquee",
  title: "Marquee",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Text Items",
      type: "array",
      of: [
        {
          name: "marqueeItem",
          title: "Marquee Item",
          type: "object",
          icon: MasterDetailIcon,
          fields: [title],
        },
      ],
      hidden: ({ parent }) => parent?.variant !== "text",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { variant?: string };
          if (parent?.variant === "text") {
            if (!value || !Array.isArray(value) || value.length === 0) {
              return "Required when variant is Text";
            }
          }
          return true;
        }),
    }),
    defineField({
      ...images,
      hidden: ({ parent }) => parent?.variant !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { variant?: string };
          if (parent?.variant === "image") {
            if (!value || !Array.isArray(value) || value.length === 0) {
              return "Required when variant is Image.";
            }
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      variant: "variant",
    },
    prepare({ variant }) {
      return {
        title: "Marquee",
        subtitle: `Variant: ${upperFirst(variant)}`,
        media: DashboardIcon,
      };
    },
  },
});
