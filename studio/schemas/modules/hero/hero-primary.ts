import { toPlainText } from "@portabletext/react";
import { DashboardIcon } from "@sanity/icons/Dashboard";
import { defineType } from "sanity";
import { ModulePreview } from "@/components/module-preview";
import { description, image, links, title } from "@/schemas/common";

export default defineType({
  name: "hero-primary",
  title: "Hero Primary",
  type: "object",
  fields: [title, description, links, image],
  components: { preview: ModulePreview },
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: toPlainText(title ?? []),
        subtitle: "Hero Primary",
        media: DashboardIcon,
      };
    },
  },
});
