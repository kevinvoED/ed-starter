import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { validateImage } from "@/lib/utils";
import { image } from "@/schemas/sharedFields";

export default defineType({
  name: "full-image",
  title: "Full Image",
  type: "object",
  fields: [
    defineField({
      ...image,
      validation: (Rule) =>
        Rule.custom(
          validateImage({
            minWidth: 900,
          }),
        ),
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
