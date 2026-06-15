import { toPlainText } from "@portabletext/react";
import { DashboardIcon } from "@sanity/icons";
import { defineType } from "sanity";
import { description, image, links, title } from "@/schemas/common";

export default defineType({
  name: "hero-primary",
  title: "Hero Primary",
  type: "object",
  fields: [title, description, links, image],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero Primary",
        subtitle: toPlainText(title),
        media: DashboardIcon,
      };
    },
  },
});
