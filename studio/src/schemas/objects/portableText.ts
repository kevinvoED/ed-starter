import { externalLink, internalLink } from '@/schemas/sharedFields';

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
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],

        annotations: [internalLink, externalLink],
      },
    }),
    defineArrayMember({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
    }),
  ],
});
