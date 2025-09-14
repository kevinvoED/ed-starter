import { LinkIcon } from '@sanity/icons';

import { cta } from '@/schemas/objects/cta';

import { defineArrayMember, defineType } from 'sanity';

/**
 * This schema is responsible for all block content within PortableText.
 * Note that schemas inside 'annotations' are only applied when the user highlights any text within PortableText,
 * while schemas defined separately using their own `defineArrayMember` are individiual imported modules
 *
 * This schema can be imported and used in other existing schemas by adding:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
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
                description: 'Read https://css-tricks.com/use-target_blank/',
                type: 'boolean',
              },
            ],
          },
          // Add this internal link annotation
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'post' },
                  { type: 'page' },
                  // Add other document types you want to link to
                ],
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
