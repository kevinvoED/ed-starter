/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

import { CogIcon } from '@sanity/icons';

import pluralize from 'pluralize-esm';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';
import { structureTool } from 'sanity/structure';

const DISABLED_TYPES = ['settings', 'assist.instruction.context'];

const structureResolver: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      ...S.documentTypeListItems()
        .filter(
          (listItem) => !DISABLED_TYPES.includes(listItem.getId() as string),
        )
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string));
        }),
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ]);

export const structure = structureTool({
  structure: structureResolver,
});
