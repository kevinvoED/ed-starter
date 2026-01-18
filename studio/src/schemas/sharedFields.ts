/*
 * This file contains commonly used primitive schemas to be used in other larger schemas
 * It helps avoid repeating the same fields and makes your schemas more readable
 * If there is a type that is being used multiple times, consider creating a shared schema for it here
 * Make sure to check validation and descriptions should always end with a period.
 * Please keep this file organized and well documented
 */

import { ArrowTopRightIcon, ImageIcon, LinkIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const title = defineField({
  name: "title",
  title: "Title",
  description: "The main title for this section or module.",
  type: "string",
  validation: (Rule) => Rule.required(),
});

export const description = defineField({
  name: "description",
  title: "Description",
  description:
    "Supplementary text that provides additional context or information.",
  type: "text",
  rows: 3,
});

// Requires a `title` to be on the entity as well. A unique ID to reference this entity.
export const slug = defineField({
  name: "slug",
  title: "Page Slug",
  type: "slug",
  description:
    "Generate a unique ID to be used as the slug or route for this page.",
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
  validation: (Rule) => Rule.required(),
});

export const seo = defineField({
  name: "seo",
  title: "SEO",
  type: "seo",
  group: "seo",
});

export const portableText = defineField({
  name: "content",
  title: "Portable Text",
  type: "portableText",
});

export const portableTextPlain = defineField({
  name: "content",
  title: "Portable Text",
  type: "portableTextPlain",
});

// Only used in PortableText
export const externalLink = {
  name: "link",
  type: "object",
  title: "External link",
  icon: ArrowTopRightIcon,
  fields: [
    {
      name: "href",
      type: "url",
      title: "URL",
    },
    {
      title: "Open in new tab",
      name: "blank",
      type: "boolean",
    },
  ],
};

// Only used in PortableText
export const internalLink = {
  name: "internalLink",
  type: "object",
  title: "Internal link",
  icon: LinkIcon,
  fields: [
    {
      name: "reference",
      type: "reference",
      title: "Reference",
      to: [{ type: "post" }, { type: "page" }],
    },
  ],
};

export const image = defineField({
  name: "image",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative Text",
      description: "Descriptive text for accessibility and SEO.",
    },
  ],
  validation: (Rule) => Rule.required(),
});

export const images = defineField({
  name: "images",
  title: "Images",
  type: "array",
  of: [image],
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

export const file = defineField({
  name: "file",
  title: "File",
  type: "file",
  description: "Accepts PDF, JPG, PNG, or MP4 file types.",
  options: {
    accept: "application/pdf, image/png, image/jpeg, image/jpg, video/mp4",
  },
});

export const cta = defineField({
  name: "cta",
  title: "CTA Button",
  type: "cta",
});

export const ctas = defineField({
  name: "ctas",
  title: "CTA Buttons",
  description: "Max 2 CTAs.",
  type: "array",
  of: [cta],
  validation: (Rule) => Rule.max(2),
});
