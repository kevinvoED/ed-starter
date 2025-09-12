import { DocumentIcon } from '@sanity/icons';

import { description, seo, slug, title } from '@/schemas/sharedFields';

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
      name: 'modules',
      title: 'modules',
      type: 'array',
      of: [{ type: 'callToAction' }, { type: 'infoSection' }],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/previews/${schemaTypeName}.webp`,
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
