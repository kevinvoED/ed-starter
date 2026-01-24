import {
  ImageIcon,
  ImagesIcon,
  MasterDetailIcon,
  VideoIcon,
} from "@sanity/icons";
import { defineField } from "sanity";
import { moduleBlocks, moduleGroups } from "@/schemas/moduleTypes";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";

/*
 * This file contains commonly used primitive schemas to be used in other larger schemas
 * It helps avoid repeating the same fields and makes your schemas more readable
 * If there is a type that is being used multiple times, consider creating a shared schema for it here
 * Make sure to check validation and descriptions should always end with a period.
 * Please keep this file organized and well documented
 */

export const name = defineField({
  name: "name",
  title: "Name",
  description: "The name of the individual or organization.",
  type: "string",
  validation: (Rule) => Rule.required(),
});

export const title = defineField({
  name: "title",
  title: "Title",
  description: "The main title for this section or module.",
  type: "string",
  validation: (Rule) => Rule.required(),
});

export const ptTitle = portableTextPlain({
  name: "title",
  title: "Title",
  description: "The main title for this section or module.",
  oneLine: true,
});

export const ptSubtitle = portableTextPlain({
  name: "subtitle",
  title: "Subtitle",
  description: "The subtitle for this section or module.",
  oneLine: true,
  validation: false,
});

export const ptTitleHighlight = portableTextPlain({
  name: "title",
  title: "Title",
  description: "The main title for this section or module.",
  oneLine: true,
  enableHighlight: true,
});

export const ptTitleHighlightLineBreak = portableTextPlain({
  name: "title",
  title: "Title",
  description: "The main title for this section or module.",
  enableHighlight: true,
});

export const description = defineField({
  name: "description",
  title: "Description",
  description:
    "Supplementary text that provides additional context or information.",
  type: "text",
  rows: 6,
});

export const ptDescription = portableTextPlain({
  name: "description",
  title: "Description",
  description:
    "Supplementary text that provides additional context or information.",
  validation: false,
});

export const ptDescriptionLink = portableTextPlain({
  name: "description",
  title: "Description",
  description:
    "Supplementary text that provides additional context or information.",
  enableLink: true,
  validation: false,
});

export const ptContent = portableTextPlain({
  name: "content",
  title: "Content",
  description: "",
  validation: false,
});

export const ptContentHighlight = portableTextPlain({
  name: "content",
  title: "Content",
  description: "",
  enableHighlight: true,
  validation: false,
});

export const eyebrow = defineField({
  name: "eyebrow",
  title: "Eyebrow",
  description: "Short descriptive phrase that usually precedes the title.",
  type: "string",
});

// Requires a `title` to be on the entity as well. A unique ID to reference this entity.
export const slug = defineField({
  name: "slug",
  title: "Page Slug",
  type: "slug",
  description:
    "Generate a unique ID to be used as the slug/route for this page.",
  options: {
    source: "title",
    maxLength: 96,
  },
  validation: (Rule) => Rule.required(),
});

// First use the regular slug field to set the slug, then swap to this readOnly version.
export const slugReadOnly = defineField({
  name: "slug",
  title: "Page Slug",
  type: "slug",
  description: "This is a read-only field and cannot be edited.",
  readOnly: true,
  group: "settings",
  validation: (Rule) => Rule.required(),
});

// Keep as an array even for 1 link for consistency and access to keys for GTM
export const link = defineField({
  name: "link",
  type: "array",
  description: "Optional. Max 1 link.",
  of: [{ type: "link" }],
  validation: (Rule) => Rule.max(1),
});

export const links = defineField({
  name: "links",
  type: "array",
  description: "Optional. Max 2 links.",
  of: [{ type: "link" }],
  validation: (Rule) => Rule.max(2),
});

export const image = defineField({
  name: "image",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  description: "Select or upload an image.",
  options: {
    hotspot: true,
    collapsed: false,
  },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative Text",
    },
  ],
});

export const images = defineField({
  name: "images",
  title: "Images",
  type: "array",
  description: "Select or upload multiple images.",
  of: [{ type: "image" }],
  icon: ImagesIcon,
});

export const video = defineField({
  name: "video",
  title: "Video",
  description: "Select or upload a video. Must be a .mp4 file.",
  options: {
    accept: "video/mp4",
  },
  type: "file",
  icon: VideoIcon,
});

export const logo = defineField({
  ...image,
  name: "logo",
  title: "Logo",
  description: "Select or upload an SVG logo.",
  options: {
    accept: "image/svg+xml",
  },
});

export const meta = defineField({
  name: "meta",
  title: "Metadata & SEO",
  type: "object",
  group: "seo",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "noindex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
    }),
  ],
});

export const portableText = defineField({
  name: "content",
  title: "Portable Text",
  type: "portable-text",
});

export const openInNewTab = defineField({
  name: "openInNewTab",
  type: "boolean",
  title: "Open in a new tab?",
  initialValue: false,
  hidden: ({ parent }) => !parent?.isExternal,
});

export const publishedDate = defineField({
  name: "publishedDate",
  title: "Published Date",
  type: "date",
  description:
    "Optional. Add to override the initial creation date purely for visual purposes.",
});

export const startDate = defineField({
  name: "startDAte",
  title: "Start Date",
  type: "date",
  description: "Optional. Purely for SEO purposes.",
});

export const endDate = defineField({
  name: "endDate",
  title: "End Date",
  type: "date",
  description: "Optional. Purely for SEO purposes.",
});

export const createdAt = defineField({
  name: "createdAt",
  type: "created-at",
});

export const marquee = defineField({
  name: "marquee",
  title: "Marquee",
  description: "Add text to be displayed in an infinite marquee.",
  type: "array",
  of: [
    {
      name: "marqueeItem",
      title: "Marquee Item",
      type: "object",
      icon: MasterDetailIcon,
      fields: [title],
    },
  ],
});

export const marqueeImages = defineField({
  name: "marqueeImages",
  title: "Marquee",
  description:
    "Select or upload multiple images to be displayed in an infinite marquee.",
  type: "array",
  of: [
    {
      name: "marqueeItem",
      title: "Marquee Item",
      type: "object",
      icon: MasterDetailIcon,
      fields: [image],
      preview: {
        select: {
          image: "image",
        },
        prepare({ image }) {
          return {
            title: image?.alt ?? "Image Item",
            media: image,
          };
        },
      },
    },
  ],
});

export const toggle = defineField({
  name: "toggle",
  title: "Toggle",
  type: "boolean",
  initialValue: false,
  validation: (Rule) => Rule.required(),
});

export const modules = defineField({
  name: "blocks",
  title: "Modules",
  description: "Select from the modules below. Order is obeyed.",
  type: "array",
  of: moduleBlocks,
  options: {
    insertMenu: {
      groups: moduleGroups,
      views: [
        {
          name: "grid",
          previewImageUrl: (block) => `/schemas/previews/${block}.jpg`,
        },
        { name: "list" },
      ],
    },
  },
});

export const codeSnippet = defineField({
  name: "codeSnippet",
  title: "Code Snippet",
  type: "code",
  options: {
    language: "javascript",
  },
});
