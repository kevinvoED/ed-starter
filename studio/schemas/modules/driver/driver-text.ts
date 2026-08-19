import { LinkIcon } from "@sanity/icons/Link";
import { defineType } from "sanity";
import { toPlainText } from "@portabletext/react";
import { ModulePreview } from "@/components/module-preview";
import { description, links, title } from "@/schemas/common";

export default defineType({
  name: "driver-text",
  title: "Driver Text",
  type: "object",
  icon: LinkIcon,
  fields: [title, description, links],
  components: { preview: ModulePreview },
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: toPlainText(title ?? []),
        subtitle: "Driver Text",
        media: LinkIcon,
      };
    },
  },
});
