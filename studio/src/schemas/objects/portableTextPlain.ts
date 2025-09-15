import { externalLink, internalLink } from '@/schemas/sharedFields';

import { defineArrayMember, defineType } from 'sanity';
/**
 *  This schema is responsible for all block content within PortableText.
 *  Note that schemas inside 'annotations' are only applied when the user highlights any text within PortableText,
 *  while schemas defined separately using their own `defineArrayMember` are individiual imported modules
 *
 *  This schema can be imported and used in other existing schemas by adding:
 *
 *  import { portableTextPlain } from '@/schemas/sharedFields';
 *
 *  defineField({
 *    ...portableTextPlain,
 *  }),
 *
 */
export const portableTextPlain = defineType({
  title: 'Portable Text',
  name: 'portableTextPlain',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
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
  ],
});
