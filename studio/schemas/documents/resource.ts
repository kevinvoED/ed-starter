import { toPlainText } from "@portabletext/react";
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  createdAt,
  description,
  image,
  link,
  links,
  meta,
  modules,
  portableText,
  ptTitleHighlight,
  publishedDate,
  slug,
  toggle,
} from "@/schemas/sharedFields";
import { formatDate } from "../../../frontend/lib/formatDate";

export default defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
    {
      name: "gated",
      title: "Gated",
    },
  ],
  fields: [
    defineField({
      ...createdAt,
      group: "settings",
    }),
    defineField({
      ...publishedDate,
      group: "settings",
    }),
    defineField({
      ...ptTitleHighlight,
      group: "content",
    }),
    defineField({
      ...slug,
    }),
    defineField({
      name: "topics",
      title: "Topic",
      description: "Optional. Used to categorize the post for filtering.",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: { type: "resource-topic" } }],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: "categories",
      title: "Category",
      description: "Optional. Used to categorize the post for filtering.",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: { type: "resource-category" } }],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      ...description,
      group: "content",
    }),
    defineField({
      ...link,
      description:
        "Optional. Used to redirect this to another page instead of its respective Detail page.",
      validation: (Rule) => Rule.max(1),
      group: "content",
    }),
    defineField({
      ...links,
      title: "Additional CTAs",
      description:
        "Optional. This only appaers on the Detail page. Used to display a Read Now or Download PDF button.",
      validation: (Rule) => Rule.max(2),
      group: "content",
    }),
    defineField({
      ...image,
      description: "Recommended Image Size - 928x530 pixels; ratio - 16:9.",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      description: "Optional. Used to credit the author of the post.",
      group: "settings",
      to: { type: "author" },
    }),
    defineField({
      ...toggle,
      name: "isGated",
      title: "Should this resource post's content be gated?",
      group: "gated",
    }),
    defineField({
      ...portableText,
      group: "content",
    }),
    defineField({
      name: "formId",
      title: "Form ID",
      type: "string",
      description: "The ID of the form to use for the gated content.",
      group: "gated",
      hidden: ({ parent }) => !parent?.isGated,
    }),
    defineField({
      ...modules,
      hidden: ({ parent }) => parent?.isGated,
      group: "content",
    }),
    meta,
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "image",
      created: "_createdAt",
    },
    prepare({ title, author, created, media }) {
      const formattedCreated = created ? formatDate(created) : "";
      return {
        title: toPlainText(title),
        subtitle: `${formattedCreated} ${author ? `by ${author}` : ""}`,
        media: media,
      };
    },
  },
});
