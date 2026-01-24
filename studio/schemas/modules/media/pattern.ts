import { SparklesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "pattern",
  title: "Pattern",
  type: "object",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Pattern Variant",
      type: "string",
      options: {
        list: [
          { title: "Black & White", value: "black-white" },
          { title: "Black & Neon", value: "black-neon" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      variant: "variant",
    },
    prepare({ variant }) {
      if (variant === "black-white") {
        return {
          title: "Pattern",
          subtitle: "Black/White",
        };
      }
      if (variant === "black-neon") {
        return {
          title: "Pattern",
          subtitle: "Black/Neon",
        };
      }
      return {
        title: "Pattern",
      };
    },
  },
});
