import { ImageIcon } from "@sanity/icons";
import { defineType } from "sanity";
import { image } from "@/schemas/sharedFields";

export default defineType({
  name: "full-image",
  title: "Full Image",
  type: "object",
  icon: ImageIcon,
  fields: [image],
  preview: {
    select: {
      image: "image",
    },
    prepare({ image }) {
      return {
        title: "Full Image",
        subtitle: image?.alt,
      };
    },
  },
});
