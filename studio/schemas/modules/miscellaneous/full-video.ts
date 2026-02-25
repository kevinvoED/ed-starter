import { VideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { video } from "@/schemas/sharedFields";

export default defineType({
  name: "full-video",
  title: "Full Video",
  type: "object",
  fields: [
    defineField({
      ...video,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Full Video",
        media: VideoIcon,
      };
    },
  },
});
