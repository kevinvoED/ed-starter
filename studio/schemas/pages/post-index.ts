import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  meta,
  modules,
  ptDescription,
  ptTitle,
  slug,
} from "@/schemas/sharedFields";

export default defineType({
  name: "post-index",
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
    slug,
    defineField({
      ...ptTitle,
      group: "content",
    }),
    defineField({
      ...ptDescription,
      group: "content",
    }),
    defineField({
      name: "featuredPost",
      title: "Featured Post",
      type: "reference",
      description:
        "Optional. Select a featured post to be displayed at the very top of the page.",
      group: "content",
      to: { type: "post" },
    }),
    defineField({
      ...modules,
      group: "content",
    }),
    meta,
  ],
});
