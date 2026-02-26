import { EarthGlobeIcon } from "@sanity/icons";
import { startCase } from "es-toolkit";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "global-module",
  title: "Global Module",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "moduleRef",
      title: "Select Global Module",
      description:
        "Select a global module from the library. These are pre-configured modules that can be referenced and used anywhere on the site. ",
      type: "reference",
      to: [{ type: "module-library" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "moduleRef.label",
      type: "moduleRef.module.0._type",
    },
    prepare({ title, type }) {
      return {
        title: `Global Module (${startCase(type)})`,
        subtitle: title,
        media: EarthGlobeIcon,
      };
    },
  },
});
