import { MasterDetailIcon, UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { ptDescription } from "@/schemas/sharedFields";

export default defineType({
  name: "list-team",
  title: "List Team",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: "staffMembers",
      type: "array",
      of: [
        defineArrayMember({
          name: "staffMember",
          title: "Staff Member",
          type: "object",
          icon: UserIcon,
          fields: [
            defineField({
              name: "staff",
              title: "Staff Member",
              type: "reference",
              to: { type: "staff" },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              ...ptDescription,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "articles",
              title: "Articles",
              type: "array",
              description:
                "References to blog posts, case studies, and resources.",
              of: [
                defineArrayMember({
                  type: "reference",
                  to: [
                    { type: "post" },
                    { type: "case-study" },
                    { type: "resource" },
                  ],
                }),
              ],
              validation: (Rule) => Rule.max(3),
            }),
          ],
          preview: {
            select: {
              title: "staff.name",
              subtitle: "staff.role",
              media: "staff.image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Unnamed Staff Member",
                subtitle: subtitle,
                media: media,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      staffMembers: "staffMembers",
    },
    prepare({ staffMembers }) {
      return {
        title: "List Team",
        subtitle: `${staffMembers.length} staff member${staffMembers.length > 1 ? "s" : ""}`,
      };
    },
  },
});
