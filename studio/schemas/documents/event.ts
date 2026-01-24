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
  name: "event",
  title: "Event",
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
      name: "type",
      type: "string",
      description:
        "The type of event. This changes some details about how the event is displayed.",
      options: {
        list: [
          { title: "Conference", value: "conference" },
          { title: "Webinar", value: "webinar" },
        ],
      },
      initialValue: "conference",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventLink",
      type: "array",
      description:
        "The link to the event. Could be external for tickets or a stream",
      of: [{ type: "link" }],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "The location that this conference is taking place.",
      type: "string",
      hidden: ({ parent }) => parent?.type === "webinar",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          const isWebinar = parent?.type === "webinar";

          // If it's not a webinar, the field is visible and should be required
          if (!isWebinar && !value) {
            return "Location is required for conferences.";
          }

          return true;
        }),
    }),
    defineField({
      type: "datetime",
      name: "startDate",
      title: "Start Date",
      description:
        "The start date of this event. This is used for sorting and listing. The time will be ignored for conferences",
      group: "content",
      options: {
        displayTimeZone: "America/New_York",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "datetime",
      name: "endDate",
      title: "End Date",
      description:
        "The end date of this event. The time will be ignored for conferences",
      group: "content",
      options: {
        displayTimeZone: "America/New_York",
      },
      validation: (Rule) => Rule.required(),
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
      title: "Should this event post's content be gated?",
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
