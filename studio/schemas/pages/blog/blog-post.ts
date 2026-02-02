import { toPlainText } from "@portabletext/react";
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  createdAt,
  description,
  image,
  link,
  meta,
  modules,
  portableText,
  publishedDate,
  slug,
  titleHighlight,
} from "@/schemas/sharedFields";
import { formatDate } from "../../../../frontend/lib/utils/date";

export default defineType({
  name: "blog-post",
  title: "Blog Post",
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
      ...titleHighlight,
      group: "content",
    }),
    defineField({
      ...slug,
    }),
    defineField({
      ...link,
      description:
        "Optional. Used to redirect this to another page instead of its respective Detail page.",
      validation: (Rule) => Rule.max(1),
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      description: "Optional. Select a category for the post.",
      group: "content",
      to: { type: "blog-category" },
    }),
    defineField({
      name: "contentTopic",
      title: "Content Topic",
      type: "reference",
      description: "Optional. Select a content topic for the post.",
      group: "content",
      to: { type: "content-topic" },
    }),
    defineField({
      ...description,
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
      ...portableText,
      group: "content",
    }),
    defineField({
      ...modules,
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
