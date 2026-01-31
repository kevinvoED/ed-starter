import { ArrowRight, CogIcon, RefreshCwIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "configuration",
  title: "Configuration",
  type: "document",
  groups: [
    {
      name: "redirects",
      title: "Redirects",
    },
    {
      name: "rewrites",
      title: "Rewrites",
    },
  ],
  icon: CogIcon,
  fields: [
    defineField({
      name: "redirects",
      type: "array",
      group: "redirects",
      description:
        "Redirect from one URL to another by changing the URL in the users browser",
      of: [
        {
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
                Rule.required().error(
                  "New URL is required for the redirect to work",
                ),
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
              validation: (Rule) =>
                Rule.required().error("Redirect type is required"),
            }),
          ],
          preview: {
            select: {
              title: "source",
              subtitle: "destination",
            },
          },
        },
      ],
    }),
    defineField({
      name: "rewrites",
      type: "array",
      group: "rewrites",
      description:
        "Rewrites act as a URL proxy and mask the destination path, making it appear the user hasn't changed their location on the site. Suitable for file rewrites. For example, /some-file.pdf -> https://cdn.sanity.io/files/some-file.pdf",
      of: [
        {
          name: "rewrite",
          title: "Rewrites",
          description:
            "Rewrites act as a URL proxy and mask the destination path, making it appear the user hasn't changed their location on the site. Suitable for file rewrites. For example, /some-file.pdf -> https://cdn.sanity.io/files/some-file.pdf",
          type: "object",
          icon: RefreshCwIcon,
          fields: [
            defineField({
              name: "source",
              title: "Local URL",
              description: "The local URL that you want to use on this site",
              placeholder: "/forms/:path*",
              type: "string",
              validation: (Rule) => [
                Rule.required().min(2),
                Rule.custom((name) => {
                  // This would crash if we didn't check
                  // for undefined values first
                  return String(name).startsWith("/")
                    ? true
                    : 'Your local URL must start with a "/"';
                }).error(),
              ],
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                }),
            }),
          ],
          preview: {
            select: {
              title: "source",
              subtitle: "url",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Configuration",
        subtitle: title,
      };
    },
  },
});
