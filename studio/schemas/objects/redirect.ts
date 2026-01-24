import { ArrowRight } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "redirect",
  title: "Redirect",
  description:
    "Redirect from one URL to another by changing the URL in the users browser",
  type: "object",
  icon: ArrowRight,
  fields: [
    defineField({
      name: "source",
      title: "Old URL",
      description: "The old URL that the page used to live on",
      placeholder: "/old-blog/:path*",
      type: "string",
      validation: (Rule) => [
        Rule.required(),
        Rule.custom((name) => {
          // This would crash if we didn't check
          // for undefined values first
          return String(name).startsWith("/")
            ? true
            : 'Your old URL must start with a "/"';
        }).error(),
      ],
    }),
    defineField({
      name: "destination",
      title: "New URL",
      description: "The new URL that the page will live on",
      placeholder: "/blog/:path*",
      type: "string",
      validation: (Rule) => [
        Rule.required().error("New URL is required for the redirect to work"),
        Rule.custom((name) => {
          return String(name).startsWith("/")
            ? true
            : 'Your new URL must start with a "/"';
        }).error(),
      ],
    }),
    defineField({
      name: "redirectType",
      title: "Redirect Type",
      description:
        "Temporary redirects preserve SEO for the original URL, permanent redirects transfer SEO to the new URL",
      type: "string",
      options: {
        list: [
          { title: "Permanent (301)", value: "permanent" },
          { title: "Temporary (302)", value: "temporary" },
        ],
        layout: "radio",
      },
      initialValue: "permanent",
      validation: (Rule) => Rule.required().error("Redirect type is required"),
    }),
  ],
  preview: {
    select: {
      title: "source",
      subtitle: "destination",
    },
  },
});
