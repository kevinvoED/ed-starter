import { ImageIcon } from "@sanity/icons/Image";
import { VideoIcon } from "@sanity/icons/Video";
import { defineField, defineType } from "sanity";
import { ModulePreview } from "@/components/module-preview";
import { createOptionCards } from "@/components/option-cards";
import { validateImage } from "@/lib/utils";
import { image, video } from "@/schemas/common";

const MEDIA_TYPE_OPTIONS = [
  {
    title: "Uploaded File",
    value: "uploaded",
    description: "Upload a video file.",
  },
  {
    title: "Youtube URL",
    value: "youtube",
    description: "Enter the URL of the video you want to use.",
  },
];

export default defineType({
  name: "media-file",
  title: "Media File",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...image,
      hidden: ({ parent }) => parent?.variant !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { variant?: string };
          if (parent?.variant !== "image") return true;
          return validateImage({ minWidth: 900 })(value);
        }),
    }),
    defineField({
      name: "videoType",
      title: "Video Type",
      description: "Select the type of video you want to use.",
      type: "string",
      options: {
        list: MEDIA_TYPE_OPTIONS.map(({ title, value }) => ({
          title,
          value,
        })),
        layout: "radio",
      },
      components: { input: createOptionCards(MEDIA_TYPE_OPTIONS) },
      hidden: ({ parent }) => parent?.variant !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { variant?: string };
          if (parent?.variant !== "video") return true;
          if (!value) return "Required";
          return true;
        }),
    }),
    defineField({
      name: "videoYoutubeUrl",
      title: "Youtube URL",
      description:
        "Enter the full URL of the Youtube Video you want to display.",
      type: "url",
      hidden: ({ parent }) =>
        parent?.variant !== "video" || parent?.videoType !== "youtube",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            variant?: string;
            videoType?: string;
          };
          if (parent?.variant !== "video" || parent?.videoType !== "youtube")
            return true;
          if (!value) return "Required";
          return true;
        }),
    }),
    defineField({
      ...video,
      hidden: ({ parent }) =>
        parent?.variant !== "video" || parent?.videoType !== "uploaded",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            variant?: string;
            videoType?: string;
          };
          if (parent?.variant !== "video" || parent?.videoType !== "uploaded")
            return true;
          if (!value) return "Required";
          return true;
        }),
    }),
    defineField({
      ...image,
      name: "videoPoster",
      description: "Optional. Used to display a poster image for the video.",
      hidden: ({ parent }) => parent?.variant !== "video",
      validation: (Rule) => Rule,
    }),
  ],
  components: { preview: ModulePreview },
  preview: {
    select: {
      variant: "variant",
    },
    prepare({ variant }) {
      return {
        title: variant === "image" ? "Image" : "Video",
        subtitle: "Media File",
        media: variant === "image" ? ImageIcon : VideoIcon,
      };
    },
  },
});
