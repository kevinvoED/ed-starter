import { RefreshCwIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
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
});
