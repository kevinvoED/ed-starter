import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { relationTypes } from "@/schemas/moduleTypes";

export default defineType({
  name: "link",
  type: "object",
  title: "CTA Link",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "type",
      title: "Button Type",
      description:
        "Choose how this link behaves. Internal Links will navigate to pages within the site, External for outside URLs, or Anchor to scroll to a section on the current page.",
      type: "string",
      options: {
        list: [
          { title: "Internal Link", value: "internal" },
          { title: "External URL", value: "external" },
          { title: "Anchor", value: "anchor" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Button Label",
      description:
        "The visible text displayed on the button. Max 15 characters.",
      type: "string",
      validation: (Rule) => Rule.required().max(15),
    }),
    defineField({
      name: "internalLink",
      title: "Internal Link",
      description:
        "Link to another page on this site. Select from existing pages or posts.",
      type: "reference",
      to: relationTypes,
      hidden: ({ parent }) => parent?.type !== "internal",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type === "internal" && !value) {
            return "Internal link reference is required when using internal link type";
          }
          return true;
        }),
    }),
    defineField({
      name: "href",
      title: "External URL",
      description:
        "Enter a valid external URL to link to (http, https, mailto, tel).",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "external",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }).custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type === "external" && !value) {
            return "External URL is required when using external link type";
          }
          return true;
        }),
    }),
    defineField({
      name: "openInNewTab",
      type: "boolean",
      title: "Open in a new tab?",
      description:
        "When enabled, the link opens in a new browser tab. Recommended for external links.",
      initialValue: false,
      hidden: ({ parent }) => !["external", "internal"].includes(parent?.type),
    }),
    defineField({
      name: "anchorTag",
      type: "string",
      title: "Anchor Target ID",
      description:
        "Enter the ID of the page section to scroll to. Do not include the # symbol.",
      hidden: ({ parent }) => parent?.type !== "anchor",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type === "anchor" && !value) {
            return "Anchor ID is required when using anchor link type";
          }
          if (value?.startsWith("#")) {
            return "Do not include the # symbol in the anchor ID";
          }
          return true;
        }),
    }),
  ],
});
