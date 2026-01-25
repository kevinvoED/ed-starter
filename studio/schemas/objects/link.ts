import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { relationTypes } from "@/schemas/moduleTypes";
import { openInNewTab, title } from "@/schemas/sharedFields";

export default defineType({
  name: "link",
  type: "object",
  title: "CTA Link",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "isExternal",
      type: "boolean",
      title: "Is this link an external link?",
      initialValue: false,
    }),
    defineField({
      ...title,
      title: "Label",
    }),
    defineField({
      name: "internalLink",
      title: "Internal Link",
      description: "Select an internal page.",
      type: "reference",
      to: relationTypes,
      hidden: ({ parent }) => parent?.isExternal,
    }),
    defineField({
      name: "href",
      title: "ExternalURL",
      description: "Must be a valid URL (http, https, mailto, tel).",
      type: "url",
      hidden: ({ parent }) => !parent?.isExternal,
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      ...openInNewTab,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return { title: title };
    },
  },
});
