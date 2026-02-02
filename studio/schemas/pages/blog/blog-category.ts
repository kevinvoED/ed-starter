import { BookmarkIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";
import { slug, title } from "@/schemas/sharedFields";

export default defineType({
  name: "blog-category",
  title: "Blog Category",
  type: "document",
  icon: BookmarkIcon,
  fields: [
    defineField({
      ...title,
      title: "Blog Category Label",
      description: "This category item is unique to Blog Posts.",
    }),
    slug,
    orderRankField({ type: "blog-category" }),
  ],
});
