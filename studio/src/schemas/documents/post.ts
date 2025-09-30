import { DocumentTextIcon } from '@sanity/icons';
import { orderRankField } from '@sanity/orderable-document-list';

import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              const coverImage = context?.document?.coverImage as
                | { asset?: { _ref?: string } }
                | undefined;
              if (
                coverImage &&
                typeof coverImage === 'object' &&
                coverImage.asset &&
                typeof coverImage.asset._ref === 'string' &&
                !alt
              ) {
                return 'Required';
              }
              return true;
            });
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    orderRankField({ type: 'post', newItemPosition: 'before' }),
  ],
  preview: {
    select: {
      title: 'title',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, authorFirstName, authorLastName, date }) {
      const subtitles = [
        authorFirstName &&
          authorLastName &&
          `by ${authorFirstName} ${authorLastName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(' ') };
    },
  },
});
