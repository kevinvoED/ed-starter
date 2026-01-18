import { EarthGlobeIcon } from "@sanity/icons";
import { description, image, title } from "@/schemas/sharedFields";
import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      ...image,
      title: "Organization Logo",
      description: "The main logo of your organization.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...title,
      title: "Organization Name",
      description:
        "The name of your organization. It will be used in multiple places across the site including header, footer, social media, and SEO related content.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...description,
      title: "Organization Description",
      description:
        "Short description of your organization primarily for search engines and social media.",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media",
      description: "Collection of social media profiles.",
      type: "array",
      of: [
        defineField({
          name: "platform",
          title: "Platform",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Platform Name",
              description: "Name of the social media platform.",
              placeholder: "Twitter/X, Instagram, Facebook...",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              ...image,
              title: "Icon",
              description: "Associated icon of the platform.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              placeholder: "https://x.com/your-organization",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      ...image,
      name: "ogImage",
      title: "Open Graph Image",
      description: "Displayed on social cards and search engine results.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
});
