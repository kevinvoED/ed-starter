import { UserIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
import { links, name } from "@/schemas/sharedFields";

export default defineType({
  name: "staff",
  title: "Staff Member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      ...name,
      title: "Full Name",
      placeholder: "John Doe",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "The role of the staff member.",
      placeholder: "CEO, Founder, President & COO, etc.",
      validation: (Rule) => Rule.required(),
    }),
    portableTextPlain({
      name: "bio",
      title: "Bio Description",
      description:
        "Optional. This is a brief description or bio of the author. Max 100 characters.",
      validation: false,
    }),
    defineField({
      ...links,
      title: "Social Media",
      description: "Optional.",
      validation: (Rule) => Rule,
    }),
    orderRankField({ type: "staff" }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: subtitle,
      };
    },
  },
});
