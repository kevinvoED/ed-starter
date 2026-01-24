import { toPlainText } from "@portabletext/react";
import { LinkIcon } from "@sanity/icons";
import { defineType } from "sanity";
import { eyebrow, links, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "driver-cta",
  title: "Driver CTA",
  type: "object",
  icon: LinkIcon,
  fields: [eyebrow, ptTitle, ptDescription, links],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Driver Cta",
        subtitle: toPlainText(title),
      };
    },
  },
});
