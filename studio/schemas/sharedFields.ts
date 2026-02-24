import { toPlainText } from "@portabletext/react";
import { ImageIcon, ImagesIcon, LinkIcon, VideoIcon } from "@sanity/icons";
import { kebabCase } from "es-toolkit";
import { defineField, type Rule } from "sanity";
import {
  moduleBlocks,
  moduleGroups,
  relationTypes,
} from "@/schemas/moduleTypes";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";

/*
 * This file contains commonly used primitive schemas to be used in other larger schemas
 * It helps avoid repeating the same fields and makes your schemas more readable
 * If there is a type that is being used multiple times, consider creating a shared schema for it here
 * Make sure to check validation and descriptions should always end with a period.
 * Please keep this file organized and well documented
 */

// ------------------------------------------------
// PortableText-related fields (must be at the top)
// ------------------------------------------------
export const portableText = defineField({
  name: "content",
  title: "Portable Text",
  type: "portable-text",
});

export const ptStyleHeadingFields = [
  { title: "Normal", value: "normal" },
  { title: "H1", value: "h1" },
  { title: "H2", value: "h2" },
  { title: "H3", value: "h3" },
  { title: "H4", value: "h4" },
  { title: "H5", value: "h5" },
  { title: "H6", value: "h6" },
];

export const ptDecoratorFields = [
  { title: "Bold", value: "strong" },
  { title: "Italic", value: "em" },
];

export const ptListFields = [
  { title: "Bullet", value: "bullet" },
  { title: "Number", value: "number" },
];

export const ptAnnotationLinkFields = {
  name: "link",
  type: "object",
  title: "Link",
  icon: LinkIcon,
  fields: [
    {
      name: "type",
      title: "Button Type",
      description:
        "Choose how this link behaves. Internal Links will navigate to pages within the site and External for outside URLs.",
      type: "string",
      options: {
        list: [
          { title: "Internal Link", value: "internal" },
          { title: "External URL", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "internalLink",
      title: "Internal Link",
      description:
        "Link to another page on this site. Select from existing pages or posts.",
      type: "reference",
      to: relationTypes,
      hidden: ({ parent }: { parent: { type?: string } }) =>
        parent?.type !== "internal",
    },
    {
      name: "href",
      title: "External URL",
      description:
        "Enter a valid external URL to link to (http, https, mailto, tel).",
      type: "url",
      hidden: ({ parent }: { parent: { type?: string } }) =>
        parent?.type !== "external",
    },
    {
      name: "openInNewTab",
      type: "boolean",
      title: "Open in a new tab?",
      description: "When enabled, the link opens in a new browser tab.",
      initialValue: false,
      hidden: ({ parent }: { parent: { type?: string | undefined } }) =>
        !["external", "internal"].includes(parent?.type ?? ""),
    },
  ],
};

export const ptAnnotationHighlightFields = [
  {
    type: "textColor",
    title: "Text Color",
  },
  {
    type: "highlightColor",
    title: "Highlight Color",
  },
];

// ------------------------------------------------
// ModuleBuilder-related fields
// ------------------------------------------------
export const modules = defineField({
  name: "modules",
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

export const pageTitle = defineField({
  name: "title",
  title: "Page Title",
  type: "string",
  description: "Purely for organizational purposes within Sanity Studio.",
  validation: (Rule) => Rule.required(),
});

// ------------------------------------------------
// PortableText & PortableTextPlain-related fields
// ------------------------------------------------

export const title = portableTextPlain({
  name: "title",
  title: "Title",
  description: "Main title for this section or module.",
  validation: true,
  enableHighlight: true,
  enableLink: true,
  oneLine: true,
});

export const titleLineBreak = portableTextPlain({
  name: "title",
  title: "Title",
  description:
    "Main title for this section or module. New line breaks are respected.",
  validation: true,
  enableHighlight: true,
  enableLink: true,
});

export const description = portableTextPlain({
  name: "description",
  title: "Description",
  description:
    "Supplementary text that provides additional context or information.",
  validation: true,
  enableList: true,
  enableLink: true,
  enableHighlight: true,
  enableDecorator: true,
  enableTypeStyle: true,
});

// ------------------------------------------------
// Slug-related fields
// ------------------------------------------------

export const slug = defineField({
  name: "slug",
  title: "Page Slug",
  type: "slug",
  description: "A unique ID to be used as the slug/route for this page.",
  options: {
    source: "title",
    slugify: (input) => kebabCase(toPlainText(input)),
  },
  validation: (Rule) => Rule.required(),
});

// First use the regular slug field to set the slug, then swap to this readOnly version afterwards.
export const slugReadOnly = defineField({
  name: "slug",
  title: "Page Slug",
  type: "slug",
  description: "This is a read-only field and cannot be edited.",
  readOnly: true,
  group: "settings",
  validation: (Rule) => Rule.required(),
});

// ------------------------------------------------
// Link-related fields
// ------------------------------------------------
export const link = defineField({
  name: "link",
  title: "Button Link",
  type: "array",
  description: "Optional. Select an internal page or external URL to link to.",
  of: [{ type: "link" }],
  validation: (Rule) => Rule.required().max(1),
});

// ------------------------------------------------
// Image-related fields
// ------------------------------------------------
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
      title: "Alternative Text",
      type: "string",
      description: "Optional. Used for accessibility and SEO.",
      validation: (Rule) =>
        Rule.max(150).error("Alt text must be less than 150 characters."),
    },
  ],
  validation: (Rule) => Rule.required(),
});

export const images = defineField({
  name: "images",
  title: "Images",
  type: "array",
  description: "Select or upload multiple images.",
  of: [image],
  icon: ImagesIcon,
  validation: (Rule) => Rule.required().min(1),
});

export const logo = defineField({
  ...image,
  name: "logo",
  title: "Logo",
  description: "Select or upload an .svg logo.",
  options: {
    accept: "image/svg+xml",
  },
  validation: (Rule) => Rule.required(),
});

// ------------------------------------------------
// Video-related fields
// ------------------------------------------------
export const video = defineField({
  name: "video",
  title: "Video",
  description: "Select or upload a video. Must be a .mp4 file.",
  options: {
    accept: "video/mp4",
  },
  type: "file",
  icon: VideoIcon,
  validation: (Rule) => Rule.required(),
});

// ------------------------------------------------
// Metadata & SEO-related fields
// ------------------------------------------------
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

// ------------------------------------------------
// contentType-related fields
// ------------------------------------------------
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

export const toggle = defineField({
  name: "toggle",
  title: "Toggle",
  type: "boolean",
  initialValue: false,
  validation: (Rule) => Rule.required(),
});
