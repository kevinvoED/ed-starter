import { DocumentIcon } from '@sanity/icons';

import { description, seo, slug, title } from '@/schemaTypes/sharedFields'

import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      ...title,
      group: 'content',
    }),
    defineField({
      ...slug,
      group: 'content',
    }),
    defineField({
      ...description,
      group: 'content',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: [{ type: 'callToAction' }, { type: 'infoSection' }],
      options: {
        insertMenu: {
          // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
      group: 'content',
    }),
    defineField({
      ...seo,
    }),
  ],
});
