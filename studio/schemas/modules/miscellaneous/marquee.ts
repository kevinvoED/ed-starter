import { DashboardIcon } from "@sanity/icons/Dashboard";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { ImageIcon } from "@sanity/icons/Image";
import { MasterDetailIcon } from "@sanity/icons/MasterDetail";
import { TextIcon } from "@sanity/icons/Text";
import { upperFirst } from "es-toolkit";
import { defineField, defineType } from "sanity";
import { ModulePreview } from "@/components/module-preview";
import { createOptionCards } from "@/components/option-cards";
import { images, title } from "@/schemas/common";

const MARQUEE_VARIANT_OPTIONS = [
  {
    title: "Text",
    value: "text",
    description: "Display only text in the marquee.",
    icon: TextIcon,
  },
  {
    title: "Image",
    value: "image",
    description: "Display only images in the marquee.",
    icon: ImageIcon,
  },
];

const IMAGE_TYPE_OPTIONS = [
  {
    title: "Regular Image",
    value: "regular",
    description: "Display regular images in the marquee.",
    icon: ImageIcon,
  },
  {
    title: "Logo",
    value: "logo",
    description: "Display company logos in the marquee.",
    icon: EarthGlobeIcon,
  },
];

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
        list: MARQUEE_VARIANT_OPTIONS.map(({ title, value }) => ({
          title,
          value,
        })),
        layout: "radio",
      },
      initialValue: MARQUEE_VARIANT_OPTIONS[0].value,
      components: { input: createOptionCards(MARQUEE_VARIANT_OPTIONS) },
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
        list: IMAGE_TYPE_OPTIONS.map(({ title, value }) => ({
          title,
          value,
        })),
        layout: "radio",
      },
      initialValue: IMAGE_TYPE_OPTIONS[0].value,
      components: { input: createOptionCards(IMAGE_TYPE_OPTIONS) },
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
  components: { preview: ModulePreview },
  preview: {
    select: {
      variant: "variant",
    },
    prepare({ variant }) {
      return {
        title: `Variant: ${upperFirst(variant)}`,
        subtitle: "Marquee",
        media: DashboardIcon,
      };
    },
  },
});
