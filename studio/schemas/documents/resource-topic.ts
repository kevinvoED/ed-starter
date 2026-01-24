import { BookmarkIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineType } from "sanity";
import { logo, slug, title } from "@/schemas/sharedFields";

export default defineType({
  name: "resource-topic",
  title: "Resource Topic",
  type: "document",
  icon: BookmarkIcon,
  fields: [title, slug, logo, orderRankField({ type: "resource-topic" })],
});
