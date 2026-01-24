import { toPlainText } from "@portabletext/react";
import { DashboardIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  codeSnippet,
  eyebrow,
  image,
  images,
  links,
  logo,
  ptContentHighlight,
  ptDescription,
  ptDescriptionLink,
  ptTitle,
  ptTitleHighlight,
} from "@/schemas/sharedFields";

export default defineType({
  name: "hero-secondary",
  title: "Hero Secondary",
  type: "object",
  icon: DashboardIcon,
  fields: [
    defineField({
      name: "type",
      title: "Type",
      description:
        "Globe option will display globe with rotating code snippet and accordion list items. Image option will show a static image.",
      type: "string",
      options: {
        list: ["globe", "image"],
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),
    eyebrow,
    ptTitleHighlight,
    ptDescription,
    links,
    defineField({
      ...eyebrow,
      name: "contentEyebrow",
      title: "Content Eyebrow",
    }),
    defineField({
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      of: [
        defineField({
          name: "content",
          title: "Content",
          type: "object",
          fields: [ptContentHighlight],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...codeSnippet,
      hidden: ({ parent }) => parent?.type !== "globe",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          if (parent?.type === "globe" && !value) {
            return "A code snippet is required when the type is globe";
          }

          return true;
        }),
    }),
    defineField({
      ...ptTitle,
      name: "itemsLabel",
      title: "Items Label",
      description: "Label for the items",
      hidden: ({ parent }) => parent?.type !== "globe",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          if (parent?.type === "globe" && !value) {
            return "Item Label is required when type is globe";
          }

          return true;
        }),
    }),
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
            logo,
            ptTitle,
            ptDescriptionLink,
            defineField({
              ...images,
              description:
                "Optional, max 2. Images that will appear with along the globe asset when scrolling through list items. Image should be 656px x 656px PNG",
              validation: (Rule) => Rule.max(2),
            }),
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
      hidden: ({ parent }) => parent?.type !== "globe",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          if (parent?.type === "globe" && !value) {
            return "List Items are required when type is globe";
          }
          return true;
        }),
    }),
    defineField({
      ...image,
      hidden: ({ parent }) => parent?.type !== "image",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          if (parent?.type === "image" && !value) {
            return "Image is required when type is image";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero Secondary",
        subtitle: toPlainText(title),
      };
    },
  },
});
