import { toPlainText } from "@portabletext/react";
import { BlockElementIcon } from "@sanity/icons/BlockElement";
import { LinkIcon } from "@sanity/icons/Link";
import { MenuIcon } from "@sanity/icons/Menu";
import { PanelRightIcon } from "@sanity/icons/PanelRight";
import { defineField, defineType } from "sanity";
import { description, links, logo, title } from "@/schemas/common";

export default defineType({
  name: "navbar",
  title: "Navbar",
  type: "document",
  icon: MenuIcon,
  fields: [
    logo,
    defineField({
      name: "mainLinks",
      title: "Main link",
      type: "array",
      of: [
        {
          name: "standaloneLink",
          title: "Standalone Link",
          type: "object",
          icon: LinkIcon,
          fields: [
            {
              ...links,
              title: "Standalone Link",
              description: "The label of the standalone link.",
              validation: (Rule) => Rule.required().max(1),
            },
          ],
          preview: {
            select: {
              title: "links[0].label",
            },
            prepare({ title }) {
              return {
                title: title,
                subtitle: "Standalone Link",
                media: LinkIcon,
              };
            },
          },
        },
        {
          name: "group",
          type: "object",
          icon: PanelRightIcon,
          fields: [
            title,
            {
              name: "group",
              type: "array",
              of: [
                {
                  name: "card",
                  type: "object",
                  icon: PanelRightIcon,
                  fields: [
                    title,
                    description,
                    {
                      ...links,
                      description: "Optional. Shows button if provided.",
                    },
                  ],
                },
                {
                  name: "link-group",
                  type: "object",
                  icon: LinkIcon,
                  fields: [
                    title,
                    {
                      ...links,
                      description: "",
                    },
                  ],
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
                title: toPlainText(title),
                subtitle: "Group Of Links",
                media: PanelRightIcon,
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
  ],
  preview: {
    prepare() {
      return { title: "Navbar" };
    },
  },
});
