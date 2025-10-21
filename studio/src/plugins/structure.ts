/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

import { DocumentsIcon, EarthGlobeIcon, RedoIcon } from "@sanity/icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

import { defaultDocumentNode } from "@/plugins/defaultDocumentNode";

import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { structureTool } from "sanity/structure";

const structureResolver: StructureResolver = (S: StructureBuilder, context) =>
  S.list()
    .title("Website Content")
    .items([
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pages",
        icon: DocumentsIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "post",
        title: "Posts",
        icon: DocumentsIcon,
        S,
        context,
      }),
      S.divider().title("Settings"),
      S.listItem()
        .title("Redirects & Rewrites")
        .child(
          S.document().schemaType("configuration").documentId("configuration")
        )
        .icon(RedoIcon),
      S.listItem()
        .title("Global Information")
        .child(S.document().schemaType("settings").documentId("siteSettings"))
        .icon(EarthGlobeIcon),
    ]);

export const structure = structureTool({
  defaultDocumentNode,
  structure: structureResolver,
});
