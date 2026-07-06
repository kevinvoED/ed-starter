import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { startCase } from "es-toolkit";
import { defineField, defineType } from "sanity";
import { ModulePreview } from "@/components/module-preview";

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
        "Select a global module from the library. These are pre-configured modules that can be referenced and used anywhere on the site.",
      type: "reference",
      to: [{ type: "global-module-library" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  components: { preview: ModulePreview },
  preview: {
    select: {
      title: "moduleRef.label",
      type: "moduleRef.module.0._type",
    },
    prepare({ title, type }) {
      return {
        title: `${title} (${startCase(type)})`,
        subtitle: "Global Module",
        media: EarthGlobeIcon,
      };
    },
  },
});
