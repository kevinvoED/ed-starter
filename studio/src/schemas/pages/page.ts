import { DocumentIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { moduleGroups, moduleTypes } from "@/schemas/moduleTypes";
import { description, seo, slug, title } from "@/schemas/sharedFields";
import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      ...slug,
      group: "content",
    }),
    defineField({
      ...title,
      group: "content",
    }),
    defineField({
      ...description,
      group: "content",
    }),
    defineField({
      name: "modules",
      title: "Module Builder",
      description:
        "Select from a list of modules to build out your page. Order is respected.",
      type: "array",
      of: moduleTypes,
      options: {
        insertMenu: {
          groups: moduleGroups,
          views: [
            {
              name: "grid",
              previewImageUrl: (schemaTypeName) =>
                `/static/previews/${schemaTypeName}.webp`,
            },
          ],
        },
      },
      group: "content",
    }),
    defineField({
      ...seo,
    }),
    orderRankField({ type: "page", newItemPosition: "before" }),
  ],
});
