import type { DefaultDocumentNodeResolver } from "sanity/structure";
import { Iframe } from "sanity-plugin-iframe-pane";
import { SANITY_STUDIO_PREVIEW_URL } from "@/lib/env";

// Specify document types that should have preview panes
const previewSchemaTypes = [
  "page",
  "platform-index",
  "platform-child",
  "solutions-child",
  "post-index",
  "post",
  "resource-index",
  "resource",
  "events-index",
  "event",
  "case-study-index",
  "case-study",
];

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  // Add previews for specified schema types
  if (previewSchemaTypes.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .title("Preview")
        .options({
          url: {
            origin: SANITY_STUDIO_PREVIEW_URL,
            preview: (doc: { _type: string; slug: { current: string } }) => {
              let path = "/";

              switch (doc._type) {
                case "page": {
                  const slug = doc.slug?.current;
                  if (slug === "index") {
                    path = "/";
                  } else if (slug) {
                    path = `/${slug}`;
                  } else {
                    path = "/";
                  }
                  break;
                }
                case "post":
                  path = doc.slug?.current
                    ? `/blog/${doc.slug.current}`
                    : "/blog";
                  break;
                case "post-index":
                  path = "/blog";
                  break;
                case "case-study":
                  path = doc.slug?.current
                    ? `/case-studies/${doc.slug.current}`
                    : "/case-studies";
                  break;
                case "case-study-index":
                  path = "/case-studies";
                  break;
                case "platform-index":
                  path = "/platform";
                  break;
                case "platform-child":
                  path = doc.slug?.current
                    ? `/platform/${doc.slug.current}`
                    : "/platform";
                  break;
                case "resource-index":
                  path = "/resources";
                  break;
                case "resource":
                  path = doc.slug?.current
                    ? `/resources/${doc.slug.current}`
                    : "/resources";
                  break;
                case "solutions-child":
                  path = doc.slug?.current
                    ? `/solutions/${doc.slug.current}`
                    : "/solutions";
                  break;
                case "event":
                  path = doc.slug?.current
                    ? `/events/${doc.slug.current}`
                    : "/events";
                  break;
                case "events-index":
                  path = "/events";
                  break;
                default:
                  path = "/";
              }

              // Add iframe parameter to distinguish from presentation mode
              return `${path}?iframe=true`;
            },
            draftMode: "/api/draft-mode/enable",
          },
          defaultSize: "desktop",
          reload: {
            button: true,
          },
        }),
    ]);
  }

  // Return default views for other document types
  return S.document().views([S.view.form()]);
};
