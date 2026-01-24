import { toPlainText } from "@portabletext/react";
import { MasterDetailIcon, TextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import { logo, ptTitle } from "@/schemas/sharedFields";

export default defineType({
  name: "text-dial",
  title: "Text Dial",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    logo,
    ptTitle,
    defineField({
      name: "items",
      title: "Paragraph Items",
      type: "array",
      of: [
        defineArrayMember({
          name: "item",
          title: "Paragraph Item",
          type: "object",
          icon: TextIcon,
          fields: [
            portableTextPlain({
              name: "description",
              title: "Description",
              validation: true,
              enableHighlight: true,
              enableBulletList: true,
              enableNumberList: true,
              enableLink: true,
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(3).max(3),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Text Dial",
        subtitle: toPlainText(title),
      };
    },
  },
});
