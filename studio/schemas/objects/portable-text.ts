import { PlayIcon } from "@sanity/icons";
import { defineArrayMember, defineType } from "sanity";
import { YouTubePreview } from "@/components/youtube-preview";
import {
  ptAnnotationHighlightFields,
  ptAnnotationLinkFields,
  ptDecoratorFields,
  ptListFields,
  ptStyleHeadingFields,
} from "@/schemas/sharedFields";

/*
 * PortableText (Rich Text Editor)
 * @docs: https://www.sanity.io/docs/studio/portable-text-editor-configuration
 *
 * There are two different PortableText types used: PortableText and PortableTextPlain.
 * When using this in a custom schema, make sure to use the one from 'sharedFields.ts' instead.
 * @see: @/schemas/objects/portable-text-plain.ts
 *
 * PortableText contains the entire toolbox of features and sub-modules built in.
 * Primarily used on 'contentType' pages that need access to sub-modules like 'images', 'videos', etc.
 * Usually for schemas/pages like:'blogs', 'resources', 'case-studies', 'events & webinars', 'news', etc.
 */

export default defineType({
  name: "portable-text",
  title: "Portable Text",
  description: "Rich Text editor with all formatting and sub-modules included.",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [...ptStyleHeadingFields],
      lists: [...ptListFields],
      marks: {
        decorators: [...ptDecoratorFields],
        annotations: [
          ...[ptAnnotationLinkFields],
          ...ptAnnotationHighlightFields,
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
  ],
});
