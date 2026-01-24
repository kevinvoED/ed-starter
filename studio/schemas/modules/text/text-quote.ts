import { BlockContentIcon, BlockquoteIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { eyebrow, image, link, title } from "@/schemas/sharedFields";

export default defineType({
  name: "text-quote",
  title: "Text Quote",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    defineField({
      ...image,
      title: "Page Decoration",
      description: "Upload a page decoration. Must be a .svg file",
    }),
    defineField({
      name: "items",
      title: "Quote Items",
      type: "array",
      description:
        "Minimum 1 quote item. Adding more than 1 quote will turn this module into a carousel.",
      of: [
        defineArrayMember({
          name: "item",
          title: "Quote Item",
          type: "object",
          icon: BlockquoteIcon,
          fields: [
            eyebrow,
            defineField({
              ...title,
              name: "quote",
              title: "Quote",
              description: "The quote text. Do not include quotation marks.",
            }),
            defineField({
              name: "author",
              title: "Author",
              type: "object",
              fields: [
                defineField({
                  ...title,
                  name: "name",
                  title: "Name",
                  placeholder: "John Doe",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  ...title,
                  title: "Author's Title",
                  placeholder: "Global SaaS Platform",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "quote",
              authorName: "author.name",
              authorTitle: "author.title",
            },
            prepare({ title, authorName, authorTitle }) {
              return {
                title: title,
                subtitle: `${authorName} ${authorTitle ? `, ${authorTitle}` : ""}`,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    link,
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare({ items }) {
      return {
        title: "Text Quote",
        subtitle: `${items.length} quote${items.length > 1 ? "s" : ""}`,
      };
    },
  },
});
