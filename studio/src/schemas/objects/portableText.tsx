import { LinkIcon } from '@sanity/icons';

import { cta } from '@/schemas/objects/cta';

import { defineArrayMember, defineType } from 'sanity';

/**
 *  This schema is responsible for all block content within PortableText.
 *  Note that schemas inside 'annotations' are only applied when the user highlights any text within PortableText,
 *  while schemas defined separately using their own `defineArrayMember` are individiual imported modules
 *
 *  This schema can be imported and used in other existing schemas by adding:
 *
 *  import { portableText } from '@/schemas/sharedFields';
 *
 *  defineField({
 *    ...portableText,
 *  }),
 *
 */
export const portableText = defineType({
  title: 'Portable Text',
  name: 'portableText',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [{ type: 'post' }, { type: 'page' }],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
    }),
  ],
});
