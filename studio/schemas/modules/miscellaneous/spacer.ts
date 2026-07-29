import { ImageRemoveIcon } from "@sanity/icons/ImageRemove";
import { upperFirst } from "es-toolkit";
import { defineField, defineType } from "sanity";
import { ModulePreview } from "@/components/module-preview";

export default defineType({
  name: "spacer",
  title: "Spacer",
  type: "object",
  fields: [
    defineField({
      name: "spacing",
      type: "string",
      title: "Spacing",
      description: "The amount of space that this Spacer should take up.",
      initialValue: "default",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Tiny", value: "tiny" },
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
      },
    }),
  ],
  components: { preview: ModulePreview },
  preview: {
    select: {
      title: "spacing",
    },
    prepare({ title }) {
      return {
        title: `${upperFirst(title)}`,
        subtitle: "Spacer",
        media: ImageRemoveIcon,
      };
    },
  },
});
