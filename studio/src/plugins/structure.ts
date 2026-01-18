/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

import type { StructureBuilder, StructureResolver } from "sanity/structure";
import {
  DocumentsIcon,
  EarthGlobeIcon,
  MenuIcon,
  RedoIcon,
} from "@sanity/icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { defaultDocumentNode } from "@/plugins/defaultDocumentNode";
import { structureTool } from "sanity/structure";

const navigationItems = [
  {
    title: "Navigation",
    schemaType: "navigation",
    icon: MenuIcon,
  },
];

const settingsItems = [
  {
    title: "Redirects & Rewrites",
    schemaType: "configuration",
    icon: RedoIcon,
  },
  {
    title: "Global Informations",
    schemaType: "settings",
    icon: EarthGlobeIcon,
  },
];

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
      S.divider().title("Navigation"),
      ...navigationItems.map(({ title, icon, schemaType }) =>
        S.listItem()
          .title(title)
          .icon(icon)
          .child(S.document().schemaType(schemaType).documentId(schemaType)),
      ),
      S.divider().title("Settings"),
      ...settingsItems.map(({ title, icon, schemaType }) =>
        S.listItem()
          .title(title)
          .icon(icon)
          .child(S.document().schemaType(schemaType).documentId(schemaType)),
      ),
    ]);

export const structure = structureTool({
  defaultDocumentNode,
  structure: structureResolver,
});
