import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description:
        "Setting No Index will prevent search engines from indexing this page and also remove from sitemap.",
    }),
    defineField({
      name: "title",
      title: "Meta Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
    }),
    defineField({
      name: "mainImage",
      title: "Meta Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "OG Image is used for social media sharing. Recommended size - 1200x630 pixels, ratio - 1.91:1",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
