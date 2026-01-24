import { toPlainText } from "@portabletext/react";
import { DashboardIcon } from "@sanity/icons";
import { defineType } from "sanity";
import {
  codeSnippet,
  eyebrow,
  links,
  ptDescription,
  ptTitleHighlight,
} from "@/schemas/sharedFields";

export default defineType({
  name: "hero-quaternary",
  title: "Hero Quaternary",
  type: "object",
  icon: DashboardIcon,
  fields: [eyebrow, ptTitleHighlight, ptDescription, links, codeSnippet],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero Quaternary",
        subtitle: toPlainText(title),
      };
    },
  },
});
