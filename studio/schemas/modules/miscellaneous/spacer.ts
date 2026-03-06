import { ImageRemoveIcon } from "@sanity/icons";
import { upperFirst } from "es-toolkit";
import { defineField, defineType } from "sanity";

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
    defineField({
      name: "anchorId",
      type: "string",
      title: "Anchor ID",
      description:
        "An id that is added to the spacer so you can link to it via the URL hash.",
      initialValue: "",
      validation: (Rule) =>
        Rule.regex(/^[^#]*$/, {
          name: "no-hash",
          invert: false,
        })
          .error("Anchor ID cannot contain a hash (#) character.")
          .regex(/^[^ ]*$/, {
            name: "no-spaces",
            invert: false,
          })
          .error("Anchor ID cannot contain spaces."),
    }),
  ],
  preview: {
    select: {
      title: "spacing",
      anchorId: "anchorId",
    },
    prepare({ title, anchorId }) {
      return {
        title: "Spacer",
        subtitle: `${upperFirst(title)} ${anchorId ? `- Anchor ID: ${anchorId}` : ""}`,
        media: ImageRemoveIcon,
      };
    },
  },
});
