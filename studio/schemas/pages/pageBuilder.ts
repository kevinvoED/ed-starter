import { DocumentIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType, type SchemaTypeDefinition } from "sanity";
import { meta, modules, pageTitle, slug } from "@/schemas/sharedFields";

interface PageBuilderOptions {
  name: string;
  title: string;
  icon?: React.ComponentType;
  type?: "document" | "object";
}

/*
 * This is a re-useable generic function that creates a page-related schema type.
 * This follows a generic template for parent-level page types.
 * If your page schema requires additional fields, it is recommended to create a custom schema.
 *
 * Base-level page types are typically used as standalone pages, such as a landing page or a blog post.
 * Example routes: /, /blog, /careers, etc.
 *
 * It is not used for child pages or nested pages.
 * Do not use this for routes like: /solutions/john-doe, /blog/i-lost-my-cookie, etc.
 */

export function createPageType({
  name,
  title,
  icon = DocumentIcon,
  type = "document",
}: PageBuilderOptions): SchemaTypeDefinition {
  return defineType({
    name,
    title,
    icon,
    type,
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
      defineField({
        ...pageTitle,
        group: "content",
      }),
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
