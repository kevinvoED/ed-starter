import { Menu } from "lucide-react";
import { FolderIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { link, logo, title, toggle } from "@/schemas/sharedFields";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: Menu,
  fields: [
    defineField({
      name: "mainlink",
      title: "Main link",
      description:
        "This is the section that contains all the main link of the website.",
      type: "array",
      of: [
        {
          name: "category",
          title: "Main Categories",
          type: "object",
          icon: FolderIcon,
          fields: [
            {
              ...title,
              title: "Category Title",
              description: "The title of the category or collection of link.",
            },
            {
              ...toggle,
              name: "hasIndexPage",
              title: "Does this category have an index page?",
              validation: (Rule) => Rule.required(),
            },
            {
              ...link,
              name: "indexPageLink",
              title: "Category Index Page",
              description: "Select an internal index page this should link to.",
              hidden: ({ parent }) => !parent?.hasIndexPage,
              validation: (Rule) =>
                Rule.max(1).custom((value, context) => {
                  const parent = context.parent as { hasIndexPage?: boolean };
                  if (
                    parent?.hasIndexPage &&
                    (!value || (Array.isArray(value) && value.length === 0))
                  ) {
                    return "Category Index Page link is required when 'Does this category have an index page?' is enabled.";
                  }
                  return true;
                }),
            },
            {
              name: "subCategories",
              title: "Sub Categories",
              description: "Add a sub category(s).",
              type: "array",
              icon: FolderIcon,
              of: [
                {
                  name: "subCategory",
                  title: "Sub Category",
                  type: "object",
                  icon: FolderIcon,
                  fields: [
                    defineField({
                      ...title,
                      title: "Sub Category Title",
                    }),
                    defineField({
                      ...link,
                      title: "Link Items",
                      description: "",
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: "title",
                      description: "description",
                    },
                    prepare({ title, description }) {
                      return {
                        title: title,
                        subtitle: description,
                      };
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      ...logo,
      name: "smallLogo",
      title: "Organization Logo (Small)",
      description: "Add a small .svg file of your organization's logo.",
    }),
    defineField({
      ...logo,
      name: "largeLogo",
      title: "Organization Logo (Large)",
      description:
        "Add the large banner text .svg file. This spans the entire width of the website.",
    }),
    defineField({
      name: "actionlink",
      title: "CTA link",
      type: "array",
      description: "Optional. Max 2 link. Add your main CTA link.",
      of: [{ type: "link" }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: "socialMedialink",
      title: "Social Media link",
      type: "array",
      description: "Optional. Add link to your social media platforms.",
      of: [{ type: "link" }],
      validation: (Rule) => Rule,
    }),
    defineField({
      name: "bottomlink",
      title: "Bottom link",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
