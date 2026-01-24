import { BookmarkIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineType } from "sanity";
import { slug, title } from "@/schemas/sharedFields";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: BookmarkIcon,
  fields: [title, slug, orderRankField({ type: "category" })],
});
