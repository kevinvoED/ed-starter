import { ImageIcon, VideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { validateImage } from "@/lib/utils";
import { image, video } from "@/schemas/common";

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
      ...video,
      hidden: ({ parent }) => parent?.variant !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { variant?: string };
          if (parent?.variant !== "video") return true;
          if (!value) return "Required";
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      variant: "variant",
    },
    prepare({ variant }) {
      return {
        title: "Media File",
        subtitle: variant === "image" ? "Image" : "Video",
        media: variant === "image" ? ImageIcon : VideoIcon,
      };
    },
  },
});
