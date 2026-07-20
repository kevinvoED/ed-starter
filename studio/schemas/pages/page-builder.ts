import { DocumentIcon } from "@sanity/icons/Document";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType, type SchemaTypeDefinition } from "sanity";
import { meta, modules, pageTitle, schemaGroups, slug } from "@/schemas/common";

type PageBuilderOptions = {
  name: string;
  title: string;
  icon?: React.ComponentType;
  type?: "document" | "object";
  enableParentPage?: boolean;
};

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
  enableParentPage = false,
}: PageBuilderOptions): SchemaTypeDefinition {
  return defineType({
    name,
    title,
    icon,
    type,
    groups: schemaGroups,
    fields: [
      defineField({
        ...pageTitle,
        group: "content",
      }),
      ...(enableParentPage
        ? [
            defineField({
              name: "parentPage",
              title: "Parent Page",
              description:
                "Select a parent page if this is a child page. A child page that already has a parent page cannot be selected as a parent page.",
              type: "reference" as const,
              to: [{ type: name }],
              options: {
                filter: ({ document }) => {
                  const rawId = document?._id as string | undefined;

                  if (!rawId) {
                    return { filter: "!defined(parentPage)" };
                  }

                  const publishedId = rawId.replace(/^drafts\./, "");

                  return {
                    filter:
                      "!defined(parentPage) && _id != $publishedId && _id != $draftId",
                    params: {
                      publishedId,
                      draftId: `drafts.${publishedId}`,
                    },
                  };
                },
              },
              group: "content",
            }),
          ]
        : []),
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
