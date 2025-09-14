import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
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
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'type',
                title: 'Link Type',
                type: 'string',
                initialValue: 'href',
                options: {
                  list: [
                    { title: 'URL', value: 'href' },
                    { title: 'Page', value: 'page' },
                    { title: 'Post', value: 'post' },
                  ],
                  layout: 'radio',
                },
              }),
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                hidden: ({ parent }) =>
                  parent?.type !== 'href' && parent?.type != null,
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.type === 'href' && !value) {
                      return 'URL is required when Link Type is URL';
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
                  Rule.custom((value, context: any) => {
                    if (context.parent?.type === 'page' && !value) {
                      return 'Page reference is required when Link Type is Page';
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
                  Rule.custom((value, context: any) => {
                    if (context.parent?.type === 'post' && !value) {
                      return 'Post reference is required when Link Type is Post';
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
          },
        ],
      },
    }),
  ],
});
