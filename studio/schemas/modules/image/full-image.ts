import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { image } from "@/schemas/sharedFields";

export default defineType({
  name: "full-image",
  title: "Full Image",
  type: "object",
  fields: [
    defineField({
      ...image,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Full Image",
        media: ImageIcon,
      };
    },
  },
});
