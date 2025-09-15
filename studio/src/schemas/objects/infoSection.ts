import { TextIcon } from '@sanity/icons';

import { image, images, portableText } from '@/schemas/sharedFields';

import { defineField, defineType } from 'sanity';

export const infoSection = defineType({
  name: 'infoSection',
  title: 'Info Section',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      ...portableText,
    }),
    defineField({
      ...image,
    }),
    defineField({
      ...images,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Info Section',
        subtitle: 'Info Section',
      };
    },
  },
});
