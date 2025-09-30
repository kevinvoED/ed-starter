import { DashboardIcon } from '@sanity/icons';

import { cta, ctas, description, image, title } from '@/schemas/sharedFields';

import { defineField, defineType } from 'sanity';

export const heroPrimary = defineType({
  name: 'heroPrimary',
  title: 'Hero Primary',
  type: 'object',
  icon: DashboardIcon,
  fields: [
    defineField({
      ...title,
    }),
    defineField({
      ...description,
    }),
    defineField({
      ...image,
    }),
    defineField({
      ...ctas,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Hero Primary',
        subtitle: title || 'No title provided',
      };
    },
  },
});
