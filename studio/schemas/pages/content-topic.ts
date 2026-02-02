import { BookmarkIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";
import { slug, title } from "@/schemas/sharedFields";

export default defineType({
  name: "content-topic",
  title: "Content Topic",
  type: "document",
  icon: BookmarkIcon,
  fields: [
    defineField({
      ...title,
      title: "Content Topic Label",
      description:
        "This Topic is global and can be referenced by all content types (blog, case-studies, resources, etc.).",
    }),
    slug,
    orderRankField({ type: "content-topic" }),
  ],
});
