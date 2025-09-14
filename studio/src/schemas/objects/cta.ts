import { BulbOutlineIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Button link',
      type: 'link',
    }),
  ],
  validation: (Rule) =>
    // This is a custom validation rule that requires both 'buttonText' and 'link' to be set, or neither to be set
    Rule.custom((fields) => {
      const { buttonText, link } = fields || {};
      if ((buttonText && link) || (!buttonText && !link)) {
        return true;
      }
      return 'Both Button text and Button link must be set, or both must be empty';
    }),
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      const { title } = selection;

      return {
        title: 'Call to Action',
        subtitle: title,
      };
    },
  },
});
