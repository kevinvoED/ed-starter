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
  name: "blog-index",
  title: "Blog Index Page",
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
    defineField({
      ...title,
      group: "content",
    }),
    defineField({
      ...slug,
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
        "Optional. Select a featured post to be displayed at the very top of the page.",
      to: { type: "blog-post" },
      group: "content",
    }),
    defineField({
      ...modules,
      group: "content",
    }),
    meta,
  ],
});
