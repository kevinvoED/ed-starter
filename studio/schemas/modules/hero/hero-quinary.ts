import { toPlainText } from "@portabletext/react";
import { DashboardIcon } from "@sanity/icons";
import { defineType } from "sanity";
import {
  eyebrow,
  links,
  ptDescription,
  ptTitleHighlight,
} from "@/schemas/sharedFields";

export default defineType({
  name: "hero-quinary",
  title: "Hero Quinary",
  type: "object",
  icon: DashboardIcon,
  fields: [eyebrow, ptTitleHighlight, ptDescription, links],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero Quinary",
        subtitle: toPlainText(title),
      };
    },
  },
});
