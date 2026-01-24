import { ImageIcon } from "@sanity/icons";
import { defineType } from "sanity";
import { video } from "@/schemas/sharedFields";

export default defineType({
  name: "full-video",
  title: "Full Video",
  type: "object",
  icon: ImageIcon,
  fields: [video],
  preview: {
    select: {
      video: "video",
    },
    prepare({ video }) {
      return {
        title: "Video",
        subtitle: video?.alt,
      };
    },
  },
});
