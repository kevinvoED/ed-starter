import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { contextDocumentTypeName } from "@sanity/assist";
import { BookmarkIcon } from "@sanity/icons/Bookmark";
import { CogIcon } from "@sanity/icons/Cog";
import { DashboardIcon } from "@sanity/icons/Dashboard";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { FolderIcon } from "@sanity/icons/Folder";
import { RedoIcon } from "@sanity/icons/Redo";
import { SchemaIcon } from "@sanity/icons/Schema";
import { StarIcon } from "@sanity/icons/Star";
import { UserIcon } from "@sanity/icons/User";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { startCase } from "es-toolkit";
import { defaultDocumentNode } from "@/lib/default-document-node";
import { globalModuleBlocks } from "@/schemas/moduleTypes";

const parentChildPageItems = [
  {
    title: "Platform",
    parentTitle: "Platform Index",
    parentSchemaType: "platform-index",
    parentIcon: StarIcon,
    childTitle: "Platform Child Pages",
    childSchemaType: "platform-child",
    childIcon: DocumentsIcon,
  },
];

const resourceItems = [
  {
    title: "Blog",
    itemTitle: "Blog Posts",
    itemSchemaType: "blog-post",
    landingPageTitle: "Blog Landing",
    landingPageSchemaType: "blog-index",
    categoryTitle: "Blog Categories",
    categorySchemaType: "blog-category",
    icon: StarIcon,
  },
  {
    title: "Case Studies",
    itemTitle: "Case Studies",
    itemSchemaType: "case-study",
    landingPageTitle: "Case Studies Landing",
    landingPageSchemaType: "case-studies-index",
    icon: StarIcon,
  },
];

const referenceItems = [
  {
    title: "Authors",
    schemaType: "author",
    icon: UserIcon,
  },
];

const globalItems = [
  {
    title: "Navbar",
    schemaType: "navbar",
    icon: SchemaIcon,
  },
  {
    title: "Footer",
    schemaType: "footer",
    icon: SchemaIcon,
  },
  {
    title: "Banner",
    schemaType: "banner",
    icon: BookmarkIcon,
  },
];

const administrationItems = [
  {
    title: "Organization",
    schemaType: "organization",
    icon: CogIcon,
  },
  {
    title: "Redirects & Rewrites",
    schemaType: "configuration",
    icon: RedoIcon,
  },
];

export const structure: StructureResolver = (S: StructureBuilder, context) =>
  S.list()
    .title("Pages")
    .items([
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pages",
        icon: DashboardIcon,
        S,
        context,
      }),

      S.divider().title("Nested Pages"),
      ...parentChildPageItems.map(
        ({
          title,
          parentTitle,
          parentSchemaType,
          parentIcon,
          childTitle,
          childSchemaType,
          childIcon,
        }) =>
          S.listItem()
            .title(title)
            .icon(FolderIcon)
            .child(
              S.list()
                .title(title)
                .items([
                  S.listItem()
                    .title(parentTitle)
                    .icon(parentIcon)
                    .child(
                      (
                        defaultDocumentNode(S, {
                          ...context,
                          schemaType: parentSchemaType,
                        }) || S.document()
                      )
                        .id(parentSchemaType)
                        .schemaType(parentSchemaType)
                        .documentId(parentSchemaType),
                    ),
                  S.divider(),
                  orderableDocumentListDeskItem({
                    type: childSchemaType,
                    title: childTitle,
                    icon: childIcon,
                    S,
                    context,
                  }),
                ]),
            ),
      ),
      S.divider().title("Content"),
      orderableDocumentListDeskItem({
        type: "content-topic",
        title: "Content Topics",
        icon: BookmarkIcon,
        S,
        context,
      }),
      ...resourceItems.map(
        ({
          title,
          itemTitle,
          itemSchemaType,
          landingPageTitle,
          landingPageSchemaType,
          categoryTitle,
          categorySchemaType,
          icon,
        }) =>
          S.listItem()
            .title(title)
            .icon(FolderIcon)
            .child(
              S.list()
                .title(title)
                .items([
                  S.listItem()
                    .title(landingPageTitle)
                    .icon(icon)
                    .child(
                      (
                        defaultDocumentNode(S, {
                          ...context,
                          schemaType: landingPageSchemaType,
                        }) || S.document()
                      )
                        .id(landingPageSchemaType)
                        .schemaType(landingPageSchemaType)
                        .documentId(landingPageSchemaType),
                    ),
                  S.divider(),
                  S.listItem()
                    .title(itemTitle)
                    .schemaType(itemSchemaType)
                    .icon(DocumentsIcon)
                    .child(
                      S.documentTypeList(itemSchemaType)
                        .title(itemTitle)
                        .defaultOrdering([
                          { field: "_createdAt", direction: "desc" },
                        ]),
                    ),
                  ...(categoryTitle && categorySchemaType
                    ? [
                        S.divider(),
                        orderableDocumentListDeskItem({
                          type: categorySchemaType,
                          title: categoryTitle,
                          icon: BookmarkIcon,
                          S,
                          context,
                        }),
                      ]
                    : []),
                ]),
            ),
      ),
      S.divider().title("References"),
      S.listItem()
        .title("Global Modules")
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title("Global Modules")
            .items(
              globalModuleBlocks.map(({ type }) =>
                S.listItem()
                  .title(startCase(type))
                  .icon(FolderIcon)
                  .child(
                    S.documentTypeList("global-module-library")
                      .title(startCase(type))
                      .filter(
                        '_type == "global-module-library" && module[0]._type == $type',
                      )
                      .params({ type })
                      .defaultOrdering([
                        { field: "_createdAt", direction: "desc" },
                      ]),
                  ),
              ),
            ),
        ),
      ...referenceItems.map(({ title, icon, schemaType }) =>
        orderableDocumentListDeskItem({
          type: schemaType,
          title: title,
          icon: icon,
          S,
          context,
        }),
      ),
      S.divider().title("Global"),
      ...globalItems.map(({ title, icon, schemaType }) =>
        S.listItem()
          .title(title)
          .icon(icon)
          .child(
            S.editor()
              .id(schemaType)
              .schemaType(schemaType)
              .documentId(schemaType),
          ),
      ),
      S.divider().title("Administration"),
      ...administrationItems.map(({ title, icon, schemaType }) =>
        S.listItem()
          .title(title)
          .icon(icon)
          .child(
            S.editor()
              .id(schemaType)
              .schemaType(schemaType)
              .documentId(schemaType),
          ),
      ),
      S.documentTypeListItem(contextDocumentTypeName),
    ]);
