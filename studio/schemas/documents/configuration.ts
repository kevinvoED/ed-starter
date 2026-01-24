import { CogIcon } from "lucide-react";
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
      of: [{ type: "redirect" }],
    }),
    defineField({
      name: "rewrites",
      type: "array",
      group: "rewrites",
      description:
        "Rewrites act as a URL proxy and mask the destination path, making it appear the user hasn't changed their location on the site. Suitable for file rewrites. For example, /some-file.pdf -> https://cdn.sanity.io/files/some-file.pdf",
      of: [{ type: "rewrite" }],
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
