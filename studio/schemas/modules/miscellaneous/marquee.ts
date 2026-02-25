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
      name: "enableVelocity",
      title: "Enable Velocity",
      description:
        "Scrolling faster will increase the speed of the marquee. Should this be enabled?",
      type: "boolean",
      initialValue: false,
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
      name: "imageType",
      title: "Image Type",
      description:
        "Are the images displayed in this marquee considered logos or regular images?",
      type: "string",
      options: {
        list: [
          { title: "Regular Image", value: "regular" },
          { title: "Logo", value: "logo" },
        ],
        layout: "radio",
      },
      initialValue: "regular",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { variant?: string };
          if (parent?.variant === "image") {
            if (!value) {
              return "Required when variant is Image.";
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
