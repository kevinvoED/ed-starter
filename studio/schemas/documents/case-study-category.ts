import { BookmarkIcon } from "@sanity/icons";
import { defineType } from "sanity";
import { slug, title } from "@/schemas/sharedFields";

export default defineType({
  name: "case-study-category",
  title: "Case Study Category",
  type: "document",
  icon: BookmarkIcon,
  fields: [title, slug],
});
