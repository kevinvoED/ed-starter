/*
 * This file contains commonly used primitive schemas to be used in other larger schemas
 * It helps avoid repeating the same fields and makes your schemas more readable
 * If there is a type that is being used multiple times, consider creating a shared schema for it here
 * Make sure to check validation and descriptions should always end with a period.
 * Please keep this file organized and well documented
 */

import { relationTypes } from '@/schemas/moduleTypes';

import { defineField } from 'sanity';

export const title = defineField({
  name: 'title',
  title: 'Title',
  description: 'The main title for this section or module.',
  type: 'string',
  validation: (Rule) => Rule.required(),
});

export const description = defineField({
  name: 'description',
  title: 'Description',
  description:
    'Supplementary text that provides additional context or information.',
  type: 'text',
  rows: 3,
});

// Requires a title to be on the entity as well. A unique ID to reference this entity.
export const slug = defineField({
  name: 'slug',
  title: 'Page Slug',
  type: 'slug',
  description: "Generate a unique ID used for this page's slug.",
  options: {
    source: 'title',
    maxLength: 96,
  },
  validation: (Rule) => Rule.required(),
});

export const seo = defineField({
  name: 'seo',
  title: 'SEO',
  type: 'seo',
  group: 'seo',
});

// Internal CTA link that references only internal pages
export const internalLink = defineField({
  name: 'internalLink',
  title: 'Internal Link',
  description: 'Select an entity that you want to create a link to',
  type: 'reference',
  to: relationTypes,
});
