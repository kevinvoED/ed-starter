import { LinkIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'CTA Type',
      description: 'Select the type of CTA you want to link to.',
      type: 'string',
      initialValue: 'page',
      options: {
        list: [
          { title: 'Internal Link', value: 'page' },
          { title: 'External URL', value: 'href' },
          { title: 'Blog Post', value: 'post' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'The text that will be displayed on the CTA.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'href',
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type === 'href' && !value) {
            return 'URL is required when Link Type is URL.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.type !== 'page',
      validation: (Rule) =>
        // Custom validation to ensure page reference is provided if the link type is 'page'
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type === 'page' && !value) {
            return 'Page reference is required when Link Type is Page.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      hidden: ({ parent }) => parent?.type !== 'post',
      validation: (Rule) =>
        // Custom validation to ensure post reference is provided if the link type is 'post'
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type === 'post' && !value) {
            return 'Post reference is required when Link Type is Post.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
