import { toPlainText } from "@portabletext/react";
import {
  BlockElementIcon,
  DocumentsIcon,
  LinkIcon,
  MenuIcon,
  PanelRightIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { links, logo, ptDescription, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "navbar",
  title: "Navbar",
  type: "document",
  icon: MenuIcon,
  fields: [
    logo,
    defineField({
      name: "links",
      title: "Main Links",
      type: "array",
      of: [
        { type: "link", title: "Standalone Link" },
        {
          name: "group",
          type: "object",
          icon: PanelRightIcon,
          fields: [
            ptTitle,
            {
              name: "group",
              type: "array",
              of: [
                {
                  name: "card",
                  type: "object",
                  icon: PanelRightIcon,
                  fields: [
                    ptTitle,
                    ptDescription,
                    {
                      type: "link",
                      name: "link",
                      description: "Optional. Shows button if provided.",
                    },
                  ],
                },
                {
                  name: "link-group",
                  type: "object",
                  icon: LinkIcon,
                  fields: [
                    ptTitle,
                    {
                      ...links,
                      description: "",
                      validation: (Rule) => Rule,
                    },
                  ],
                },
                {
                  name: "resources",
                  type: "object",
                  icon: DocumentsIcon,
                  fields: [
                    defineField({
                      name: "resources",
                      type: "array",
                      of: [{ type: "reference", to: [{ type: "post" }] }],
                      validation: (Rule) => Rule.max(2),
                    }),
                  ],
                  preview: {
                    select: {
                      title: "resources.0.title",
                    },
                    prepare({ title }) {
                      return {
                        title: "Resources",
                        subtitle: toPlainText(title),
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare({ title }) {
              return {
                title,
              };
            },
          },
        },
        {
          name: "divider",
          type: "object",
          icon: BlockElementIcon,
          fields: [
            defineField({
              name: "type",
              type: "string",
              options: {
                list: [
                  { title: "Dot", value: "dot" },
                  { title: "Space", value: "space" },
                ],
              },
              initialValue: "dot",
            }),
          ],
          preview: {
            select: {
              type: "type",
            },
            prepare({ type }) {
              return { title: "Divider", subtitle: type };
            },
          },
        },
      ],
    }),
    defineField({
      name: "ctaLinks",
      title: "CTA Links",
      type: "array",
      of: [{ type: "link", title: "Standalone CTA Link" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navbar" };
    },
  },
});
