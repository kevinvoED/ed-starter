import { toPlainText } from "@portabletext/react";
import { LinkIcon } from "@sanity/icons";
import { defineType } from "sanity";
import { description, links, title } from "@/schemas/common";

export default defineType({
  name: "driver-text",
  title: "Driver Text",
  type: "object",
  icon: LinkIcon,
  fields: [title, description, links],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Driver Text",
        subtitle: toPlainText(title),
        media: LinkIcon,
      };
    },
  },
});
