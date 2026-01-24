import { DocumentIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType, type SchemaTypeDefinition } from "sanity";
import {
  meta,
  modules,
  slug,
  title as titleField,
} from "@/schemas/sharedFields";

interface PageBuilderOptions {
  name: string;
  title: string;
  icon?: React.ComponentType;
}

export function createPageType({
  name,
  title,
  icon = DocumentIcon,
}: PageBuilderOptions): SchemaTypeDefinition {
  return defineType({
    name,
    type: "document",
    title,
    icon,
    groups: [
      {
        name: "content",
        title: "Content",
        default: true,
      },
      {
        name: "seo",
        title: "SEO",
      },
      {
        name: "settings",
        title: "Settings",
      },
    ],
    fields: [
      defineField({ ...titleField, group: "content" }),
      defineField({ ...slug, group: "content" }),
      defineField({
        ...modules,
        group: "content",
      }),
      meta,
      orderRankField({ type: name }),
    ],
  });
}
