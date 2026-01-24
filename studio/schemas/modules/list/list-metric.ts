import { toPlainText } from "@portabletext/react";
import { BarChartIcon, MasterDetailIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  eyebrow,
  link,
  logo,
  ptDescription,
  ptTitle,
} from "@/schemas/sharedFields";

export default defineType({
  name: "list-metric",
  title: "List Metric",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    eyebrow,
    ptTitle,
    ptDescription,
    defineField({
      ...logo,
      title: "Page Decoration",
      description: "Upload a page decoration. Must be a .svg file",
    }),
    defineField({
      name: "metrics",
      title: "Metric Items",
      type: "array",
      description: "Max 3 metrics.",
      validation: (Rule) => Rule.required().max(3),
      of: [
        defineArrayMember({
          name: "metric",
          title: "Metric",
          type: "object",
          icon: BarChartIcon,
          fields: [
            eyebrow,
            defineField({
              ...ptTitle,
              title: "Statistic",
              description: "The major statistic to be displayed in large text.",
            }),
            ptDescription,
            link,
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
            },
            prepare({ title, description }) {
              return {
                title: toPlainText(title),
                subtitle: toPlainText(description),
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "List Metric",
        subtitle: toPlainText(title),
      };
    },
  },
});
