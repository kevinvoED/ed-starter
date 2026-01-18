import { BulbOutlineIcon } from "@sanity/icons";
import { portableTextPlain } from "@/schemas/sharedFields";
import { defineField, defineType } from "sanity";

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const callToAction = defineType({
  name: "callToAction",
  title: "Call to Action",
  type: "object",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
    }),
    defineField({
      name: "buttonText",
      title: "Button text",
      type: "string",
    }),
    defineField({
      name: "cta",
      title: "Button Link",
      type: "cta",
    }),
    defineField({
      ...portableTextPlain,
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare(selection) {
      const { title } = selection;

      return {
        title: title,
        subtitle: "Call to Action",
      };
    },
  },
});
