import type { StructureBuilder, StructureResolver } from "sanity/structure";
import {
  CogIcon,
  DashboardIcon,
  DocumentsIcon,
  EarthGlobeIcon,
  FolderIcon,
  RedoIcon,
} from "@sanity/icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { defaultDocumentNode } from "@/lib/default-document-node";

const parentChildPageItems = [
  {
    title: "Platform",
    parentTitle: "Platform Index",
    parentSchemaType: "platform-index",
    parentIcon: FolderIcon,
    childTitle: "Platform Child Pages",
    childSchemaType: "platform-child",
    childIcon: DocumentsIcon,
  },
];

const resourceItems = [
  {
    title: "Blog",
    itemTitle: "Blog Posts",
    itemSchemaType: "post",
    landingPageTitle: "Blog Landing",
    landingPageSchemaType: "post-index",
    icon: FolderIcon,
  },
];

// const referenceItems = [
//   {
//     title: "Resource Topics",
//     schemaType: "resource-topic",
//     icon: BookmarkIcon,
//   },
// ];

const globalItems = [
  {
    title: "Navbar",
    schemaType: "navbar",
    icon: EarthGlobeIcon,
  },
  {
    title: "Footer",
    schemaType: "footer",
    icon: EarthGlobeIcon,
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
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pages",
        icon: DashboardIcon,
        S,
        context,
      }),

      S.divider().title(""),
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
            .icon(parentIcon)
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
      // orderableDocumentListDeskItem({
      //   type: "solutions-child",
      //   title: "Solutions",
      //   icon: FolderIcon,
      //   S,
      //   context,
      // }),
      S.divider().title("Resources"),
      ...resourceItems.map(
        ({
          title,
          itemTitle,
          itemSchemaType,
          landingPageTitle,
          landingPageSchemaType,
          icon,
        }) =>
          S.listItem()
            .title(title)
            .icon(icon)
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
                ]),
            ),
      ),
      // S.divider().title("References"),
      // ...referenceItems.map(({ title, icon, schemaType }) =>
      //   orderableDocumentListDeskItem({
      //     type: schemaType,
      //     title: title,
      //     icon: icon,
      //     S,
      //     context,
      //   }),
      // ),
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
    ]);
