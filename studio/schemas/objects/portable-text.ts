import {
  BlockquoteIcon,
  HighlightIcon,
  ImageIcon,
  LinkIcon,
  ListIcon,
  PlayIcon,
  ThListIcon,
} from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { YouTubePreview } from "@/components/youtube-preview";
import { colorOptions } from "@/schemas/objects/color-variants";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import {
  description,
  eyebrow,
  image,
  link,
  title,
} from "@/schemas/sharedFields";
// PortableText is the default Rich Text editor with all formatting and special modules baked in

export default defineType({
  name: "portable-text",
  title: "Portable Text",
  description: "Supplementary text using the Rich Text editor.",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "isExternal",
                type: "boolean",
                title: "Is External",
                initialValue: false,
              },
              {
                name: "internalLink",
                type: "reference",
                title: "Internal Link",
                to: [
                  { type: "page" },
                  { type: "post" },
                  { type: "post-index" },
                  { type: "case-study" },
                  { type: "case-study-index" },
                  { type: "resource" },
                  { type: "resource-index" },
                  { type: "event" },
                  { type: "events-index" },
                  { type: "platform-index" },
                  { type: "platform-child" },
                  { type: "solutions-child" },
                ],
                hidden: ({ parent }) => parent?.isExternal,
              },
              {
                name: "href",
                title: "href",
                type: "url",
                hidden: ({ parent }) => !parent?.isExternal,
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                name: "openInNewTab",
                type: "boolean",
                title: "Open in new tab",
                initialValue: false,
                hidden: ({ parent }) => !parent?.isExternal,
              },
            ],
          },
          {
            name: "highlight",
            type: "object",
            title: "Highlight",
            options: {
              modal: {
                type: "popover",
                width: "auto",
              },
            },
            icon: HighlightIcon,
            fields: [
              {
                name: "backgroundColor",
                title: "Change Background Color",
                type: "string",
                description:
                  "Optional. Select the new background highlight color.",
                options: {
                  list: colorOptions,
                },
              },
              {
                name: "textColor",
                title: "Change Text Color",
                type: "string",
                description: "Optional. Select the new text highlight color.",
                options: {
                  list: colorOptions,
                },
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineArrayMember({
      name: "youtube",
      type: "object",
      title: "YouTube",
      icon: PlayIcon,
      fields: [
        {
          name: "videoId",
          title: "Video ID",
          type: "string",
          description: "YouTube Video ID",
        },
      ],
      preview: {
        select: {
          title: "videoId",
        },
      },
      components: {
        preview: YouTubePreview,
      },
    }),
    defineArrayMember({
      name: "table",
      type: "table",
      title: "Table",
      icon: ThListIcon,
    }),
    defineArrayMember({
      name: "listDriver",
      type: "object",
      title: "List Driver",
      icon: ListIcon,
      fields: [
        title,
        defineField({
          name: "items",
          title: "Link Items",
          type: "array",
          of: [
            defineArrayMember({
              name: "item",
              title: "Link Item",
              type: "object",
              icon: LinkIcon,
              fields: [eyebrow, link],
              preview: {
                select: {
                  title: "eyebrow",
                  label: "link.[0].title",
                },
                prepare({ title, label }) {
                  return {
                    title: label,
                    subtitle: title,
                  };
                },
              },
            }),
          ],
        }),
      ],
      preview: {
        select: {
          title: "title",
        },
        prepare({ title }) {
          return {
            title: "List Driver",
            subtitle: title,
          };
        },
      },
    }),
    defineArrayMember({
      name: "quote",
      type: "object",
      title: "Quote",
      icon: BlockquoteIcon,
      fields: [
        portableTextPlain({
          name: "title",
          title: "Quote",
          description: "The quote text. Do not include quotation marks.",
        }),
        {
          name: "author",
          title: "Author",
          type: "string",
          description: "The author of the quote.",
          placeholder: "John Doe, Global SaaS Platform",
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: {
          title: "title",
          subtitle: "author",
        },
      },
    }),
    defineArrayMember({
      name: "promo-card",
      type: "object",
      title: "Promo Card",
      icon: ImageIcon,
      fields: [title, description, image, link],
    }),
    defineArrayMember({
      name: "code",
      type: "code",
      options: {
        withFilename: true,
        language: "typescript",
        languageAlternatives: [
          { title: "TypeScript", value: "typescript" },
          { title: "JavaScript", value: "javascript" },
          { title: "JSX", value: "jsx" },
          { title: "TSX", value: "tsx" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "SCSS", value: "scss" },
          { title: "JSON", value: "json" },
          { title: "Python", value: "python" },
          { title: "PHP", value: "php" },
          { title: "Ruby", value: "ruby" },
          { title: "Shell", value: "shell" },
          { title: "Markdown", value: "markdown" },
          { title: "YAML", value: "yaml" },
          { title: "GraphQL", value: "graphql" },
          { title: "SQL", value: "sql" },
        ],
      },
    }),
    defineArrayMember({
      title: "CTA Button",
      icon: LinkIcon,
      description:
        "Recommended Button variant: Default, Secondary, Outline Accent, Ghost, and Ghost Dark.",
      name: "link",
      type: "link",
    }),
  ],
});
