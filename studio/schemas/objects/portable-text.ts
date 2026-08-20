import { PlayIcon } from "@sanity/icons/Play";
import { ThListIcon } from "@sanity/icons/ThList";
import { defineArrayMember, defineType } from "sanity";
import { YouTubePreview } from "@/components/youtube-preview";
import {
  image,
  ptAnnotationHighlightFields,
  ptAnnotationLinkFields,
  ptDecoratorFields,
  ptListFields,
  ptStyleHeadingFields,
  table,
} from "@/schemas/common";

/*
 * PortableText (Rich Text Editor)
 * @docs: https://www.sanity.io/docs/studio/portable-text-editor-configuration
 *
 * There are two different PortableText types used: PortableText and PortableTextPlain.
 * When using this in a custom schema, make sure to use the one from 'common.ts' instead.
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
          ...ptAnnotationLinkFields,
          ...ptAnnotationHighlightFields,
        ],
      },
    }),
    defineArrayMember({
      ...image,
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
      name: "richTable",
      title: "Rich Table Block",
      type: "richTableBlock",
      icon: ThListIcon,
    }),
    defineArrayMember({
      ...table,
    }),
  ],
});
