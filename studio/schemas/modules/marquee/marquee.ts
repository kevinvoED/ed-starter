import { TiersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { marquee } from "@/schemas/sharedFields";

export default defineType({
  name: "marquee",
  title: "Marquee",
  type: "object",
  icon: TiersIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      description: "Select between light or dark mode.",
      type: "string",
      options: {
        list: ["light", "dark"],
        layout: "radio",
      },
      initialValue: "light",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "padding",
      title: "Padding Options",
      description:
        "Select the top and bottom padding that should be applied to this module.",
      type: "string",
      options: {
        list: ["none", "default", "large", "small"],
        layout: "radio",
      },
      initialValue: "default",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "separator",
      title: "Separator",
      description:
        "Select the type of separator that is displayed between each item.",
      type: "string",
      options: {
        list: ["hyphen", "arrow"],
        layout: "radio",
      },
      initialValue: "hyphen",
      validation: (Rule) => Rule.required(),
    }),
    marquee,
  ],
  preview: {
    prepare() {
      return {
        title: "Marquee",
      };
    },
  },
});
