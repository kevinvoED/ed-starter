import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  description,
  meta,
  modules,
  slug,
  title,
} from "@/schemas/sharedFields";

export default defineType({
  name: "case-study-index",
  title: "Case Study Index Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    slug,
    defineField({
      ...title,
      group: "content",
    }),
    defineField({
      ...description,
      group: "content",
    }),
    defineField({
      name: "featuredPost",
      title: "Featured Post",
      type: "reference",
      description:
        "Optional. Select a featured case study to be displayed at the very top of the page.",
      group: "content",
      to: { type: "case-study" },
    }),
    defineField({
      ...modules,
      group: "content",
    }),
    meta,
  ],
});
