import { EarthGlobeIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { startCase } from "es-toolkit";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "module-library",
  title: "Global Module",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "label",
      title: "Internal Label",
      type: "string",
      description:
        "Descriptive name to identify this global module, purely for organization purposes. This label is not shown anywhere on the site.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "module",
      title: "Module Selection",
      type: "array",
      description:
        "Select a module. It can be referenced and used anywhere on the site. This helps reduce constant duplication of content copy from being re-written or copy/pasted multiple times throughout many pages. Max 1 module can be selected here.",
      of: [
        defineArrayMember({ type: "card-example" }),
        defineArrayMember({ type: "driver-example" }),
        // Add other reusable module types here
      ],
      validation: (Rule) =>
        Rule.required().max(1).error("Please select exactly one module."),
    }),
    orderRankField({ type: "module-library" }),
  ],
  preview: {
    select: {
      title: "label",
      moduleType: "module.0._type",
    },
    prepare({ title, moduleType }) {
      return {
        title,
        subtitle: `${startCase(moduleType)}` || "No module selected",
        media: EarthGlobeIcon,
      };
    },
  },
});
