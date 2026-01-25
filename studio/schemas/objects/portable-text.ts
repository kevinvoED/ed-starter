import { HighlightIcon, LinkIcon, PlayIcon } from "@sanity/icons";
import { defineArrayMember, defineType } from "sanity";
import { YouTubePreview } from "@/components/youtube-preview";
import { colorOptions } from "@/schemas/objects/color-variants";
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
                  { type: "platform-index" },
                  { type: "platform-child" },
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
      title: "CTA Button",
      icon: LinkIcon,
      description:
        "Recommended Button variant: Default, Secondary, Outline Accent, Ghost, and Ghost Dark.",
      name: "link",
      type: "link",
    }),
  ],
});
