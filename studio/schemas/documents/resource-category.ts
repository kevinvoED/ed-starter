import { BookmarkIcon } from "@sanity/icons";
import { defineType } from "sanity";
import { image, slug, title } from "@/schemas/sharedFields";

export default defineType({
  name: "resource-category",
  title: "Resource Category",
  type: "document",
  icon: BookmarkIcon,
  fields: [title, slug, image],
});
