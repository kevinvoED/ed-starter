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
  name: "resource-index",
  title: "Resource Index Page",
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
      ...modules,
      group: "content",
    }),
    meta,
  ],
});
